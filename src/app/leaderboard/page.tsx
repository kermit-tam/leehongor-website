/**
 * 排行榜頁面
 * Leaderboard Page
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { LeaderboardService, UserService } from '@/lib/firestore';
import type { LeaderboardUser } from '@/types';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [userRank, setUserRank] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // 加載排行榜數據
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setIsLoading(true);
        
        // 獲取排行榜
        const data = await LeaderboardService.getLeaderboard(50);
        setLeaderboard(data);
        
        // 如果用戶已登入，獲取用戶排名
        if (user?.uid) {
          const rank = await LeaderboardService.getUserRank(user.uid);
          setUserRank(rank);
        }
      } catch (err) {
        console.error('Error loading leaderboard:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, [user?.uid]);

  // 獲取用戶在排行榜中的位置
  const currentUserInLeaderboard = user
    ? leaderboard.find((u) => u.uid === user.uid)
    : null;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* 頁面標題 */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🏆</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">排行榜</h1>
        <p className="text-gray-600">看看誰是學習達人！</p>
      </div>

      {/* 前三名 podium */}
      {leaderboard.length >= 3 && (
        <div className="flex items-end justify-center gap-4 mb-10">
          {/* 第二名 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 ring-4 ring-gray-300">
                {leaderboard[1]?.avatar ? (
                  <Image
                    src={leaderboard[1].avatar}
                    alt={leaderboard[1].name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xl">
                    {leaderboard[1]?.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
            </div>
            <div className="text-sm font-medium text-gray-700 truncate max-w-[80px]">
              {leaderboard[1]?.name}
            </div>
            <div className="text-xs text-gray-500">{leaderboard[1]?.achievementExp} EXP</div>
            <div className="w-20 h-24 bg-gray-200 rounded-t-lg mt-2 flex items-center justify-center text-3xl">
              🥈
            </div>
          </div>

          {/* 第一名 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 ring-4 ring-yellow-400">
                {leaderboard[0]?.avatar ? (
                  <Image
                    src={leaderboard[0].avatar}
                    alt={leaderboard[0].name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-2xl">
                    {leaderboard[0]?.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                1
              </div>
            </div>
            <div className="font-bold text-gray-900 truncate max-w-[100px]">
              {leaderboard[0]?.name}
            </div>
            <div className="text-sm text-amber-600 font-medium">{leaderboard[0]?.achievementExp} EXP</div>
            <div className="w-24 h-32 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-t-lg mt-2 flex items-center justify-center text-4xl">
              🥇
            </div>
          </div>

          {/* 第三名 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 ring-4 ring-orange-400">
                {leaderboard[2]?.avatar ? (
                  <Image
                    src={leaderboard[2].avatar}
                    alt={leaderboard[2].name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xl">
                    {leaderboard[2]?.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
            </div>
            <div className="text-sm font-medium text-gray-700 truncate max-w-[80px]">
              {leaderboard[2]?.name}
            </div>
            <div className="text-xs text-gray-500">{leaderboard[2]?.achievementExp} EXP</div>
            <div className="w-20 h-20 bg-orange-100 rounded-t-lg mt-2 flex items-center justify-center text-3xl">
              🥉
            </div>
          </div>
        </div>
      )}

      {/* 用戶自己的排名（如果不在前50） */}
      {user && !currentUserInLeaderboard && userRank > 0 && (
        <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full font-bold mr-3">
                {userRank}
              </span>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">你的排名</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-indigo-600">{user.achievementExp} EXP</div>
              <div className="text-sm text-gray-500">Lv.{user.level}</div>
            </div>
          </div>
        </div>
      )}

      {/* 排行榜列表 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
            <div className="col-span-2 text-center">排名</div>
            <div className="col-span-6">用戶</div>
            <div className="col-span-2 text-center">等級</div>
            <div className="col-span-2 text-right">經驗值</div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaderboard.map((entry, index) => {
            const isCurrentUser = user?.uid === entry.uid;
            
            return (
              <div
                key={entry.uid}
                className={`p-4 transition-colors ${
                  isCurrentUser
                    ? 'bg-indigo-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* 排名 */}
                  <div className="col-span-2 text-center">
                    {index < 3 ? (
                      <span className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                    ) : (
                      <span className="text-gray-500 font-medium">{entry.rank}</span>
                    )}
                  </div>
                  
                  {/* 用戶信息 */}
                  <div className="col-span-6 flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3 flex-shrink-0">
                      {entry.avatar ? (
                        <Image
                          src={entry.avatar}
                          alt={entry.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 text-sm font-bold">
                          {entry.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className={`font-medium truncate ${isCurrentUser ? 'text-indigo-700' : 'text-gray-900'}`}>
                        {entry.name}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                            你
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        🔥 {entry.streakDays}天連續 · 🏅 {entry.badgesCount}徽章
                      </div>
                    </div>
                  </div>
                  
                  {/* 等級 */}
                  <div className="col-span-2 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      index === 0
                        ? 'bg-yellow-100 text-yellow-700'
                        : index === 1
                        ? 'bg-gray-100 text-gray-700'
                        : index === 2
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      Lv.{entry.level}
                    </span>
                  </div>
                  
                  {/* 經驗值 */}
                  <div className="col-span-2 text-right">
                    <div className="font-bold text-gray-900">{entry.achievementExp}</div>
                    <div className="text-xs text-gray-400">EXP</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部提示 */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>排行榜每週更新，繼續學習提升你的排名吧！</p>
      </div>
    </div>
  );
}
