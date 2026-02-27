import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Shirt, Share2, Building2, Handshake, Heart } from 'lucide-react'
import CtaSection from '@/components/CtaSection'

export const metadata: Metadata = {
  title: 'Partenaires',
  description:
    'Découvrez les partenaires de Fish Academy : boutique officielle CustomFlow, rooms de poker et programmes d\'affiliation.',
  openGraph: {
    title: 'Partenaires | Fish Academy',
    description: 'Les partenaires qui soutiennent la communauté Fish Academy.',
  },
}

const TRACKING_PARAMS = '?utm_source=fishacademy&utm_medium=partner&utm_campaign=landing'

const featuredProducts = [
  {
    id: 'bad-beat',
    name: 'Hoodie "Bad Beat"',
    description: 'Le hoodie du joueur malchanceux. Un âne dépité, des lunettes cassées, des cartes qui tombent...',
    image: 'https://files.cdn.printful.com/files/558/558e2e1c8524b2404e60f47d65e58227_preview.png',
    price: '49.90€',
    url: 'https://customflow.fr/produit/hoodie-donkey-academy-bad-beat',
  },
  {
    id: 'daylight-tilt',
    name: 'Hoodie "Daylight Tilt"',
    description: 'Pour ceux qui jouent jusqu\'au lever du soleil... et qui tiltent en plein jour.',
    image: 'https://files.cdn.printful.com/files/7c7/7c77b81cfc03cb580d484bc11a20deb4_preview.png',
    price: '49.90€',
    url: 'https://customflow.fr/produit/hoodie-donkey-academy-daylight-tilt',
  },
  {
    id: 'heartbreak',
    name: 'Hoodie "Heartbreak"',
    description: 'Anna Kournikova (A-K) vous a encore brisé le cœur ? Ce hoodie est fait pour vous.',
    image: 'https://files.cdn.printful.com/files/22e/22edd74034a460045eb5d6c1cff02c1b_preview.png',
    price: '49.90€',
    url: 'https://customflow.fr/produit/hoodie-anna-kournikova-heartbreak',
  },
]

const upcomingPartners = [
  {
    id: 'rooms',
    icon: Building2,
    title: 'Rooms partenaires',
    description:
      'Nous collaborons avec des rooms de poker en ligne pour vous offrir les meilleures conditions de jeu. Bonus de bienvenue, rakeback et avantages exclusifs pour les membres Fish Academy.',
    note: 'Partenariats en cours de négociation. Restez connectés !',
  },
  {
    id: 'affiliation',
    icon: Share2,
    title: 'Programme d\'affiliation',
    description:
      'Un programme d\'affiliation est en préparation pour permettre à la communauté de bénéficier d\'avantages sur des produits et services liés au poker.',
    note: 'Ce programme sera développé de manière responsable, sans approche commerciale agressive.',
  },
]

