/**
 * 港鐵小站長 - 所有港鐵路線學習
 * 
 * 路徑：/studychi
 * 
 * 功能：
 * - 選擇不同路線（東鐵、屯馬、觀塘、港島、荃灣、將軍澳、東涌）
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
import { ColorQuizUltimate } from './components/ColorQuizUltimate';
import { mtrLines, getLineById, MTRLine } from './data/mtr-stations';

type GameMode = 'menu' | 'select-line' | 'train' | 'color' | 'landmark' | 'listening' | 'speaking' | 'ultimate';

export default function StudyChiPage() {
  const [mode, setMode] = useState<GameMode>('menu');
  const [selectedLine, setSelectedLine] = useState<MTRLine>(mtrLines[0]);
  const [score, setScore] = useState(0);

  // 播放讀音（支援調整速度）
  const speak = useCallback((text: string, lang: string = 'zh-HK', rate: number = 0.7) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate; // 預設 0.7 較慢，可調 0.5 更慢
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }, []);

  // 選擇路線並開始遊戲
  const selectLineAndPlay = (lineId: string, gameMode: GameMode) => {
    const line = getLineById(lineId);
    if (line) {
      setSelectedLine(line);
      setMode(gameMode);
    }
  };

  // 路線選擇畫面
  if (mode === 'select-line') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4">
        <div className="max-w-md mx-auto">
          {/* 標題 */}
          <div className="text-center py-6">
            <button 
              onClick={() => setMode('menu')}
              className="text-gray-500 mb-4 flex items-center justify-center gap-1"
            >
              ← 返回
            </button>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">揀路線</h1>
            <p className="text-gray-600">選擇你想學習嘅港鐵路線</p>
          </div>

          {/* 路線列表 */}
          <div className="space-y-3">
            {mtrLines.map((line) => (
              <button
                key={line.id}
                onClick={() => selectLineAndPlay(line.id, 'train')}
                className="w-full bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${line.colorCode}20` }}
                >
                  <span style={{ color: line.colorCode }}>🚇</span>
                </div>
                <div className="text-left flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{line.name}</h2>
                  <p className="text-gray-500 text-sm">{line.nameEn}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: line.colorCode }}
                    />
                    <span className="text-xs text-gray-400">{line.color} · {line.stations.length}個站</span>
                  </div>
                </div>
                <span className="text-gray-300">→</span>
              </button>
            ))}
          </div>

          {/* 統計 */}
          <div className="mt-8 bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-3">📊 港鐵網絡概覽</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-2xl font-bold text-blue-500">{mtrLines.length}</p>
                <p className="text-gray-500 text-sm">條路線</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-2xl font-bold text-green-500">
                  {mtrLines.reduce((sum, l) => sum + l.stations.length, 0)}
                </p>
                <p className="text-gray-500 text-sm">個車站</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 菜單畫面
  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4">
        <div className="max-w-md mx-auto">
          {/* 標題 */}
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🚇</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">港鐵小站長</h1>
            <p className="text-gray-600">認識所有港鐵站名</p>
          </div>

          {/* 分數 */}
          <div className="bg-white rounded-2xl p-4 shadow-lg mb-6 text-center">
            <p className="text-gray-500 text-sm">累積分數</p>
            <p className="text-4xl font-bold text-orange-500">⭐ {score}</p>
          </div>

          {/* 遊戲選擇 */}
          <div className="space-y-4">
            <button
              onClick={() => setMode('select-line')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🚄</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">列車旅程</h2>
                <p className="text-gray-500 text-sm">坐港鐵遊香港，學站名</p>
              </div>
            </button>

            <button
              onClick={() => setMode('color')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🎨</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">顏色配對</h2>
                <p className="text-gray-500 text-sm">認識7條路線嘅顏色</p>
              </div>
            </button>

            <button
              onClick={() => setMode('select-line')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🏢</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">地標配對</h2>
                <p className="text-gray-500 text-sm">每個站有咩地標？</p>
              </div>
            </button>

            <button
              onClick={() => setMode('select-line')}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-4"
            >
              <span className="text-4xl">🎧</span>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-800">聆聽測驗</h2>
                <p className="text-gray-500 text-sm">聽站名，揀答案</p>
              </div>
            </button>

            <button
              onClick={() => setMode('select-line')}
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
            <h3 className="font-bold text-gray-800 mb-3">🚇 港鐵路線一覽</h3>
            <div className="space-y-2">
              {mtrLines.map((line) => (
                <div key={line.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                  <span 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: line.colorCode }}
                  />
                  <span className="font-medium text-gray-700">{line.name}</span>
                  <span className="text-gray-400 text-sm ml-auto">{line.stations.length}站</span>
                </div>
              ))}
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
          line={selectedLine}
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
          speak={speak}
        />
      )}
      {mode === 'color' && (
        <ColorMatch
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
        />
      )}
      {mode === 'landmark' && (
        <LandmarkMatch
          line={selectedLine}
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
          speak={speak}
        />
      )}
      {mode === 'listening' && (
        <ListeningQuiz
          line={selectedLine}
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
          speak={speak}
        />
      )}
      {mode === 'speaking' && (
        <SpeakingQuiz
          line={selectedLine}
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
        />
      )}
      {mode === 'ultimate' && (
        <ColorQuizUltimate
          onBack={() => setMode('menu')}
          onScore={(points) => setScore(s => s + points)}
        />
      )}
    </div>
  );
}
