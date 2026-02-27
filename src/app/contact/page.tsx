import type { Metadata } from 'next'
import Image from 'next/image'
import { Mail, MessageSquare, Users } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Demandez la création de votre communauté Fish Academy. Nous vous aidons à structurer votre groupe de poker et à simplifier les comptes.',
  openGraph: {
    title: 'Contact | Fish Academy',
    description: 'Créez votre communauté Fish Academy pour vos parties de poker entre amis.',
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-16 md:py-20">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-900/50 px-4 py-2 text-sm font-medium text-primary-400">
                <Users className="h-4 w-4" aria-hidden="true" />
                Créer votre communauté
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-dark-50 sm:text-5xl">
                Créer votre communauté{' '}
                <span className="gradient-text">Fish Academy</span>
              </h1>
              <p className="mt-6 text-lg text-dark-300">
                Vous organisez des parties régulières entre amis ? On vous aide à structurer votre
                groupe et à simplifier les comptes. Remplissez le formulaire ci-dessous et nous
                reviendrons vers vous rapidement.
              </p>

              {/* Contact info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-dark-300">
                  <Mail className="h-5 w-5 text-primary-400" aria-hidden="true" />
                  <a
                    href="mailto:contact@fishacademy.fr"
                    className="hover:text-primary-400 transition-colors"
                  >
                    contact@fishacademy.fr
                  </a>
                </div>
                <div className="flex items-center gap-3 text-dark-300">
                  <MessageSquare className="h-5 w-5 text-primary-400" aria-hidden="true" />
                  <span>Réponse sous 48h ouvrées</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl shadow-black/30">
                <Image
                  src="/images/planning.png"
                  alt="Organisation d'une communauté de poker"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary-600/20 opacity-60 blur-2xl" />
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-accent-600/20 opacity-60 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6 shadow-lg shadow-black/20 md:p-8">
              <h2 className="text-2xl font-bold text-dark-100">Formulaire de contact</h2>
              <p className="mt-2 text-dark-400">
                Tous les champs marqués d&apos;un <span className="text-red-400">*</span> sont
                obligatoires.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Mini */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-dark-100">Vous avez des questions ?</h2>
            <p className="mt-4 text-dark-400">
              Consultez notre page solution pour en savoir plus sur le fonctionnement de Fish
              Academy, ou parcourez notre FAQ.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="/solution" className="btn-primary">
                Voir la solution
              </a>
              <a href="/solution#faq" className="btn-secondary">
                Lire la FAQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
