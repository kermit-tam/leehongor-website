/**
 * CEM (Chinese/English/Math) 排行榜組件
 * 無需登入，使用 localStorage 儲存
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface LeaderboardEntry {
  name: string;
  score: number;
  time?: string;
  date: string;
}

interface CEMLeaderboardProps {
  gameKey: string; // 例如: 'trychi-shouzhudaitu', 'tryeng-spelling', 'trymath-lightning'
  title: string;
  scoreLabel?: string;
  showTime?: boolean;
  onRestart: () => void;
  onBack: () => void;
  finalScore?: number;
  finalTime?: string;
}

export function CEMLeaderboard({
  gameKey,
  title,
  scoreLabel = '分數',
  showTime = false,
  onRestart,
  onBack,
  finalScore,
  finalTime
}: CEMLeaderboardProps) {
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [view, setView] = useState<'input' | 'list'>('input');

  useEffect(() => {
    const saved = localStorage.getItem(`leaderboard-${gameKey}`);
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, [gameKey]);

  const saveScore = () => {
    if (!playerName.trim() || finalScore === undefined) return;

    const newEntry: LeaderboardEntry = {
      name: playerName.trim(),
      score: finalScore,
      time: finalTime,
      date: new Date().toLocaleDateString('zh-HK')
    };

    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(updated);
    localStorage.setItem(`leaderboard-${gameKey}`, JSON.stringify(updated));
    setView('list');
  };

  // 輸入名畫面
  if (view === 'input') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">練習完成！</h1>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-600 mb-2">{scoreLabel}</p>
            <p className="text-5xl font-black text-blue-600">{finalScore}</p>
            {showTime && finalTime && (
              <p className="text-gray-500 mt-2">用時: {finalTime}</p>
            )}
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="輸入你嘅名"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
              maxLength={10}
            />
            
            <button
              onClick={saveScore}
              disabled={!playerName.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🏆 儲存到排行榜
            </button>
            
            <button
              onClick={onRestart}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              🔄 再玩一次
            </button>
            
            <button
              onClick={onBack}
              className="w-full py-3 text-gray-500 hover:text-gray-700 transition-all"
            >
              ← 返回
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 排行榜畫面
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-black text-gray-800 mb-6 text-center">🏆 {title}排行榜</h1>
        
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center py-8">暫時未有記錄</p>
        ) : (
          <div className="space-y-3 mb-6">
            {leaderboard.map((entry, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  idx === 0 ? 'bg-yellow-100' :
                  idx === 1 ? 'bg-gray-100' :
                  idx === 2 ? 'bg-orange-50' :
                  'bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  idx === 0 ? 'bg-yellow-500 text-white' :
                  idx === 1 ? 'bg-gray-400 text-white' :
                  idx === 2 ? 'bg-orange-400 text-white' :
                  'bg-gray-300 text-gray-700'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{entry.name}</p>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-blue-600">{entry.score}分</p>
                  {showTime && entry.time && (
                    <p className="text-sm text-gray-500">{entry.time}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg"
          >
            🎮 再玩一次
          </button>
          
          <button
            onClick={onBack}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            ← 返回主頁
          </button>
        </div>
      </div>
    </div>
  );
}