export default function PartenairesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-16 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-900/50 text-primary-400">
              <Handshake className="h-8 w-8" aria-hidden="true" />
            </div>
            <h1 className="section-title">Nos partenaires</h1>
            <p className="section-subtitle">
              Des partenariats sélectionnés avec soin pour apporter de la valeur à notre
              communauté, sans approche commerciale agressive.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Partner: CustomFlow */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            {/* Partner Header */}
            <div className="mb-12 rounded-2xl border border-primary-800/50 bg-gradient-to-br from-primary-900/20 to-dark-800 p-8 md:p-10">
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary-900/50 text-primary-400">
                  <Shirt className="h-10 w-10" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-900/50 px-3 py-1 text-xs font-medium text-primary-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-primary-400"></span>
                    Partenaire officiel
                  </div>
                  <h2 className="text-2xl font-bold text-dark-50 md:text-3xl">
                    Boutique CustomFlow x Fish Academy
                  </h2>
                  <p className="mt-3 text-dark-300">
                    Notre collection exclusive de hoodies poker est disponible sur CustomFlow.
                    Des designs uniques pour les vrais passionnés, avec <strong className="text-primary-400">1€ reversé à une association</strong> pour chaque achat.
                  </p>
                </div>
                <a
                  href={`https://customflow.fr/boutique/collection/fishacademy${TRACKING_PARAMS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary shrink-0"
                >
                  Voir la collection
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Featured Products */}
            <h3 className="mb-8 text-center text-xl font-bold text-dark-100">
              Nos coups de cœur
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <a
                  key={product.id}
                  href={`${product.url}${TRACKING_PARAMS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-dark-700 bg-dark-800 transition-all hover:border-primary-700 hover:shadow-lg hover:shadow-primary-900/20"
                >
                  <div className="relative aspect-square overflow-hidden bg-dark-900">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="font-bold text-dark-100 group-hover:text-primary-400 transition-colors">
                      {product.name}
                    </h4>
                    <p className="mt-2 flex-1 text-sm text-dark-400">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-400">{product.price}</span>
                      <span className="flex items-center gap-1 text-xs text-dark-500">
                        <Heart className="h-3 w-3" aria-hidden="true" />
                        1€ reversé
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* CTA to collection */}
            <div className="mt-10 text-center">
              <a
                href={`https://customflow.fr/boutique/collection/fishacademy${TRACKING_PARAMS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex"
              >
                Découvrir toute la collection
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Partners */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-title">Bientôt disponible</h2>
            <p className="section-subtitle">
              D&apos;autres partenariats sont en préparation pour enrichir l&apos;expérience Fish Academy.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
            {upcomingPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col rounded-2xl border border-dark-700 bg-dark-800 p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-dark-700 text-dark-400">
                    <partner.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-100">{partner.title}</h3>
                </div>
                <p className="mt-4 flex-1 text-dark-300">{partner.description}</p>
                {partner.note && (
                  <p className="mt-4 text-sm italic text-dark-400">{partner.note}</p>
                )}
                <div className="mt-6 rounded-xl bg-dark-700 p-4 text-center">
                  <span className="text-sm font-medium text-dark-400">Bientôt disponible</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-title">Notre philosophie</h2>
            <p className="section-subtitle">
              Fish Academy privilégie la qualité à la quantité. Nos partenariats sont choisis pour
              leur pertinence et leur valeur ajoutée pour les membres.
            </p>
            <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
              <div className="rounded-xl bg-dark-800 p-6 shadow-sm shadow-black/20">
                <h3 className="font-semibold text-dark-100">Pas de spam</h3>
                <p className="mt-2 text-sm text-dark-400">
                  Nous ne noierons jamais nos membres sous les offres commerciales.
                </p>
              </div>
              <div className="rounded-xl bg-dark-800 p-6 shadow-sm shadow-black/20">
                <h3 className="font-semibold text-dark-100">Sélection rigoureuse</h3>
                <p className="mt-2 text-sm text-dark-400">
                  Chaque partenaire est évalué sur sa fiabilité et sa valeur.
                </p>
              </div>
              <div className="rounded-xl bg-dark-800 p-6 shadow-sm shadow-black/20">
                <h3 className="font-semibold text-dark-100">Transparence</h3>
                <p className="mt-2 text-sm text-dark-400">
                  Les liens d&apos;affiliation sont clairement identifiés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-primary-900/30 to-accent-900/30 p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold text-dark-100">Devenir partenaire</h2>
            <p className="mt-4 text-dark-300">
              Vous représentez une marque ou un service pertinent pour notre communauté de joueurs
              de poker ? Contactez-nous pour discuter d&apos;un partenariat.
            </p>
            <Link href="/contact" className="btn-primary mt-6 inline-flex">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Rejoignez la communauté"
        description="Créez votre groupe Fish Academy et profitez de tous nos avantages."
        primaryCta={{ label: 'Demander ma communauté', href: '/contact' }}
        secondaryCta={{ label: 'Découvrir la solution', href: '/solution' }}
      />
    </>
  )
}
