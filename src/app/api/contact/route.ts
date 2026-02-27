import { NextRequest, NextResponse } from 'next/server'
import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { contactFormSchema } from '@/types/contact'
import { rateLimit } from '@/lib/rate-limit'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@fishacademy.fr'
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || 'fishacademy.fr'
const MAILGUN_FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL || 'postmaster@fishacademy.fr'

// Lazy initialization of Mailgun client to avoid build errors when API key is not set
function getMailgunClient() {
  const apiKey = process.env.MAILGUN_API_KEY?.trim()
  if (!apiKey) {
    return null
  }
  const mailgun = new Mailgun(formData)
  return mailgun.client({
    username: 'api',
    key: apiKey,
    url: 'https://api.eu.mailgun.net',
  })
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return '127.0.0.1'
}

const gameTypeLabels: Record<string, string> = {
  cashgame: 'Cash Game',
  tournoi: 'Tournoi',
  mixte: 'Mixte',
}

const frequencyLabels: Record<string, string> = {
  '1x-mois': '1x par mois',
  '2-3x-mois': '2-3x par mois',
  hebdo: 'Hebdomadaire',
}

const playerCountLabels: Record<string, string> = {
  '5-8': '5 à 8 joueurs',
  '9-15': '9 à 15 joueurs',
  '16+': '16 joueurs ou plus',
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request)
    const { success: rateLimitSuccess, remaining } = rateLimit(clientIp)

    if (!rateLimitSuccess) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`)
      return NextResponse.json(
        { success: false, error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
      )
    }

    // Parse body
    const body = await request.json()

    // Honeypot check
    if (body.honeypot && body.honeypot.length > 0) {
      console.log('Honeypot triggered')
      // Return success to not alert bots
      return NextResponse.json({ success: true, message: 'Message envoyé avec succès.' })
    }

    // Validate data
    const validationResult = contactFormSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      console.log('Validation errors:', errors)
      return NextResponse.json(
        { success: false, error: 'Données invalides. Veuillez vérifier le formulaire.' },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Build email content
    const emailContent = `
Nouvelle demande de création de communauté Fish Academy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMATIONS DE CONTACT
• Prénom: ${data.firstName}
• Email: ${data.email}

DÉTAILS DU GROUPE
• Nom du groupe: ${data.groupName || 'Non renseigné'}
• Ville: ${data.city || 'Non renseignée'}
• Nombre de joueurs: ${playerCountLabels[data.playerCount]}
• Type de jeu principal: ${gameTypeLabels[data.gameType]}
• Fréquence: ${frequencyLabels[data.frequency]}

MESSAGE
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cette demande a été envoyée depuis le formulaire de contact de fishacademy.fr
IP: ${clientIp}
Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
`

    // Get Mailgun client (lazy initialization)
    const mailgunClient = getMailgunClient()

    // Check if Mailgun API key is configured
    if (!mailgunClient) {
      console.log('Mailgun API key not configured, logging contact request:')
      console.log({
        firstName: data.firstName,
        email: data.email,
        groupName: data.groupName,
        city: data.city,
        playerCount: data.playerCount,
        gameType: data.gameType,
        frequency: data.frequency,
        message: data.message,
      })

      return NextResponse.json({
        success: true,
        message: 'Message envoyé avec succès.',
      })
    }

    // Send email via Mailgun
    try {
      console.log('Mailgun config:', {
        domain: MAILGUN_DOMAIN,
        from: `Fish Academy <${MAILGUN_FROM_EMAIL}>`,
        to: CONTACT_EMAIL,
        apiKeyLength: process.env.MAILGUN_API_KEY?.length,
        apiKeyPrefix: process.env.MAILGUN_API_KEY?.substring(0, 8),
      })

      await mailgunClient.messages.create(MAILGUN_DOMAIN, {
        from: `Fish Academy <${MAILGUN_FROM_EMAIL}>`,
        to: [CONTACT_EMAIL],
        'h:Reply-To': data.email,
        subject: `[Fish Academy] Nouvelle demande - ${data.firstName} (${data.groupName || 'Groupe sans nom'})`,
        text: emailContent,
      })
    } catch (mailgunError: unknown) {
      const error = mailgunError as { status?: number; message?: string; details?: string }
      console.error('Mailgun error:', mailgunError)
      console.error('Mailgun error details:', {
        status: error.status,
        message: error.message,
        details: error.details,
      })
      return NextResponse.json(
        { success: false, error: "Erreur lors de l'envoi du message. Veuillez réessayer." },
        { status: 500 }
      )
    }

    console.log(`Contact form submitted successfully from ${clientIp}`)

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès.' },
      { headers: { 'X-RateLimit-Remaining': String(remaining) } }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur inattendue est survenue.' },
      { status: 500 }
    )
  }
}
