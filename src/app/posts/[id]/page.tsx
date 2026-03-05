/**
 * 文章詳情頁 - 無印風格 + 生字 + MC題 + 評論
 * Post Detail Page with Vocabulary, Quiz & Comments
 */

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PostService, CommentService } from '@/lib/firestore';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import type { Post, Vocabulary, PostQuiz, Comment, CommentType } from '@/types';

// ==================== 生字卡片組件 ====================

function VocabularyCard({ vocab }: { vocab: Vocabulary }) {
  return (
    <div className="bg-[#FAF9F7] border-t border-[#E5E5E5] p-5 hover:bg-[#F5F5F0] transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* 日文部分 */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-normal text-[#4A4A4A]">{vocab.kanji}</span>
            <span className="text-base text-[#8C8C8C]">{vocab.hiragana}</span>
          </div>
          
          {/* 羅馬音 + 廣東話諧音 */}
          <div className="flex items-center gap-2 text-sm text-[#8C8C8C] mb-3">
            <span>{vocab.romanji}</span>
            <span className="text-[#B5B5B5]">•</span>
            <span className="text-[#A09088]">「{vocab.cantonese}」</span>
          </div>
          
          {/* 中文意思 */}
          <div className="text-[#4A4A4A]">{vocab.meaning}</div>
        </div>
        
        {/* 語音播放按鈕（如果有） */}
        {vocab.audioUrl && (
          <button
            onClick={() => new Audio(vocab.audioUrl).play()}
            className="p-2 text-[#8C8C8C] hover:text-[#4A4A4A] hover:bg-[#E0D5C7]/30 transition-colors"
          >
            🔊
          </button>
        )}
      </div>
    </div>
  );
}

// ==================== MC題組件 ====================

