/**
 * 月台背景組件
 * 用 CSS 模擬港鐵月台嘅紙皮石馬賽克牆身、柱子同地板
 * 使用官方真實顏色
 */

'use client';

import { PlatformTheme } from '../data/platform-themes';

interface PlatformBackgroundProps {
  theme: PlatformTheme;
  children?: React.ReactNode;
}

export function PlatformBackground({ theme, children }: PlatformBackgroundProps) {
  return (
    <div 
      className="relative w-full h-full min-h-[400px] overflow-hidden rounded-2xl"
      style={{
        backgroundColor: theme.wallColor,
      }}
    >
      {/* 紙皮石馬賽克效果 - 細格紋 */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* 牆身污漬/陳舊效果 */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 100px,
            rgba(0,0,0,0.1) 100px,
            rgba(0,0,0,0.1) 102px
          )`,
        }}
      />

      {/* 左邊柱子 */}
      <div 
        className="absolute left-4 top-0 bottom-16 w-16 flex flex-col items-center"
        style={{ backgroundColor: theme.pillarColor }}
      >
        {/* 柱上的站名（直向） */}
        <div 
          className="mt-8 text-2xl font-bold tracking-widest"
          style={{ 
            color: theme.nameColor,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {theme.stationName}
        </div>
        
        {/* 柱子裝飾線 */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        />
        <div 
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        />
      </div>

      {/* 右邊柱子 */}
      <div 
        className="absolute right-4 top-0 bottom-16 w-16 flex flex-col items-center"
        style={{ backgroundColor: theme.pillarColor }}
      >
        {/* 柱上的站名（直向） */}
        <div 
          className="mt-8 text-2xl font-bold tracking-widest"
          style={{ 
            color: theme.nameColor,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {theme.stationName}
        </div>
        
        {/* 柱子裝飾線 */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        />
        <div 
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        />
      </div>

      {/* 地板 */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{ 
          backgroundColor: theme.floorColor,
          boxShadow: 'inset 0 8px 16px rgba(0,0,0,0.4)',
        }}
      >
        {/* 地板防滑條 */}
        <div 
          className="absolute top-4 left-0 right-0 h-2 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 15px,
              rgba(255,255,255,0.6) 15px,
              rgba(255,255,255,0.6) 30px
            )`,
          }}
        />
        {/* 黃色安全線 */}
        <div 
          className="absolute top-10 left-0 right-0 h-2"
          style={{ 
            backgroundColor: '#FFD700',
            boxShadow: '0 0 10px rgba(255,215,0,0.5)',
          }}
        />
        {/* 月台邊緣 */}
        <div 
          className="absolute top-14 left-0 right-0 h-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        />
      </div>

      {/* 頂部燈光 */}
      <div 
        className="absolute top-0 left-24 right-24 h-10 opacity-40"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
        }}
      />

      {/* 內容區域 */}
      <div className="relative z-10 px-24 py-8">
        {children}
      </div>
    </div>
  );
}
