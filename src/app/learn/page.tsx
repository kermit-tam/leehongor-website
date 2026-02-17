/**
 * 學習區主頁 - N5 完整課程
 * Learn Page with N5 Lessons 1-15
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { LessonService, UserService } from '@/lib/firestore';
import { LevelCard, StatCard } from '@/components/ui/card';
import { AbilityRadarChart } from '@/components/charts/radar-chart';
import { n5Lessons, getTotalN5Vocab, calculateLevel, scoringConfig } from '@/data/n5-lessons';
import type { Lesson, User } from '@/types';

// N5 課程卡片組件
function N5LessonCard({
  lesson,
  isCompleted,
  progress,
  onClick,
}: {
  lesson: (typeof n5Lessons)[0];
  isCompleted: boolean;
  progress: number;
  onClick: () => void;
}) {
  const isAvailable = lesson.lessonNum === 1 || lesson.lessonNum === 8; // 暫時只開放第1和第8課

  return (
    <motion.div
      onClick={isAvailable ? onClick : undefined}
      className={`relative p-5 rounded-xl border transition-all ${
        isCompleted
          ? 'bg-[#E8F5E9] border-[#A5D6A7]'
          : isAvailable
          ? 'bg-white border-[#E0E0E0] hover:border-[#C4B9AC] hover:shadow-md cursor-pointer'
          : 'bg-[#F5F5F5] border-[#E0E0E0] opacity-60'
      }`}
      whileTap={isAvailable ? { scale: 0.98 } : undefined}
    >
      {/* 狀態標記 */}
      <div className="absolute top-3 right-3">
        {isCompleted ? (
          <span className="w-6 h-6 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-sm">✓</span>
        ) : isAvailable ? (
          <span className="text-[#C4B9AC]">→</span>
        ) : (
          <span className="text-[#BDBDBD]">🔒</span>
        )}
      </div>

      {/* 課程編號 */}
      <div className="text-xs text-[#8C8C8C] mb-1 tracking-wider">
        第 {lesson.lessonNum} 課
      </div>

      {/* 標題 */}
      <h3 className={`text-lg font-medium mb-1 ${isAvailable ? 'text-[#4A4A4A]' : 'text-[#9E9E9E]'}`}>
        {lesson.title}
      </h3>

      {/* 描述 */}
      <p className={`text-xs mb-3 line-clamp-2 ${isAvailable ? 'text-[#8C8C8C]' : 'text-[#BDBDBD]'}`}>
        {lesson.description}
      </p>

      {/* 元信息 */}
      <div className="flex items-center gap-3 text-xs text-[#BDBDBD]">
        <span>{lesson.totalVocab} 詞</span>
        <span>•</span>
        <span>約 {lesson.estimatedTime} 分鐘</span>
      </div>

      {/* 進度條 */}
      {isAvailable && progress > 0 && !isCompleted && (
        <div className="mt-3">
          <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C4B9AC] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#8C8C8C] mt-1">{progress}% 完成</p>
        </div>
      )}

      {/* 已完成標記 */}
      {isCompleted && (
        <div className="mt-2 text-xs text-[#4CAF50] font-medium">已完成</div>
      )}

      {/* 即將推出標記 */}
      {!isAvailable && (
        <div className="mt-2 text-xs text-[#BDBDBD]">即將推出</div>
      )}
    </motion.div>
  );
}

