/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/port_hyunwoo' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
