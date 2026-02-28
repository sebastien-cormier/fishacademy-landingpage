import { getFeaturedPosts, getLatestPosts } from '@/lib/ghost'
import Hero from '@/components/Hero'
import StatsStrip from '@/components/StatsStrip'
import HowItWorksSteps from '@/components/HowItWorksSteps'
import SolutionPreview from '@/components/SolutionPreview'
import BlogSection from '@/components/BlogSection'
import CtaSection from '@/components/CtaSection'

export const revalidate = 300 // ISR: revalidate every 5 minutes

async function getHomePageData() {
  const [featuredPosts, latestPosts] = await Promise.all([
    getFeaturedPosts(1),
    getLatestPosts(4),
  ])

  const featuredPost = featuredPosts[0] || null
  // Filter out the featured post from latest posts to avoid duplicates
  const filteredLatestPosts = latestPosts
    .filter((post) => post.id !== featuredPost?.id)
    .slice(0, 3)

  return { featuredPost, latestPosts: filteredLatestPosts }
}

export default async function HomePage() {
  const { featuredPost, latestPosts } = await getHomePageData()

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Fish Academy',
            url: 'https://fishacademy.fr',
            logo: 'https://fishacademy.fr/images/logo-fishacademy.png',
            description:
              'Application de gestion de parties de poker privées entre amis. Cash game et tournois.',
            sameAs: [],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@fishacademy.fr',
              contactType: 'customer service',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Fish Academy',
            url: 'https://fishacademy.fr',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://fishacademy.fr/blog?s={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      <Hero />
      <StatsStrip />
      <SolutionPreview />
      <HowItWorksSteps />
      <BlogSection featuredPost={featuredPost} latestPosts={latestPosts} />
      <CtaSection />
    </>
  )
}
