import type { Metadata } from 'next'
import { getFeaturedPosts, getLatestPosts } from '@/lib/ghost'
import PostCard from '@/components/PostCard'
import CtaSection from '@/components/CtaSection'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Retrouvez tous nos articles, conseils et actualités sur le poker entre amis. Stratégies, organisation de parties, et bien plus encore.',
  openGraph: {
    title: 'Blog | Fish Academy',
    description:
      'Retrouvez tous nos articles, conseils et actualités sur le poker entre amis.',
  },
}

export const revalidate = 300 // ISR: revalidate every 5 minutes

async function getBlogPageData() {
  const [featuredPosts, latestPosts] = await Promise.all([
    getFeaturedPosts(3),
    getLatestPosts(10),
  ])

  return { featuredPosts, latestPosts }
}

export default async function BlogPage() {
  const { featuredPosts, latestPosts } = await getBlogPageData()
  const hasFeatured = featuredPosts.length > 0
  const hasLatest = latestPosts.length > 0
  const hasContent = hasFeatured || hasLatest

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: latestPosts.slice(0, 10).map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `/blog/${post.slug}`,
              name: post.title,
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="section-title">Blog Fish Academy</h1>
          <p className="section-subtitle mx-auto max-w-2xl">
            Conseils, stratégies et actualités pour vos parties de poker entre amis.
          </p>
        </div>
      </section>

      {hasContent ? (
        <>
          {/* Featured Posts */}
          {hasFeatured && (
            <section className="section-padding bg-dark-950">
              <div className="container-custom">
                <h2 className="text-2xl font-bold text-dark-50">À la une</h2>
                <p className="mt-2 text-dark-400">Nos articles mis en avant</p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredPosts.map((post) => (
                    <PostCard key={post.id} post={post} featured />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Latest Posts */}
          {hasLatest && (
            <section className="section-padding bg-dark-900">
              <div className="container-custom">
                <h2 className="text-2xl font-bold text-dark-50">Derniers articles</h2>
                <p className="mt-2 text-dark-400">Les publications les plus récentes</p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {latestPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* Fallback when no content */
        <section className="section-padding bg-dark-950">
          <div className="container-custom text-center">
            <div className="mx-auto max-w-md rounded-2xl bg-dark-800 p-8">
              <p className="text-6xl">📝</p>
              <h2 className="mt-4 text-xl font-semibold text-dark-100">
                Aucun article disponible
              </h2>
              <p className="mt-2 text-dark-400">
                Les articles arrivent bientôt. En attendant, découvrez notre solution !
              </p>
              <a href="/solution" className="btn-primary mt-6 inline-flex">
                Découvrir Fish Academy
              </a>
            </div>
          </div>
        </section>
      )}

      <CtaSection
        title="Une question sur le poker ?"
        description="Contactez-nous pour en savoir plus sur Fish Academy et ses fonctionnalités."
        primaryCta={{ label: 'Nous contacter', href: '/contact' }}
        secondaryCta={{ label: 'Voir la solution', href: '/solution' }}
      />
    </>
  )
}
