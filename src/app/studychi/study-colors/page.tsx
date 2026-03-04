'use client';

import Link from 'next/link';
import { allPlatformThemes, getWallStyle } from '../data/platform-themes';

// 按路線分組
const lines = [
  { name: '東鐵綫', id: 'eal', themes: allPlatformThemes.filter(t => t.stationId.startsWith('eal-')) },
  { name: '屯馬綫', id: 'tml', themes: allPlatformThemes.filter(t => t.stationId.startsWith('tml-')) },
  { name: '觀塘綫', id: 'ktl', themes: allPlatformThemes.filter(t => t.stationId.startsWith('ktl-')) },
  { name: '港島綫', id: 'isl', themes: allPlatformThemes.filter(t => t.stationId.startsWith('isl-')) },
  { name: '荃灣綫', id: 'twl', themes: allPlatformThemes.filter(t => t.stationId.startsWith('twl-')) },
  { name: '將軍澳綫', id: 'tko', themes: allPlatformThemes.filter(t => t.stationId.startsWith('tko-')) },
  { name: '東涌綫', id: 'tcl', themes: allPlatformThemes.filter(t => t.stationId.startsWith('tcl-')) },
];

export default function StudyColorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 頂部 */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/studychi" className="text-gray-600 hover:text-gray-800 font-bold">
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">🎨 港鐵站顏色溫習</h1>
          <span className="text-sm text-gray-500">{allPlatformThemes.length}個站</span>
        </div>

        {/* 溫習提示 */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💡</span>
            <span className="font-bold text-gray-800">溫習提示</span>
          </div>
          <p className="text-sm text-gray-600">
            每個站嘅月台牆身都有獨特顏色設計，例如彩虹站係七彩條紋、香港大學站有兩條黑線。
            記住佢哋，然後去挑戰「顏色終極測試」！
          </p>
        </div>

        {/* 特殊設計站點速覽 */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 shadow-lg mb-6">
          <h2 className="font-bold text-gray-800 mb-3">🌟 特殊設計站點</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allPlatformThemes
              .filter(t => t.wallType && t.wallType !== 'solid')
              .map(theme => (
                <div key={theme.stationId} className="bg-white rounded-xl p-3 shadow">
                  <div 
                    className="w-full h-16 rounded-lg mb-2"
                    style={{ background: getWallStyle(theme) }}
                  />
                  <div className="text-center text-sm font-bold">{theme.stationName}</div>
                  <div className="text-center text-xs text-gray-500">
                    {theme.wallType === 'rainbow' && '🌈 彩虹條紋'}
                    {theme.wallType === 'striped' && '➖ 雙黑線'}
                    {theme.wallType === 'bordered' && '🔴 紅頂邊框'}
                    {theme.wallType === 'grid' && '▦ 格子馬賽克'}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 按路線顯示所有站 */}
        {lines.map(line => (
          <div key={line.id} className="bg-white rounded-2xl p-4 shadow-lg mb-6">
            <h2 className="font-bold text-gray-800 mb-4 text-lg">{line.name}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {line.themes.map(theme => (
                <div key={theme.stationId} className="group">
                  <div 
                    className="w-full aspect-square rounded-xl shadow-inner mb-2 relative overflow-hidden"
                    style={{ background: getWallStyle(theme) }}
                  >
                    {/* 馬賽克紋理（淨係純色站） */}
                    {!theme.wallStyle && (
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
                          `,
                          backgroundSize: '8px 8px',
                        }}
                      />
                    )}
                    {/* 格子效果 */}
                    {theme.wallType === 'grid' && (
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)
                          `,
                          backgroundSize: '10px 10px',
                        }}
                      />
                    )}
                  </div>
                  <div className="text-center text-xs font-medium text-gray-700 truncate">
                    {theme.stationName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 底部按鈕 */}
        <div className="flex gap-3 mb-8">
          <Link 
            href="/studychi"
            className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-center hover:bg-gray-200 transition-colors"
          >
            ← 返回主頁
          </Link>
          <Link 
            href="/studychi?tab=ultimate"
            className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-center hover:opacity-90 transition-opacity"
          >
            🎮 開始挑戰
          </Link>
        </div>

        {/* 底部提示 */}
        <p className="text-center text-gray-400 text-xs pb-8">
          共 {allPlatformThemes.length} 個港鐵站 · 溫習完就去挑戰吧！
        </p>
      </div>
    </div>
  );
}
