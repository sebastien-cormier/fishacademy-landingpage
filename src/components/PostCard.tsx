import Image from 'next/image'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import type { GhostPost } from '@/types/ghost'
import { formatPostDate, formatReadingTime } from '@/lib/ghost'

interface PostCardProps {
  post: GhostPost
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-xl">
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
        aria-label={`Lire l'article : ${post.title}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
          {post.feature_image ? (
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-900/50 to-accent-900/50">
              <span className="text-4xl">🃏</span>
            </div>
          )}
          {/* Featured badge */}
          {featured && (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded-full bg-primary-500 px-2.5 py-0.5 text-xs font-medium text-white">
                À la une
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-dark-400">
            {post.primary_tag && (
              <span className="inline-flex items-center gap-1">
                <Tag className="h-3 w-3" aria-hidden="true" />
                {post.primary_tag.name}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
            </span>
            {post.reading_time && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {formatReadingTime(post.reading_time)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-3 flex-1 text-lg font-semibold text-dark-100 transition-colors group-hover:text-primary-400">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm text-dark-400">{post.excerpt}</p>
          )}

          {/* Read more */}
          <div className="mt-4">
            <span className="inline-flex items-center text-sm font-medium text-primary-400 transition-colors group-hover:text-primary-300">
              Lire la suite
              <ArrowRight
                className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </a>
    </article>
  )
}
