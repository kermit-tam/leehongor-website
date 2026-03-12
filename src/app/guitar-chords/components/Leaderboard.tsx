'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLeaderboard, getLeaderboardStats, type LeaderboardEntry } from '../services/leaderboard';
import type { Difficulty } from '../page';

interface LeaderboardProps {
  currentDifficulty?: Difficulty;
  onClose: () => void;
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: '新手',
  easy: '初階',
  medium: '中階',
  hard: '進階',
  expert: '高手',
  legend: '傳奇',
};

export function Leaderboard({ currentDifficulty, onClose }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState({ totalPlayers: 0, totalGames: 0, avgScore: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Difficulty | 'all'>(currentDifficulty || 'all');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(entries.filter(e => e.difficulty === filter));
    }
  }, [entries, filter]);

  const loadData = async () => {
    setLoading(true);
    const [leaderboardData, statsData] = await Promise.all([
      getLeaderboard(undefined, 100),
      getLeaderboardStats(),
    ]);
    setEntries(leaderboardData);
    setStats(statsData);
    setLoading(false);
  };

  const formatTime = (centiseconds: number) => {
    const mins = Math.floor(centiseconds / 6000);
    const secs = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;
    return `${mins}:${secs.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black">🏆 全球排行榜</h2>
              <p className="text-white/80 text-sm mt-1">
                {stats.totalPlayers} 位玩家 · {stats.totalGames} 場遊戲
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="p-4 border-b">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map((diff) => (
              <button
                key={diff}
                onClick={() => setFilter(diff)}
                className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
                  filter === diff
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {DIFFICULTY_LABELS[diff]}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-4">⏳</div>
              <p>載入中...</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-4">🎸</div>
              <p>暫無數據</p>
              <p className="text-sm mt-2">成為第一個上榜的玩家！</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-4 font-bold">排名</th>
                  <th className="p-4 font-bold">玩家</th>
                  <th className="p-4 font-bold">難度</th>
                  <th className="p-4 font-bold text-right">分數</th>
                  <th className="p-4 font-bold text-right">時間</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b hover:bg-gray-50 ${
                      index === 0 ? 'bg-yellow-50' :
                      index === 1 ? 'bg-gray-50' :
                      index === 2 ? 'bg-orange-50' : ''
                    }`}
                  >
                    <td className="p-4">
                      {index === 0 ? (
                        <span className="text-2xl">🥇</span>
                      ) : index === 1 ? (
                        <span className="text-2xl">🥈</span>
                      ) : index === 2 ? (
                        <span className="text-2xl">🥉</span>
                      ) : (
                        <span className="font-bold text-gray-500">#{index + 1}</span>
                      )}
                    </td>
                    <td className="p-4 font-medium">{entry.playerName}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        entry.difficulty === 'legend' ? 'bg-purple-100 text-purple-700' :
                        entry.difficulty === 'expert' ? 'bg-red-100 text-red-700' :
                        entry.difficulty === 'hard' ? 'bg-orange-100 text-orange-700' :
                        entry.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        entry.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {DIFFICULTY_LABELS[entry.difficulty]}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-bold text-lg">{entry.score}/{entry.totalQuestions}</span>
                      <span className="text-xs text-gray-500 ml-1">({entry.accuracy}%)</span>
                    </td>
                    <td className="p-4 text-right font-mono text-sm text-gray-600">
                      {formatTime(entry.timeElapsed)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t text-center">
          <button
            onClick={loadData}
            className="px-6 py-2 bg-white border-2 border-amber-500 text-amber-600 rounded-xl font-bold hover:bg-amber-50 transition-colors"
          >
            🔄 刷新排行榜
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
