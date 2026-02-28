import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight, Users, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Espace Communautaire',
  description:
    'L\'espace communautaire Fish Academy arrive bientôt. Inscrivez-vous pour être informé du lancement.',
  openGraph: {
    title: 'Espace Communautaire | Fish Academy',
    description: 'L\'application Fish Academy arrive bientôt. Restez connectés !',
  },
}

export default function CommunautePage() {
  return (
    <section className="flex min-h-[80vh] items-center bg-gradient-to-b from-dark-900 to-dark-950 py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-900/50">
            <Clock className="h-10 w-10 text-primary-400" aria-hidden="true" />
          </div>

          {/* Title */}
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-dark-50 sm:text-5xl">
            Bientôt disponible
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-dark-300">
            L&apos;espace communautaire Fish Academy est en cours de développement. Notre équipe
            travaille pour vous offrir la meilleure expérience possible pour gérer vos parties de
            poker entre amis.
          </p>

          {/* Features preview */}
          <div className="mt-12 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-xl bg-dark-800 p-5 shadow-sm shadow-black/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900/50 text-primary-400">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-semibold text-dark-100">Gestion de groupe</h3>
              <p className="mt-1 text-sm text-dark-400">
                Créez votre communauté et invitez vos joueurs réguliers.
              </p>
            </div>
            <div className="rounded-xl bg-dark-800 p-5 shadow-sm shadow-black/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900/50 text-primary-400">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-semibold text-dark-100">Sessions & Comptes</h3>
              <p className="mt-1 text-sm text-dark-400">
                Organisez vos parties et gérez les comptes automatiquement.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className="btn-primary group">
              Être informé du lancement
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link href="/solution" className="btn-secondary">
              Découvrir la solution
            </Link>
          </div>

          {/* Additional info */}
          <p className="mt-8 text-sm text-dark-500">
            En attendant, découvrez notre{' '}
            <Link href="/solution" className="text-primary-400 hover:underline">
              solution complète
            </Link>{' '}
            ou consultez le{' '}
            <a
              href="/blog"
              className="text-primary-400 hover:underline"
            >
              blog Fish Academy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
