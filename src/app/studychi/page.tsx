/**
 * 港鐵小站長 - 東鐵綫學習
 * 
 * 路徑：/studychi
 * 
 * 功能：
 * - 列車動畫旅程
 * - 顏色配對
 * - 地標配對
 * - 聆聽測驗
 * - 讀站名測驗
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrainJourney } from './components/TrainJourney';
import { ColorMatch } from './components/ColorMatch';
import { LandmarkMatch } from './components/LandmarkMatch';
import { ListeningQuiz } from './components/ListeningQuiz';
import { SpeakingQuiz } from './components/SpeakingQuiz';
import { eastRailLine } from './data/mtr-stations';

type GameMode = 'menu' | 'train' | 'color' | 'landmark' | 'listening' | 'speaking';

export default function StudyChiPage() {
  const [mode, setMode] = useState<GameMode>('menu');
  const [score, setScore] = useState(0);

  // 播放讀音
  const speak = useCallback((text: string, lang: string = 'zh-HK') => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  // 菜單畫面
  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4">
        <div className="max-w-md mx-auto">
          {/* 標題 */}
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🚇</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">港鐵小站長</h1>
            <p className="text-gray-600">東鐵綫站名學習</p>
            <div className="mt-4 inline-block px-4 py-2 rounded-full" style={{ backgroundColor: eastRailLine.colorCode }}>
              <span className="text-white font-bold">🔵 {eastRailLine.name}</span>
            </div>
          </div>

          {/* 分數 */}
          <div className="bg-white rounded-2xl p-4 shadow-lg mb-6 text-center">
            <p className="text-gray-500 text-sm">累積分數</p>
            <p className="text-4xl font-bold text-orange-500">⭐ {score}</p>
          </div>

          {/* 遊戲選擇 */}
          <div className="space-y-4">
            <button
              onClick={() => setMode('train')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🚄</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">列車旅程</h2>
                <p className="text-gray-500 text-sm">坐東鐵遊香港，學站名</p>
              </div>
            </button>

            <button
              onClick={() => setMode('color')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🎨</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">顏色配對</h2>
                <p className="text-gray-500 text-sm">認識東鐵綫淺藍色</p>
              </div>
            </button>

            <button
              onClick={() => setMode('landmark')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🏢</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">地標配對</h2>
                <p className="text-gray-500 text-sm">每個站有咩地標？</p>
              </div>
            </button>

            <button
              onClick={() => setMode('listening')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🎧</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">聆聽測驗</h2>
                <p className="text-gray-500 text-sm">聽站名，揀答案</p>
              </div>
            </button>

            <button
              onClick={() => setMode('speaking')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🎤</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">站長廣播</h2>
                <p className="text-gray-500 text-sm">讀出站名，做個小站長</p>
              </div>
            </button>
          </div>

          {/* 路線資料 */}
          <div className="mt-8 bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-3">🚇 東鐵綫資料</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-2xl font-bold text-blue-500">16</p>
                <p className="text-gray-500 text-sm">個車站</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-2xl font-bold text-blue-500">47.5</p>
                <p className="text-gray-500 text-sm">公里長</p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-xl" style={{ backgroundColor: `${eastRailLine.colorCode}20` }}>
              <p className="text-sm text-gray-600">
                <strong>路線特色：</strong>由金鐘到羅湖/落馬洲，係香港歷史最悠久嘅鐵路綫，可以過關去深圳！
              </p>
            </div>
          </div>

          {/* 版權 */}
          <p className="text-center text-gray-400 text-xs mt-8">
            港鐵小站長 © 2026 學習用途
          </p>
        </div>
      </div>
    );
  }

  // 各遊戲模式
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      {mode === 'train' && (
        <TrainJourney
          line={eastRailLine}
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
          speak={speak}
        />
      )}
      {mode === 'color' && (
        <ColorMatch
          line={eastRailLine}
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
        />
      )}
      {mode === 'landmark' && (
        <LandmarkMatch
          line={eastRailLine}
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
          speak={speak}
        />
      )}
      {mode === 'listening' && (
        <ListeningQuiz
          line={eastRailLine}
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
          speak={speak}
        />
      )}
      {mode === 'speaking' && (
        <SpeakingQuiz
          line={eastRailLine}
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
        />
      )}
    </div>
  );
}
