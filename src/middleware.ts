import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // study.leehongor.com → 顯示 /study 內容
  if (hostname.startsWith('study.')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/study', request.url));
    }
  }

  // kids.leehongor.com → 顯示 /kids 內容
  if (hostname.startsWith('kids.')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/kids', request.url));
    }
  }

  // www.leehongor.com 或 leehongor.com → 維持原狀（日文首頁）
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
  ],
};
