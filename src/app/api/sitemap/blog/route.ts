import { getAllPostsForSitemap, getAllTagSlugs, getAllAuthorSlugs } from '@/lib/ghost'

export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fishacademy.fr'

export async function GET() {
  const [posts, tagSlugs, authorSlugs] = await Promise.all([
    getAllPostsForSitemap(),
    getAllTagSlugs(),
    getAllAuthorSlugs(),
  ])

  const postUrls = posts
    .map(
      ({ slug, updatedAt }) => `
  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${new Date(updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')

  const tagUrls = tagSlugs
    .map(
      ({ slug }) => `
  <url>
    <loc>${BASE_URL}/blog/tag/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
    )
    .join('')

  const authorUrls = authorSlugs
    .map(
      ({ slug }) => `
  <url>
    <loc>${BASE_URL}/blog/author/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${postUrls}${tagUrls}${authorUrls}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' },
  })
}
