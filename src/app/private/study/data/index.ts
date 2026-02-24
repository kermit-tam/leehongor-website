/**
 * 仔仔溫書數據入口
 * 
 * 結構：
 * - 中文：分課（每課約10字）
 * - 每個生字有3個情景例句（口語+書面語對比）
 */

import { Lesson, StudyCard } from './types';

// 導入各課數據
import { chineseLesson01Cards } from './chinese-lesson-01';
import { chineseLesson02Cards } from './chinese-lesson-02';

// ==================== 課程列表 ====================

export const chineseLessons: Lesson[] = [
  { id: 'ch-01', subject: 'chinese', title: '第一課：基礎十字', description: '山、水、上、下、我、你、在、有、人、牛', order: 1, cardCount: 10 },
  { id: 'ch-02', subject: 'chinese', title: '第二課：日常生活', description: '去、個、爸、媽、家、和、沒、中、草、走', order: 2, cardCount: 10 },
];

export const englishLessons: Lesson[] = [
];

// ==================== 英文卡片數據 ====================

export const englishCards: StudyCard[] = [
];

// ==================== 工具函數 ====================

// 獲取中文卡片
export const getChineseCards = (lessonId?: string): StudyCard[] => {
  switch (lessonId) {
    case 'ch-01': return chineseLesson01Cards;
    case 'ch-02': return chineseLesson02Cards;
    default: return [...chineseLesson01Cards, ...chineseLesson02Cards];
  }
};

// 獲取所有中文卡片（跨課）
export const getAllChineseCards = (): StudyCard[] => {
  return [...chineseLesson01Cards, ...chineseLesson02Cards];
};

// 獲取課程列表
export const getAllLessons = (subject: 'chinese' | 'english'): Lesson[] => {
  return subject === 'chinese' ? chineseLessons : englishLessons;
};

// 獲取英文卡片
export const getEnglishCards = (lessonId?: string): StudyCard[] => {
  return englishCards;
};

// 導出類型和數據
export { chineseLesson01Cards, chineseLesson02Cards };
export * from './types';
