import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Fish Academy.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MentionsLegalesPage() {
  return (
    <section className="section-padding bg-dark-950">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-dark-50">Mentions légales</h1>
          <p className="mt-4 text-dark-400">Dernière mise à jour : 27 février 2026</p>

          <div className="prose prose-invert prose-dark mt-8 max-w-none">
            <h2 className="text-dark-100">Éditeur du site</h2>
            <p className="text-dark-300">
              Fish Academy<br />
              Projet personnel non commercial<br />
              Email : contact@fishacademy.fr
            </p>

            <h2 className="text-dark-100">Hébergement</h2>
            <p className="text-dark-300">
              OVHcloud SAS<br />
              2 rue Kellermann, 59100 Roubaix, France<br />
              <a href="https://www.ovhcloud.com" className="text-primary-400 hover:text-primary-300">www.ovhcloud.com</a>
            </p>

            <h2 className="text-dark-100">Propriété intellectuelle</h2>
            <p className="text-dark-300">
              L&apos;ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit
              d&apos;auteur. Toute reproduction, même partielle, est interdite sans autorisation
              préalable.
            </p>

            <h2 className="text-dark-100">Responsabilité</h2>
            <p className="text-dark-300">
              Fish Academy s&apos;efforce de fournir des informations exactes et à jour sur ce site.
              Cependant, nous ne pouvons garantir l&apos;exactitude, la complétude ou la pertinence des
              informations diffusées.
            </p>

            <h2 className="text-dark-100">Liens externes</h2>
            <p className="text-dark-300">
              Ce site peut contenir des liens vers des sites externes. Fish Academy n&apos;est pas
              responsable du contenu de ces sites tiers.
            </p>

            <h2 className="text-dark-100">Contact</h2>
            <p className="text-dark-300">
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter à
              l&apos;adresse : contact@fishacademy.fr
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
