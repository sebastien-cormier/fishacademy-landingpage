import Link from 'next/link'
import { ArrowRight, Users, ExternalLink } from 'lucide-react'

interface CtaLink {
  label: string
  href: string
  external?: boolean
}

interface CtaSectionProps {
  title?: string
  description?: string
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
}

export default function CtaSection({
  title = 'Prêt à organiser vos prochaines parties ?',
  description = 'Rejoignez Fish Academy et simplifiez la gestion de vos soirées poker entre amis.',
  primaryCta = { label: 'Demander ma communauté', href: '/contact' },
  secondaryCta = { label: 'Découvrir la solution', href: '/solution' },
}: CtaSectionProps) {
  const PrimaryButton = primaryCta.external ? (
    <a
      href={primaryCta.href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn group bg-white text-primary-900 hover:bg-primary-50"
    >
      {primaryCta.label}
      <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
    </a>
  ) : (
    <Link
      href={primaryCta.href}
      className="btn group bg-white text-primary-900 hover:bg-primary-50"
    >
      <Users className="mr-2 h-4 w-4" aria-hidden="true" />
      {primaryCta.label}
      <ArrowRight
        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )

  const SecondaryButton = secondaryCta.external ? (
    <a
      href={secondaryCta.href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn border-2 border-white/30 text-white hover:bg-white/10"
    >
      {secondaryCta.label}
      <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
    </a>
  ) : (
    <Link
      href={secondaryCta.href}
      className="btn border-2 border-white/30 text-white hover:bg-white/10"
    >
      {secondaryCta.label}
    </Link>
  )

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-950">
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-primary-200">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            {PrimaryButton}
            {SecondaryButton}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>
    </section>
  )
}
