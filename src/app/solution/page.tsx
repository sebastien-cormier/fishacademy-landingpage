import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CalendarDays,
  Users,
  Coins,
  Trophy,
  ShoppingBag,
  Receipt,
  BarChart3,
  CheckCircle,
  Banknote,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Wallet,
  BookOpen,
} from 'lucide-react'
import FaqAccordion from '@/components/FaqAccordion'
import CtaSection from '@/components/CtaSection'

export const metadata: Metadata = {
  title: 'Solution - Application de gestion de poker',
  description:
    'Découvrez Fish Academy : l\'application complète pour gérer vos parties de poker privées. Zéro cash, comptabilité transparente, marketplace et statistiques.',
  openGraph: {
    title: 'Solution | Fish Academy',
    description:
      'L\'application complète pour gérer vos parties de poker privées entre amis. Fini la gestion du cash !',
  },
}

const keyBenefits = [
  {
    icon: Banknote,
    title: 'Zéro manipulation de cash',
    description:
      'Plus besoin de gérer des liasses de billets pendant les parties. Tout est comptabilisé numériquement.',
  },
  {
    icon: RefreshCw,
    title: 'Régularisation simplifiée',
    description:
      'Équilibrez vos comptes en faisant les courses du groupe ou en proposant des produits via la marketplace.',
  },
  {
    icon: ShieldCheck,
    title: 'Comptabilité transparente',
    description:
      'Un ledger immuable trace chaque transaction. Le trésorier valide les opérations.',
  },
  {
    icon: Wallet,
    title: 'Échanges réels possibles',
    description:
      'Déclarez vos dépôts et retraits en argent réel auprès du trésorier quand nécessaire.',
  },
]

const features = [
  {
    id: 'dashboard',
    icon: BarChart3,
    title: 'Tableau de bord',
    description:
      'Vue d\'ensemble de votre communauté : prochaines sessions, votre solde, statistiques rapides et dernières actualités du groupe.',
    image: '/images/app/fishacademy_dashboard.png',
    benefits: [
      'Sessions à venir en un coup d\'œil',
      'Solde personnel en temps réel',
      'Statistiques de la saison',
      'Fil d\'actualité communautaire',
    ],
  },
  {
    id: 'sessions',
    icon: CalendarDays,
    title: 'Gestion des sessions',
    description:
      'Créez et gérez vos parties de poker facilement. Cash game ou tournoi, définissez les paramètres et laissez les joueurs s\'inscrire.',
    image: '/images/app/fishacademy_sessions.png',
    benefits: [
      'Création rapide de session',
      'Inscription en ligne des joueurs',
      'Paramètres personnalisables',
      'Notifications automatiques',
    ],
  },
  {
    id: 'session-live',
    icon: Coins,
    title: 'Session en cours',
    description:
      'Pendant la partie, enregistrez les caves, recaves et cashouts de chaque joueur. Le chip count permet de suivre l\'évolution des stacks en temps réel.',
    image: '/images/app/fishacademy_session_encours.png',
    benefits: [
      'Saisie des caves et recaves',
      'Cashout en temps réel',
      'Chip count live',
      'Classement instantané',
    ],
  },
  {
    id: 'session-result',
    icon: Trophy,
    title: 'Résultats de session',
    description:
      'En fin de partie, visualisez les résultats complets : gains, pertes et classement. Tout est automatiquement enregistré dans le ledger.',
    image: '/images/app/fishacademy_session_terminee.png',
    benefits: [
      'Récapitulatif des gains/pertes',
      'Historique des mouvements',
      'Intégration automatique au ledger',
      'Statistiques de session',
    ],
  },
  {
    id: 'ledger',
    icon: Receipt,
    title: 'Ledger (Comptabilité)',
    description:
      'Le registre comptable trace toutes les transactions : caves, cashouts, achats marketplace, dépôts et retraits. La balance est toujours équilibrée.',
    image: '/images/app/fishacademy_ledger.png',
    benefits: [
      'Traçabilité complète',
      'Principe de partie double',
      'Transactions immuables',
      'Balance équilibrée garantie',
    ],
  },
  {
    id: 'finances',
    icon: Wallet,
    title: 'Gestion financière',
    description:
      'Suivez les soldes de tous les membres. Déclarez vos dépôts (PayPal, virement, liquide) et le trésorier gère les retraits.',
    image: '/images/app/fishacademy_finances.png',
    benefits: [
      'Vue des soldes globaux',
      'Déclaration de dépôts',
      'Multiples moyens de paiement',
      'Gestion des retraits',
    ],
  },
  {
    id: 'marketplace',
    icon: ShoppingBag,
    title: 'Marketplace',
    description:
      'Vendez et achetez des produits entre membres. Œufs, légumes, spécialités locales... Les achats s\'ajoutent à votre solde et permettent de régulariser vos comptes.',
    image: '/images/app/fishacademy_achats_marketplace.png',
    benefits: [
      'Vente entre membres',
      'Prix à l\'unité ou au kg',
      'Livraison à la prochaine session',
      'Régularisation des soldes',
    ],
  },
  {
    id: 'products',
    icon: BookOpen,
    title: 'Mes produits',
    description:
      'Gérez facilement vos produits en vente. Définissez les prix, stocks et quantités minimales. Suivez vos ventes reçues.',
    image: '/images/app/fishacademy_mes_produits.png',
    benefits: [
      'Création de fiches produits',
      'Gestion des stocks',
      'Suivi des commandes',
      'Historique des ventes',
    ],
  },
  {
    id: 'saisons',
    icon: Trophy,
    title: 'Saisons & Classement',
    description:
      'Organisez votre activité en saisons. Chaque saison a son classement, ses statistiques. À la clôture, les scores sont figés.',
    image: '/images/app/fishacademy_saisons.png',
    benefits: [
      'Classement par saison',
      'Statistiques détaillées',
      'Historique des saisons',
      'Progression sur le long terme',
    ],
  },
  {
    id: 'membres',
    icon: Users,
    title: 'Gestion des membres',
    description:
      'Invitez de nouveaux joueurs, gérez les rôles (membre, admin, trésorier) et suivez les soldes de chacun.',
    image: '/images/app/fishacademy_membres.png',
    benefits: [
      'Invitation par email',
      'Gestion des rôles',
      'Suivi des soldes',
      'Annuaire de la communauté',
    ],
  },
]

