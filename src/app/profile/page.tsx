/**
 * 個人中心頁面
 * Profile Page
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth, useRequireAuth } from '@/lib/auth-context';
import { UserService } from '@/lib/firestore';
import { getCheckinStats, CheckinData } from '@/lib/daily-checkin';
import { StatCard } from '@/components/ui/card';
import { AbilityRadarChart, AbilityScoresGrid } from '@/components/charts/radar-chart';
import { Button } from '@/components/ui/button';
import type { User } from '@/types';

// 徽章列表（靜態數據）
const BADGES = [
  { id: 'first-lesson', name: '初學者', description: '完成第一課', icon: '🌱' },
  { id: 'streak-7', name: '一週達人', description: '連續登入7天', icon: '🔥' },
  { id: 'streak-30', name: '月度之星', description: '連續登入30天', icon: '⭐' },
  { id: 'level-5', name: '進階學習者', description: '達到等級5', icon: '📈' },
  { id: 'level-10', name: '日文達人', description: '達到等級10', icon: '🏆' },
  { id: 'perfect-score', name: '完美主義', description: '測驗100分', icon: '💯' },
  { id: 'all-dimensions', name: '全能選手', description: '所有維度超過80分', icon: '🎯' },
  { id: 'early-bird', name: '早起鳥', description: '早上6點前學習', icon: '🌅' },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [checkinData, setCheckinData] = useState<CheckinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 確保已登入
  useRequireAuth('/');

  // 加載用戶數據
  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.uid) return;
      
      try {
        setIsLoading(true);
        const [data, checkinStats] = await Promise.all([
          UserService.getUser(user.uid),
          getCheckinStats(user.uid),
        ]);
        setUserData(data);
        setCheckinData(checkinStats as CheckinData);
      } catch (err) {
        console.error('Error loading user data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [user?.uid]);

  if (isLoading || !userData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  const displayUser = userData || user;
  const nextLevelExp = UserService.getNextLevelExp(displayUser.level);
  const currentLevelBase = (displayUser.level - 1) * 500;
  const expInCurrentLevel = displayUser.achievementExp - currentLevelBase;
  const expNeeded = nextLevelExp - currentLevelBase;
  const progress = Math.min((expInCurrentLevel / expNeeded) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* 頁面標題 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">👤 個人中心</h1>
        <p className="text-gray-600">查看你的學習進度和成就</p>
      </div>

      {/* 用戶信息卡片 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* 頭像 */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 ring-4 ring-indigo-100">
              {displayUser.avatar ? (
                <Image
                  src={displayUser.avatar}
                  alt={displayUser.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                  {displayUser.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
              {displayUser.level}
            </div>
          </div>

          {/* 用戶信息 */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{displayUser.name}</h2>
            <p className="text-gray-500 mb-4">{displayUser.email}</p>
            
            {/* 等級進度 */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Lv.{displayUser.level}</span>
                <span className="text-gray-400">{displayUser.achievementExp} / {nextLevelExp} EXP</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* 角色標籤 */}
            {displayUser.role === 'admin' && (
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                ⚙️ 管理員
              </span>
            )}
          </div>

          {/* 操作按鈕 */}
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              刷新數據
            </Button>
            <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              登出
            </Button>
          </div>
        </div>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon="⭐"
          label="成就分數"
          value={displayUser.achievementExp}
          subtext={`Lv.${displayUser.level}`}
          color="warm"
        />
        <StatCard
          icon="📖"
          label="已完成"
          value={displayUser.completedLessons.length}
          color="earth"
        />
        <StatCard
          icon="🔓"
          label="已解鎖"
          value={displayUser.unlockedLessons.length}
          color="gray"
        />
        <StatCard
          icon="🔥"
          label="連續登入"
          value={`${checkinData?.streak || 0}天`}
          subtext={`總共 ${checkinData?.totalCheckins || 0} 次`}
          color="warm"
        />
      </div>

      {/* 六角雷達圖 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">📊 實力分析（六角雷達）</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <AbilityRadarChart
            abilityScores={displayUser.abilityScores}
            size={320}
          />
          <div className="w-full max-w-sm">
            <AbilityScoresGrid
              abilityScores={displayUser.abilityScores}
            />
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          每次完成測驗，系統會根據你的表現更新各維度分數（只記錄最高分）
        </p>
      </div>

      {/* 徽章牆 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">🏅 徽章牆</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = displayUser.badges.includes(badge.id);
            
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl text-center transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200'
                    : 'bg-gray-50 border-2 border-gray-100 opacity-60'
                }`}
              >
                <div className={`text-4xl mb-2 ${isUnlocked ? '' : 'grayscale'}`}>
                  {badge.icon}
                </div>
                <div className={`font-bold text-sm mb-1 ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                  {badge.name}
                </div>
                <div className={`text-xs ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                  {badge.description}
                </div>
                {isUnlocked && (
                  <div className="mt-2 text-xs text-amber-600 font-medium">
                    ✓ 已解鎖
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
