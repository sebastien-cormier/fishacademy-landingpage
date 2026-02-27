/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
