import type { GhostPost, GhostPostsResponse, GhostSettings, GhostTag, GhostAuthor, GhostPagination } from '@/types/ghost'

const GHOST_URL = process.env.GHOST_CONTENT_API_URL || 'https://blog.fishacademy.fr'
const GHOST_KEY = process.env.GHOST_CONTENT_API_KEY || ''

interface FetchOptions {
  limit?: number | string
  page?: number
  filter?: string
  include?: string
  fields?: string
  order?: string
  formats?: string
}

async function ghostFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
  revalidate: number = 300
): Promise<T> {
  const params = new URLSearchParams({
    key: GHOST_KEY,
    ...(options.limit && { limit: String(options.limit) }),
    ...(options.page && { page: String(options.page) }),
    ...(options.filter && { filter: options.filter }),
    ...(options.include && { include: options.include }),
    ...(options.fields && { fields: options.fields }),
    ...(options.order && { order: options.order }),
    ...(options.formats && { formats: options.formats }),
  })

  const url = `${GHOST_URL}/ghost/api/content/${endpoint}?${params.toString()}`

  try {
    const response = await fetch(url, {
      next: { revalidate },
    })

    if (!response.ok) {
      throw new Error(`Ghost API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Ghost fetch error:', error)
    throw error
  }
}

/**
 * Get featured posts (posts with featured flag)
 */
export async function getFeaturedPosts(limit: number = 3): Promise<GhostPost[]> {
  try {
    const data = await ghostFetch<GhostPostsResponse>('posts/', {
      limit,
      filter: 'featured:true',
      include: 'tags,authors',
      fields:
        'id,uuid,title,slug,excerpt,feature_image,featured,published_at,url,reading_time,primary_tag',
      order: 'published_at desc',
    })
    return data.posts || []
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

/**
 * Get latest published posts
 */
export async function getLatestPosts(limit: number = 10): Promise<GhostPost[]> {
  try {
    const data = await ghostFetch<GhostPostsResponse>('posts/', {
      limit,
      include: 'tags,authors',
      fields:
        'id,uuid,title,slug,excerpt,feature_image,featured,published_at,url,reading_time,primary_tag',
      order: 'published_at desc',
    })
    return data.posts || []
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return []
  }
}

/**
 * Get posts with custom options
 */
export async function getPosts(options: {
  limit?: number
  page?: number
  filter?: string
}): Promise<{ posts: GhostPost[]; pagination: GhostPostsResponse['meta']['pagination'] | null }> {
  try {
    const data = await ghostFetch<GhostPostsResponse>('posts/', {
      limit: options.limit || 10,
      page: options.page || 1,
      filter: options.filter,
      include: 'tags,authors',
      fields:
        'id,uuid,title,slug,excerpt,feature_image,featured,published_at,url,reading_time,primary_tag',
      order: 'published_at desc',
    })
    return {
      posts: data.posts || [],
      pagination: data.meta?.pagination || null,
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return { posts: [], pagination: null }
  }
}

/**
 * Get a single post by slug (with full HTML content)
 */
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const data = await ghostFetch<{ posts: GhostPost[] }>('posts/slug/' + slug + '/', {
      include: 'tags,authors',
      formats: 'html',
    })
    return data.posts?.[0] || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

/**
 * Get all post slugs for generateStaticParams
 */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  try {
    const data = await ghostFetch<GhostPostsResponse>('posts/', {
      limit: 'all' as unknown as number,
      fields: 'slug',
    })
    return (data.posts || []).map((p) => ({ slug: p.slug }))
  } catch (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }
}

/**
 * Get all tag slugs for generateStaticParams
 */
export async function getAllTagSlugs(): Promise<{ slug: string }[]> {
  try {
    const data = await ghostFetch<{ tags: GhostTag[] }>('tags/', {
      limit: 'all' as unknown as number,
      fields: 'slug',
      filter: 'visibility:public',
    })
    return (data.tags || []).map((t) => ({ slug: t.slug }))
  } catch (error) {
    console.error('Error fetching tag slugs:', error)
    return []
  }
}

/**
 * Get all author slugs for generateStaticParams
 */
export async function getAllAuthorSlugs(): Promise<{ slug: string }[]> {
  try {
    const data = await ghostFetch<{ authors: GhostAuthor[] }>('authors/', {
      limit: 'all' as unknown as number,
      fields: 'slug',
    })
    return (data.authors || []).map((a) => ({ slug: a.slug }))
  } catch (error) {
    console.error('Error fetching author slugs:', error)
    return []
  }
}

/**
 * Get a single tag by slug
 */
export async function getTag(slug: string): Promise<GhostTag | null> {
  try {
    const data = await ghostFetch<{ tags: GhostTag[] }>('tags/slug/' + slug + '/', {
      include: 'count.posts',
    })
    return data.tags?.[0] || null
  } catch (error) {
    console.error('Error fetching tag by slug:', error)
    return null
  }
}

/**
 * Get a single author by slug
 */
export async function getAuthor(slug: string): Promise<GhostAuthor | null> {
  try {
    const data = await ghostFetch<{ authors: GhostAuthor[] }>('authors/slug/' + slug + '/', {
      include: 'count.posts',
    })
    return data.authors?.[0] || null
  } catch (error) {
    console.error('Error fetching author by slug:', error)
    return null
  }
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(
  tagSlug: string,
  options: { page?: number; limit?: number } = {}
): Promise<{ posts: GhostPost[]; pagination: GhostPagination | null }> {
  try {
    const data = await ghostFetch<GhostPostsResponse>('posts/', {
      limit: options.limit || 10,
      page: options.page || 1,
      filter: `tag:${tagSlug}`,
      include: 'tags,authors',
      fields:
        'id,uuid,title,slug,excerpt,feature_image,featured,published_at,url,reading_time,primary_tag',
      order: 'published_at desc',
    })
    return {
      posts: data.posts || [],
      pagination: data.meta?.pagination || null,
    }
  } catch (error) {
    console.error('Error fetching posts by tag:', error)
    return { posts: [], pagination: null }
  }
}

/**
 * Get posts filtered by author
 */
export async function getPostsByAuthor(
  authorSlug: string,
  options: { page?: number; limit?: number } = {}
): Promise<{ posts: GhostPost[]; pagination: GhostPagination | null }> {
  try {
    const data = await ghostFetch<GhostPostsResponse>('posts/', {
      limit: options.limit || 10,
      page: options.page || 1,
      filter: `author:${authorSlug}`,
      include: 'tags,authors',
      fields:
        'id,uuid,title,slug,excerpt,feature_image,featured,published_at,url,reading_time,primary_tag',
      order: 'published_at desc',
    })
    return {
      posts: data.posts || [],
      pagination: data.meta?.pagination || null,
    }
  } catch (error) {
    console.error('Error fetching posts by author:', error)
    return { posts: [], pagination: null }
  }
}

/**
 * Get Ghost site settings
 */
export async function getSettings(): Promise<GhostSettings | null> {
  try {
    const data = await ghostFetch<{ settings: GhostSettings }>('settings/')
    return data.settings || null
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

/**
 * Format date for display
 */
export function formatPostDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Calculate reading time display
 */
export function formatReadingTime(minutes?: number): string {
  if (!minutes) return ''
  return `${minutes} min de lecture`
}
