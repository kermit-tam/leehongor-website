/**
 * 無印風格卡片組件
 * MUJI Style Card Components
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
      <article className="group bg-[#FAF9F7] border-t border-[#E5E5E5] hover:bg-[#F5F5F0] transition-all duration-300">
        {/* 封面圖 */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#F0F0F0]">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl bg-[#E5E5E5]">
              📚
            </div>
          )}
        </div>
        
        {/* 內容 */}
        <div className="p-5">
          {/* 分類標籤 */}
          <span className="text-xs text-[#8C8C8C] tracking-wider">
            {post.category}
          </span>
          
          <h3 className="mt-2 text-lg font-normal text-[#4A4A4A] group-hover:text-[#6B6B6B] transition-colors line-clamp-2 tracking-wide">
            {post.title}
          </h3>
          
          {/* 標籤 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#B5B5B5]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* 日期 */}
          <div className="mt-4 text-xs text-[#B5B5B5]">
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
    ? 'bg-[#E0D5C7]/30 border-t border-[#D4C5B9]'
    : isUnlocked
    ? 'bg-[#FAF9F7] border-t border-[#E5E5E5] hover:bg-[#F5F5F0]'
    : 'bg-[#F5F5F0] border-t border-[#E5E5E5] opacity-60';

  return (
    <div className={`relative p-6 ${cardStyles} transition-all`}>
      {/* 狀態標記 */}
      <div className="absolute top-4 right-4">
        {isCompleted ? (
          <span className="text-[#A8B5A0]">✓</span>
        ) : isUnlocked ? (
          <span className="text-[#8C8C8C]">→</span>
        ) : (
          <span className="text-[#B5B5B5]">🔒</span>
        )}
      </div>

      {/* 課程編號 */}
      <div className="text-xs text-[#B5B5B5] mb-2 tracking-wider">
        第 {lesson.order} 課
      </div>

      {/* 課程標題 */}
      <h3 className={`text-xl font-normal mb-2 tracking-wide ${isUnlocked ? 'text-[#4A4A4A]' : 'text-[#8C8C8C]'}`}>
        {lesson.title}
      </h3>

      {/* 描述 */}
      <p className={`text-sm mb-4 line-clamp-2 ${isUnlocked ? 'text-[#8C8C8C]' : 'text-[#B5B5B5]'}`}>
        {lesson.description}
      </p>

      {/* 分類標籤 */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#8C8C8C] bg-[#F5F5F0] px-2 py-1">
          {lesson.category}
        </span>
        
        {isUnlocked ? (
          <Link
            href={`/learn/${lesson.id}`}
            className={`px-4 py-2 text-sm transition-colors ${
              isCompleted
                ? 'bg-[#A8B5A0]/20 text-[#4A4A4A]'
                : 'bg-[#8C8C8C] text-white hover:bg-[#6B6B6B]'
            }`}
          >
            {isCompleted ? '複習' : '開始'}
          </Link>
        ) : (
          <span className="text-sm text-[#B5B5B5]">鎖定</span>
        )}
      </div>

      {/* 測驗信息 */}
      {isUnlocked && lesson.quiz && (
        <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between text-xs text-[#B5B5B5]">
            <span>{lesson.quiz.questions.length} 題</span>
            <span>+{lesson.quiz.expReward} EXP</span>
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
    <div className="bg-[#FAF9F7] border-t border-[#E5E5E5] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-[#8C8C8C] mb-1 tracking-wide">目前等級</div>
          <div className="text-4xl font-light text-[#4A4A4A] tracking-wide">Lv.{level}</div>
        </div>
        <div className="text-4xl">🎌</div>
      </div>

      {/* 經驗值進度 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2 text-[#8C8C8C]">
          <span>經驗值</span>
          <span>{exp} / {nextLevelExp}</span>
        </div>
        <div className="h-[2px] bg-[#E5E5E5]">
          <div
            className="h-full bg-[#8C8C8C] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 連續登入 */}
      <div className="flex items-center bg-[#F5F5F0] p-4 border-t border-[#E5E5E5]">
        <span className="text-2xl mr-4">🔥</span>
        <div>
          <div className="text-2xl font-light text-[#4A4A4A]">{streakDays}</div>
          <div className="text-sm text-[#8C8C8C]">連續登入天數</div>
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
  color?: 'gray' | 'earth' | 'warm';
}

export function StatCard({
  icon,
  label,
  value,
  subtext,
  color = 'gray',
}: StatCardProps) {
  const colorStyles = {
    gray: 'bg-[#FAF9F7] border-t border-[#E5E5E5]',
    earth: 'bg-[#E0D5C7]/30 border-t border-[#D4C5B9]',
    warm: 'bg-[#F5F5F0] border-t border-[#E0D5C7]',
  };

  return (
    <div className={`p-5 ${colorStyles[color]}`}>
      <div className="text-2xl mb-3">{icon}</div>
      <div className="text-xs text-[#8C8C8C] mb-1 tracking-wide">{label}</div>
      <div className="text-2xl font-light text-[#4A4A4A]">{value}</div>
      {subtext && <div className="text-xs text-[#B5B5B5] mt-1">{subtext}</div>}
    </div>
  );
}
