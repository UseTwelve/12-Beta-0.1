/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    domains: ['res.cloudinary.com', "img.freepik.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
