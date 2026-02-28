import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getAllTagSlugs, getTag, getPostsByTag } from '@/lib/ghost'
import PostCard from '@/components/PostCard'

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs()
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTag(slug)

  if (!tag) {
    return { title: 'Tag introuvable' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fishacademy.fr'

  return {
    title: tag.meta_title || `Articles : ${tag.name}`,
    description: tag.meta_description || tag.description || `Tous les articles sur ${tag.name}`,
    openGraph: {
      title: tag.meta_title || `Articles : ${tag.name}`,
      description: tag.meta_description || tag.description || `Tous les articles sur ${tag.name}`,
      url: `${siteUrl}/blog/tag/${tag.slug}`,
    },
  }
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1

  const [tag, { posts, pagination }] = await Promise.all([
    getTag(slug),
    getPostsByTag(slug, { page, limit: 12 }),
  ])

  if (!tag) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-16 md:py-20">
        <div className="container-custom">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-dark-400 hover:text-dark-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour au blog
          </Link>
          <div className="inline-block rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400 ring-1 ring-primary-500/20 mb-4">
            Tag
          </div>
          <h1 className="section-title">{tag.name}</h1>
          {tag.description && (
            <p className="section-subtitle mx-auto max-w-2xl">{tag.description}</p>
          )}
          {pagination && (
            <p className="mt-4 text-sm text-dark-400">{pagination.total} article{pagination.total !== 1 ? 's' : ''}</p>
          )}
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-400">Aucun article dans ce tag.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              {pagination.prev && (
                <Link
                  href={`/blog/tag/${slug}?page=${pagination.prev}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Articles précédents
                </Link>
              )}
              <span className="text-sm text-dark-400">
                Page {pagination.page} / {pagination.pages}
              </span>
              {pagination.next && (
                <Link
                  href={`/blog/tag/${slug}?page=${pagination.next}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Articles suivants
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
