'use client';

import Link from 'next/link';
import { mtrLines as allLines } from '../data/mtr-stations';

export default function ColourPage() {
  // 所有路線顏色
  const lineColors = allLines.map(line => ({
    name: line.name,
    color: line.color,
    colorCode: line.colorCode,
    stationCount: line.stations.length
  }));

  // 獲取所有站（包括彩虹站特殊處理）
  const allStations = allLines.flatMap(line => 
    line.stations.map(station => ({
      ...station,
      displayColor: station.name === '彩虹' ? '彩虹色' : station.lineColor,
      displayColorCode: station.name === '彩虹' ? 'linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)' : station.lineColorCode
    }))
  );

  // 獲取彩虹站
  const rainbowStation = allStations.find(s => s.name === '彩虹');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 頂部 */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/studychi" className="text-gray-600 hover:text-gray-800 font-bold">
            ← 返回
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">🎨 港鐵顏色對照表</h1>
          <div className="w-16"></div>
        </div>

        {/* 路線顏色總覽 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🚇 路線顏色</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {lineColors.map((line) => (
              <div key={line.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div 
                  className="w-12 h-12 rounded-full shadow-md"
                  style={{ backgroundColor: line.colorCode }}
                />
                <div>
                  <p className="font-bold text-gray-800">{line.name}</p>
                  <p className="text-sm text-gray-500">{line.color}</p>
                  <p className="text-xs text-gray-400">{line.stationCount}個站</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 彩虹站特殊顯示 */}
        {rainbowStation && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border-4 border-transparent"
            style={{
              background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3) border-box'
            }}
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">🌈 特殊站：彩虹站</h2>
              <div className="w-24 h-24 mx-auto rounded-full mb-3"
                style={{
                  background: 'linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)'
                }}
              />
              <p className="text-gray-600">彩虹站係全港鐵唯一用彩虹色嘅站！</p>
              <p className="text-sm text-gray-500">因為佢附近有著名嘅彩虹邨，七彩繽紛嘅公屋成為打卡熱點</p>
            </div>
          </div>
        )}

        {/* 所有站列表 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📍 所有港鐵站一覽</h2>
          
          {allLines.map((line) => (
            <div key={line.id} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: line.colorCode === 'rainbow' ? '#FF0000' : line.colorCode }}
                />
                <h3 className="font-bold text-lg" style={{ color: line.colorCode === 'rainbow' ? '#333' : line.colorCode }}>
                  {line.name}
                </h3>
                <span className="text-sm text-gray-400">({line.stations.length}個站)</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {line.stations.map((station) => (
                  <div 
                    key={station.id}
                    className="flex items-center gap-2 p-2 rounded-lg text-sm"
                    style={{
                      backgroundColor: station.name === '彩虹' 
                        ? 'rgba(255,0,0,0.1)' 
                        : `${station.lineColorCode}15`,
                      border: `2px solid ${station.name === '彩虹' ? '#FF0000' : station.lineColorCode}`
                    }}
                  >
                    <span className="text-lg">{station.landmarkIcon}</span>
                    <div>
                      <p className="font-bold text-gray-800">{station.name}</p>
                      <p className="text-xs text-gray-500">
                        {station.name === '彩虹' ? '🌈 彩虹色' : station.lineColor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 顏色說明 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-blue-800 mb-3">💡 顏色小知識</h2>
          <ul className="space-y-2 text-blue-700">
            <li>• 每條港鐵路線都有自己嘅代表顏色，方便乘客分辨</li>
            <li>• 彩虹站係唯一用彩虹色嘅站，紀錄附近嘅彩虹邨</li>
            <li>• 轉車站會顯示所屬路線嘅顏色</li>
            <li>• 東鐵綫用淺藍色，觀塘綫用綠色，港島綫用紅色</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
