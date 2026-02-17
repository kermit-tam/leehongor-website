/**
 * 利康哥日文學習平台 - 類型定義
 * LeeHongor Japanese Learning Platform - Type Definitions
 */

// ==================== 用戶相關類型 ====================

/**
 * 六角雷達維度分數
 */
export interface AbilityScore {
  best: number;
  attempts: number;
}

/**
 * 用戶能力分數（六角雷達）
 */
export interface AbilityScores {
  pronunciation: AbilityScore;
  kanji: AbilityScore;
  vocabulary: AbilityScore;
  grammar: AbilityScore;
  listening: AbilityScore;
  application: AbilityScore;
}

/**
 * 用戶數據
 */
export interface User {
  uid: string;
  email: string;
  name: string;
  avatar: string;
  role: 'user' | 'admin';
  
  achievementExp: number;
  level: number;
  streakDays: number;
  badges: string[];
  
  abilityScores: AbilityScores;
  
  unlockedLessons: string[];
  completedLessons: string[];
  
  lastLogin: Date;
  createdAt?: Date;
}

// ==================== 文章相關類型 ====================

/**
 * 文章分類
 */
export type PostCategory = '諧音卡' | '動漫' | '心得' | '工具' | '錯誤分享';

/**
 * 生字/詞彙
 */
export interface Vocabulary {
  id: string;
  kanji: string;
  hiragana: string;
  romanji: string;
  cantonese: string;
  meaning: string;
  audioUrl?: string;
}

/**
 * 輕鬆測驗題（MC題）
 */
export interface PostQuiz {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

/**
 * 文章數據
 */
export interface Post {
  id: string;
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
  authorId: string;
  authorName?: string;
  
  // 新增：生字表
  vocabularies: Vocabulary[];
  
  // 新增：輕鬆測驗
  quizzes: PostQuiz[];
}

// ==================== 課程相關類型 ====================

/**
 * 課程分類
 */
export type LessonCategory = '五十音' | '基礎文法' | '進階文法' | '會話' | '聽力';

/**
 * 測驗維度
 */
export type QuizDimension = 'pronunciation' | 'kanji' | 'vocabulary' | 'grammar' | 'listening' | 'application';

/**
 * 內容區塊類型
 */
export type ContentBlockType = 'text' | 'image' | 'video' | 'audio' | 'example';

/**
 * 課程內容區塊
 */
export interface ContentBlock {
  type: ContentBlockType;
  content?: string;
  url?: string;
  caption?: string;
}

/**
 * 課程測驗問題
 */
export interface QuizQuestion {
  id: string;
  dimension: QuizDimension;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  imageUrl?: string;
}

/**
 * 課程測驗
 */
export interface LessonQuiz {
  questions: QuizQuestion[];
  expReward: number;
  passScore: number;
  timeLimit?: number;
}

/**
 * 課程數據
 */
export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  order: number;
  unlockRequirement: string | null;
  contentBlocks: ContentBlock[];
  quiz: LessonQuiz;
  thumbnailUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ==================== 練習記錄類型 ====================

/**
 * 測驗分數
 */
export interface QuizScores {
  [dimension: string]: number;
  overall: number;
}

/**
 * 新紀錄標記
 */
export interface NewBestRecord {
  [dimension: string]: boolean;
}

/**
 * 練習記錄
 */
export interface PracticeRecord {
  id?: string;
  userId: string;
  lessonId: string;
  scores: QuizScores;
  isNewBest: NewBestRecord;
  achievementExpEarned: number;
  answers?: {
    questionId: string;
    selected: number;
    correct: boolean;
  }[];
  completedAt: Date;
}

// ==================== 徽章類型 ====================

/**
 * 徽章數據
 */
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  expRequired?: number;
  lessonRequired?: string;
  streakRequired?: number;
}

// ==================== UI 相關類型 ====================

/**
 * 導航項目
 */
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  adminOnly?: boolean;
}

/**
 * 排行榜用戶
 */
export interface LeaderboardUser {
  rank: number;
  uid: string;
  name: string;
  avatar: string;
  achievementExp: number;
  level: number;
  streakDays: number;
  badgesCount: number;
}

// ==================== 評論相關類型 ====================

/**
 * 評論類型
 */
export type CommentType = 'comment' | 'question';

/**
 * 評論數據
 */
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: CommentType;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  
  // 回覆功能（可選）
  parentId?: string;
  replies?: Comment[];
}
