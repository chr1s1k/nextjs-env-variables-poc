require('dotenv').config({ path: process.env.ENV_FILE_PATH })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
