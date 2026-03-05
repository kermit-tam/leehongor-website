/**
 * 課程管理頁面
 * Admin Lessons Management
 * 
 * 手機優先設計
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRequireAdmin } from '@/lib/auth-context';
import { LessonService } from '@/lib/firestore';
import { Button } from '@/components/ui/button';

import type { Lesson, LessonCategory, QuizDimension, ContentBlock } from '@/types';

const CATEGORIES: LessonCategory[] = ['五十音', '基礎文法', '進階文法', '會話', '聽力'];
const DIMENSIONS: { value: QuizDimension; label: string }[] = [
  { value: 'pronunciation', label: '發音' },
  { value: 'kanji', label: '漢字' },
  { value: 'vocabulary', label: '詞彙' },
  { value: 'grammar', label: '文法' },
  { value: 'listening', label: '聽力' },
  { value: 'application', label: '應用' },
];

export default function AdminLessonsPage() {
  useRequireAdmin('/');
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  
  // 表單狀態
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '五十音' as LessonCategory,
    order: 0,
    unlockRequirement: '',
    contentBlocks: [] as ContentBlock[],
    questions: [] as {
      id: string;
      dimension: QuizDimension;
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    }[],
    expReward: 50,
    passScore: 60,
  });

  // 臨時問題編輯
  const [editingQuestion, setEditingQuestion] = useState({
    dimension: 'pronunciation' as QuizDimension,
    question: '',
    options: ['', '', '', ''],
    correct: 0,
    explanation: '',
  });

  // 加載課程
  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setIsLoading(true);
      const fetchedLessons = await LessonService.getLessons();
      setLessons(fetchedLessons);
    } catch {
      alert('無法加載課程');
    } finally {
      setIsLoading(false);
    }
  };

  // 重置表單
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '五十音',
      order: lessons.length,
      unlockRequirement: '',
      contentBlocks: [],
      questions: [],
      expReward: 50,
      passScore: 60,
    });
    setEditingLesson(null);
  };

  // 編輯課程
  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormData({
      title: lesson.title,
      description: lesson.description,
      category: lesson.category,
      order: lesson.order,
      unlockRequirement: lesson.unlockRequirement || '',
      contentBlocks: lesson.contentBlocks,
      questions: lesson.quiz.questions,
      expReward: lesson.quiz.expReward,
      passScore: lesson.quiz.passScore,
    });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  // 刪除課程
  const handleDelete = async (lessonId: string) => {
    if (!confirm('確定要刪除這個課程嗎？此操作不可恢復。')) {
      return;
    }

    try {
      await LessonService.deleteLesson(lessonId);
      await loadLessons();
      alert('課程已刪除');
    } catch {
      alert('刪除失敗');
    }
  };

  // 添加問題
  const handleAddQuestion = () => {
    if (!editingQuestion.question || editingQuestion.options.some(o => !o)) {
      alert('請填寫完整問題信息');
      return;
    }

    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          ...editingQuestion,
          id: `q-${Date.now()}`,
        },
      ],
    });

    // 重置臨時問題
    setEditingQuestion({
      dimension: 'pronunciation',
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      explanation: '',
    });
  };

  // 刪除問題
  const handleRemoveQuestion = (index: number) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
  };

  // 提交表單
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.questions.length === 0) {
      alert('請至少添加一道測驗題');
      return;
    }

    try {
      const lessonData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        order: formData.order,
        unlockRequirement: formData.unlockRequirement || null,
        contentBlocks: formData.contentBlocks,
        quiz: {
          questions: formData.questions,
          expReward: formData.expReward,
          passScore: formData.passScore,
        },
      };

      if (editingLesson) {
        await LessonService.updateLesson(editingLesson.id, lessonData);
        alert('課程已更新');
      } else {
        await LessonService.createLesson(lessonData);
        alert('課程已創建');
      }

      resetForm();
      setShowForm(false);
      await loadLessons();
    } catch {
      alert('保存失敗');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 標題欄 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin" className="text-gray-500 hover:text-indigo-600 text-sm mb-1 block">
            ← 返回後台
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">📚 課程管理</h1>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          variant={showForm ? 'outline' : 'primary'}
          size="lg"
        >
          {showForm ? '取消' : '+ 新增課程'}
        </Button>
      </div>

      {/* 課程表單 */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editingLesson ? '編輯課程' : '新增課程'}
          </h2>

          <div className="space-y-6">
            {/* 基本信息 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  課程標題 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="例如：第零課：五十音入門"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  課程描述 *
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="簡短描述課程內容"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    分類 *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as LessonCategory })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    排序 *
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    required
                    min={0}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  解鎖條件（課程ID，留空則為免費）
                </label>
                <select
                  value={formData.unlockRequirement}
                  onChange={(e) => setFormData({ ...formData, unlockRequirement: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">免費課程</option>
                  {lessons.filter(l => l.id !== editingLesson?.id).map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      完成：{lesson.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 測驗設置 */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-bold text-gray-900 mb-4">📝 測驗設置</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    經驗值獎勵
                  </label>
                  <input
                    type="number"
                    value={formData.expReward}
                    onChange={(e) => setFormData({ ...formData, expReward: parseInt(e.target.value) || 50 })}
                    min={0}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    及格分數
                  </label>
                  <input
                    type="number"
                    value={formData.passScore}
                    onChange={(e) => setFormData({ ...formData, passScore: parseInt(e.target.value) || 60 })}
                    min={0}
                    max={100}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>

              {/* 已添加的問題 */}
              {formData.questions.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    已添加 {formData.questions.length} 題
                  </h4>
                  <div className="space-y-2">
                    {formData.questions.map((q, index) => (
                      <div key={q.id} className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded text-xs mr-2">
                              {DIMENSIONS.find(d => d.value === q.dimension)?.label}
                            </span>
                            <span className="text-sm text-gray-700">{q.question}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveQuestion(index)}
                            className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 添加新問題 */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h4 className="font-medium text-gray-900">添加問題</h4>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">維度</label>
                  <select
                    value={editingQuestion.dimension}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, dimension: e.target.value as QuizDimension })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                  >
                    {DIMENSIONS.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">問題</label>
                  <input
                    type="text"
                    value={editingQuestion.question}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    placeholder="輸入問題"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">選項（選中為正確答案）</label>
                  {editingQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correct"
                        checked={editingQuestion.correct === index}
                        onChange={() => setEditingQuestion({ ...editingQuestion, correct: index })}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...editingQuestion.options];
                          newOptions[index] = e.target.value;
                          setEditingQuestion({ ...editingQuestion, options: newOptions });
                        }}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                        placeholder={`選項 ${String.fromCharCode(65 + index)}`}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">解釋</label>
                  <input
                    type="text"
                    value={editingQuestion.explanation}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    placeholder="答對/答錯後顯示的解釋"
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddQuestion}
                  size="sm"
                >
                  + 添加此問題
                </Button>
              </div>
            </div>
          </div>

          {/* 提交按 */}
          <div className="mt-8 flex gap-3">
            <Button type="submit" size="xl" fullWidth>
              {editingLesson ? '更新課程' : '創建課程'}
            </Button>
          </div>
        </form>
      )}

      {/* 課程列表 */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">課程列表</h2>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl" />
            ))}
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-gray-500">暫時沒有課程</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4"
            >
              創建第一個課程
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded text-xs font-medium">
                        第{lesson.order}課
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {lesson.category}
                      </span>
                      {lesson.unlockRequirement ? (
                        <span className="text-xs text-amber-600">🔒 需解鎖</span>
                      ) : (
                        <span className="text-xs text-emerald-600">🔓 免費</span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{lesson.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>📝 {lesson.quiz.questions.length} 題</span>
                      <span>⭐ +{lesson.quiz.expReward} EXP</span>
                      <span>✓ {lesson.quiz.passScore}分及格</span>
                    </div>
                  </div>
                  
                  {/* 操作按鈕 */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(lesson)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(lesson.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
