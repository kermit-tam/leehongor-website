/**
 * 仔仔溫書數據入口
 * 
 * 結構：
 * - 中文：基礎漢字 + 分課（每課約7-8字）
 * - 英文：獨立課程
 * - 每個生字有3個情景例句（口語+書面語對比）
 */

import { Lesson, StudyCard } from './types';

// 導入各課數據
import { chineseBasicCards } from './chinese-basic';
import { chineseLesson01Cards } from './chinese-lesson-01';
import { chineseLesson05Cards } from './chinese-lesson-05';

// ==================== 課程列表 ====================

export const chineseLessons: Lesson[] = [
  { id: 'ch-basic', subject: 'chinese', title: '基礎漢字', description: '最常用的基礎漢字，識咗就易學啲', order: 0, cardCount: 5 },
  { id: 'ch-01', subject: 'chinese', title: '第一課：基礎十字', description: '山、水、上、下、我、你、在、有、人、牛 - 可以組合成詞語和短句', order: 1, cardCount: 10 },
  { id: 'ch-05', subject: 'chinese', title: '第五課：形容詞', description: '常用形容詞', order: 5, cardCount: 2 },
];

export const englishLessons: Lesson[] = [
  { id: 'en-01', subject: 'english', title: 'Lesson 1: Animals', description: 'Common animals', order: 1, cardCount: 3 },
  { id: 'en-02', subject: 'english', title: 'Lesson 2: Colors', description: 'Basic colors', order: 2, cardCount: 2 },
  { id: 'en-03', subject: 'english', title: 'Lesson 3: Numbers', description: 'Numbers 1-10', order: 3, cardCount: 2 },
];

// ==================== 英文卡片數據 ====================

export const englishCards: StudyCard[] = [
  {
    id: 'en-001',
    subject: 'english',
    lessonId: 'en-01',
    word: 'cat',
    phonetic: '/kæt/',
    meaning: '貓',
    category: 'Animals',
    examples: [
      { id: '1', scenario: 'Pet', spoken: 'I have a cat.', written: 'I have a pet cat.' },
      { id: '2', scenario: 'Action', spoken: 'The cat is sleeping.', written: 'The cat is sleeping quietly.' },
      { id: '3', scenario: 'Description', spoken: 'It\'s a cute cat.', written: 'It is a cute black cat.' },
    ],
  },
  {
    id: 'en-002',
    subject: 'english',
    lessonId: 'en-01',
    word: 'dog',
    phonetic: '/dɒɡ/',
    meaning: '狗',
    category: 'Animals',
    examples: [
      { id: '1', scenario: 'Pet', spoken: 'I like dogs.', written: 'I like pet dogs.' },
      { id: '2', scenario: 'Action', spoken: 'The dog is running.', written: 'The dog is running fast.' },
      { id: '3', scenario: 'Size', spoken: 'It\'s a big dog.', written: 'It is a big brown dog.' },
    ],
  },
  {
    id: 'en-003',
    subject: 'english',
    lessonId: 'en-01',
    word: 'bird',
    phonetic: '/bɜːd/',
    meaning: '鳥',
    category: 'Animals',
    examples: [
      { id: '1', scenario: 'Ability', spoken: 'Birds can fly.', written: 'Birds can fly in the sky.' },
      { id: '2', scenario: 'Sound', spoken: 'The bird is singing.', written: 'The bird is singing beautifully.' },
      { id: '3', scenario: 'Location', spoken: 'Birds are in the tree.', written: 'The birds are in the tall tree.' },
    ],
  },
];

// ==================== 工具函數 ====================

// 獲取中文卡片
export const getChineseCards = (lessonId?: string): StudyCard[] => {
  switch (lessonId) {
    case 'ch-basic': return chineseBasicCards;
    case 'ch-01': return chineseLesson01Cards;
    case 'ch-05': return chineseLesson05Cards;
    default: return [...chineseBasicCards, ...chineseLesson01Cards, ...chineseLesson05Cards];
  }
};

// 獲取基礎漢字
export const getBasicChineseCards = (): StudyCard[] => chineseBasicCards;

// 獲取課程列表
export const getAllLessons = (subject: 'chinese' | 'english'): Lesson[] => {
  return subject === 'chinese' ? chineseLessons : englishLessons;
};

// 獲取英文卡片
export const getEnglishCards = (lessonId?: string): StudyCard[] => {
  if (!lessonId) return englishCards;
  return englishCards.filter(c => c.lessonId === lessonId);
};

// 導出類型和數據
export { chineseBasicCards, chineseLesson01Cards, chineseLesson05Cards };
export * from './types';
