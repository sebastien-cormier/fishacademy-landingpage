/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      { source: '/sitemap-index.xml', destination: '/api/sitemap/index' },
      { source: '/sitemap-static.xml', destination: '/api/sitemap/static' },
      { source: '/sitemap-blog.xml', destination: '/api/sitemap/blog' },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.fishacademy.fr',
        pathname: '/content/images/**',
      },
      {
        protocol: 'https',
        hostname: 'img.artisandev.fr',
        pathname: '/fishacademy/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
        pathname: '/files/**',
      },
    ],
  },
}

module.exports = nextConfig
