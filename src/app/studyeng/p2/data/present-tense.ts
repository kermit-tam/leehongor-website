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

// 40條 Present Tense 練習題目（原有20 + 新增20個一年班動詞）
export const presentTenseQuestions: PresentTenseQuestion[] = [
  // ========== 原有20題 ==========
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
  },

  // ========== 新增20題（一年班動詞）==========
  // 新增：say
  {
    id: 'pt-21',
    subject: 'He',
    verb: 'say',
    correct: 'says',
    options: ['say', 'says', 'sayes', 'saies'],
    emoji: '💬',
    sentence: 'He says hello.'
  },
  {
    id: 'pt-22',
    subject: 'I',
    verb: 'say',
    correct: 'say',
    options: ['say', 'says', 'sayes', 'saies'],
    emoji: '💬',
    sentence: 'I say thank you.'
  },

  // 新增：eat
  {
    id: 'pt-23',
    subject: 'She',
    verb: 'eat',
    correct: 'eats',
    options: ['eat', 'eats', 'eates', 'eaties'],
    emoji: '🍽️',
    sentence: 'She eats an apple.'
  },
  {
    id: 'pt-24',
    subject: 'They',
    verb: 'eat',
    correct: 'eat',
    options: ['eat', 'eats', 'eates', 'eaties'],
    emoji: '🍽️',
    sentence: 'They eat lunch.'
  },

  // 新增：drink
  {
    id: 'pt-25',
    subject: 'He',
    verb: 'drink',
    correct: 'drinks',
    options: ['drink', 'drinks', 'drinkes', 'drinkies'],
    emoji: '🥤',
    sentence: 'He drinks water.'
  },
  {
    id: 'pt-26',
    subject: 'You',
    verb: 'drink',
    correct: 'drink',
    options: ['drink', 'drinks', 'drinkes', 'drinkies'],
    emoji: '🥤',
    sentence: 'You drink milk.'
  },

  // 新增：sleep
  {
    id: 'pt-27',
    subject: 'It',
    verb: 'sleep',
    correct: 'sleeps',
    options: ['sleep', 'sleeps', 'sleepes', 'sleepies'],
    emoji: '😴',
    sentence: 'It sleeps at night.'
  },
  {
    id: 'pt-28',
    subject: 'We',
    verb: 'sleep',
    correct: 'sleep',
    options: ['sleep', 'sleeps', 'sleepes', 'sleepies'],
    emoji: '😴',
    sentence: 'We sleep early.'
  },

  // 新增：draw
  {
    id: 'pt-29',
    subject: 'She',
    verb: 'draw',
    correct: 'draws',
    options: ['draw', 'draws', 'drawes', 'drawies'],
    emoji: '🎨',
    sentence: 'She draws pictures.'
  },
  {
    id: 'pt-30',
    subject: 'I',
    verb: 'draw',
    correct: 'draw',
    options: ['draw', 'draws', 'drawes', 'drawies'],
    emoji: '🎨',
    sentence: 'I draw a cat.'
  },

  // 新增：write
  {
    id: 'pt-31',
    subject: 'He',
    verb: 'write',
    correct: 'writes',
    options: ['write', 'writes', 'writees', 'writies'],
    emoji: '✏️',
    sentence: 'He writes letters.'
  },
  {
    id: 'pt-32',
    subject: 'They',
    verb: 'write',
    correct: 'write',
    options: ['write', 'writes', 'writees', 'writies'],
    emoji: '✏️',
    sentence: 'They write stories.'
  },

  // 新增：talk
  {
    id: 'pt-33',
    subject: 'She',
    verb: 'talk',
    correct: 'talks',
    options: ['talk', 'talks', 'talkes', 'talkies'],
    emoji: '🗣️',
    sentence: 'She talks loudly.'
  },
  {
    id: 'pt-34',
    subject: 'You',
    verb: 'talk',
    correct: 'talk',
    options: ['talk', 'talks', 'talkes', 'talkies'],
    emoji: '🗣️',
    sentence: 'You talk quietly.'
  },

  // 新增：climb
  {
    id: 'pt-35',
    subject: 'It',
    verb: 'climb',
    correct: 'climbs',
    options: ['climb', 'climbs', 'climbes', 'climies'],
    emoji: '🐒',
    sentence: 'It climbs trees.'
  },
  {
    id: 'pt-36',
    subject: 'We',
    verb: 'climb',
    correct: 'climb',
    options: ['climb', 'climbs', 'climbes', 'climies'],
    emoji: '🧗',
    sentence: 'We climb hills.'
  },

  // 新增：swim
  {
    id: 'pt-37',
    subject: 'He',
    verb: 'swim',
    correct: 'swims',
    options: ['swim', 'swims', 'swimes', 'swimies'],
    emoji: '🏊',
    sentence: 'He swims fast.'
  },
  {
    id: 'pt-38',
    subject: 'They',
    verb: 'swim',
    correct: 'swim',
    options: ['swim', 'swims', 'swimes', 'swimies'],
    emoji: '🏊‍♀️',
    sentence: 'They swim in the pool.'
  },

  // 新增：sit
  {
    id: 'pt-39',
    subject: 'She',
    verb: 'sit',
    correct: 'sits',
    options: ['sit', 'sits', 'sites', 'sities'],
    emoji: '🪑',
    sentence: 'She sits down.'
  },
  {
    id: 'pt-40',
    subject: 'I',
    verb: 'sit',
    correct: 'sit',
    options: ['sit', 'sits', 'sites', 'sities'],
    emoji: '🪑',
    sentence: 'I sit here.'
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
