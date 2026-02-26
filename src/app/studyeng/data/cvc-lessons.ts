/**
 * CVC 英文單字課程
 * Consonant-Vowel-Consonant 格式
 * 適合初學英文拼音嘅小朋友
 */

export interface CVCWord {
  id: string;
  word: string;
  meaning: string;
  phonics: string; // 拼音讀法
  emoji: string;
  lessonId: string;
}

export interface CVCLesson {
  id: string;
  title: string;
  titleEn: string;
  lessonNum: number;
  description: string;
  words: CVCWord[];
}

// ===== 第一課：A 字族 =====
export const lesson1: CVCLesson = {
  id: 'eng-01',
  title: '第一課：A 字族',
  titleEn: 'Lesson 1: A Family',
  lessonNum: 1,
  description: '學習 A 發音嘅 CVC 單字',
  words: [
    { id: 'eng-01-001', word: 'CAT', meaning: '貓', phonics: 'K-A-T', emoji: '🐱', lessonId: 'eng-01' },
    { id: 'eng-01-002', word: 'HAT', meaning: '帽', phonics: 'H-A-T', emoji: '🎩', lessonId: 'eng-01' },
    { id: 'eng-01-003', word: 'MAT', meaning: '地氈', phonics: 'M-A-T', emoji: '🧹', lessonId: 'eng-01' },
    { id: 'eng-01-004', word: 'BAT', meaning: '蝙蝠 / 球拍', phonics: 'B-A-T', emoji: '🦇', lessonId: 'eng-01' },
    { id: 'eng-01-005', word: 'RAT', meaning: '老鼠', phonics: 'R-A-T', emoji: '🐭', lessonId: 'eng-01' },
    { id: 'eng-01-006', word: 'CAP', meaning: '帽', phonics: 'C-A-P', emoji: '🧢', lessonId: 'eng-01' },
    { id: 'eng-01-007', word: 'MAP', meaning: '地圖', phonics: 'M-A-P', emoji: '🗺️', lessonId: 'eng-01' },
    { id: 'eng-01-008', word: 'TAP', meaning: '水龍頭', phonics: 'T-A-P', emoji: '🚰', lessonId: 'eng-01' },
    { id: 'eng-01-009', word: 'VAN', meaning: '麵包車', phonics: 'V-A-N', emoji: '🚐', lessonId: 'eng-01' },
    { id: 'eng-01-010', word: 'CAN', meaning: '罐頭 / 能夠', phonics: 'C-A-N', emoji: '🥫', lessonId: 'eng-01' },
  ]
};

// ===== 第二課：E 字族 =====
export const lesson2: CVCLesson = {
  id: 'eng-02',
  title: '第二課：E 字族',
  titleEn: 'Lesson 2: E Family',
  lessonNum: 2,
  description: '學習 E 發音嘅 CVC 單字',
  words: [
    { id: 'eng-02-001', word: 'BED', meaning: '床', phonics: 'B-E-D', emoji: '🛏️', lessonId: 'eng-02' },
    { id: 'eng-02-002', word: 'RED', meaning: '紅色', phonics: 'R-E-D', emoji: '🔴', lessonId: 'eng-02' },
    { id: 'eng-02-003', word: 'LEG', meaning: '腳', phonics: 'L-E-G', emoji: '🦵', lessonId: 'eng-02' },
    { id: 'eng-02-004', word: 'EGG', meaning: '蛋', phonics: 'E-G-G', emoji: '🥚', lessonId: 'eng-02' },
    { id: 'eng-02-005', word: 'HEN', meaning: '母雞', phonics: 'H-E-N', emoji: '🐔', lessonId: 'eng-02' },
    { id: 'eng-02-006', word: 'PEN', meaning: '筆', phonics: 'P-E-N', emoji: '🖊️', lessonId: 'eng-02' },
    { id: 'eng-02-007', word: 'TEN', meaning: '十', phonics: 'T-E-N', emoji: '🔟', lessonId: 'eng-02' },
    { id: 'eng-02-008', word: 'NET', meaning: '網', phonics: 'N-E-T', emoji: '🕸️', lessonId: 'eng-02' },
    { id: 'eng-02-009', word: 'PET', meaning: '寵物', phonics: 'P-E-T', emoji: '🐶', lessonId: 'eng-02' },
    { id: 'eng-02-010', word: 'WET', meaning: '濕', phonics: 'W-E-T', emoji: '💧', lessonId: 'eng-02' },
  ]
};

