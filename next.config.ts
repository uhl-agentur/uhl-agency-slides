import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false, // the Next badge would sit on every screenshot
  images: {
    unoptimized: true,
  },
}

export default nextConfig
