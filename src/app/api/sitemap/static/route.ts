const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fishacademy.fr'

const STATIC_PAGES = [
  { url: BASE_URL, changefreq: 'weekly', priority: '1.0' },
  { url: `${BASE_URL}/solution`, changefreq: 'monthly', priority: '0.9' },
  { url: `${BASE_URL}/blog`, changefreq: 'daily', priority: '0.8' },
  { url: `${BASE_URL}/contact`, changefreq: 'monthly', priority: '0.7' },
  { url: `${BASE_URL}/partenaires`, changefreq: 'monthly', priority: '0.6' },
  { url: `${BASE_URL}/communaute`, changefreq: 'monthly', priority: '0.5' },
]

export async function GET() {
  const today = new Date().toISOString().split('T')[0]

  const urls = STATIC_PAGES.map(
    (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' },
  })
}