const faqItems = [
  {
    question: 'Comment fonctionne le système sans cash ?',
    answer:
      'Pendant les parties, aucun argent ne circule. Les caves et cashouts sont enregistrés numériquement. Les soldes s\'accumulent et se régularisent via les courses du groupe, la marketplace, ou exceptionnellement par dépôt/retrait auprès du trésorier.',
  },
  {
    question: 'Comment régulariser mon solde négatif ?',
    answer:
      'Plusieurs options : faire les courses pour la prochaine session, proposer des produits à la vente sur la marketplace, ou déclarer un dépôt (PayPal, virement, liquide) auprès du trésorier.',
  },
  {
    question: 'Qui est le trésorier et quel est son rôle ?',
    answer:
      'Le trésorier est un membre de confiance désigné par le groupe. Il valide les comptes, gère les dépôts/retraits, configure les moyens de paiement et peut effectuer des ajustements si nécessaire.',
  },
  {
    question: 'La marketplace est-elle obligatoire ?',
    answer:
      'Non, c\'est une fonctionnalité optionnelle. Elle permet de faciliter les échanges et d\'équilibrer les soldes de façon conviviale, mais vous pouvez l\'ignorer si votre groupe n\'en a pas l\'usage.',
  },
  {
    question: 'Peut-on quand même échanger de l\'argent réel ?',
    answer:
      'Oui, le système permet de déclarer des dépôts et retraits en argent réel. Le membre déclare son paiement (PayPal, virement, liquide) et le trésorier confirme la réception.',
  },
  {
    question: 'Comment sont sécurisées les données financières ?',
    answer:
      'Le ledger fonctionne sur le principe de la comptabilité en partie double : aucune transaction n\'est modifiable, chaque opération est tracée et horodatée. La somme des soldes est toujours égale à zéro.',
  },
  {
    question: 'Combien de joueurs peuvent rejoindre une communauté ?',
    answer:
      'Il n\'y a pas de limite. Nos communautés vont généralement de 5 à 50 joueurs. L\'application s\'adapte à la taille de votre groupe.',
  },
  {
    question: 'L\'application est-elle gratuite ?',
    answer:
      'Le modèle économique est en cours de définition. Pour l\'instant, le service est gratuit pour les communautés en phase de lancement.',
  },
]

