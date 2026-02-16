/**
 * 卡片組件
 * Card Components
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Post, Lesson } from '@/types';

// ==================== 文章卡片 ====================

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
        {/* 封面圖 */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-indigo-100 to-purple-100">
              📚
            </div>
          )}
          {/* 分類標籤 */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-indigo-600 shadow-sm">
              {post.category}
            </span>
          </div>
        </div>
        
        {/* 內容 */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          
          {/* 標籤 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* 日期 */}
          <div className="text-xs text-gray-400">
            {post.createdAt.toLocaleDateString('zh-HK', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
      </article>
    </Link>
  );
}

// ==================== 課程卡片 ====================

interface LessonCardProps {
  lesson: Lesson;
  isUnlocked: boolean;
  isCompleted: boolean;
  userLevel?: number;
}

export function LessonCard({
  lesson,
  isUnlocked,
  isCompleted,
  userLevel = 1,
}: LessonCardProps) {
  // 根據狀態決定樣式
  const cardStyles = isCompleted
    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
    : isUnlocked
    ? 'bg-white hover:shadow-lg border-gray-100'
    : 'bg-gray-50 border-gray-200 opacity-75';

  return (
    <div className={`relative rounded-2xl p-5 border-2 transition-all ${cardStyles}`}>
      {/* 狀態圖標 */}
      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md">
        {isCompleted ? (
          <span className="bg-emerald-500 text-white rounded-full w-full h-full flex items-center justify-center">
            ✓
          </span>
        ) : isUnlocked ? (
          <span className="bg-indigo-500 text-white rounded-full w-full h-full flex items-center justify-center">
            ▶
          </span>
        ) : (
          <span className="bg-gray-400 text-white rounded-full w-full h-full flex items-center justify-center">
            🔒
          </span>
        )}
      </div>

      {/* 課程編號 */}
      <div className="text-xs font-bold text-gray-400 mb-2">
        第 {lesson.order} 課
      </div>

      {/* 課程標題 */}
      <h3 className={`font-bold text-lg mb-2 ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
        {lesson.title}
      </h3>

      {/* 描述 */}
      <p className={`text-sm mb-4 line-clamp-2 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
        {lesson.description}
      </p>

      {/* 分類標籤 */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-white/80 rounded-full text-xs text-gray-600">
          {lesson.category}
        </span>
        
        {isUnlocked ? (
          <Link
            href={`/learn/${lesson.id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            {isCompleted ? '複習' : '開始'}
          </Link>
        ) : (
          <span className="text-sm text-gray-400">🔒 鎖定</span>
        )}
      </div>

      {/* 測驗信息 */}
      {isUnlocked && lesson.quiz && (
        <div className="mt-4 pt-4 border-t border-gray-100/50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>📝 {lesson.quiz.questions.length} 題</span>
            <span>⭐ +{lesson.quiz.expReward} EXP</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== 用戶等級卡片 ====================

interface LevelCardProps {
  level: number;
  exp: number;
  streakDays: number;
}

export function LevelCard({ level, exp, streakDays }: LevelCardProps) {
  // 計算下一級所需經驗
  const nextLevelExp = level * 500;
  const currentLevelBase = (level - 1) * 500;
  const expInCurrentLevel = exp - currentLevelBase;
  const expNeeded = nextLevelExp - currentLevelBase;
  const progress = Math.min((expInCurrentLevel / expNeeded) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-indigo-100 text-sm mb-1">目前等級</div>
          <div className="text-4xl font-bold">Lv.{level}</div>
        </div>
        <div className="text-6xl">🎌</div>
      </div>

      {/* 經驗值進度 */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-indigo-100">經驗值</span>
          <span>{exp} / {nextLevelExp}</span>
        </div>
        <div className="h-3 bg-black/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 連續登入 */}
      <div className="flex items-center bg-white/10 rounded-xl p-3">
        <span className="text-2xl mr-3">🔥</span>
        <div>
          <div className="text-2xl font-bold">{streakDays}</div>
          <div className="text-indigo-100 text-sm">連續登入天數</div>
        </div>
      </div>
    </div>
  );
}

// ==================== 統計卡片 ====================

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  subtext?: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'blue';
}

export function StatCard({
  icon,
  label,
  value,
  subtext,
  color = 'indigo',
}: StatCardProps) {
  const colorStyles = {
    indigo: 'from-indigo-50 to-indigo-100 text-indigo-600',
    emerald: 'from-emerald-50 to-emerald-100 text-emerald-600',
    amber: 'from-amber-50 to-amber-100 text-amber-600',
    rose: 'from-rose-50 to-rose-100 text-rose-600',
    blue: 'from-blue-50 to-blue-100 text-blue-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorStyles[color]} rounded-2xl p-5`}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-sm opacity-80 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {subtext && <div className="text-xs opacity-60 mt-1">{subtext}</div>}
    </div>
  );
}
