/**
 * 港鐵顏色測試排行榜
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/lib/auth-context';

interface LeaderboardEntry {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  score: number;
  correctCount: number;
  title: string;
  createdAt: Date | string;
}

interface LeaderboardProps {
  onBack: () => void;
  myScore?: number;
  myCorrectCount?: number;
  myTitle?: string;
}

export function Leaderboard({ onBack, myScore, myCorrectCount, myTitle }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const { firebaseUser: user, isLoading: authLoading } = useAuth();

  // 讀取排行榜
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const q = query(
          collection(db, 'mtrColorQuizLeaderboard'),
          orderBy('score', 'desc'),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as LeaderboardEntry[];
        setEntries(data);
      } catch (err) {
        console.error('載入排行榜失敗:', err);
      } finally {
        setLoading(false);
      }
    };
    loadLeaderboard();
  }, []);

  // 儲存分數
  const saveScore = async () => {
    if (!user || myScore === undefined) return;
    
    try {
      await addDoc(collection(db, 'mtrColorQuizLeaderboard'), {
        userId: user?.uid || '',
        userName: user?.displayName || '匿名玩家',
        userPhoto: user?.photoURL || '',
        score: myScore,
        correctCount: myCorrectCount || 0,
        title: myTitle || '乘客',
        createdAt: serverTimestamp(),
      });
      setSaved(true);
      // 重新載入排行榜
      const q = query(
        collection(db, 'mtrColorQuizLeaderboard'),
        orderBy('score', 'desc'),
        limit(20)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LeaderboardEntry[];
      setEntries(data);
    } catch (err) {
      console.error('儲存分數失敗:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          ← 返回
        </button>
        <h2 className="text-xl font-bold text-gray-800">🏆 排行榜</h2>
        <span className="w-8" />
      </div>

      {/* 我的分數 */}
      {myScore !== undefined && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center mb-6 shadow-xl">
          <p className="text-sm opacity-80 mb-2">今次成績</p>
          <p className="text-4xl font-bold mb-2">{myScore}分</p>
          <p className="text-lg">{myTitle}</p>
          <p className="text-sm opacity-80 mt-1">答對 {myCorrectCount}/15 題</p>
          
          {/* 儲存按鈕 */}
          {user ? (
            !saved ? (
              <button
                onClick={saveScore}
                className="mt-4 px-6 py-2 bg-white text-purple-600 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                💾 儲存到排行榜
              </button>
            ) : (
              <p className="mt-4 text-sm opacity-80">✅ 已儲存</p>
            )
          ) : (
            <p className="mt-4 text-xs opacity-70">登入後可儲存分數</p>
          )}
        </div>
      )}

      {/* 排行榜列表 */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-bold text-gray-800">🥇 前 20 名</h3>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-400">載入中...</div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center text-gray-400">暫無數據，快啲黎挑戰！</div>
        ) : (
          <div className="divide-y">
            {entries.map((entry, idx) => (
              <div 
                key={entry.id} 
                className={`p-4 flex items-center gap-3 ${
                  user && entry.userId === user.uid ? 'bg-yellow-50' : ''
                }`}
              >
                {/* 名次 */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                  ${idx === 0 ? 'bg-yellow-400 text-yellow-800' : 
                    idx === 1 ? 'bg-gray-300 text-gray-700' :
                    idx === 2 ? 'bg-orange-300 text-orange-800' :
                    'bg-gray-100 text-gray-600'}
                `}>
                  {idx + 1}
                </div>
                
                {/* 頭像 */}
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {entry.userPhoto ? (
                    <div className="relative w-full h-full">
                      <Image src={entry.userPhoto} alt="" fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl">👤</div>
                  )}
                </div>
                
                {/* 資料 */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{entry.userName}</p>
                  <p className="text-xs text-gray-500">{entry.title}</p>
                </div>
                
                {/* 分數 */}
                <div className="text-right">
                  <p className="font-bold text-purple-600">{entry.score}分</p>
                  <p className="text-xs text-gray-400">{entry.correctCount}/15</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 說明 */}
      <p className="text-center text-gray-400 text-xs mt-4">
        只顯示前 20 名高分玩家
      </p>
    </div>
  );
}
