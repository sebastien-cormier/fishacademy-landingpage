import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { GhostPost } from '@/types/ghost'
import { formatPostDate, formatReadingTime } from '@/lib/ghost'
import TagBadge from '@/components/TagBadge'

interface FeaturePostCardProps {
  post: GhostPost
}

export default function FeaturePostCard({ post }: FeaturePostCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-dark-800 shadow-xl shadow-black/30 ring-1 ring-dark-700">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <Link
          href={`/blog/${post.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block relative aspect-[16/9] lg:aspect-auto overflow-hidden"
        >
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-900/50 to-accent-900/50">
              <span className="text-6xl">🃏</span>
            </div>
          )}
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center rounded-full bg-primary-500 px-3 py-1 text-xs font-medium text-white">
              À la une
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 lg:p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400">
            {post.primary_tag && <TagBadge tag={post.primary_tag} />}
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
            </span>
            {post.reading_time && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {formatReadingTime(post.reading_time)}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`} className="mt-4 block">
            <h3 className="text-2xl font-bold text-dark-50 transition-colors group-hover:text-primary-400 lg:text-3xl">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-4 line-clamp-3 text-dark-300">{post.excerpt}</p>
          )}

          {/* Read more */}
          <div className="mt-6">
            <Link
              href={`/blog/${post.slug}`}
              aria-label={`Lire l'article : ${post.title}`}
              className="inline-flex items-center font-medium text-primary-400 transition-colors hover:text-primary-300"
            >
              Lire l&apos;article
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
