import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Globe, Twitter } from 'lucide-react'
import { getAllAuthorSlugs, getAuthor, getPostsByAuthor } from '@/lib/ghost'
import PostCard from '@/components/PostCard'

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs()
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return { title: 'Auteur introuvable' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fishacademy.fr'

  return {
    title: author.meta_title || `Articles de ${author.name}`,
    description: author.meta_description || author.bio || `Tous les articles de ${author.name}`,
    openGraph: {
      title: author.meta_title || `Articles de ${author.name}`,
      description: author.meta_description || author.bio || `Tous les articles de ${author.name}`,
      url: `${siteUrl}/blog/author/${author.slug}`,
      images: author.profile_image ? [{ url: author.profile_image }] : undefined,
    },
  }
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1

  const [author, { posts, pagination }] = await Promise.all([
    getAuthor(slug),
    getPostsByAuthor(slug, { page, limit: 12 }),
  ])

  if (!author) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-16 md:py-20">
        <div className="container-custom">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-dark-400 hover:text-dark-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour au blog
          </Link>

          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6">
            {/* Avatar */}
            {author.profile_image ? (
              <Image
                src={author.profile_image}
                alt={author.name}
                width={96}
                height={96}
                className="rounded-full ring-2 ring-dark-700 flex-shrink-0"
              />
            ) : (
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-dark-700 text-3xl">
                👤
              </div>
            )}

            {/* Info */}
            <div>
              <h1 className="text-3xl font-bold text-dark-50 md:text-4xl">{author.name}</h1>
              {author.bio && (
                <p className="mt-3 max-w-2xl text-dark-300">{author.bio}</p>
              )}
              {pagination && (
                <p className="mt-2 text-sm text-dark-400">
                  {pagination.total} article{pagination.total !== 1 ? 's' : ''}
                </p>
              )}

              {/* Social links */}
              <div className="mt-4 flex gap-3">
                {author.website && (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-dark-400 hover:text-dark-100 transition-colors"
                  >
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    Site web
                  </a>
                )}
                {author.twitter && (
                  <a
                    href={`https://twitter.com/${author.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-dark-400 hover:text-dark-100 transition-colors"
                  >
                    <Twitter className="h-4 w-4" aria-hidden="true" />
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
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
              <p className="text-dark-400">Aucun article de cet auteur.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              {pagination.prev && (
                <Link
                  href={`/blog/author/${slug}?page=${pagination.prev}`}
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
                  href={`/blog/author/${slug}?page=${pagination.next}`}
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
