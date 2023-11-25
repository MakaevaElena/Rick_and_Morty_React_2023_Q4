export const BASE_URL = 'https://rickandmortyapi.com/api/';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        // pathname: '/api/character/avatar/',
      },
    ],
  },
};

export default nextConfig;
