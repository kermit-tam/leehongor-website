/**
 * 預設圖片庫
 * 
 * 提供一些常用的免費圖片 URL，用戶可以直接選擇使用
 * 這些圖片來自免費圖庫或 CDN
 */

export interface PresetImage {
  id: string;
  name: string;
  url: string;
  keywords: string[]; // 匹配關鍵詞
  category: string;
}

// 預設圖片列表
export const presetImages: PresetImage[] = [
  // 自然類
  {
    id: 'preset-mountain',
    name: '山',
    url: 'https://cdn-icons-png.flaticon.com/512/2909/2909733.png',
    keywords: ['山', '山嶽', 'mountain'],
    category: '自然'
  },
  {
    id: 'preset-water',
    name: '水',
    url: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
    keywords: ['水', 'water', '液體'],
    category: '自然'
  },
  {
    id: 'preset-sun',
    name: '太陽',
    url: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    keywords: ['日', '太陽', 'sun'],
    category: '自然'
  },
  {
    id: 'preset-moon',
    name: '月亮',
    url: 'https://cdn-icons-png.flaticon.com/512/1826/1826817.png',
    keywords: ['月', '月亮', 'moon'],
    category: '自然'
  },
  {
    id: 'preset-grass',
    name: '草',
    url: 'https://cdn-icons-png.flaticon.com/512/628/628283.png',
    keywords: ['草', '青草', 'grass'],
    category: '自然'
  },
  {
    id: 'preset-tree',
    name: '樹',
    url: 'https://cdn-icons-png.flaticon.com/512/740/740935.png',
    keywords: ['樹', '木', 'tree'],
    category: '自然'
  },
  
  // 人物類
  {
    id: 'preset-father',
    name: '爸爸',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png',
    keywords: ['爸', '爸爸', '父親', 'father', 'dad'],
    category: '家人'
  },
  {
    id: 'preset-mother',
    name: '媽媽',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
    keywords: ['媽', '媽媽', '母親', 'mother', 'mom'],
    category: '家人'
  },
  {
    id: 'preset-brother',
    name: '哥哥',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140062.png',
    keywords: ['哥', '哥哥', '兄長', 'brother'],
    category: '家人'
  },
  {
    id: 'preset-sister',
    name: '姐姐',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140061.png',
    keywords: ['姐', '姐姐', '姊姊', 'sister'],
    category: '家人'
  },
  {
    id: 'preset-baby-boy',
    name: '弟弟',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140055.png',
    keywords: ['弟', '弟弟', 'little brother'],
    category: '家人'
  },
  {
    id: 'preset-baby-girl',
    name: '妹妹',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140056.png',
    keywords: ['妹', '妹妹', 'little sister'],
    category: '家人'
  },
  {
    id: 'preset-uncle',
    name: '叔叔',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png',
    keywords: ['叔', '叔叔', 'uncle'],
    category: '家人'
  },
  {
    id: 'preset-boy',
    name: '男孩',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140060.png',
    keywords: ['我', '你', '男孩', 'boy', 'kid'],
    category: '人物'
  },
  {
    id: 'preset-girl',
    name: '女孩',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140059.png',
    keywords: ['我', '你', '女孩', 'girl', 'kid'],
    category: '人物'
  },
  {
    id: 'preset-person',
    name: '人',
    url: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png',
    keywords: ['人', 'person', 'people'],
    category: '人物'
  },
  
  // 動物類
  {
    id: 'preset-cow',
    name: '牛',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998610.png',
    keywords: ['牛', 'cow', 'bull'],
    category: '動物'
  },
  {
    id: 'preset-dog',
    name: '狗',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998627.png',
    keywords: ['狗', '犬', 'dog'],
    category: '動物'
  },
  {
    id: 'preset-cat',
    name: '貓',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998611.png',
    keywords: ['貓', 'cat'],
    category: '動物'
  },
  {
    id: 'preset-bird',
    name: '鳥',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998618.png',
    keywords: ['鳥', 'bird'],
    category: '動物'
  },
  {
    id: 'preset-fish',
    name: '魚',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998612.png',
    keywords: ['魚', 'fish'],
    category: '動物'
  },
  
  // 建築/地方
  {
    id: 'preset-house',
    name: '家',
    url: 'https://cdn-icons-png.flaticon.com/512/609/609803.png',
    keywords: ['家', '房子', 'home', 'house'],
    category: '地方'
  },
  {
    id: 'preset-school',
    name: '學校',
    url: 'https://cdn-icons-png.flaticon.com/512/2602/2602412.png',
    keywords: ['學校', '校', 'school'],
    category: '地方'
  },
  
  // 動作/情感
  {
    id: 'preset-walk',
    name: '走',
    url: 'https://cdn-icons-png.flaticon.com/512/3105/3105808.png',
    keywords: ['走', '走路', 'walk', '去'],
    category: '動作'
  },
  {
    id: 'preset-run',
    name: '跑',
    url: 'https://cdn-icons-png.flaticon.com/512/2546/2546380.png',
    keywords: ['跑', '走', 'run'],
    category: '動作'
  },
  {
    id: 'preset-love',
    name: '愛',
    url: 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
    keywords: ['愛', '喜愛', '心', 'love', 'heart'],
    category: '情感'
  },
  {
    id: 'preset-handshake',
    name: '和',
    url: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
    keywords: ['和', '與', '握手', 'and', 'handshake'],
    category: '動作'
  },
  {
    id: 'preset-no',
    name: '沒有',
    url: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png',
    keywords: ['沒', '沒有', '無', 'no', 'cross'],
    category: '符號'
  },
  {
    id: 'preset-up',
    name: '上',
    url: 'https://cdn-icons-png.flaticon.com/512/626/626075.png',
    keywords: ['上', '向上', 'up', 'arrow'],
    category: '方向'
  },
  {
    id: 'preset-down',
    name: '下',
    url: 'https://cdn-icons-png.flaticon.com/512/626/626053.png',
    keywords: ['下', '向下', 'down', 'arrow'],
    category: '方向'
  },
  {
    id: 'preset-center',
    name: '中',
    url: 'https://cdn-icons-png.flaticon.com/512/1828/1828885.png',
    keywords: ['中', '中間', 'center', 'middle'],
    category: '方向'
  },
  {
    id: 'preset-hand',
    name: '有',
    url: 'https://cdn-icons-png.flaticon.com/512/1189/1189175.png',
    keywords: ['有', '手持', 'have', 'hand'],
    category: '動作'
  },
  {
    id: 'preset-location',
    name: '在',
    url: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    keywords: ['在', '位置', 'at', 'location', 'pin'],
    category: '符號'
  },
  {
    id: 'preset-tall',
    name: '高',
    url: 'https://cdn-icons-png.flaticon.com/512/2546/2546384.png',
    keywords: ['高', 'tall', 'high'],
    category: '形容'
  },
  {
    id: 'preset-number-one',
    name: '個',
    url: 'https://cdn-icons-png.flaticon.com/512/3050/3050525.png',
    keywords: ['個', '一', 'one', 'number'],
    category: '數量'
  },
];

// 根據關鍵詞搜索預設圖片
export function findPresetImages(keyword: string): PresetImage[] {
  const lowerKeyword = keyword.toLowerCase();
  return presetImages.filter(img => 
    img.keywords.some(k => k.toLowerCase().includes(lowerKeyword)) ||
    img.name.toLowerCase().includes(lowerKeyword)
  );
}

// 獲取分類列表
export function getCategories(): string[] {
  const categories = new Set(presetImages.map(img => img.category));
  return Array.from(categories).sort();
}

// 根據分類獲取圖片
export function getPresetImagesByCategory(category: string): PresetImage[] {
  if (category === 'all') return presetImages;
  return presetImages.filter(img => img.category === category);
}
