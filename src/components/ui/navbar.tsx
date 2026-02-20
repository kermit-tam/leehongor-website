/**
 * 無印風格導航欄
 * MUJI Style Navbar
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { Button } from './button';
import { StreakDisplay } from '@/components/checkin';

export function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; href: string; icon: string }[] = [
    { label: '輕鬆學', href: '/posts', icon: '📚' },
    { label: '系統學', href: '/learn', icon: '🎯' },
    { label: '考試模式', href: '/exam', icon: '📝' },
    { label: '排行榜', href: '/leaderboard', icon: '🏆' },
  ];

  if (isAdmin) {
    navItems.push({ label: '後台', href: '/admin', icon: '⚙️' });
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F5F0]/95 backdrop-blur-sm border-t border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl">🎌</span>
            <span className="font-normal text-lg tracking-wider text-[#4A4A4A]">
              利康哥日文
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 transition-colors tracking-wide text-[#8C8C8C] hover:text-[#4A4A4A]"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <StreakDisplay size="sm" />
                <Link href="/profile" className="flex items-center space-x-3 hover:bg-[#FAF9F7] px-3 py-2 transition-colors">
                  <div className="relative w-8 h-8 bg-[#E0D5C7] flex items-center justify-center text-[#4A4A4A] text-sm">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover grayscale-[20%]"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <div className="text-sm">
                    <div className="text-[#4A4A4A]">{user.name}</div>
                  </div>
                </Link>
                <button 
                  onClick={logout}
                  className="text-[#8C8C8C] hover:text-[#4A4A4A] text-sm tracking-wide"
                >
                  登出
                </button>
              </>
            ) : (
              <Link href="/">
                <Button variant="primary" size="sm">
                  登入
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#8C8C8C] hover:text-[#4A4A4A]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E5E5E5]">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 transition-colors text-[#8C8C8C] hover:text-[#4A4A4A] hover:bg-[#FAF9F7]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-[#4A4A4A] hover:bg-[#FAF9F7] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    個人中心
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-[#8C8C8C] hover:text-[#4A4A4A] hover:bg-[#FAF9F7] transition-colors"
                  >
                    登出
                  </button>
                </>
              ) : (
                <Link
                  href="/"
                  className="block px-4 py-3 text-[#4A4A4A] hover:bg-[#FAF9F7] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  登入
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
