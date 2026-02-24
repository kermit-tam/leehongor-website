/**
 * 仔仔溫書數據入口
 * 
 * 結構：
 * - 基礎十字（大主題）
 *   - 第一課：山、水、上、下、我、你、在、有、人、牛
 *   - 第二課：去、個、爸、媽、家、和、沒、中、草、走
 */

import { Lesson, StudyCard, Topic } from './types';

// 導入各課數據
import { chineseLesson01Cards } from './chinese-lesson-01';
import { chineseLesson02Cards } from './chinese-lesson-02';

// ==================== 主題列表 ====================

export const chineseTopics: Topic[] = [
  {
    id: 'ch-topic-01',
    subject: 'chinese',
    title: '基礎十字',
    description: '20個基礎漢字，學識就可以組合好多句子',
    order: 1,
    totalCards: 20,
    lessons: [
      { 
        id: 'ch-01', 
        subject: 'chinese', 
        title: '第一課', 
        description: '山、水、上、下、我、你、在、有、人、牛', 
        order: 1, 
        cardCount: 10,
        topicId: 'ch-topic-01'
      },
      { 
        id: 'ch-02', 
        subject: 'chinese', 
        title: '第二課', 
        description: '去、個、爸、媽、家、和、沒、中、草、走', 
        order: 2, 
        cardCount: 10,
        topicId: 'ch-topic-01'
      },
    ]
  }
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

// 獲取所有中文卡片
export const getAllChineseCards = (): StudyCard[] => {
  return [...chineseLesson01Cards, ...chineseLesson02Cards];
};

// 獲取主題列表
export const getAllTopics = (subject: 'chinese' | 'english'): Topic[] => {
  return subject === 'chinese' ? chineseTopics : [];
};

// 獲取課程列表
export const getAllLessons = (subject: 'chinese' | 'english'): Lesson[] => {
  if (subject === 'chinese') {
    return chineseTopics.flatMap(t => t.lessons);
  }
  return englishLessons;
};

// 獲取英文卡片
export const getEnglishCards = (lessonId?: string): StudyCard[] => {
  return englishCards;
};

// 導出類型和數據
export { chineseLesson01Cards, chineseLesson02Cards };
export * from './types';
