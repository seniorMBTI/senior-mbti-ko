/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    return `enhanced-deploy-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
  },
  experimental: {
    appDir: true,
    optimizeCss: true,
    serverComponentsExternalPackages: []
  },
  // Core Web Vitals 최적화
  images: {
    domains: ['senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  // 압축 및 캐싱 최적화
  compress: true,
  poweredByHeader: false,
  // 번들 크기 최적화
  swcMinify: true,
  compiler: {
    removeConsole: {
      exclude: ['error']
    }
  },
  // 성능 최적화
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1, stale-while-revalidate=59'
          }
        ]
      }
    ]
  },
  // 정적 리소스 최적화
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/images/:path*'
      }
    ]
  }
}

module.exports = nextConfig