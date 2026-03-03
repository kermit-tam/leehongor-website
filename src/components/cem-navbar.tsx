/**
 * CEM (Chinese/English/Math) 導航列
 * 用於 study.leehongor.com 和 kids.leehongor.com 的練習頁面
 * CEM Navbar - For study and kids subdomain exercise pages
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function CEMNavbar() {
  const pathname = usePathname();
  
  // 判斷當前是在哪個網站
  const isKidsPath = pathname === '/kids' || pathname?.startsWith('/kids');
  const isGPPath = pathname === '/trygp' || pathname?.startsWith('/trygp');
  const homeHref = isKidsPath ? '/kids' : '/study';
  const homeLabel = isGPPath ? '常識練習' : (isKidsPath ? '小朋友學習天地' : '小學生學習天地');
  const subtitle = isGPPath ? '二年級' : (isKidsPath ? 'K1-K3' : 'P1-P6');
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={homeHref} className="flex items-center gap-2">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
            isKidsPath 
              ? 'bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400'
              : 'bg-gradient-to-br from-blue-500 to-purple-600'
          }`}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
              {isKidsPath ? (
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              ) : (
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9z"/>
              )}
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{homeLabel}</h1>
          </div>
        </Link>
        <div className="text-xs text-gray-500 font-medium">{subtitle}</div>
      </div>
    </header>
  );
}
