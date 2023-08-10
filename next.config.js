/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ap-south-1.linodeobjects.com',
        port: '',
        pathname: '/sagara-staging/kayaroll-staging/**',
      },
    ],
    domains: [
      'placehold.co'
    ],
  },
}

module.exports = nextConfig
