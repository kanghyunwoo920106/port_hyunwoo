/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/port_hyunwoo' : '',
  images: {
    unoptimized: true,
    path: process.env.NODE_ENV === 'production' ? '/port_hyunwoo' : '',
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // SVG 파일을 정적 에셋으로 처리
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // 빌드 성능 최적화
  swcMinify: true,
  poweredByHeader: false,
  // 개발환경에서 React strict mode 비활성화하여 이중 렌더링 방지
  reactStrictMode: false,
  // ESLint 검사 건너뛰기
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript 검사 건너뛰기
  typescript: {
    ignoreBuildErrors: false,
  },
  // hydration error 디버깅 옵션: 개발 환경에서만 활성화
  experimental: {
    // 개발 환경에서만 하이드레이션 오류를 자세히 로깅
    suppressHydrationWarning: process.env.NODE_ENV === 'production',
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/port_hyunwoo' : '',
};

export default nextConfig;
