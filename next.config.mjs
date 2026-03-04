/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [40, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xsgames.co',
      },
    ],
  },
};

export default nextConfig;
