import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles de Fish Academy.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ConfidentialitePage() {
  return (
    <section className="section-padding bg-dark-950">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-dark-50">Politique de confidentialité</h1>
          <p className="mt-4 text-dark-400">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <div className="prose prose-invert prose-dark mt-8 max-w-none">
            <h2 className="text-dark-100">Introduction</h2>
            <p className="text-dark-300">
              Fish Academy s&apos;engage à protéger la vie privée des utilisateurs de son site. Cette
              politique de confidentialité explique comment nous collectons, utilisons et protégeons
              vos données personnelles.
            </p>

            <h2 className="text-dark-100">Données collectées</h2>
            <p className="text-dark-300">Nous collectons les données suivantes via notre formulaire de contact :</p>
            <ul className="text-dark-300">
              <li>Prénom</li>
              <li>Adresse email</li>
              <li>Nom du groupe ou club (optionnel)</li>
              <li>Ville (optionnel)</li>
              <li>Nombre de joueurs</li>
              <li>Type de jeu pratiqué</li>
              <li>Fréquence des parties</li>
              <li>Message</li>
            </ul>

            <h2 className="text-dark-100">Utilisation des données</h2>
            <p className="text-dark-300">Vos données sont utilisées uniquement pour :</p>
            <ul className="text-dark-300">
              <li>Répondre à vos demandes de contact</li>
              <li>Vous informer sur la création de votre communauté Fish Academy</li>
              <li>Améliorer nos services</li>
            </ul>

            <h2 className="text-dark-100">Conservation des données</h2>
            <p className="text-dark-300">
              Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre
              dernière interaction avec nos services, sauf obligation légale contraire.
            </p>

            <h2 className="text-dark-100">Partage des données</h2>
            <p className="text-dark-300">
              Nous ne vendons, n&apos;échangeons ni ne louons vos données personnelles à des tiers. Vos
              données peuvent être partagées uniquement avec nos prestataires techniques
              (hébergement, envoi d&apos;emails) dans le strict cadre de leur mission.
            </p>

            <h2 className="text-dark-100">Sécurité</h2>
            <p className="text-dark-300">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données
              contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>

            <h2 className="text-dark-100">Vos droits</h2>
            <p className="text-dark-300">
              Conformément au RGPD, vous disposez des droits suivants concernant vos données
              personnelles :
            </p>
            <ul className="text-dark-300">
              <li>Droit d&apos;accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition</li>
            </ul>
            <p className="text-dark-300">
              Pour exercer ces droits, contactez-nous à : contact@fishacademy.fr
            </p>

            <h2 className="text-dark-100">Cookies</h2>
            <p className="text-dark-300">
              Ce site n&apos;utilise pas de cookies de tracking ou de publicité. Seuls des cookies
              techniques essentiels au fonctionnement du site peuvent être utilisés.
            </p>

            <h2 className="text-dark-100">Modifications</h2>
            <p className="text-dark-300">
              Cette politique de confidentialité peut être mise à jour périodiquement. Nous vous
              encourageons à la consulter régulièrement.
            </p>

            <h2 className="text-dark-100">Contact</h2>
            <p className="text-dark-300">
              Pour toute question concernant cette politique ou vos données personnelles,
              contactez-nous à : contact@fishacademy.fr
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