function QuizSection({ quizzes, postId }: { quizzes: PostQuiz[]; postId: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [currentQuiz, setCurrentQuiz] = useState(0);

  const handleSelect = (quizId: string, optionIndex: number) => {
    if (submitted[quizId]) return;
    setAnswers(prev => ({ ...prev, [quizId]: optionIndex }));
  };

  const handleSubmit = (quizId: string) => {
    if (answers[quizId] === undefined) return;
    setSubmitted(prev => ({ ...prev, [quizId]: true }));
  };

  const quiz = quizzes[currentQuiz];
  const hasAnswered = answers[quiz.id] !== undefined;
  const isSubmitted = submitted[quiz.id];
  const isCorrect = isSubmitted && answers[quiz.id] === quiz.correct;

  return (
    <div className="bg-[#FAF9F7] border-t border-[#E5E5E5]">
      {/* 標題和進度 */}
      <div className="px-6 py-4 border-b border-[#E5E5E5]">
        <h3 className="text-lg font-normal text-[#4A4A4A] tracking-wide">考考你</h3>
        <p className="text-sm text-[#8C8C8C] mt-1">
          第 {currentQuiz + 1} 題，共 {quizzes.length} 題
        </p>
      </div>

      {/* 題目內容 */}
      <div className="p-6">
        <p className="text-lg text-[#4A4A4A] mb-6">{quiz.question}</p>

        {/* 選項 */}
        <div className="space-y-3">
          {quiz.options.map((option, index) => {
            const isSelected = answers[quiz.id] === index;
            const showCorrect = isSubmitted && index === quiz.correct;
            const showWrong = isSubmitted && isSelected && index !== quiz.correct;

            return (
              <button
                key={index}
                onClick={() => handleSelect(quiz.id, index)}
                disabled={isSubmitted}
                className={`w-full p-4 text-left border transition-all ${
                  showCorrect
                    ? 'bg-[#A8B5A0]/20 border-[#A8B5A0]'
                    : showWrong
                    ? 'bg-[#B8A8A0]/20 border-[#B8A8A0]'
                    : isSelected
                    ? 'bg-[#E0D5C7] border-[#8C8C8C]'
                    : 'bg-white border-[#E5E5E5] hover:border-[#8C8C8C]'
                }`}
              >
                <div className="flex items-center">
                  <span className={`w-6 h-6 mr-3 flex items-center justify-center text-sm border ${
                    showCorrect
                      ? 'bg-[#A8B5A0] border-[#A8B5A0] text-white'
                      : showWrong
                      ? 'bg-[#B8A8A0] border-[#B8A8A0] text-white'
                      : isSelected
                      ? 'bg-[#8C8C8C] border-[#8C8C8C] text-white'
                      : 'border-[#8C8C8C]'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showCorrect && <span className="text-[#A8B5A0] ml-2">✓</span>}
                  {showWrong && <span className="text-[#B8A8A0] ml-2">✗</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* 提交按鈕或解釋 */}
        {!isSubmitted ? (
          <button
            onClick={() => handleSubmit(quiz.id)}
            disabled={!hasAnswered}
            className={`mt-6 w-full py-3 transition-colors ${
              hasAnswered
                ? 'bg-[#8C8C8C] text-white hover:bg-[#6B6B6B]'
                : 'bg-[#E5E5E5] text-[#B5B5B5] cursor-not-allowed'
            }`}
          >
            提交答案
          </button>
        ) : (
          <div className="mt-6 p-4 bg-[#E0D5C7]/30 border-t border-[#D4C5B9]">
            <p className="text-[#4A4A4A]">{quiz.explanation}</p>
          </div>
        )}

        {/* 導航按鈕 */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQuiz(prev => Math.max(0, prev - 1))}
            disabled={currentQuiz === 0}
            className="px-4 py-2 text-[#8C8C8C] disabled:opacity-40 hover:text-[#4A4A4A] transition-colors"
          >
            ← 上一題
          </button>
          <button
            onClick={() => setCurrentQuiz(prev => Math.min(quizzes.length - 1, prev + 1))}
            disabled={currentQuiz === quizzes.length - 1}
            className="px-4 py-2 text-[#8C8C8C] disabled:opacity-40 hover:text-[#4A4A4A] transition-colors"
          >
            下一題 →
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== 評論區組件 ====================

function CommentSection({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentType, setCommentType] = useState<CommentType>('comment');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const fetchedComments = await CommentService.getComments(postId);
      setComments(fetchedComments);
    } catch (err) {
      // Error loading comments
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      setIsSubmitting(true);
      await CommentService.createComment({
        postId,
        userId: user.uid,
        userName: user.name || '匿名用戶',
        userAvatar: user.avatar || undefined,
        type: commentType,
        content: newComment.trim(),
      });
      setNewComment('');
      await loadComments();
    } catch (err) {
      alert('發送失敗，請重試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-HK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-8 bg-[#FAF9F7] border-t border-[#E5E5E5]">
      {/* 標題 */}
      <div className="px-6 py-4 border-b border-[#E5E5E5]">
        <h3 className="text-lg font-normal text-[#4A4A4A] tracking-wide">
          💬 討論區 ({comments.length})
        </h3>
      </div>

      {/* 評論列表 */}
      <div className="divide-y divide-[#E5E5E5]">
        {isLoading ? (
          <div className="p-6 text-center text-[#8C8C8C]">載入中...</div>
        ) : comments.length === 0 ? (
          <div className="p-6 text-center text-[#8C8C8C]">
            暫無討論，{user ? '來發表第一則留言吧！' : '登入後即可參與討論'}
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-5 hover:bg-[#F5F5F0] transition-colors">
              <div className="flex items-start gap-3">
                {/* 頭像 */}
                <div className="w-10 h-10 rounded-full bg-[#E0D5C7] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {comment.userAvatar ? (
                    <div className="relative w-full h-full">
                      <Image src={comment.userAvatar} alt={comment.userName} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <span className="text-[#8C8C8C] text-lg">👤</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* 頭部信息 */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-[#4A4A4A]">{comment.userName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      comment.type === 'question' 
                        ? 'bg-[#E0D5C7] text-[#4A4A4A]' 
                        : 'bg-[#F5F5F0] text-[#8C8C8C]'
                    }`}>
                      {comment.type === 'question' ? '❓ 提問' : '💬 留言'}
                    </span>
                    <span className="text-xs text-[#B5B5B5]">{formatDate(comment.createdAt)}</span>
                  </div>
                  
                  {/* 內容 */}
                  <p className="text-[#4A4A4A] whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 發表評論 */}
      <div className="p-6 border-t border-[#E5E5E5] bg-[#FAF9F7]">
        {user ? (
          <form onSubmit={handleSubmit}>
            {/* 類型選擇 */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setCommentType('comment')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  commentType === 'comment'
                    ? 'bg-[#8C8C8C] text-white'
                    : 'bg-white border border-[#E5E5E5] text-[#8C8C8C] hover:border-[#8C8C8C]'
                }`}
              >
                💬 留言
              </button>
              <button
                type="button"
                onClick={() => setCommentType('question')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  commentType === 'question'
                    ? 'bg-[#C4B9AC] text-white'
                    : 'bg-white border border-[#E5E5E5] text-[#8C8C8C] hover:border-[#C4B9AC]'
                }`}
              >
                ❓ 提問
              </button>
            </div>
            
            {/* 輸入框 */}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={commentType === 'question' ? '有什麼疑問想問？' : '分享你的想法...'}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded text-[#4A4A4A] focus:border-[#8C8C8C] focus:outline-none resize-none"
            />
            
            {/* 提交按鈕 */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-[#B5B5B5]">
                以 {user.name || '匿名用戶'} 的身份發表
              </span>
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className={`px-6 py-2 text-sm rounded transition-colors ${
                  newComment.trim() && !isSubmitting
                    ? 'bg-[#8C8C8C] text-white hover:bg-[#6B6B6B]'
                    : 'bg-[#E5E5E5] text-[#B5B5B5] cursor-not-allowed'
                }`}
              >
                {isSubmitting ? '發送中...' : '發表'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-[#8C8C8C] mb-3">登入後即可參與討論</p>
            <Link href="/">
              <span className="inline-block px-6 py-2 bg-[#8C8C8C] text-white rounded text-sm hover:bg-[#6B6B6B] transition-colors">
                前往登入
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== 主頁面 ====================

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true);
        const fetchedPost = await PostService.getPost(postId);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError('文章不存在');
        }
      } catch (err) {
        setError('無法加載文章');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      loadPost();
    }
  }, [postId]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 bg-[#F5F5F0] min-h-screen">
        <div className="text-center py-16 text-[#8C8C8C]">載入中...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center bg-[#F5F5F0] min-h-screen">
        <div className="text-4xl mb-4">😕</div>
        <h1 className="text-xl text-[#4A4A4A] mb-2">{error || '文章不存在'}</h1>
        <Link href="/posts">
          <Button>返回文章列表</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-[#F5F5F0] min-h-screen">
      {/* 返回按鈕 */}
      <Link
        href="/posts"
        className="inline-flex items-center text-[#8C8C8C] hover:text-[#4A4A4A] mb-6 transition-colors text-sm tracking-wide"
      >
        ← 返回文章列表
      </Link>

      <article className="bg-[#FAF9F7] border-t border-[#E5E5E5]">
        {/* 封面圖 */}
        {post.imageUrl && (
          <div className="relative aspect-[21/9] bg-[#F0F0F0]">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover grayscale-[20%]"
              unoptimized
            />
          </div>
        )}

        {/* 內容 */}
        <div className="p-6 sm:p-8">
          {/* 分類 */}
          <span className="inline-block text-xs text-[#8C8C8C] tracking-wider mb-3">
            {post.category}
          </span>

          {/* 標題 */}
          <h1 className="text-2xl sm:text-3xl font-light text-[#4A4A4A] mb-4 tracking-wide">
            {post.title}
          </h1>

          {/* 元信息 */}
          <div className="text-sm text-[#B5B5B5] mb-8 pb-6 border-b border-[#E5E5E5]">
            {post.createdAt.toLocaleDateString('zh-HK', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          {/* 標籤 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-[#B5B5B5]">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 文章內容 */}
          <div className="markdown-content mb-10">
            {post.content.includes('<') && post.content.includes('>') ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </article>

      {/* 生字區塊 */}
      {post.vocabularies && post.vocabularies.length > 0 && (
        <div className="mt-6 bg-[#FAF9F7] border-t border-[#E5E5E5]">
          <div className="px-6 py-4 border-b border-[#E5E5E5]">
            <h3 className="text-lg font-normal text-[#4A4A4A] tracking-wide">本課生字</h3>
          </div>
          <div className="divide-y divide-[#E5E5E5]">
            {post.vocabularies.map((vocab) => (
              <VocabularyCard key={vocab.id} vocab={vocab} />
            ))}
          </div>
        </div>
      )}

      {/* MC題區塊 */}
      {post.quizzes && post.quizzes.length > 0 && (
        <div className="mt-6">
          <QuizSection quizzes={post.quizzes} postId={post.id} />
        </div>
      )}

      {/* 評論區塊 */}
      <CommentSection postId={post.id} />

      {/* 底部分享 */}
      <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#8C8C8C]">覺得有用？分享給朋友</span>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('連結已複製');
              }
            }}
            className="p-2 text-[#8C8C8C] hover:text-[#4A4A4A] hover:bg-[#FAF9F7] transition-colors"
          >
            分享
          </button>
        </div>
      </div>
    </div>
  );
}
