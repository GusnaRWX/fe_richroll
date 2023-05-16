/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ap-south-1.linodeobjects.com',
        port: '',
        pathname: '/sagara-staging/kayaroll-staging/**',
      },
    ],
  },
};

module.exports = nextConfig;
