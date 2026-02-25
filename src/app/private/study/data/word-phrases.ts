import { WordPhrase } from './types';

/**
 * 兩字詞語庫
 * 
 * 配合基礎十字組成的常見詞語
 * 適合圖畫配對遊戲
 */

export const wordPhrases: WordPhrase[] = [
  // ===== 第一課組合 =====
  {
    id: 'phrase-01-001',
    chars: ['山', '上'],
    phrase: '山上',
    meaning: '山的上面',
    lessonId: 'ch-01',
  },
  {
    id: 'phrase-01-002',
    chars: ['山', '下'],
    phrase: '山下',
    meaning: '山的下面',
    lessonId: 'ch-01',
  },
  {
    id: 'phrase-01-003',
    chars: ['水', '上'],
    phrase: '水上',
    meaning: '水的上面',
    lessonId: 'ch-01',
  },
  {
    id: 'phrase-01-004',
    chars: ['山', '水'],
    phrase: '山水',
    meaning: '山和水，自然景色',
    lessonId: 'ch-01',
    image: 'https://cdn-icons-png.flaticon.com/512/2909/2909733.png',
  },
  {
    id: 'phrase-01-005',
    chars: ['人', '人'],
    phrase: '人人',
    meaning: '每個人',
    lessonId: 'ch-01',
  },
  {
    id: 'phrase-01-006',
    chars: ['牛', '牛'],
    phrase: '牛牛',
    meaning: '牛（親暱說法）',
    lessonId: 'ch-01',
  },
  
  // ===== 第二課組合 =====
  {
    id: 'phrase-02-001',
    chars: ['爸', '爸'],
    phrase: '爸爸',
    meaning: '父親',
    lessonId: 'ch-02',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png',
  },
  {
    id: 'phrase-02-002',
    chars: ['媽', '媽'],
    phrase: '媽媽',
    meaning: '母親',
    lessonId: 'ch-02',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
  },
  {
    id: 'phrase-02-003',
    chars: ['爸', '媽'],
    phrase: '爸媽',
    meaning: '爸爸和媽媽',
    lessonId: 'ch-02',
  },
  {
    id: 'phrase-02-004',
    chars: ['回', '家'],
    phrase: '回家',
    meaning: '返回家中',
    lessonId: 'ch-02',
  },
  {
    id: 'phrase-02-005',
    chars: ['大', '家'],
    phrase: '大家',
    meaning: '所有人',
    lessonId: 'ch-02',
  },
  {
    id: 'phrase-02-006',
    chars: ['青', '草'],
    phrase: '青草',
    meaning: '綠色的草',
    lessonId: 'ch-02',
    image: 'https://cdn-icons-png.flaticon.com/512/628/628283.png',
  },
  {
    id: 'phrase-02-007',
    chars: ['走', '路'],
    phrase: '走路',
    meaning: '步行',
    lessonId: 'ch-02',
  },
  
  // ===== 第三課組合（重點：形容詞+名詞）=====
  {
    id: 'phrase-03-001',
    chars: ['高', '山'],
    phrase: '高山',
    meaning: '很高的山',
    lessonId: 'ch-03',
    image: 'https://cdn-icons-png.flaticon.com/512/2909/2909733.png',
  },
  {
    id: 'phrase-03-002',
    chars: ['大', '人'],
    phrase: '大人',
    meaning: '成年人',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-003',
    chars: ['小', '人'],
    phrase: '小人',
    meaning: '小朋友（或指品格不好的人）',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-004',
    chars: ['大', '家'],
    phrase: '大家',
    meaning: '所有人',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-005',
    chars: ['高', '人'],
    phrase: '高人',
    meaning: '高個子的人',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-006',
    chars: ['大', '水'],
    phrase: '大水',
    meaning: '洪水',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-007',
    chars: ['小', '水'],
    phrase: '小水',
    meaning: '小溪、小水流',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-008',
    chars: ['牛', '牛'],
    phrase: '牛牛',
    meaning: '牛（親暱說法）',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-009',
    chars: ['山', '水'],
    phrase: '山水',
    meaning: '山和水，自然景色',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-010',
    chars: ['大', '牛'],
    phrase: '大牛',
    meaning: '大的牛',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-011',
    chars: ['小', '牛'],
    phrase: '小牛',
    meaning: '小牛犢',
    lessonId: 'ch-03',
  },
  
  // ===== 家人組合 =====
  {
    id: 'phrase-03-012',
    chars: ['哥', '哥'],
    phrase: '哥哥',
    meaning: '兄長',
    lessonId: 'ch-03',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140062.png',
  },
  {
    id: 'phrase-03-013',
    chars: ['姐', '姐'],
    phrase: '姐姐',
    meaning: '姊姊',
    lessonId: 'ch-03',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140061.png',
  },
  {
    id: 'phrase-03-014',
    chars: ['弟', '弟'],
    phrase: '弟弟',
    meaning: '年幼的弟弟',
    lessonId: 'ch-03',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140055.png',
  },
  {
    id: 'phrase-03-015',
    chars: ['妹', '妹'],
    phrase: '妹妹',
    meaning: '年幼的妹妹',
    lessonId: 'ch-03',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140056.png',
  },
  {
    id: 'phrase-03-016',
    chars: ['叔', '叔'],
    phrase: '叔叔',
    meaning: '叔父',
    lessonId: 'ch-03',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png',
  },
  
  // ===== 動作組合 =====
  {
    id: 'phrase-03-017',
    chars: ['打', '人'],
    phrase: '打人',
    meaning: '用手打人（不好的行為）',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-018',
    chars: ['走', '路'],
    phrase: '走路',
    meaning: '步行',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-019',
    chars: ['走', '山'],
    phrase: '走山',
    meaning: '去山上',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-020',
    chars: ['上', '山'],
    phrase: '上山',
    meaning: '到山上去',
    lessonId: 'ch-03',
  },
  {
    id: 'phrase-03-021',
    chars: ['下', '山'],
    phrase: '下山',
    meaning: '從山上下來',
    lessonId: 'ch-03',
  },
];

/**
 * 獲取指定課程的詞語
 */
export function getPhrasesByLesson(lessonId: string): WordPhrase[] {
  return wordPhrases.filter(p => p.lessonId === lessonId);
}

/**
 * 獲取所有適合圖畫配對的詞語（有圖片或具體名詞）
 */
export function getPicturablePhrases(lessonId?: string): WordPhrase[] {
  const phrases = lessonId 
    ? wordPhrases.filter(p => p.lessonId === lessonId)
    : wordPhrases;
  
  // 優先返回有圖片的詞語
  return phrases.filter(p => p.image || isPicturablePhrase(p));
}

/**
 * 判斷詞語是否適合圖畫配對
 */
function isPicturablePhrase(phrase: WordPhrase): boolean {
  // 包含具體名詞的詞語通常適合圖片
  const picturableChars = ['山', '水', '人', '牛', '爸', '媽', '哥', '姐', '弟', '妹', '叔', '家', '草'];
  return phrase.chars.some(c => picturableChars.includes(c));
}

/**
 * 根據 ID 獲取詞語
 */
export function getPhraseById(id: string): WordPhrase | undefined {
  return wordPhrases.find(p => p.id === id);
}