export default function LearnPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({});

  // 加載數據
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // 加載 Firestore 課程
        const fetchedLessons = await LessonService.getLessons();
        setLessons(fetchedLessons);

        // 如果用戶已登入，加載用戶數據
        if (user?.uid) {
          const fetchedUser = await UserService.getUser(user.uid);
          setUserData(fetchedUser);
          
          // 從 localStorage 讀取 N5 課程進度
          const savedProgress = localStorage.getItem('n5-lesson-progress');
          if (savedProgress) {
            setLessonProgress(JSON.parse(savedProgress));
          }
          
          const savedCompleted = localStorage.getItem('n5-lesson-completed');
          if (savedCompleted) {
            setCompletedLessons(new Set(JSON.parse(savedCompleted)));
          }
        }
      } catch (err) {
        console.error('Error loading learn page:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.uid]);

  // 計算總進度
  const totalVocab = getTotalN5Vocab();
  const availableLessons = n5Lessons.filter(l => l.lessonNum === 1 || l.lessonNum === 8);
  const completedCount = completedLessons.size;
  const totalProgress = Math.round((completedCount / availableLessons.length) * 100);

  // 計算用戶等級
  const userExp = userData?.achievementExp || 0;
  const { level, currentExp, nextLevelExp, progress: levelProgress } = calculateLevel(userExp);

  const handleLessonClick = (lessonId: string) => {
    window.location.href = `/learn/n5/${lessonId.replace('n5-lesson-', 'lesson-')}`;
  };

  if (isLoading || authLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-gray-200 rounded-2xl" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* 頁面標題 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4A4A4A] mb-2">🎯 N5 基礎課程</h1>
        <p className="text-[#8C8C8C]">
          大家的日本語 • 第1-15課 • 共 {totalVocab} 個詞彙
        </p>
      </div>

      {/* 進度概覽 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8E8] p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#4A4A4A]">📊 學習進度</h2>
          <span className="text-sm text-[#8C8C8C]">{completedCount}/{availableLessons.length} 課完成</span>
        </div>
        
        <div className="h-3 bg-[#F5F5F0] rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-[#C4B9AC] rounded-full transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
        <p className="text-xs text-[#8C8C8C]">
          {totalProgress}% 完成 • 已完成 {completedCount} 課
        </p>
      </div>

      {/* 課程地圖 - N5 第1-15課 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8E8] p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#4A4A4A]">🗺️ 課程地圖</h2>
          <span className="text-sm text-[#8C8C8C]">暫開放第1、8課</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {n5Lessons.map((lesson) => (
            <N5LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={completedLessons.has(lesson.id)}
              progress={lessonProgress[lesson.id] || 0}
              onClick={() => handleLessonClick(lesson.id)}
            />
          ))}
        </div>
      </div>

      {/* 計分系統說明 */}
      <div className="bg-[#FAF9F7] rounded-2xl border border-[#E8E8E8] p-6 mb-8">
        <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">🏆 計分系統</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 經驗值獲取方式 */}
          <div>
            <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">經驗值獲取</h3>
            <ul className="space-y-2 text-sm text-[#8C8C8C]">
              <li className="flex justify-between">
                <span>完成單元學習</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.unitBaseExp} EXP</span>
              </li>
              <li className="flex justify-between">
                <span>測驗 100% (完美)</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.quizRewards.perfect.exp} EXP</span>
              </li>
              <li className="flex justify-between">
                <span>測驗 80-99% (優秀)</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.quizRewards.excellent.exp} EXP</span>
              </li>
              <li className="flex justify-between">
                <span>測驗 60-79% (及格)</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.quizRewards.good.exp} EXP</span>
              </li>
              <li className="flex justify-between">
                <span>完成整課</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.lessonComplete.base} EXP</span>
              </li>
              <li className="flex justify-between">
                <span>每日登入</span>
                <span className="text-[#C4B9AC]">+{scoringConfig.streakRewards.daily} EXP</span>
              </li>
            </ul>
          </div>

          {/* 等級系統 */}
          <div>
            <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">等級系統</h3>
            <div className="bg-white rounded-lg p-4 border border-[#E8E8E8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-[#4A4A4A]">Lv.{level}</span>
                <span className="text-sm text-[#8C8C8C]">{currentExp}/{nextLevelExp} EXP</span>
              </div>
              <div className="h-2 bg-[#F5F5F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C4B9AC] rounded-full transition-all"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
              <p className="text-xs text-[#8C8C8C] mt-2">
                還需 {nextLevelExp - currentExp} EXP 升級
              </p>
            </div>
            
            <div className="mt-4 text-xs text-[#8C8C8C]">
              <p>等級計算：每級所需經驗遞增 20%</p>
              <p>當前總經驗：{userExp} EXP</p>
            </div>
          </div>
        </div>
      </div>

      {/* 用戶數據（如已登入） */}
      {userData && (
        <>
          {/* 用戶概覽 */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <LevelCard
                level={level}
                exp={userExp}
                streakDays={userData.streakDays}
              />
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E8E8E8] p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">📊 實力分析</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <AbilityRadarChart
                  abilityScores={userData.abilityScores}
                  size={240}
                />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-violet-500 mr-2" />
                    <span className="text-[#8C8C8C]">發音: {userData.abilityScores.pronunciation.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-pink-500 mr-2" />
                    <span className="text-[#8C8C8C]">漢字: {userData.abilityScores.kanji.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                    <span className="text-[#8C8C8C]">詞彙: {userData.abilityScores.vocabulary.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                    <span className="text-[#8C8C8C]">文法: {userData.abilityScores.grammar.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                    <span className="text-[#8C8C8C]">聽力: {userData.abilityScores.listening.best}分</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <span className="text-[#8C8C8C]">應用: {userData.abilityScores.application.best}分</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 統計卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon="📖"
              label="已完成"
              value={completedCount}
              subtext={`共 ${availableLessons.length} 課`}
              color="earth"
            />
            <StatCard
              icon="⭐"
              label="成就分數"
              value={userExp}
              color="warm"
            />
            <StatCard
              icon="🔥"
              label="連續登入"
              value={userData.streakDays}
              subtext="天"
              color="gray"
            />
            <StatCard
              icon="🏅"
              label="徽章"
              value={userData.badges.length}
              color="gray"
            />
          </div>
        </>
      )}

      {/* 未登入提示 */}
      {!user && (
        <div className="bg-gradient-to-r from-[#C4B9AC] to-[#8C8C8C] rounded-2xl p-8 text-white text-center">
          <div className="text-4xl mb-4">👋</div>
          <h2 className="text-2xl font-bold mb-2">歡迎來到 N5 課程！</h2>
          <p className="opacity-90 mb-4">登入後可追蹤學習進度、獲取經驗值、解鎖更多功能</p>
          <Link href="/">
            <span className="inline-block px-6 py-3 bg-white text-[#4A4A4A] rounded-xl font-medium hover:bg-gray-100 transition-colors">
              登入開始學習
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
