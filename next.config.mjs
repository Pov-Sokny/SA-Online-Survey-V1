/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resource.supersurvey.live',
        port: '', // Keep this empty
        pathname: '/**', // Matches all paths
      },
    ],
  },
}

export default nextConfig