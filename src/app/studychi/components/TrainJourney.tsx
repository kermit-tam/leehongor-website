/**
 * 列車旅程組件
 * 動畫列車沿港鐵路線移動，停站學站名
 * 特色：慢速讀音 + 地鐵廣播效果 + 開門閂門動畫
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MTRLine } from '../data/mtr-stations';
import { playDoorCloseBeep, playArrivalBeep, playDoorOpenBeep } from '../utils/sounds';
import { getPlatformTheme } from '../data/platform-themes';
import { PlatformBackground } from './PlatformBackground';

interface TrainJourneyProps {
  line: MTRLine;
  onBack: () => void;
  onScore: (points: number) => void;
  speak: (text: string, lang?: string, rate?: number) => void;
}

export function TrainJourney({ line, onBack, onScore, speak }: TrainJourneyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [learnedStations, setLearnedStations] = useState<Set<string>>(new Set());
  const [announcement, setAnnouncement] = useState<string>('');
  const [doorStatus, setDoorStatus] = useState<'open' | 'closing' | 'closed' | 'opening'>('open');

  const stations = line.stations;
  const currentStation = stations[currentIndex];
  const nextStation = stations[currentIndex + 1];
  
  // 獲取當前站嘅月台主題
  const platformTheme = getPlatformTheme(currentStation?.id || '');

  // 手動讀站名（更慢）
  const readStationName = useCallback(() => {
    if (currentStation) {
      speak(currentStation.name, 'zh-HK', 0.5); // 更慢
    }
  }, [currentStation, speak]);

  // 使用 ref 追蹤是否已經處理過當前站點
  const processedIndexRef = React.useRef<number>(-1);
  const doorTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  
  // 自動讀站名（慢速）
  useEffect(() => {
    if (currentStation && showInfo && processedIndexRef.current !== currentIndex) {
      processedIndexRef.current = currentIndex;
      // 播放廣播：列車即將到達
      const newAnnouncement = `列車即將到達 ${currentStation.name} 站`;
      // 使用 setTimeout 避免同步 setState
      const announceTimer = setTimeout(() => {
        setAnnouncement(newAnnouncement);
        speak(`列車即將到達，${currentStation.name}站`, 'zh-HK', 0.7);
        
        // 開門動畫 - 在 setTimeout 回調中執行
        setDoorStatus('opening');
        doorTimerRef.current = setTimeout(() => setDoorStatus('open'), 500);
      }, 0);
      
      return () => {
        clearTimeout(announceTimer);
        if (doorTimerRef.current) {
          clearTimeout(doorTimerRef.current);
        }
      };
    }
  }, [currentIndex, showInfo, speak, currentStation]);

  // 下一站
  const goToNextStation = () => {
    if (currentIndex < stations.length - 1) {
      // 開始閂門程序
      setDoorStatus('closing');
      setAnnouncement('請勿靠近車門，請不要靠近車門');
      
      // 播放「嘟嘟嘟」閂門聲 + 廣播
      playDoorCloseBeep();
      speak('請勿靠近車門', 'zh-HK', 0.7);
      
      setTimeout(() => {
        setDoorStatus('closed');
        setIsMoving(true);
        setShowInfo(false);
        
        // 播放「下一站」廣播
        if (nextStation) {
          setAnnouncement(`下一站：${nextStation.name}`);
          setTimeout(() => {
            speak(`下一站，${nextStation.name}`, 'zh-HK', 0.7);
          }, 500);
        }
        
        // 列車行駛動畫
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setIsMoving(false);
          setShowInfo(true);
          
          // 播放到站「叮」聲 + 開門聲
          setTimeout(() => {
            playArrivalBeep();
            setTimeout(() => playDoorOpenBeep(), 300);
          }, 500);
          
          // 標記已學習
          setLearnedStations(prev => {
            const newSet = new Set(prev);
            newSet.add(currentStation.id);
            return newSet;
          });
          onScore(5);
        }, 2500);
      }, 1500);
    }
  };

  // 上一站
  const goToPrevStation = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowInfo(true);
      setDoorStatus('open');
    }
  };

  // 跳至指定站
  const jumpToStation = (index: number) => {
    setCurrentIndex(index);
    setShowInfo(true);
    setDoorStatus('open');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          ← 返回
        </button>
        <h2 className="text-xl font-bold text-gray-800">🚄 列車旅程</h2>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {stations.length}
        </span>
      </div>

      {/* 進度條 */}
      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full transition-all duration-500"
          style={{ 
            width: `${((currentIndex + 1) / stations.length) * 100}%`,
            backgroundColor: line.colorCode 
          }}
        />
      </div>

      {/* 廣播顯示區 */}
      <div className="bg-gray-900 rounded-2xl p-4 mb-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-400 text-xs">●</span>
          <span className="text-green-400 text-xs">廣播 Announcement</span>
        </div>
        <p className="text-white text-lg font-medium text-center">
          {announcement || `歡迎乘搭${line.name}`}
        </p>
        <p className="text-gray-500 text-xs text-center mt-1">
          {line.nameEn}
        </p>
      </div>

      {/* 路線圖（地鐵風格 - 淨顯示前後各2個站） */}
      <div className="bg-gray-900 rounded-2xl p-4 shadow-lg mb-6">
        <div className="flex items-center justify-center gap-2">
          {(() => {
            // 計算要顯示嘅站範圍（前後各2個，共5個）
            const startIdx = Math.max(0, currentIndex - 2);
            const endIdx = Math.min(stations.length - 1, currentIndex + 2);
            const visibleStations = stations.slice(startIdx, endIdx + 1);
            
            return visibleStations.map((station, idx) => {
              const actualIdx = startIdx + idx;
              const isCurrent = actualIdx === currentIndex;
              const isPast = actualIdx < currentIndex;
              
              return (
                <div key={station.id} className="flex items-center">
                  {/* 站點 */}
                  <button
                    onClick={() => jumpToStation(actualIdx)}
                    className="flex flex-col items-center"
                  >
                    {/* 站名（上） */}
                    <span className={`text-[10px] mb-1 whitespace-nowrap ${
                      isCurrent ? 'text-white font-bold' : 'text-gray-500'
                    }`}>
                      {station.name}
                    </span>
                    
                    {/* 站點圓點 */}
                    <div 
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        isCurrent 
                          ? 'scale-125 animate-pulse' 
                          : isPast 
                            ? 'opacity-60' 
                            : 'opacity-40'
                      }`}
                      style={{ 
                        borderColor: line.colorCode,
                        backgroundColor: isCurrent ? line.colorCode : 'transparent',
                        boxShadow: isCurrent ? `0 0 10px ${line.colorCode}` : 'none'
                      }}
                    />
                  </button>
                  
                  {/* 連接線（除咗最後一個） */}
                  {idx < visibleStations.length - 1 && (
                    <div 
                      className="w-8 h-1 mx-1"
                      style={{ 
                        backgroundColor: line.colorCode,
                        opacity: actualIdx < currentIndex ? 1 : 0.3
                      }}
                    />
                  )}
                </div>
              );
            });
          })()}
        </div>
        
        {/* 進度提示 */}
        <div className="flex justify-between items-center mt-3 text-xs">
          <span className="text-gray-500">← {currentIndex > 0 ? stations[currentIndex - 1]?.name : '起點'}</span>
          <span className="text-white font-bold">{currentStation.name}</span>
          <span className="text-gray-500">{nextStation?.name || '終點'} →</span>
        </div>
      </div>

      {/* 列車動畫區 - 有月台背景 */}
      <div className="rounded-2xl shadow-lg mb-6 overflow-hidden" style={{ minHeight: '380px' }}>
        {platformTheme && showInfo ? (
          <PlatformBackground theme={platformTheme}>
            <div className="flex flex-col items-center justify-center py-4">
              {/* 車門動畫效果 */}
              {showInfo && (
                <div className="absolute top-4 right-20 flex items-center gap-2 z-20">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full bg-black/50 ${
                    doorStatus === 'open' ? 'text-green-400' : 
                    doorStatus === 'closing' || doorStatus === 'opening' ? 'text-yellow-400' : 
                    'text-red-400'
                  }`}>
                    {doorStatus === 'open' && '🚪 車門開啟'}
                    {doorStatus === 'closing' && '🚪 車門正在關閉'}
                    {doorStatus === 'closed' && '🚪 車門已關閉'}
                    {doorStatus === 'opening' && '🚪 車門正在開啟'}
                  </span>
                </div>
              )}

              {/* 列車圖示 */}
              <div 
                className={`text-7xl mb-4 transition-all duration-1000 ${
                  doorStatus === 'closing' || doorStatus === 'opening' ? 'animate-pulse' : ''
                }`}
              >
                🚇
              </div>

              {/* 站名資訊 */}
              <div className="text-center animate-fade-in w-full">
                {/* 提示：小心月台空隙 */}
                <div className="bg-yellow-400/90 border-2 border-yellow-500 rounded-xl p-2 mb-4 mx-4">
                  <p className="text-yellow-900 text-sm font-bold">⚠️ 請小心月台空隙</p>
                  <p className="text-yellow-700 text-xs">Please mind the platform gap</p>
                </div>

                {/* 站名牌 - 玻璃效果 */}
                <div 
                  className="inline-block px-8 py-4 rounded-2xl mb-4 backdrop-blur-md border-2 border-white/30"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  }}
                >
                  <h3 className="text-4xl font-bold text-white drop-shadow-lg">{currentStation.name}</h3>
                  <p className="text-white/80 text-sm mt-1">{currentStation.nameEn}</p>
                </div>

                {/* 地標 */}
                <div className="flex items-center justify-center gap-2 text-4xl mb-3">
                  <span className="drop-shadow-lg">{currentStation.landmarkIcon}</span>
                  <span className="text-lg text-white/90 font-medium">{currentStation.landmark}</span>
                </div>

                {/* 描述 */}
                <p className="text-white/70 text-sm px-4 mb-4">{currentStation.description}</p>

                {/* 讀音按鈕 */}
                <button
                  onClick={readStationName}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 flex items-center gap-2 mx-auto transition-all active:scale-95 border border-white/30"
                >
                  <span className="text-xl">🔊</span>
                  <span>慢慢讀一次</span>
                </button>
              </div>
            </div>
          </PlatformBackground>
        ) : isMoving ? (
          /* 行駛中 - 隧道效果 */
          <div className="h-full min-h-[380px] bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
            {/* 隧道牆壁效果 */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 50px,
                rgba(255,255,255,0.1) 50px,
                rgba(255,255,255,0.1) 100px
              )`,
            }} />
            
            <p className="text-2xl font-bold text-gray-400 mb-2 relative z-10">🚄 列車行駛中...</p>
            <p className="text-gray-500 relative z-10">Next Station</p>
            <p className="text-xl text-gray-400 mt-2 relative z-10">{nextStation?.name}</p>
            <div className="mt-4 flex justify-center gap-1 relative z-10">
              <span className="animate-bounce text-2xl">💨</span>
              <span className="animate-bounce text-2xl delay-100">💨</span>
              <span className="animate-bounce text-2xl delay-200">💨</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* 控制按鈕 */}
      <div className="flex gap-4">
        <button
          onClick={goToPrevStation}
          disabled={currentIndex === 0 || isMoving}
          className="flex-1 py-4 rounded-xl bg-gray-100 text-gray-700 font-bold disabled:opacity-50 hover:bg-gray-200 transition-colors"
        >
          ← 上一站
        </button>
        <button
          onClick={goToNextStation}
          disabled={currentIndex === stations.length - 1 || isMoving || doorStatus === 'closing'}
          className="flex-1 py-4 rounded-xl text-white font-bold disabled:opacity-50 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: line.colorCode }}
        >
          {currentIndex === stations.length - 1 ? '✅ 完成' : '下一站 →'}
        </button>
      </div>

      {/* 已學習統計 */}
      <p className="text-center text-gray-500 text-sm mt-4">
        已學習 {learnedStations.size} 個站
      </p>

      {/* 操作提示 */}
      <p className="text-center text-gray-400 text-xs mt-2">
        按「下一站」聽廣播：「請勿靠近車門」→「下一站...」→「列車即將到達...」
      </p>
    </div>
  );
}
