/**
 * 列車旅程組件
 * 動畫列車沿港鐵路線移動，停站學站名
 * 特色：慢速讀音 + 地鐵廣播效果 + 開門閂門動畫
 */

'use client';

import { useState, useEffect } from 'react';
import { MTRLine, MTRStation } from '../data/mtr-stations';

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

  // 自動讀站名（慢速）
  useEffect(() => {
    if (currentStation && showInfo) {
      // 播放廣播：列車即將到達
      setAnnouncement(`列車即將到達 ${currentStation.name} 站`);
      speak(`列車即將到達，${currentStation.name}站`, 'zh-HK', 0.7);
      
      // 開門動畫
      setDoorStatus('opening');
      setTimeout(() => setDoorStatus('open'), 500);
    }
  }, [currentIndex, showInfo, speak, currentStation]);

  // 下一站
  const goToNextStation = () => {
    if (currentIndex < stations.length - 1) {
      // 開始閂門程序
      setDoorStatus('closing');
      setAnnouncement('請勿靠近車門，請不要靠近車門');
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

  // 手動讀站名（更慢）
  const readStationName = () => {
    if (currentStation) {
      speak(currentStation.name, 'zh-HK', 0.5); // 更慢
    }
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

      {/* 路線圖（簡化版） */}
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {stations.map((station, idx) => (
            <button
              key={station.id}
              onClick={() => jumpToStation(idx)}
              className="flex-shrink-0 flex flex-col items-center"
            >
              <div 
                className={`w-3 h-3 rounded-full border-2 transition-all ${
                  idx === currentIndex 
                    ? 'bg-white scale-150' 
                    : idx < currentIndex 
                      ? 'bg-gray-400' 
                      : 'bg-gray-200'
                }`}
                style={{ 
                  borderColor: line.colorCode,
                  backgroundColor: idx === currentIndex ? line.colorCode : undefined
                }}
              />
              {idx % 2 === 0 && (
                <span className="text-[10px] text-gray-500 mt-1 whitespace-nowrap">
                  {station.name}
                </span>
              )}
            </button>
          ))}
        </div>
        {/* 路線 */}
        <div 
          className="h-1 mx-2 rounded-full"
          style={{ backgroundColor: line.colorCode }}
        />
      </div>

      {/* 列車動畫區 */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* 車門動畫效果 */}
        {showInfo && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className={`text-sm font-bold ${
              doorStatus === 'open' ? 'text-green-500' : 
              doorStatus === 'closing' || doorStatus === 'opening' ? 'text-yellow-500' : 
              'text-red-500'
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
          className={`text-8xl mb-6 transition-all duration-1000 ${
            isMoving ? 'translate-x-32 scale-90' : 'translate-x-0'
          } ${
            doorStatus === 'closing' || doorStatus === 'opening' ? 'animate-pulse' : ''
          }`}
        >
          {isMoving ? '🚇💨' : '🚇'}
        </div>

        {/* 站名資訊 */}
        {showInfo && (
          <div className="text-center animate-fade-in w-full">
            {/* 提示：小心月台空隙 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-2 mb-4">
              <p className="text-yellow-700 text-sm">⚠️ 請小心月台空隙</p>
              <p className="text-yellow-500 text-xs">Please mind the platform gap</p>
            </div>

            {/* 站名牌 */}
            <div 
              className="inline-block px-8 py-4 rounded-2xl mb-4 shadow-lg"
              style={{ backgroundColor: line.colorCode }}
            >
              <h3 className="text-3xl font-bold text-white">{currentStation.name}</h3>
              <p className="text-white/80 text-sm">{currentStation.nameEn}</p>
            </div>

            {/* 地標 */}
            <div className="flex items-center justify-center gap-2 text-4xl mb-3">
              <span>{currentStation.landmarkIcon}</span>
              <span className="text-lg text-gray-600">{currentStation.landmark}</span>
            </div>

            {/* 描述 */}
            <p className="text-gray-500 text-sm px-4 mb-4">{currentStation.description}</p>

            {/* 讀音按鈕 */}
            <button
              onClick={readStationName}
              className="px-6 py-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 flex items-center gap-2 mx-auto transition-all active:scale-95"
            >
              <span className="text-xl">🔊</span>
              <span>慢慢讀一次</span>
            </button>
          </div>
        )}

        {/* 行駛中提示 */}
        {isMoving && (
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-400 mb-2">🚄 列車行駛中...</p>
            <p className="text-gray-400">Next Station</p>
            <p className="text-xl text-gray-500 mt-2">{nextStation?.name}</p>
            <div className="mt-4 flex justify-center gap-1">
              <span className="animate-bounce text-2xl">💨</span>
              <span className="animate-bounce text-2xl delay-100">💨</span>
              <span className="animate-bounce text-2xl delay-200">💨</span>
            </div>
          </div>
        )}
      </div>

      {/* 控制按 */}
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
