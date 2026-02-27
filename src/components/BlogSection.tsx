import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { GhostPost } from '@/types/ghost'
import FeaturePostCard from './FeaturePostCard'
import PostCard from './PostCard'

interface BlogSectionProps {
  featuredPost: GhostPost | null
  latestPosts: GhostPost[]
}

export default function BlogSection({ featuredPost, latestPosts }: BlogSectionProps) {
  const hasContent = featuredPost || latestPosts.length > 0

  if (!hasContent) {
    return null
  }

  return (
    <section className="section-padding bg-dark-950">
      <div className="container-custom">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="section-title">Actualités & conseils</h2>
            <p className="section-subtitle">
              Retrouvez nos derniers articles sur le blog Fish Academy.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-2 font-medium text-primary-400 transition-colors hover:text-primary-300 sm:inline-flex"
          >
            Voir tous les articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mt-12">
            <FeaturePostCard post={featuredPost} />
          </div>
        )}

        {/* Latest Posts Grid */}
        {latestPosts.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="btn-secondary inline-flex items-center gap-2">
            Voir tous les articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
