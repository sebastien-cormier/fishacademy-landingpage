import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Coins, Trophy, ShoppingBag, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Coins,
    title: 'Cash Game',
    description: 'Gestion des caves, recaves et retours banque en toute simplicité.',
    image: '/images/cash-game.png',
  },
  {
    icon: Trophy,
    title: 'Tournois',
    description: 'Classement final automatique et répartition du prizepool.',
    image: '/images/poker-tournament.png',
  },
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    description: 'Vente de produits entre membres et commandes groupées.',
    image: '/images/marketplace.png',
  },
  {
    icon: BarChart3,
    title: 'Stats & Classement',
    description: 'Historique des sessions et statistiques individuelles.',
    image: '/images/how-it-works.png',
  },
]

export default function SolutionPreview() {
  return (
    <section className="section-padding bg-dark-950">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="section-title">Une solution complète</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            Cash game ou tournoi, Fish Academy s&apos;adapte à votre format de jeu préféré.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl bg-dark-800/50 p-6 transition-all duration-300 hover:bg-dark-800"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-900/50 text-primary-400">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-dark-100">{feature.title}</h3>
                  <p className="mt-2 text-dark-400">{feature.description}</p>
                </div>
              </div>
              <div className="mt-6 overflow-hidden rounded-xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/solution" className="btn-primary group inline-flex items-center">
            Découvrir toutes les fonctionnalités
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
