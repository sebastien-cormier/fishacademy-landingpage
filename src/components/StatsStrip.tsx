import { Clock, Eye, Users, Wallet } from 'lucide-react'

const stats = [
  {
    icon: Clock,
    title: 'Moins de friction',
    description: 'Plus de temps pour jouer',
  },
  {
    icon: Eye,
    title: 'Transparence totale',
    description: 'Comptes clairs pour tous',
  },
  {
    icon: Users,
    title: 'Vie de groupe',
    description: 'Saisons, stats, classement',
  },
  {
    icon: Wallet,
    title: 'Achats mutualisés',
    description: 'Produits à prix d\'ami',
  },
]

export default function StatsStrip() {
  return (
    <section className="border-y border-dark-800 bg-dark-900 py-12">
      <div className="container-custom">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-900/50 text-primary-400">
                <stat.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-100">{stat.title}</h3>
                <p className="mt-1 text-sm text-dark-400">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
