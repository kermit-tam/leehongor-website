/**
 * 利康哥日文學習平台 - 類型定義
 * LeeHongor Japanese Learning Platform - Type Definitions
 */

// ==================== 用戶相關類型 ====================

/**
 * 六角雷達維度分數
 * Six-dimension radar scores for user abilities
 */
export interface AbilityScore {
  best: number;      // 最高分（只計最高分）
  attempts: number;  // 嘗試次數
}

/**
 * 用戶能力分數（六角雷達）
 * User ability scores across 6 dimensions
 */
export interface AbilityScores {
  pronunciation: AbilityScore;  // 發音
  kanji: AbilityScore;          // 漢字
  vocabulary: AbilityScore;     // 詞彙
  grammar: AbilityScore;        // 文法
  listening: AbilityScore;      // 聽力
  application: AbilityScore;    // 應用
}

/**
 * 用戶數據
 * User data structure
 */
export interface User {
  uid: string;
  email: string;
  name: string;
  avatar: string;
  role: 'user' | 'admin';
  
  // 遊戲化數據
  achievementExp: number;       // 成就分數（參與度）
  level: number;                // 等級
  streakDays: number;           // 連續登入天數
  badges: string[];             // 已解鎖徽章
  
  // 能力分數
  abilityScores: AbilityScores;
  
  // 課程進度
  unlockedLessons: string[];    // 已解鎖課程
  completedLessons: string[];   // 已完成課程
  
  lastLogin: Date;
  createdAt?: Date;
}

// ==================== 文章相關類型 ====================

/**
 * 文章分類
 * Post categories
 */
export type PostCategory = '諧音卡' | '動漫' | '心得' | '工具' | '錯誤分享';

/**
 * 文章數據
 * Post data structure
 */
export interface Post {
  id: string;
  title: string;
  content: string;              // Markdown 格式
  category: PostCategory;
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
  authorId: string;
  authorName?: string;
}

// ==================== 課程相關類型 ====================

/**
 * 課程分類
 * Lesson categories
 */
export type LessonCategory = '五十音' | '基礎文法' | '進階文法' | '會話' | '聽力';

/**
 * 測驗維度（對應六角雷達）
 * Quiz dimension mapping to radar chart
 */
export type QuizDimension = 'pronunciation' | 'kanji' | 'vocabulary' | 'grammar' | 'listening' | 'application';

/**
 * 內容區塊類型
 * Content block types
 */
export type ContentBlockType = 'text' | 'image' | 'video' | 'audio' | 'example';

/**
 * 課程內容區塊
 * Lesson content block
 */
export interface ContentBlock {
  type: ContentBlockType;
  content?: string;
  url?: string;
  caption?: string;
}

/**
 * 測驗問題
 * Quiz question
 */
export interface QuizQuestion {
  id: string;
  dimension: QuizDimension;     // 屬於哪個維度
  question: string;
  options: string[];            // 選項
  correct: number;              // 正確答案索引
  explanation: string;          // 解釋
  imageUrl?: string;            // 問題圖片（可選）
}

/**
 * 課程測驗
 * Lesson quiz
 */
export interface LessonQuiz {
  questions: QuizQuestion[];
  expReward: number;            // 完成獎勵經驗值
  passScore: number;            // 及格分數（預設 60）
  timeLimit?: number;           // 時間限制（秒，可選）
}

/**
 * 課程數據
 * Lesson data structure
 */
export interface Lesson {
  id: string;                   // lesson-0, lesson-1, ...
  title: string;
  description: string;
  category: LessonCategory;
  order: number;                // 排序
  
  // 解鎖條件
  unlockRequirement: string | null;  // 需要完成的課程 ID，null 表示免費
  
  // 內容
  contentBlocks: ContentBlock[];
  
  // 測驗
  quiz: LessonQuiz;
  
  // 元數據
  thumbnailUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ==================== 練習記錄類型 ====================

/**
 * 測驗分數
 * Quiz scores by dimension
 */
export interface QuizScores {
  [dimension: string]: number;  // 各維度得分
  overall: number;              // 總分
}

/**
 * 新紀錄標記
 * New best record flags
 */
export interface NewBestRecord {
  [dimension: string]: boolean;
}

/**
 * 練習記錄
 * Practice record
 */
export interface PracticeRecord {
  id?: string;
  userId: string;
  lessonId: string;
  
  // 分數
  scores: QuizScores;
  
  // 破紀錄標記
  isNewBest: NewBestRecord;
  
  // 獎勵
  achievementExpEarned: number;
  
  // 詳細答案
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
 * Badge data
 */
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;            // 解鎖條件描述
  expRequired?: number;         // 需要經驗值
  lessonRequired?: string;      // 需要完成的課程
  streakRequired?: number;      // 需要連續天數
}

// ==================== UI 相關類型 ====================

/**
 * 導航項目
 * Navigation item
 */
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  adminOnly?: boolean;
}

/**
 * 排行榜用戶
 * Leaderboard user
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
