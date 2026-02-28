import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import { getAllPostSlugs, getPostBySlug, formatPostDate, formatReadingTime } from '@/lib/ghost'
import TagBadge from '@/components/TagBadge'

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Article introuvable' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fishacademy.fr'
  const ogImage = post.og_image || post.feature_image || undefined

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      url: `${siteUrl}/blog/${post.slug}`,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.twitter_image || ogImage ? [post.twitter_image || ogImage!] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const author = post.primary_author || post.authors?.[0]

  return (
    <article>
      {/* Hero */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-12 md:py-16">
        <div className="container-custom max-w-4xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-dark-400 hover:text-dark-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour au blog
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold text-dark-50 md:text-4xl lg:text-5xl">{post.title}</h1>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-dark-400">
            {author && (
              <Link
                href={`/blog/author/${author.slug}`}
                className="inline-flex items-center gap-2 hover:text-dark-100 transition-colors"
              >
                {author.profile_image ? (
                  <Image
                    src={author.profile_image}
                    alt={author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <User className="h-4 w-4" aria-hidden="true" />
                )}
                {author.name}
              </Link>
            )}
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
            </span>
            {post.reading_time && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {formatReadingTime(post.reading_time)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.feature_image && (
        <div className="bg-dark-950">
          <div className="container-custom max-w-4xl">
            <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom max-w-4xl">
          {post.html ? (
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-dark-50
                prose-p:text-dark-300
                prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300
                prose-strong:text-dark-100
                prose-code:text-accent-300 prose-code:bg-dark-800 prose-code:rounded prose-code:px-1 prose-code:py-0.5
                prose-pre:bg-dark-800 prose-pre:border prose-pre:border-dark-700
                prose-blockquote:border-primary-500 prose-blockquote:text-dark-300
                prose-img:rounded-xl
                prose-hr:border-dark-700"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          ) : (
            <p className="text-dark-400">Contenu non disponible.</p>
          )}

          {/* Footer */}
          <div className="mt-12 border-t border-dark-700 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour au blog
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
