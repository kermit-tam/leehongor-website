/**
 * 列車旅程組件
 * 動畫列車沿東鐵綫移動，停站學站名
 */

'use client';

import { useState, useEffect } from 'react';
import { MTRLine, MTRStation } from '../data/mtr-stations';

interface TrainJourneyProps {
  line: MTRLine;
  onBack: () => void;
  onScore: (points: number) => void;
  speak: (text: string, lang?: string) => void;
}

export function TrainJourney({ line, onBack, onScore, speak }: TrainJourneyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [learnedStations, setLearnedStations] = useState<Set<string>>(new Set());

  const stations = line.stations;
  const currentStation = stations[currentIndex];

  // 自動讀站名
  useEffect(() => {
    if (currentStation && showInfo) {
      speak(currentStation.name);
    }
  }, [currentIndex, showInfo, speak, currentStation]);

  // 下一站
  const nextStation = () => {
    if (currentIndex < stations.length - 1) {
      setIsMoving(true);
      setShowInfo(false);
      
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
      }, 1500);
    }
  };

  // 上一站
  const prevStation = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowInfo(true);
    }
  };

  // 跳至指定站
  const jumpToStation = (index: number) => {
    setCurrentIndex(index);
    setShowInfo(true);
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
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 min-h-[300px] flex flex-col items-center justify-center">
        {/* 列車圖示 */}
        <div 
          className={`text-8xl mb-6 transition-transform duration-1000 ${
            isMoving ? 'translate-x-20' : 'translate-x-0'
          }`}
        >
          🚇
        </div>

        {/* 站名資訊 */}
        {showInfo && (
          <div className="text-center animate-fade-in">
            {/* 站名牌 */}
            <div 
              className="inline-block px-8 py-4 rounded-2xl mb-4"
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
            <p className="text-gray-500 text-sm px-4">{currentStation.description}</p>

            {/* 讀音按鈕 */}
            <button
              onClick={() => speak(currentStation.name)}
              className="mt-4 px-6 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 flex items-center gap-2 mx-auto"
            >
              🔊 再讀一次
            </button>
          </div>
        )}

        {/* 行駛中提示 */}
        {isMoving && (
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-400">🚄 列車行駛中...</p>
            <p className="text-gray-400">下一站：{stations[currentIndex + 1]?.name}</p>
          </div>
        )}
      </div>

      {/* 控制按鈕 */}
      <div className="flex gap-4">
        <button
          onClick={prevStation}
          disabled={currentIndex === 0 || isMoving}
          className="flex-1 py-4 rounded-xl bg-gray-100 text-gray-700 font-bold disabled:opacity-50 hover:bg-gray-200 transition-colors"
        >
          ← 上一站
        </button>
        <button
          onClick={nextStation}
          disabled={currentIndex === stations.length - 1 || isMoving}
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
    </div>
  );
}
