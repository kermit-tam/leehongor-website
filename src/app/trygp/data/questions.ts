/**
 * 二年級常識下學期考試題目
 * General Practice (GP) Questions - P2 Second Term Exam
 */

export type QuestionType = 'mc-word-bank' | 'mc' | 'short-answer' | 'matching' | 'matching-toy' | 'image-true-false' | 'classify' | 'experiment' | 'ordering';

export interface Option {
  label: string;
  text: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  wordBank?: string[];
  options?: Option[];
  answer: string | string[];
  hint?: string;
  images?: string[];
  imageLabels?: string[];
}

// 供詞填充題詞庫
export const wordBank1 = ['推力', '材料', '感受', '態度', '愛惜', '沉迷', '重力', '證實', '彈力', '速度', '因素', '經驗'];

// Q16 填表詞庫
export const wordBankQ16 = ['房屋', '種植', '打獵', '草藥'];

// 所有題目
export const allQuestions: Question[] = [
  // ===== 供詞填充題（變成MC）=====
  {
    id: 1,
    type: 'mc-word-bank',
    question: '我們無法觸摸到力，只可______力的存在。',
    wordBank: wordBank1,
    options: [
      { label: 'A', text: '感受' },
      { label: 'B', text: '證實' },
      { label: 'C', text: '經驗' },
      { label: 'D', text: '態度' },
    ],
    answer: 'A',
  },
  {
    id: 2,
    type: 'mc-word-bank',
    question: '以前的玩具大多以紙和布等常見的______所製成。',
    wordBank: wordBank1,
    options: [
      { label: 'A', text: '材料' },
      { label: 'B', text: '彈力' },
      { label: 'C', text: '速度' },
      { label: 'D', text: '因素' },
    ],
    answer: 'A',
  },
  {
    id: 3,
    type: 'mc-word-bank',
    question: '我們應該要以嚴謹的______進行科學探究。',
    wordBank: wordBank1,
    options: [
      { label: 'A', text: '態度' },
      { label: 'B', text: '經驗' },
      { label: 'C', text: '感受' },
      { label: 'D', text: '沉迷' },
    ],
    answer: 'A',
  },
  {
    id: 4,
    type: 'mc-word-bank',
    question: '物體因為受______影響，所以會向下掉。',
    wordBank: wordBank1,
    options: [
      { label: 'A', text: '重力' },
      { label: 'B', text: '彈力' },
      { label: 'C', text: '推力' },
      { label: 'D', text: '速度' },
    ],
    answer: 'A',
  },
  {
    id: 5,
    type: 'mc-word-bank',
    question: '物體受壓後回復原狀的力就是______。',
    wordBank: wordBank1,
    options: [
      { label: 'A', text: '彈力' },
      { label: 'B', text: '重力' },
      { label: 'C', text: '推力' },
      { label: 'D', text: '材料' },
    ],
    answer: 'A',
  },
  {
    id: 6,
    type: 'mc-word-bank',
    question: '在進行實驗時，我們要仔細觀察各個______的變化。',
    wordBank: wordBank1,
    options: [
      { label: 'A', text: '因素' },
      { label: 'B', text: '經驗' },
      { label: 'C', text: '速度' },
      { label: 'D', text: '材料' },
    ],
    answer: 'A',
  },
  {
    id: 7,
    type: 'mc-word-bank',
    question: '做實驗前，我們需要根據______作出合理的猜想。',
    wordBank: wordBank1,
    options: [
      { label: 'A', text: '經驗' },
      { label: 'B', text: '態度' },
      { label: 'C', text: '感受' },
      { label: 'D', text: '證實' },
    ],
    answer: 'A',
  },
  {
    id: 8,
    type: 'mc-word-bank',
    question: '施用______後，我能按下電梯的按鈕。',
    wordBank: wordBank1,
    options: [
      { label: 'A', text: '推力' },
      { label: 'B', text: '重力' },
      { label: 'C', text: '彈力' },
      { label: 'D', text: '速度' },
    ],
    answer: 'A',
  },
  
  // ===== MC選擇題 =====
  {
    id: 9,
    type: 'mc',
    question: '以下哪一項不是正確的科學探究過程？',
    options: [
      { label: 'A', text: '做一次實驗便可得出結論' },
      { label: 'B', text: '根據容器刻度量度測試結果' },
      { label: 'C', text: '準確紀錄實驗結果' },
      { label: 'D', text: '每次實驗只提出一個測試項目' },
    ],
    answer: 'A',
  },
  {
    id: 10,
    type: 'mc',
    question: '以下哪一項不是蔡倫改良造紙術的材料？',
    options: [
      { label: 'A', text: '魚網' },
      { label: 'B', text: '樹皮' },
      { label: 'C', text: '破布' },
      { label: 'D', text: '鐵片' },
    ],
    answer: 'D',
  },
  {
    id: 11,
    type: 'mc',
    question: '物體受力時，以下哪一項不會改變？',
    options: [
      { label: 'A', text: '物體的形狀' },
      { label: 'B', text: '物體移動的速度' },
      { label: 'C', text: '觸摸物體時的感覺' },
      { label: 'D', text: '物體的顏色' },
    ],
    answer: 'D',
  },
  {
    id: 12,
    type: 'mc',
    question: '當我們用力把乒乓球打出後，會出現甚麼結果？',
    options: [
      { label: 'A', text: '乒乓球會變大' },
      { label: 'B', text: '乒乓球位置會移動' },
      { label: 'C', text: '乒乓球會變小' },
      { label: 'D', text: '乒乓球立即停止轉動' },
    ],
    answer: 'B',
  },
  {
    id: 13,
    type: 'mc',
    question: '以下哪一項不是在國徽上印有的圖案？',
    options: [
      { label: 'A', text: '天安門' },
      { label: 'B', text: '齒輪' },
      { label: 'C', text: '五角星' },
      { label: 'D', text: '鋤頭' },
    ],
    answer: 'D',
  },
  {
    id: 14,
    type: 'mc',
    question: '中國的國旗是以甚麼顏色為主？',
    options: [
      { label: 'A', text: '白色' },
      { label: 'B', text: '黃色' },
      { label: 'C', text: '紅色' },
      { label: 'D', text: '黑色' },
    ],
    answer: 'C',
  },
  
  // ===== 看圖選擇題（電動玩具）=====
  {
    id: 15,
    type: 'mc',
    question: '以下哪一個是電動玩具？',
    options: [
      { label: 'A', text: '毽子' },
      { label: 'B', text: '遊戲機' },
      { label: 'C', text: '波子棋' },
      { label: 'D', text: '搖搖' },
    ],
    answer: 'B',
    images: ['/images/gp/gp_q15_a.png', '/images/gp/gp_q15_b.png', '/images/gp/gp_q15_c.png', '/images/gp/gp_q15_d.png'],
    imageLabels: ['A', 'B', 'C', 'D'],
  },
  
  // ===== 填表題（分拆為3題）=====
  {
    id: 16,
    type: 'mc',
    question: '【填表題】五千年前中國先民的飲食情況：飼養家畜和______糧食。',
    wordBank: wordBankQ16,
    options: [
      { label: 'A', text: '房屋' },
      { label: 'B', text: '種植' },
      { label: 'C', text: '打獵' },
      { label: 'D', text: '草藥' },
    ],
    answer: 'B',
  },
  {
    id: 161,
    type: 'mc',
    question: '【填表題】五千年前中國先民的住所情況：興建簡單的______居住。',
    wordBank: wordBankQ16,
    options: [
      { label: 'A', text: '房屋' },
      { label: 'B', text: '種植' },
      { label: 'C', text: '打獵' },
      { label: 'D', text: '草藥' },
    ],
    answer: 'A',
  },
  {
    id: 162,
    type: 'mc',
    question: '【填表題】五千年前中國先民的醫療情況：用______治病。',
    wordBank: wordBankQ16,
    options: [
      { label: 'A', text: '房屋' },
      { label: 'B', text: '種植' },
      { label: 'C', text: '打獵' },
      { label: 'D', text: '草藥' },
    ],
    answer: 'D',
  },
  
  // ===== 簡答題（開估模式）=====
  {
    id: 17,
    type: 'short-answer',
    question: '在沒有重力的環境下，物體會出現甚麼情況？',
    answer: '會向上浮起／向上飄／浮在半空',
    hint: '例如太空船內的物體會...',
  },
  {
    id: 18,
    type: 'short-answer',
    question: '中國的「國寶」是哪一種動物？',
    answer: '熊貓／大熊貓／熊貓貓',
    hint: '是一種黑白顏色的動物',
  },
  {
    id: 19,
    type: 'short-answer',
    question: '舉出一種應用了彈力的日常用品。',
    answer: '彈弓／彈簧／橡皮筋／跳彈床',
    hint: '可以彈跳的東西',
  },
  {
    id: 20,
    type: 'short-answer',
    question: '舉出一個可用紙製作的自製玩具。',
    answer: '紙飛機／紙船／紙風車／紙公仔',
    hint: '可以摺出來的玩具',
  },
  {
    id: 21,
    type: 'short-answer',
    question: '進行科學探究的第一個步驟是甚麼？',
    answer: '提出問題／觀察／觀察事物',
    hint: '首先要做什麼？',
  },
  {
    id: 22,
    type: 'short-answer',
    question: '我們可以把不再玩的玩具送到哪一間機構？',
    answer: '救世軍／玩具圖書館／慈善機構',
    hint: '幫助有需要的人的機構',
  },
  
  // ===== 配對題 I（科學家）=====
  {
    id: 23,
    type: 'matching',
    question: '【配對題】把以下的科學家和他們的發明或貢獻配對（答案不可重複使用）',
    options: [
      { label: '萊特兄弟', text: '' },
      { label: '畢昇', text: '' },
      { label: '伽利略', text: '' },
      { label: '愛迪生', text: '' },
      { label: '蔡倫', text: '' },
    ],
    answer: ['D', 'C', 'E', 'A', 'B'],
  },
  
  // ===== 配對題 II（玩具同電池）=====
  {
    id: 24,
    type: 'matching-toy',
    question: '【配對題 II】把以下玩具和電池配對（答案不可重複使用）',
    images: ['/images/gp/gp_q24_toy_a.png', '/images/gp/gp_q24_toy_b.png'],
    imageLabels: ['玩具 A', '玩具 B'],
    options: [
      { label: 'A', text: 'AAA 乾電池' },
      { label: 'B', text: '鋰離子電池' },
      { label: 'C', text: '鈕型乾電池' },
    ],
    answer: ['A', 'C'],
  },
  
  // ===== 排序題（升旗禮程序）=====
  {
    id: 25,
    type: 'ordering',
    question: '【排序題】根據學校升旗禮的程序，順序排列。',
    options: [
      { label: 'A', text: '全體肅立' },
      { label: 'B', text: '升國旗、奏唱國歌' },
      { label: 'C', text: '升旗隊進場' },
      { label: 'D', text: '升旗隊離場' },
      { label: 'E', text: '國旗下講話' },
    ],
    answer: ['A', 'C', 'B', 'E', 'D'],
  },
  
  // ===== 排序題（歷史事件）=====
  {
    id: 26,
    type: 'ordering',
    question: '【排序題】按以下歷史事件發展的先後次序排列出來。',
    options: [
      { label: 'A', text: '人們主要在洞穴裏群居生活' },
      { label: 'B', text: '秦始皇修築萬里長城' },
      { label: 'C', text: '夏朝建立' },
      { label: 'D', text: '不同的部落在河流附近居住' },
    ],
    answer: ['A', 'D', 'C', 'B'],
  },
  
  // ===== 看圖判斷題 =====
  {
    id: 27,
    type: 'image-true-false',
    question: '以下哪些事情我們需要用力才做到？（正確打✓，錯誤打✗）',
    options: [
      { label: 'A', text: '睡覺' },
      { label: 'B', text: '踢球' },
      { label: 'C', text: '關門' },
      { label: 'D', text: '搬運貨物' },
    ],
    answer: ['✗', '✓', '✓', '✓'],
    images: ['/images/gp/gp_q27_a.png', '/images/gp/gp_q27_b.png', '/images/gp/gp_q27_c.png', '/images/gp/gp_q27_d.png'],
    imageLabels: ['A', 'B', 'C', 'D'],
  },
  {
    id: 28,
    type: 'image-true-false',
    question: '以下哪些小朋友玩玩具時有注意安全？（正確打✓，錯誤打✗）',
    options: [
      { label: 'A', text: '在馬路上邊跑邊玩' },
      { label: 'B', text: '將玩具撞向窗' },
      { label: 'C', text: '將球擲向別人' },
      { label: 'D', text: '在家中空曠的地方玩耍' },
    ],
    answer: ['✗', '✗', '✗', '✓'],
    images: ['/images/gp/gp_q28_a.png', '/images/gp/gp_q28_b.png', '/images/gp/gp_q28_c.png', '/images/gp/gp_q28_d.png'],
    imageLabels: ['A', 'B', 'C', 'D'],
  },
  
  // ===== 分類題 =====
  {
    id: 29,
    type: 'classify',
    question: '以下哪些是發明家應有的條件？哪些不是發明家應有的態度？',
    options: [
      { label: 'A', text: '不斷思考和試驗' },
      { label: 'B', text: '缺乏好奇心' },
      { label: 'C', text: '輕言放棄' },
      { label: 'D', text: '具探究精神' },
    ],
    answer: ['AD', 'BC'],
  },
  
  // ===== 實驗題 =====
  {
    id: 30,
    type: 'experiment',
    question: '【實驗題】根據以下實驗回答問題',
    images: ['/images/gp/gp_exp_a.png', '/images/gp/gp_exp_b.png'],
    imageLabels: ['實驗一：玩具車A', '實驗二：玩具車B'],
    options: [
      { label: 'A', text: '桌子的斜度' },
      { label: 'B', text: '玩具車的大小' },
      { label: 'C', text: '推動玩具車的方法' },
      { label: 'D', text: '桌子的高度' },
    ],
    answer: 'C',
  },
  {
    id: 31,
    type: 'short-answer',
    question: '【實驗題】實驗中，玩具車（A／B）會走得較遠，風吹的方向與玩具車行走的方向是（相同／相反）的。',
    answer: 'A；相同',
    hint: '風扇的風力較強',
  },
  {
    id: 32,
    type: 'mc',
    question: '【實驗題】這個實驗是公平測試嗎？',
    options: [
      { label: 'A', text: '是，因為只有一個獨立變數' },
      { label: 'B', text: '是，因為只有一個控制變數' },
      { label: 'C', text: '不是，因為只有一個獨立變數' },
      { label: 'D', text: '不是，因為只有一個控制變數' },
    ],
    answer: 'A',
  },
];

// 配對題選項（用於顯示）
export const matchingOptions = [
  { label: 'A', text: '發明電燈泡' },
  { label: 'B', text: '改良造紙方法' },
  { label: 'C', text: '發明活字印刷術' },
  { label: 'D', text: '發明了飛機' },
  { label: 'E', text: '通過實驗驗證或革新多個不同理論，推動科學發展' },
];

// 科學家列表
export const scientists = ['萊特兄弟', '畢昇', '伽利略', '愛迪生', '蔡倫'];
