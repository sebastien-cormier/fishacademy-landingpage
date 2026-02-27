import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-dark-900 to-dark-950">
      <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-dark-50 sm:text-5xl lg:text-6xl">
              Organisez vos parties de poker entre amis,{' '}
              <span className="gradient-text">sans prise de tête.</span>
            </h1>
            <p className="mt-6 text-lg text-dark-300 md:text-xl">
              Fish Academy simplifie la logistique, les achats, les caves, les comptes et le suivi
              de saison — pour que vous profitiez du jeu.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/solution" className="btn-primary group">
                Découvrir la solution
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link href="/communaute" className="btn-secondary">
                <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                Espace communautaire
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
              <Image
                src="/images/hero-friends-game.png"
                alt="Partie de poker entre amis dans une ambiance conviviale"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary-600/20 opacity-60 blur-2xl" />
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-accent-600/20 opacity-60 blur-2xl" />
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-primary-900/30 opacity-50 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-accent-900/30 opacity-50 blur-3xl" />
      </div>
    </section>
  )
}
