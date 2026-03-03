/**
 * 根佈局
 * Root Layout
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { LayoutWrapper } from '@/components/layout-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '利康哥學習平台 | LeeHongor Learning',
  description: '輕鬆學習，系統化課程，遊戲化學習體驗',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
