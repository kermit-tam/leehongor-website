import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 圖片配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  
  // 實驗性功能
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // 環境變量
  env: {
    NEXT_PUBLIC_APP_NAME: '利康哥日文學習平台',
    NEXT_PUBLIC_APP_URL: 'https://leehongor.com',
  },

  // 重定向
  async redirects() {
    return [
      {
        source: '/admin/login',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
