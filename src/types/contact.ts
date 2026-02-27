import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  groupName: z.string().optional(),
  city: z.string().optional(),
  playerCount: z.enum(['5-8', '9-15', '16+'], {
    required_error: 'Veuillez sélectionner le nombre de joueurs',
  }),
  gameType: z.enum(['cashgame', 'tournoi', 'mixte'], {
    required_error: 'Veuillez sélectionner le type de jeu principal',
  }),
  frequency: z.enum(['1x-mois', '2-3x-mois', 'hebdo'], {
    required_error: 'Veuillez sélectionner la fréquence',
  }),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter la politique de confidentialité' }),
  }),
  honeypot: z.string().max(0).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export interface ContactApiResponse {
  success: boolean
  message: string
  error?: string
}
