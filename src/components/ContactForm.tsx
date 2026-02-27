'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/types/contact'

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      honeypot: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue')
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="rounded-2xl border border-green-800 bg-green-900/30 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-400" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-green-300">Message envoyé !</h3>
        <p className="mt-2 text-green-400">
          Merci pour votre intérêt. Nous revenons vers vous sous peu.
        </p>
        <button
          type="button"
          onClick={() => setSubmitStatus('idle')}
          className="mt-6 text-sm font-medium text-green-400 hover:text-green-300"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Ne pas remplir ce champ</label>
        <input type="text" id="honeypot" {...register('honeypot')} tabIndex={-1} autoComplete="off" />
      </div>

      {/* Error banner */}
      {submitStatus === 'error' && (
        <div className="flex items-center gap-3 rounded-lg border border-red-800 bg-red-900/30 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
          <p className="text-sm text-red-300">{errorMessage}</p>
        </div>
      )}

      {/* Row 1: Prénom + Email */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="label">
            Prénom <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
            className={`input-field ${errors.firstName ? 'input-error' : ''}`}
            placeholder="Votre prénom"
          />
          {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`input-field ${errors.email ? 'input-error' : ''}`}
            placeholder="votre@email.com"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
      </div>

      {/* Row 2: Nom du groupe + Ville */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="groupName" className="label">
            Nom du groupe / club
          </label>
          <input
            type="text"
            id="groupName"
            {...register('groupName')}
            className="input-field"
            placeholder="Ex: Les Requins du 75"
          />
        </div>

        <div>
          <label htmlFor="city" className="label">
            Ville
          </label>
          <input
            type="text"
            id="city"
            {...register('city')}
            className="input-field"
            placeholder="Votre ville"
          />
        </div>
      </div>

      {/* Row 3: Nombre de joueurs + Type de jeu + Fréquence */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="playerCount" className="label">
            Nombre de joueurs <span className="text-red-400">*</span>
          </label>
          <select
            id="playerCount"
            {...register('playerCount')}
            className={`input-field ${errors.playerCount ? 'input-error' : ''}`}
          >
            <option value="">Sélectionner</option>
            <option value="5-8">5 à 8 joueurs</option>
            <option value="9-15">9 à 15 joueurs</option>
            <option value="16+">16 joueurs ou plus</option>
          </select>
          {errors.playerCount && <p className="error-text">{errors.playerCount.message}</p>}
        </div>

        <div>
          <label htmlFor="gameType" className="label">
            Type de jeu <span className="text-red-400">*</span>
          </label>
          <select
            id="gameType"
            {...register('gameType')}
            className={`input-field ${errors.gameType ? 'input-error' : ''}`}
          >
            <option value="">Sélectionner</option>
            <option value="cashgame">Cash Game</option>
            <option value="tournoi">Tournoi</option>
            <option value="mixte">Mixte</option>
          </select>
          {errors.gameType && <p className="error-text">{errors.gameType.message}</p>}
        </div>

        <div>
          <label htmlFor="frequency" className="label">
            Fréquence <span className="text-red-400">*</span>
          </label>
          <select
            id="frequency"
            {...register('frequency')}
            className={`input-field ${errors.frequency ? 'input-error' : ''}`}
          >
            <option value="">Sélectionner</option>
            <option value="1x-mois">1x par mois</option>
            <option value="2-3x-mois">2-3x par mois</option>
            <option value="hebdo">Hebdomadaire</option>
          </select>
          {errors.frequency && <p className="error-text">{errors.frequency.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label">
          Votre message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={`input-field resize-none ${errors.message ? 'input-error' : ''}`}
          placeholder="Décrivez votre groupe et vos besoins..."
        />
        {errors.message && <p className="error-text">{errors.message.message}</p>}
      </div>

      {/* RGPD Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          {...register('consent')}
          className="mt-1 h-4 w-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500"
        />
        <label htmlFor="consent" className="text-sm text-dark-300">
          J&apos;accepte que mes données soient utilisées pour répondre à ma demande conformément à
          la{' '}
          <a href="/confidentialite" className="text-primary-400 hover:underline">
            politique de confidentialité
          </a>
          . <span className="text-red-400">*</span>
        </label>
      </div>
      {errors.consent && <p className="error-text">{errors.consent.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitStatus === 'loading'}
        className="btn-primary w-full disabled:opacity-50"
      >
        {submitStatus === 'loading' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" aria-hidden="true" />
            Envoyer ma demande
          </>
        )}
      </button>
    </form>
  )
}
