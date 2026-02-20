/**
 * 無印風格按鈕組件
 * MUJI Style Button Component
 * 
 * 簡約、大按鈕、易撳
 */

'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  // 基礎樣式 - 無印風格
  const baseStyles = 'inline-flex items-center justify-center font-normal tracking-wide transition-all duration-200 focus:outline-none';
  
  // 變體樣式 - 大地色系
  const variantStyles = {
    // 主按鈕：灰色
    primary: 'bg-[#8C8C8C] text-white hover:bg-[#6B6B6B] active:bg-[#5A5A5A]',
    
    // 次要按鈕：米白背景
    secondary: 'bg-[#FAF9F7] text-[#4A4A4A] hover:bg-[#F0F0F0] border-t border-[#E5E5E5]',
    
    // 邊框按鈕
    outline: 'bg-transparent text-[#4A4A4A] border border-[#8C8C8C] hover:bg-[#FAF9F7]',
    
    // 幽靈按鈕
    ghost: 'bg-transparent text-[#8C8C8C] hover:text-[#4A4A4A] hover:bg-[#F5F5F0]',
    
    // 危險按鈕
    danger: 'bg-[#B8A8A0] text-white hover:bg-[#A09088]',
  };
  
  // 大小樣式 - 手機優先大按鈕
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]',
    xl: 'px-10 py-5 text-xl min-h-[64px]',  // 手機優先：特大按鈕
  };
  
  // 狀態樣式
  const stateStyles = (disabled || loading) 
    ? 'opacity-40 cursor-not-allowed' 
    : 'active:scale-[0.98]';
  
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${stateStyles}
        ${widthStyles}
        ${className}
      `}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ==================== Google 登入按鈕 ====================

export function GoogleLoginButton({ onClick, loading = false }: { onClick: () => void; loading?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full inline-flex items-center justify-center px-10 py-5 text-lg min-h-[64px] font-normal tracking-wide transition-all duration-200 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-[0.98] shadow-sm"
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      )}
      <span className="text-gray-800 font-medium">使用 Google 登入</span>
    </button>
  );
}
