import { NextResponse } from 'next/server'
import { deleteByPrefix } from '@/lib/redis'
import {
  getFeaturedPosts,
  getLatestPosts,
  getPosts,
  getAllPostSlugs,
  getAllTagSlugs,
  getAllAuthorSlugs,
  getAllPostsForSitemap,
  getPostBySlug,
  getTag,
  getAuthor,
  getPostsByTag,
  getPostsByAuthor,
} from '@/lib/ghost'

export async function POST(request: Request) {
  const secret = process.env.CACHE_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'CACHE_REVALIDATE_SECRET is not configured' }, { status: 500 })
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 1. Purge all FALP_ keys
  const deleted = await deleteByPrefix()
  console.log(`[Cache] Purged ${deleted} keys`)

  // 2. Warm main listings + sitemap data
  await Promise.all([
    getFeaturedPosts(3),
    getLatestPosts(10),
    getPosts({ page: 1, limit: 10 }),
    getAllPostsForSitemap(),
  ])

  // 3. Warm all slugs, then detail pages in parallel
  const [postSlugs, tagSlugs, authorSlugs] = await Promise.all([
    getAllPostSlugs(),
    getAllTagSlugs(),
    getAllAuthorSlugs(),
  ])

  await Promise.all([
    ...postSlugs.map(({ slug }) => getPostBySlug(slug)),
    ...tagSlugs.map(({ slug }) => getTag(slug)),
    ...tagSlugs.map(({ slug }) => getPostsByTag(slug, { page: 1, limit: 10 })),
    ...authorSlugs.map(({ slug }) => getAuthor(slug)),
    ...authorSlugs.map(({ slug }) => getPostsByAuthor(slug, { page: 1, limit: 10 })),
  ])

  const warmed =
    4 + // featured, latest, posts p1, sitemap posts
    postSlugs.length +
    tagSlugs.length * 2 +
    authorSlugs.length * 2

  console.log(`[Cache] Warmed ${warmed} entries`)

  return NextResponse.json({
    success: true,
    deleted,
    warmed,
    slugs: {
      posts: postSlugs.length,
      tags: tagSlugs.length,
      authors: authorSlugs.length,
    },
  })
}
