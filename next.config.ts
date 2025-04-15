/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/port_hyunwoo' : '',
  images: {
    unoptimized: true,
  },
  // 빌드 성능 최적화
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: false,
  // ESLint 검사 건너뛰기
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript 검사 건너뛰기
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
