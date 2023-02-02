/** @type {import('next').NextConfig} */
const path = require('path');
const withImages = require('next-images')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  exclude: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**/*',
      },
    ]
  }, 
}
module.exports = nextConfig