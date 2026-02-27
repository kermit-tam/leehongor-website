/**
 * Present Tense 現在式練習
 * 針對一二年班學生，練習單複數動詞變化
 */

export interface PresentTenseQuestion {
  id: string;
  subject: string;      // 主語：He/She/It/I/We/You/They
  verb: string;         // 動詞原形
  correct: string;      // 正確答案
  options: string[];    // 四個選項
  emoji: string;        // 圖示
  sentence: string;     // 完整句子（顯示用）
}

// 20條 Present Tense 練習題目
export const presentTenseQuestions: PresentTenseQuestion[] = [
  // 單數 He/She/It - 一般動詞 +s
  {
    id: 'pt-01',
    subject: 'He',
    verb: 'play',
    correct: 'plays',
    options: ['play', 'plays', 'playes', 'plaies'],
    emoji: '🎮',
    sentence: 'He plays games.'
  },
  {
    id: 'pt-02',
    subject: 'She',
    verb: 'walk',
    correct: 'walks',
    options: ['walk', 'walks', 'walkes', 'waliks'],
    emoji: '🚶‍♀️',
    sentence: 'She walks to school.'
  },
  {
    id: 'pt-03',
    subject: 'It',
    verb: 'jump',
    correct: 'jumps',
    options: ['jump', 'jumps', 'jumpes', 'jumies'],
    emoji: '🐰',
    sentence: 'It jumps high.'
  },
  {
    id: 'pt-04',
    subject: 'He',
    verb: 'cook',
    correct: 'cooks',
    options: ['cook', 'cooks', 'cookes', 'cookies'],
    emoji: '👨‍🍳',
    sentence: 'He cooks dinner.'
  },
  {
    id: 'pt-05',
    subject: 'She',
    verb: 'read',
    correct: 'reads',
    options: ['read', 'reads', 'reades', 'readies'],
    emoji: '📖',
    sentence: 'She reads books.'
  },
  {
    id: 'pt-06',
    subject: 'It',
    verb: 'run',
    correct: 'runs',
    options: ['run', 'runs', 'runes', 'runnies'],
    emoji: '🏃',
    sentence: 'It runs fast.'
  },
  {
    id: 'pt-07',
    subject: 'He',
    verb: 'sing',
    correct: 'sings',
    options: ['sing', 'sings', 'singes', 'singies'],
    emoji: '🎤',
    sentence: 'He sings well.'
  },
  {
    id: 'pt-08',
    subject: 'She',
    verb: 'dance',
    correct: 'dances',
    options: ['dance', 'dances', 'dancees', 'dancies'],
    emoji: '💃',
    sentence: 'She dances happily.'
  },

  // 單數 He/She/It - +es（ch/sh/o/x結尾）
  {
    id: 'pt-09',
    subject: 'He',
    verb: 'watch',
    correct: 'watches',
    options: ['watch', 'watchs', 'watches', 'watchies'],
    emoji: '📺',
    sentence: 'He watches TV.'
  },
  {
    id: 'pt-10',
    subject: 'She',
    verb: 'wash',
    correct: 'washes',
    options: ['wash', 'washs', 'washes', 'washies'],
    emoji: '🧼',
    sentence: 'She washes hands.'
  },
  {
    id: 'pt-11',
    subject: 'It',
    verb: 'go',
    correct: 'goes',
    options: ['go', 'gos', 'goes', 'goies'],
    emoji: '🚗',
    sentence: 'It goes home.'
  },
  {
    id: 'pt-12',
    subject: 'He',
    verb: 'do',
    correct: 'does',
    options: ['do', 'dos', 'does', 'doies'],
    emoji: '✅',
    sentence: 'He does homework.'
  },

  // 單數 He/She/It - y→ies（輔音+y結尾）
  {
    id: 'pt-13',
    subject: 'She',
    verb: 'carry',
    correct: 'carries',
    options: ['carry', 'carryes', 'carrys', 'carries'],
    emoji: '📦',
    sentence: 'She carries a bag.'
  },
  {
    id: 'pt-14',
    subject: 'He',
    verb: 'study',
    correct: 'studies',
    options: ['study', 'studys', 'studyes', 'studies'],
    emoji: '📚',
    sentence: 'He studies hard.'
  },
  {
    id: 'pt-15',
    subject: 'It',
    verb: 'fly',
    correct: 'flies',
    options: ['fly', 'flys', 'flyes', 'flies'],
    emoji: '🦋',
    sentence: 'It flies high.'
  },

  // 複數 I/We/You/They - 保持原形
  {
    id: 'pt-16',
    subject: 'I',
    verb: 'play',
    correct: 'play',
    options: ['play', 'plays', 'plaies', 'playes'],
    emoji: '🎮',
    sentence: 'I play games.'
  },
  {
    id: 'pt-17',
    subject: 'We',
    verb: 'watch',
    correct: 'watch',
    options: ['watch', 'watchs', 'watches', 'watchies'],
    emoji: '📺',
    sentence: 'We watch TV.'
  },
  {
    id: 'pt-18',
    subject: 'You',
    verb: 'carry',
    correct: 'carry',
    options: ['carry', 'carrys', 'carries', 'carryes'],
    emoji: '📦',
    sentence: 'You carry a bag.'
  },
  {
    id: 'pt-19',
    subject: 'They',
    verb: 'study',
    correct: 'study',
    options: ['study', 'studys', 'studies', 'studyes'],
    emoji: '📚',
    sentence: 'They study hard.'
  },
  {
    id: 'pt-20',
    subject: 'We',
    verb: 'go',
    correct: 'go',
    options: ['go', 'gos', 'goes', 'goies'],
    emoji: '🚗',
    sentence: 'We go home.'
  }
];

// 規則說明
export const presentTenseRules = [
  {
    title: 'He/She/It（單數）',
    rules: [
      { pattern: '一般動詞', example: 'play → plays', action: '+ s' },
      { pattern: 's/x/ch/sh/o 結尾', example: 'watch → watches', action: '+ es' },
      { pattern: '輔音 + y 結尾', example: 'carry → carries', action: 'y → ies' }
    ]
  },
  {
    title: 'I/We/You/They（複數）',
    rules: [
      { pattern: '所有動詞', example: 'play → play', action: '保持原形' }
    ]
  }
];

// 打亂題目順序（用於練習）
export function shuffleQuestions(): PresentTenseQuestion[] {
  return [...presentTenseQuestions].sort(() => Math.random() - 0.5);
}