export default function SolutionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-dark-50 sm:text-5xl lg:text-6xl">
              Gérez vos parties de poker{' '}
              <span className="gradient-text">sans manipuler de cash</span>
            </h1>
            <p className="mt-6 text-lg text-dark-300 md:text-xl">
              Fish Academy révolutionne la gestion de vos parties privées. Fini les liasses de
              billets, les comptes approximatifs et les transferts compliqués. Tout est
              comptabilisé, transparent et régularisable via les courses du groupe ou la
              marketplace.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://app.fishacademy.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Accéder à l&apos;application
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href="/contact" className="btn-secondary">
                Créer ma communauté
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-title">Le principe Fish Academy</h2>
            <p className="section-subtitle">
              Une nouvelle façon de gérer la comptabilité de vos parties de poker entre amis.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {keyBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-dark-700 bg-dark-800 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-900/50 text-primary-400">
                  <benefit.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-dark-100">{benefit.title}</h3>
                <p className="mt-2 text-sm text-dark-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Visual */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="section-title">Comment ça marche ?</h2>
              <p className="section-subtitle">
                Un système simple et efficace pour éviter la manipulation d&apos;argent liquide.
              </p>
            </div>
            <div className="mt-12 space-y-8">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-100">Pendant la partie</h3>
                  <p className="mt-1 text-dark-400">
                    Les caves, recaves et cashouts sont enregistrés numériquement. Pas de cash sur
                    la table, juste des jetons. Votre solde évolue en fonction de vos résultats.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-100">Solde positif ou négatif</h3>
                  <p className="mt-1 text-dark-400">
                    Votre solde reflète votre situation : positif = la communauté vous doit de
                    l&apos;argent, négatif = vous devez à la communauté. Pas de pression pour régler
                    immédiatement.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-100">Régularisation naturelle</h3>
                  <p className="mt-1 text-dark-400">
                    <strong className="text-dark-200">Option 1 :</strong> Faites les courses pour
                    la prochaine session (bières, chips, pizzas...). Le montant est déduit de votre
                    dette.
                    <br />
                    <strong className="text-dark-200">Option 2 :</strong> Vendez vos produits sur
                    la marketplace (œufs, légumes, spécialités...). Vos ventes créditent votre
                    solde.
                  </p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-100">
                    Échange d&apos;argent si nécessaire
                  </h3>
                  <p className="mt-1 text-dark-400">
                    Besoin de régler en argent réel ? Déclarez un dépôt (PayPal, virement, liquide)
                    auprès du trésorier. Il confirme la réception et votre solde est mis à jour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features with Screenshots */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-title">Découvrez l&apos;application</h2>
            <p className="section-subtitle">
              Une interface intuitive pour gérer tous les aspects de votre communauté.
            </p>
          </div>
          <div className="mt-16 space-y-24">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-900/50 text-primary-400">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-50">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-lg text-dark-300">{feature.description}</p>
                  <ul className="mt-6 space-y-3">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3">
                        <CheckCircle
                          className="h-5 w-5 flex-shrink-0 text-green-400"
                          aria-hidden="true"
                        />
                        <span className="text-dark-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Screenshot */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative overflow-hidden rounded-2xl border border-dark-700 shadow-2xl shadow-black/40">
                    <Image
                      src={feature.image}
                      alt={`Capture d'écran - ${feature.title}`}
                      width={800}
                      height={600}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-title">Les trois rôles</h2>
            <p className="section-subtitle">
              Une organisation claire pour une gestion efficace de votre communauté.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-dark-700 bg-dark-800 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-dark-700 text-dark-300">
                <Users className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-dark-100">Membre</h3>
              <p className="mt-2 text-dark-400">
                Participe aux sessions, consulte ses stats, utilise la marketplace et gère sa
                comptabilité personnelle.
              </p>
            </div>
            <div className="rounded-2xl border border-primary-800/50 bg-gradient-to-br from-primary-900/20 to-dark-800 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-900/50 text-primary-400">
                <CalendarDays className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-dark-100">Admin</h3>
              <p className="mt-2 text-dark-400">
                Gère les membres, les invitations, crée et administre les sessions, gère les
                saisons.
              </p>
            </div>
            <div className="rounded-2xl border border-accent-800/50 bg-gradient-to-br from-accent-900/20 to-dark-800 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-900/50 text-accent-400">
                <Receipt className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-dark-100">Trésorier</h3>
              <p className="mt-2 text-dark-400">
                Gère la comptabilité globale, valide les dépôts/retraits, effectue les ajustements
                et configure les paiements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="section-title">Questions fréquentes</h2>
              <p className="section-subtitle">Tout ce que vous devez savoir sur Fish Academy.</p>
            </div>
            <div className="mt-12">
              <FaqAccordion items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Prêt à simplifier vos parties ?"
        description="Rejoignez Fish Academy et oubliez la gestion du cash. Concentrez-vous sur le jeu."
        primaryCta={{ label: 'Accéder à l\'application', href: 'https://app.fishacademy.fr', external: true }}
        secondaryCta={{ label: 'Créer ma communauté', href: '/contact' }}
      />
    </>
  )
}
