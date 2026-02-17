/**
 * 學習區主頁
 * Learn Page
 * 
 * 課程地圖 + 六角雷達圖 + 徽章牆
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { LessonService, UserService } from '@/lib/firestore';
import { LessonCard, LevelCard, StatCard } from '@/components/ui/card';
import { AbilityRadarChart } from '@/components/charts/radar-chart';
import type { Lesson, User } from '@/types';

// 靜態課程資料（N5 形容詞）
const staticN5Lesson = {
  id: 'n5-lesson-8',
  title: '第八課：形容詞',
  description: '學習常用形容詞：高い、安い、重い、軽い等，掌握い形容詞的基本用法。',
  category: '基礎文法',
  level: 'N5',
  path: '/learn/n5/lesson-8',
  vocabCount: 10,
};

export default function LearnPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 加載數據
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // 加載課程
        const fetchedLessons = await LessonService.getLessons();
        setLessons(fetchedLessons);
        
        // 如果用戶已登入，加載用戶數據
        if (user?.uid) {
          const fetchedUser = await UserService.getUser(user.uid);
          setUserData(fetchedUser);
        }
      } catch (err) {
        console.error('Error loading learn page:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.uid]);

  if (isLoading || authLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-gray-200 rounded-2xl" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const displayUser = userData || user;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* 頁面標題 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎯 系統學習</h1>
        <p className="text-gray-600">結構化課程，循序漸進學習日文</p>
      </div>

      {/* 靜態 N5 課程區塊 - 所有人可見 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">📚 N5 基礎課程</h2>
            <p className="text-sm text-gray-500 mt-1">免登入即可學習的基礎課程</p>
          </div>
          <span className="px-3 py-1 bg-[#E0D5C7] text-[#4A4A4A] text-xs rounded-full">
            免費開放
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* N5 Lesson 8 */}
          <Link href={staticN5Lesson.path}>
            <div className="group bg-[#FAF9F7] border-t border-[#E5E5E5] hover:bg-[#F5F5F0] transition-all duration-300 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-[#8C8C8C] tracking-wider">{staticN5Lesson.level}</span>
                    <span className="w-px h-3 bg-[#E5E5E5]" />
                    <span className="text-xs text-[#8C8C8C]">{staticN5Lesson.category}</span>
                  </div>
                  <h3 className="text-xl font-normal text-[#4A4A4A] group-hover:text-[#6B6B6B] transition-colors tracking-wide mb-2">
                    {staticN5Lesson.title}
                  </h3>
                  <p className="text-sm text-[#8C8C8C] line-clamp-2">
                    {staticN5Lesson.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-[#B5B5B5]">
                    <span>{staticN5Lesson.vocabCount} 個生字</span>
                    <span>•</span>
                    <span>含測驗</span>
                  </div>
                </div>
                <span className="text-[#8C8C8C] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {displayUser ? (
        <>
          {/* 用戶概覽區域 */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* 等級卡片 */}
            <div className="lg:col-span-1">
              <LevelCard
                level={displayUser.level}
                exp={displayUser.achievementExp}
                streakDays={displayUser.streakDays}
              />
            </div>

            {/* 六角雷達圖 */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📊 實力分析</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <AbilityRadarChart
                  abilityScores={displayUser.abilityScores}
                  size={280}
                />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-violet-500 mr-2" />
                    <span className="text-gray-600">發音: {displayUser.abilityScores.pronunciation.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-pink-500 mr-2" />
                    <span className="text-gray-600">漢字: {displayUser.abilityScores.kanji.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                    <span className="text-gray-600">詞彙: {displayUser.abilityScores.vocabulary.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                    <span className="text-gray-600">文法: {displayUser.abilityScores.grammar.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                    <span className="text-gray-600">聽力: {displayUser.abilityScores.listening.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <span className="text-gray-600">應用: {displayUser.abilityScores.application.best}分</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 統計卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon="📖"
              label="已完成"
              value={displayUser.completedLessons.length}
              subtext={`共 ${lessons.length} 課`}
              color="earth"
            />
            <StatCard
              icon="🔓"
              label="已解鎖"
              value={displayUser.unlockedLessons.length}
              color="gray"
            />
            <StatCard
              icon="⭐"
              label="成就分數"
              value={displayUser.achievementExp}
              color="warm"
            />
            <StatCard
              icon="🏅"
              label="徽章"
              value={displayUser.badges.length}
              color="gray"
            />
          </div>
        </>
      ) : (
        // 未登入提示 - 改為更友好的提示
        <div className="bg-gradient-to-r from-[#C4B9AC] to-[#8C8C8C] rounded-2xl p-8 text-white text-center mb-8">
          <div className="text-4xl mb-4">👋</div>
          <h2 className="text-2xl font-bold mb-2">歡迎來到學習區！</h2>
          <p className="opacity-90 mb-4">上方的 N5 基礎課程可以免登入學習</p>
          <p className="text-sm opacity-75 mb-4">登入後可追蹤學習進度、解鎖更多課程、參與討論</p>
          <Link href="/">
            <span className="inline-block px-6 py-3 bg-white text-[#4A4A4A] rounded-xl font-medium hover:bg-gray-100 transition-colors">
              登入解鎖更多功能
            </span>
          </Link>
        </div>
      )}

      {/* 課程地圖 - 對未登入用戶顯示鎖定狀態 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">🗺️ 系統課程地圖</h2>
          {displayUser ? (
            <span className="text-sm text-gray-500">
              已完成 {displayUser.completedLessons.length} / {lessons.length} 課
            </span>
          ) : (
            <span className="text-sm text-gray-500">登入後解鎖課程</span>
          )}
        </div>

        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson) => {
              const isUnlocked = displayUser
                ? LessonService.isLessonUnlocked(lesson, displayUser.completedLessons)
                : false; // 未登入用戶無法進入系統課程
              
              const isCompleted = displayUser
                ? displayUser.completedLessons.includes(lesson.id)
                : false;

              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isUnlocked={isUnlocked}
                  isCompleted={isCompleted}
                  userLevel={displayUser?.level}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-gray-500">課程準備中，敬請期待</p>
          </div>
        )}
      </div>
    </div>
  );
}
