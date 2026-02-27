'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ExternalLink } from 'lucide-react'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Solution', href: '/solution' },
  { name: 'Blog', href: '/blog' },
  { name: 'Partenaires', href: '/partenaires' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-dark-700/50">
      <nav className="container-custom" aria-label="Navigation principale">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Fish Academy - Accueil">
            <Image
              src="/images/logo-fishacademy-transparent-white.png"
              alt="Fish Academy"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-dark-300 transition-colors hover:bg-dark-800 hover:text-dark-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <a
              href="https://app.fishacademy.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Espace communautaire
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-dark-300 hover:bg-dark-800 hover:text-dark-50 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-dark-700 pb-4 pt-2 md:hidden" id="mobile-menu">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-base font-medium text-dark-300 transition-colors hover:bg-dark-800 hover:text-dark-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 px-4">
                <a
                  href="https://app.fishacademy.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex w-full items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Espace communautaire
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
