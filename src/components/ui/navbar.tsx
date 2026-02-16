/**
 * 導航欄組件
 * Navbar Component
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { Button } from './button';

export function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: '輕鬆學', href: '/posts', icon: '📚' },
    { label: '系統學', href: '/learn', icon: '🎯' },
    { label: '排行榜', href: '/leaderboard', icon: '🏆' },
  ];

  if (isAdmin) {
    navItems.push({ label: '後台', href: '/admin', icon: '⚙️' });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🇯🇵</span>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              利康哥日文
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link href="/profile" className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">Lv.{user.level}</div>
                  </div>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  登出
                </Button>
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
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-xl mr-3">👤</span>
                    個人中心
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <span className="text-xl mr-3">🚪</span>
                    登出
                  </button>
                </>
              ) : (
                <Link
                  href="/"
                  className="flex items-center px-4 py-3 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl mr-3">🔑</span>
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
