/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images : {
    domains : ["localhost", "tricky-app-v2.herokuapp.com"]
  }
}

module.exports = nextConfig
