import Link from 'next/link'
import { Tag } from 'lucide-react'
import type { GhostTag } from '@/types/ghost'

interface TagBadgeProps {
  tag: GhostTag
  showIcon?: boolean
}

export default function TagBadge({ tag, showIcon = true }: TagBadgeProps) {
  return (
    <Link
      href={`/blog/tag/${tag.slug}`}
      className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors"
    >
      {showIcon && <Tag className="h-3 w-3" aria-hidden="true" />}
      {tag.name}
    </Link>
  )
}
