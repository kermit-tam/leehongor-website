// 生字/詞彙卡片類型
export interface StudyCard {
  id: string;
  subject: 'chinese' | 'english';
  lessonId: string;
  // 中文用
  character?: string;
  pinyin?: string;
  jyutping?: string;
  strokes?: number;
  // 英文用
  word?: string;
  phonetic?: string;
  // 共通
  meaning: string;
  category: string;
  examples: Example[];
  // 圖畫配對用
  image?: string;  // 圖片路徑，例如：/images/study/shan.png
}

// 例句類型
export interface Example {
  id: string;
  scenario: string;
  spoken: string;   // 口語（粵語/口語英文）
  written: string;  // 書面語（正式中文/書面英文）
}

// 課程類型
export interface Lesson {
  id: string;
  subject: 'chinese' | 'english';
  title: string;        // 例如：第一課、第二課（沒有副標題）
  description: string;  // 簡短描述，例如列出10個生字
  order: number;
  cardCount: number;
  topicId?: string;     // 所屬主題ID
}

// 主題類型（大分類）
export interface Topic {
  id: string;
  subject: 'chinese' | 'english';
  title: string;        // 例如：基礎十字
  description: string;  // 主題描述
  order: number;
  totalCards: number;   // 該主題下所有課程的字數總和
  lessons: Lesson[];    // 該主題下的課程列表
}
