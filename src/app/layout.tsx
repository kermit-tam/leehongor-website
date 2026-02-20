/**
 * 根佈局
 * Root Layout
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/ui/navbar';
import { CheckinModal } from '@/components/checkin';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '利康哥日文學習平台 | LeeHongor Japanese',
  description: '輕鬆學日文，系統化課程，遊戲化學習體驗',
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
            <Navbar />
            <main>{children}</main>
            <CheckinModal />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
