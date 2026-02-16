/**
 * 課程詳情頁
 * Lesson Detail Page
 */

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { LessonService, UserService } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import type { Lesson } from '@/types';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  
  const { user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加載課程數據
  useEffect(() => {
    const loadLesson = async () => {
      try {
        setIsLoading(true);
        
        const fetchedLesson = await LessonService.getLesson(lessonId);
        if (!fetchedLesson) {
          setError('課程不存在');
          return;
        }
        
        setLesson(fetchedLesson);
        
        // 檢查是否已解鎖
        if (user) {
          const userData = await UserService.getUser(user.uid);
          if (userData) {
            const unlocked = LessonService.isLessonUnlocked(
              fetchedLesson,
              userData.completedLessons
            );
            setIsUnlocked(unlocked || userData.unlockedLessons.includes(lessonId));
          }
        } else {
          // 未登入用戶只能看 lesson-0
          setIsUnlocked(fetchedLesson.unlockRequirement === null);
        }
      } catch (err) {
        console.error('Error loading lesson:', err);
        setError('無法加載課程');
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId) {
      loadLesson();
    }
  }, [lessonId, user]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {error || '課程不存在'}
        </h1>
        <Link href="/learn">
          <Button>返回學習區</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* 返回按鈕 */}
      <Link
        href="/learn"
        className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回課程地圖
      </Link>

      {/* 課程標題區 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-3">
              第 {lesson.order} 課 · {lesson.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {lesson.title}
            </h1>
            <p className="text-gray-600">{lesson.description}</p>
          </div>
          
          {/* 鎖定狀態 */}
          {!isUnlocked && (
            <div className="flex-shrink-0 ml-4 p-3 bg-gray-100 rounded-full">
              <span className="text-2xl">🔒</span>
            </div>
          )}
        </div>
      </div>

      {/* 課程內容 */}
      <div className="space-y-4 mb-8">
        {lesson.contentBlocks.map((block, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {block.type === 'text' && (
              <div className="p-6 prose prose-indigo max-w-none">
                <div dangerouslySetInnerHTML={{ __html: block.content || '' }} />
              </div>
            )}
            
            {block.type === 'image' && block.url && (
              <div className="relative">
                <img
                  src={block.url}
                  alt={block.caption || '課程圖片'}
                  className="w-full h-auto"
                />
                {block.caption && (
                  <div className="p-4 bg-gray-50 text-sm text-gray-600 text-center">
                    {block.caption}
                  </div>
                )}
              </div>
            )}
            
            {block.type === 'video' && block.url && (
              <div className="aspect-video bg-gray-900">
                <iframe
                  src={block.url}
                  title={block.caption || '課程影片'}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
            
            {block.type === 'audio' && block.url && (
              <div className="p-6">
                <audio controls className="w-full">
                  <source src={block.url} />
                  你的瀏覽器不支援音頻播放
                </audio>
                {block.caption && (
                  <p className="mt-2 text-sm text-gray-500">{block.caption}</p>
                )}
              </div>
            )}
            
            {block.type === 'example' && (
              <div className="p-6 bg-amber-50 border-l-4 border-amber-400">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💡</span>
                  <div dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 測驗區域 */}
      {isUnlocked ? (
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-xl font-bold mb-2">準備好測試自己了嗎？</h2>
          <p className="opacity-90 mb-4">
            本課程有 {lesson.quiz.questions.length} 道題目
            <br />
            通過分數：{lesson.quiz.passScore}分 · 獎勵：+{lesson.quiz.expReward} EXP
          </p>
          <Link href={`/learn/${lesson.id}/quiz`}>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              開始測驗
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">此課程尚未解鎖</h2>
          <p className="text-gray-500 mb-4">
            請完成前置課程以解鎖此內容
          </p>
          <Link href="/learn">
            <Button variant="outline">返回課程地圖</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
