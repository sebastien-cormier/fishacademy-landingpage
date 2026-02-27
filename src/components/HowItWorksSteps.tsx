import { Users, Calendar, PenLine, CheckCircle, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: Users,
    title: 'Crée ton groupe',
    description: 'Rassemble tes joueurs habituels et crée ta communauté privée.',
  },
  {
    icon: Calendar,
    title: 'Propose une session',
    description: 'Définis la date, le lieu et le format. Les joueurs s\'inscrivent en ligne.',
  },
  {
    icon: PenLine,
    title: 'Note caves & achats',
    description: 'Chaque joueur note ses caves/recaves. Le responsable ajoute les achats du groupe.',
  },
  {
    icon: CheckCircle,
    title: 'Validation trésorier',
    description: 'Le trésorier valide les comptes. Retours banque en cash game, classement en tournoi.',
  },
  {
    icon: TrendingUp,
    title: 'Suivi saison',
    description: 'Historique, statistiques, classement et régularisation finale de saison.',
  },
]

export default function HowItWorksSteps() {
  return (
    <section className="section-padding bg-dark-900">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="section-title">Comment ça marche ?</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            En 5 étapes simples, passez de l&apos;organisation chaotique à une gestion fluide de vos
            parties.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Connection line - desktop */}
            <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-primary-800 via-primary-600 to-primary-800 lg:block" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((step, index) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  {/* Step number badge */}
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-dark-800 shadow-lg shadow-black/30 ring-1 ring-dark-700">
                      <step.icon className="h-10 w-10 text-primary-400" aria-hidden="true" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-dark-100">{step.title}</h3>
                  <p className="mt-2 text-sm text-dark-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