// ===== 第三課：I 字族 =====
export const lesson3: CVCLesson = {
  id: 'eng-03',
  title: '第三課：I 字族',
  titleEn: 'Lesson 3: I Family',
  lessonNum: 3,
  description: '學習 I 發音嘅 CVC 單字',
  words: [
    { id: 'eng-03-001', word: 'PIG', meaning: '豬', phonics: 'P-I-G', emoji: '🐷', lessonId: 'eng-03' },
    { id: 'eng-03-002', word: 'BIG', meaning: '大', phonics: 'B-I-G', emoji: '⬆️', lessonId: 'eng-03' },
    { id: 'eng-03-003', word: 'SIT', meaning: '坐', phonics: 'S-I-T', emoji: '🪑', lessonId: 'eng-03' },
    { id: 'eng-03-004', word: 'HIT', meaning: '打', phonics: 'H-I-T', emoji: '👊', lessonId: 'eng-03' },
    { id: 'eng-03-005', word: 'PIN', meaning: '扣針', phonics: 'P-I-N', emoji: '📌', lessonId: 'eng-03' },
    { id: 'eng-03-006', word: 'WIN', meaning: '贏', phonics: 'W-I-N', emoji: '🏆', lessonId: 'eng-03' },
    { id: 'eng-03-007', word: 'BIN', meaning: '垃圾桶', phonics: 'B-I-N', emoji: '🗑️', lessonId: 'eng-03' },
    { id: 'eng-03-008', word: 'TIN', meaning: '錫罐', phonics: 'T-I-N', emoji: '🥫', lessonId: 'eng-03' },
    { id: 'eng-03-009', word: 'DIP', meaning: '浸', phonics: 'D-I-P', emoji: '🍟', lessonId: 'eng-03' },
    { id: 'eng-03-010', word: 'HIP', meaning: '臀部', phonics: 'H-I-P', emoji: '🕺', lessonId: 'eng-03' },
  ]
};

// ===== 第四課：O 字族 =====
export const lesson4: CVCLesson = {
  id: 'eng-04',
  title: '第四課：O 字族',
  titleEn: 'Lesson 4: O Family',
  lessonNum: 4,
  description: '學習 O 發音嘅 CVC 單字',
  words: [
    { id: 'eng-04-001', word: 'DOG', meaning: '狗', phonics: 'D-O-G', emoji: '🐕', lessonId: 'eng-04' },
    { id: 'eng-04-002', word: 'LOG', meaning: '木頭', phonics: 'L-O-G', emoji: '🪵', lessonId: 'eng-04' },
    { id: 'eng-04-003', word: 'FOG', meaning: '霧', phonics: 'F-O-G', emoji: '🌫️', lessonId: 'eng-04' },
    { id: 'eng-04-004', word: 'HOT', meaning: '熱', phonics: 'H-O-T', emoji: '🔥', lessonId: 'eng-04' },
    { id: 'eng-04-005', word: 'POT', meaning: '煲', phonics: 'P-O-T', emoji: '🍲', lessonId: 'eng-04' },
    { id: 'eng-04-006', word: 'COT', meaning: '嬰兒床', phonics: 'C-O-T', emoji: '🛏️', lessonId: 'eng-04' },
    { id: 'eng-04-007', word: 'MOP', meaning: '地拖', phonics: 'M-O-P', emoji: '🧹', lessonId: 'eng-04' },
    { id: 'eng-04-008', word: 'TOP', meaning: '頂部', phonics: 'T-O-P', emoji: '🔝', lessonId: 'eng-04' },
    { id: 'eng-04-009', word: 'COP', meaning: '警察', phonics: 'C-O-P', emoji: '👮', lessonId: 'eng-04' },
    { id: 'eng-04-010', word: 'HOP', meaning: '單腳跳', phonics: 'H-O-P', emoji: '🐰', lessonId: 'eng-04' },
  ]
};

// ===== 第五課：U 字族 =====
export const lesson5: CVCLesson = {
  id: 'eng-05',
  title: '第五課：U 字族',
  titleEn: 'Lesson 5: U Family',
  lessonNum: 5,
  description: '學習 U 發音嘅 CVC 單字',
  words: [
    { id: 'eng-05-001', word: 'BUG', meaning: '蟲子', phonics: 'B-U-G', emoji: '🐛', lessonId: 'eng-05' },
    { id: 'eng-05-002', word: 'HUG', meaning: '擁抱', phonics: 'H-U-G', emoji: '🤗', lessonId: 'eng-05' },
    { id: 'eng-05-003', word: 'MUG', meaning: '杯', phonics: 'M-U-G', emoji: '☕', lessonId: 'eng-05' },
    { id: 'eng-05-004', word: 'RUG', meaning: '小地余', phonics: 'R-U-G', emoji: '🧶', lessonId: 'eng-05' },
    { id: 'eng-05-005', word: 'TUB', meaning: '浴缸', phonics: 'T-U-B', emoji: '🛁', lessonId: 'eng-05' },
    { id: 'eng-05-006', word: 'CUB', meaning: '幼獸', phonics: 'C-U-B', emoji: '🐻', lessonId: 'eng-05' },
    { id: 'eng-05-007', word: 'SUB', meaning: '潛水艇', phonics: 'S-U-B', emoji: '🚢', lessonId: 'eng-05' },
    { id: 'eng-05-008', word: 'PUP', meaning: '小狗', phonics: 'P-U-P', emoji: '🐕', lessonId: 'eng-05' },
    { id: 'eng-05-009', word: 'CUP', meaning: '杯', phonics: 'C-U-P', emoji: '🥤', lessonId: 'eng-05' },
    { id: 'eng-05-010', word: 'CUT', meaning: '剪', phonics: 'C-U-T', emoji: '✂️', lessonId: 'eng-05' },
  ]
};

// 所有課程列表
export const allLessons = [lesson1, lesson2, lesson3, lesson4, lesson5];

// 根據 ID 獲取單字
export function getWordById(id: string): CVCWord | undefined {
  for (const lesson of allLessons) {
    const word = lesson.words.find(w => w.id === id);
    if (word) return word;
  }
  return undefined;
}

// 根據課程 ID 獲取課程
export function getLessonById(id: string): CVCLesson | undefined {
  return allLessons.find(l => l.id === id);
}
