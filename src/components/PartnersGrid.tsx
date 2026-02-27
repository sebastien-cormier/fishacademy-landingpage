import Image from 'next/image'
import { Building2, Share2, Shirt } from 'lucide-react'

const partnerCategories = [
  {
    id: 'rooms',
    icon: Building2,
    title: 'Rooms partenaires',
    description:
      'Nos partenaires poker pour vous offrir les meilleures conditions de jeu en ligne.',
    partners: [
      { name: 'Partner 1', logo: '/images/partners.png' },
      { name: 'Partner 2', logo: '/images/partners.png' },
    ],
  },
  {
    id: 'affiliation',
    icon: Share2,
    title: 'Programme d\'affiliation',
    description:
      'Un programme d\'affiliation est en préparation pour soutenir la communauté Fish Academy.',
    partners: [],
    comingSoon: true,
  },
  {
    id: 'boutique',
    icon: Shirt,
    title: 'Boutique & Goodies',
    description: 'Des produits exclusifs et du merchandising Fish Academy pour les membres.',
    partners: [{ name: 'Boutique FA', logo: '/images/partners.png' }],
  },
]

interface PartnersGridProps {
  showAll?: boolean
}

export default function PartnersGrid({ showAll = true }: PartnersGridProps) {
  const categories = showAll ? partnerCategories : partnerCategories.slice(0, 2)

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col rounded-2xl border border-dark-700 bg-dark-800 p-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900/50 text-primary-400">
              <category.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-dark-100">{category.title}</h3>
          </div>
          <p className="mt-4 flex-1 text-sm text-dark-400">{category.description}</p>

          {category.comingSoon ? (
            <div className="mt-6 rounded-lg bg-dark-700 p-4 text-center">
              <span className="text-sm font-medium text-dark-400">Bientôt disponible</span>
            </div>
          ) : category.partners.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {category.partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-center rounded-lg bg-dark-700 p-4"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={40}
                    className="h-8 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
