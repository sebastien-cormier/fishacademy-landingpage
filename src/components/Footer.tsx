import Link from 'next/link'
import Image from 'next/image'
import { Mail, ExternalLink } from 'lucide-react'

const footerNavigation = {
  navigation: [
    { name: 'Accueil', href: '/' },
    { name: 'Solution', href: '/solution' },
    { name: 'Blog', href: '/blog' },
    { name: 'Partenaires', href: '/partenaires' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
  ],
  external: [
    { name: 'Blog Fish Academy', href: '/blog', external: false },
    { name: 'Espace communautaire', href: '/communaute', external: false },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-dark-800 bg-dark-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Pied de page
      </h2>
      <div className="container-custom py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/images/logo-fishacademy.png"
                alt="Fish Academy"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-dark-50">Fish Academy</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-dark-400">
              Simplifiez vos parties de poker entre amis. Gestion des caves, comptes, classements et
              bien plus encore.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-dark-400">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <a
                href="mailto:contact@fishacademy.fr"
                className="hover:text-primary-400 transition-colors"
              >
                contact@fishacademy.fr
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-dark-100">Navigation</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-dark-400 transition-colors hover:text-primary-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-dark-100">Liens</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.external.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-dark-400 transition-colors hover:text-primary-400"
                    >
                      {item.name}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-dark-400 transition-colors hover:text-primary-400"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-sm font-semibold text-dark-100">Légal</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-dark-400 transition-colors hover:text-primary-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-dark-800 pt-8">
          <p className="text-center text-sm text-dark-500">
            &copy; {currentYear} Fish Academy. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
