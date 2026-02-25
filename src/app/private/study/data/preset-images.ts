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
  // ===== 食物類 =====
  {
    id: 'preset-apple',
    name: '蘋果',
    url: 'https://cdn-icons-png.flaticon.com/512/415/415733.png',
    keywords: ['蘋果', '果', 'apple', '水果'],
    category: '食物'
  },
  {
    id: 'preset-rice',
    name: '米飯',
    url: 'https://cdn-icons-png.flaticon.com/512/3081/3081840.png',
    keywords: ['飯', '米', 'rice', '吃'],
    category: '食物'
  },
  {
    id: 'preset-bread',
    name: '麵包',
    url: 'https://cdn-icons-png.flaticon.com/512/4241/4241664.png',
    keywords: ['麵包', '包', 'bread'],
    category: '食物'
  },
  {
    id: 'preset-milk',
    name: '牛奶',
    url: 'https://cdn-icons-png.flaticon.com/512/372/372972.png',
    keywords: ['奶', '牛奶', 'milk', '飲品'],
    category: '食物'
  },
  {
    id: 'preset-meat',
    name: '肉',
    url: 'https://cdn-icons-png.flaticon.com/512/3081/3081985.png',
    keywords: ['肉', 'meat', '豬肉', '牛肉'],
    category: '食物'
  },
  {
    id: 'preset-vegetable',
    name: '蔬菜',
    url: 'https://cdn-icons-png.flaticon.com/512/1147/1147831.png',
    keywords: ['菜', '蔬菜', 'vegetable'],
    category: '食物'
  },
  {
    id: 'preset-cake',
    name: '蛋糕',
    url: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
    keywords: ['蛋糕', '糕', 'cake', '甜品'],
    category: '食物'
  },
  {
    id: 'preset-egg',
    name: '蛋',
    url: 'https://cdn-icons-png.flaticon.com/512/3081/3081973.png',
    keywords: ['蛋', '雞蛋', 'egg'],
    category: '食物'
  },
  
  // ===== 交通工具 =====
  {
    id: 'preset-car',
    name: '汽車',
    url: 'https://cdn-icons-png.flaticon.com/512/3089/3089803.png',
    keywords: ['車', '汽車', 'car'],
    category: '交通'
  },
  {
    id: 'preset-bus',
    name: '巴士',
    url: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
    keywords: ['巴士', '公交', 'bus'],
    category: '交通'
  },
  {
    id: 'preset-bicycle',
    name: '單車',
    url: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png',
    keywords: ['車', '單車', '自行車', 'bike', 'bicycle'],
    category: '交通'
  },
  {
    id: 'preset-airplane',
    name: '飛機',
    url: 'https://cdn-icons-png.flaticon.com/512/3125/3125713.png',
    keywords: ['飛機', '機', 'plane', 'airplane', '飛'],
    category: '交通'
  },
  {
    id: 'preset-boat',
    name: '船',
    url: 'https://cdn-icons-png.flaticon.com/512/2909/2909733.png',
    keywords: ['船', 'boat', 'ship'],
    category: '交通'
  },
  {
    id: 'preset-train',
    name: '火車',
    url: 'https://cdn-icons-png.flaticon.com/512/3350/3350287.png',
    keywords: ['火車', '列車', 'train', '地鐵'],
    category: '交通'
  },
  
  // ===== 顏色 =====
  {
    id: 'preset-red',
    name: '紅色',
    url: 'https://cdn-icons-png.flaticon.com/512/3781/3781605.png',
    keywords: ['紅', '紅色', 'red'],
    category: '顏色'
  },
  {
    id: 'preset-blue',
    name: '藍色',
    url: 'https://cdn-icons-png.flaticon.com/512/3781/3781584.png',
    keywords: ['藍', '藍色', 'blue'],
    category: '顏色'
  },
  {
    id: 'preset-green',
    name: '綠色',
    url: 'https://cdn-icons-png.flaticon.com/512/3781/3781608.png',
    keywords: ['綠', '綠色', 'green'],
    category: '顏色'
  },
  {
    id: 'preset-yellow',
    name: '黃色',
    url: 'https://cdn-icons-png.flaticon.com/512/3781/3781611.png',
    keywords: ['黃', '黃色', 'yellow'],
    category: '顏色'
  },
  {
    id: 'preset-black',
    name: '黑色',
    url: 'https://cdn-icons-png.flaticon.com/512/3781/3781587.png',
    keywords: ['黑', '黑色', 'black'],
    category: '顏色'
  },
  {
    id: 'preset-white',
    name: '白色',
    url: 'https://cdn-icons-png.flaticon.com/512/3781/3781613.png',
    keywords: ['白', '白色', 'white'],
    category: '顏色'
  },
  
  // ===== 身體部位 =====
  {
    id: 'preset-eye',
    name: '眼睛',
    url: 'https://cdn-icons-png.flaticon.com/512/3026/3026319.png',
    keywords: ['眼', '眼睛', 'eye', '目'],
    category: '身體'
  },
  {
    id: 'preset-ear',
    name: '耳朵',
    url: 'https://cdn-icons-png.flaticon.com/512/3026/3026315.png',
    keywords: ['耳', '耳朵', 'ear'],
    category: '身體'
  },
  {
    id: 'preset-mouth',
    name: '嘴巴',
    url: 'https://cdn-icons-png.flaticon.com/512/3026/3026325.png',
    keywords: ['口', '嘴', '嘴巴', 'mouth'],
    category: '身體'
  },
  {
    id: 'preset-hand-body',
    name: '手',
    url: 'https://cdn-icons-png.flaticon.com/512/3026/3026321.png',
    keywords: ['手', 'hand'],
    category: '身體'
  },
  {
    id: 'preset-foot',
    name: '腳',
    url: 'https://cdn-icons-png.flaticon.com/512/3026/3026317.png',
    keywords: ['腳', '足', 'foot', 'leg'],
    category: '身體'
  },
  {
    id: 'preset-head',
    name: '頭',
    url: 'https://cdn-icons-png.flaticon.com/512/3026/3026323.png',
    keywords: ['頭', 'head'],
    category: '身體'
  },
  
  // ===== 日常用品 =====
  {
    id: 'preset-book',
    name: '書',
    url: 'https://cdn-icons-png.flaticon.com/512/3145/3145765.png',
    keywords: ['書', '本', 'book'],
    category: '用品'
  },
  {
    id: 'preset-pencil',
    name: '鉛筆',
    url: 'https://cdn-icons-png.flaticon.com/512/3073/3073411.png',
    keywords: ['筆', '鉛筆', 'pencil'],
    category: '用品'
  },
  {
    id: 'preset-ball',
    name: '球',
    url: 'https://cdn-icons-png.flaticon.com/512/3089/3089532.png',
    keywords: ['球', 'ball'],
    category: '用品'
  },
  {
    id: 'preset-phone',
    name: '電話',
    url: 'https://cdn-icons-png.flaticon.com/512/3024/3024605.png',
    keywords: ['電話', '手機', 'phone'],
    category: '用品'
  },
  {
    id: 'preset-clock',
    name: '時鐘',
    url: 'https://cdn-icons-png.flaticon.com/512/2928/2928956.png',
    keywords: ['鐘', '時鐘', 'clock', '時間', '時'],
    category: '用品'
  },
  {
    id: 'preset-bed',
    name: '床',
    url: 'https://cdn-icons-png.flaticon.com/512/2930/2930010.png',
    keywords: ['床', 'bed', '睡'],
    category: '用品'
  },
  {
    id: 'preset-chair',
    name: '椅',
    url: 'https://cdn-icons-png.flaticon.com/512/2930/2930008.png',
    keywords: ['椅', '椅子', 'chair', '坐'],
    category: '用品'
  },
  {
    id: 'preset-table',
    name: '桌',
    url: 'https://cdn-icons-png.flaticon.com/512/2930/2930012.png',
    keywords: ['桌', '桌子', 'table'],
    category: '用品'
  },
  
  // ===== 天氣 =====
  {
    id: 'preset-sunny',
    name: '晴天',
    url: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    keywords: ['晴', '晴天', '太陽', 'sunny', 'sun'],
    category: '天氣'
  },
  {
    id: 'preset-rain',
    name: '下雨',
    url: 'https://cdn-icons-png.flaticon.com/512/1146/1146858.png',
    keywords: ['雨', '下雨', 'rain'],
    category: '天氣'
  },
  {
    id: 'preset-cloud',
    name: '雲',
    url: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
    keywords: ['雲', 'cloud'],
    category: '天氣'
  },
  {
    id: 'preset-snow',
    name: '下雪',
    url: 'https://cdn-icons-png.flaticon.com/512/642/642102.png',
    keywords: ['雪', '下雪', 'snow'],
    category: '天氣'
  },
  {
    id: 'preset-wind',
    name: '風',
    url: 'https://cdn-icons-png.flaticon.com/512/4005/4005831.png',
    keywords: ['風', 'wind'],
    category: '天氣'
  },
  
  // ===== 數字 =====
  {
    id: 'preset-number-1',
    name: '1',
    url: 'https://cdn-icons-png.flaticon.com/512/3050/3050525.png',
    keywords: ['1', '一', 'one', '個'],
    category: '數字'
  },
  {
    id: 'preset-number-2',
    name: '2',
    url: 'https://cdn-icons-png.flaticon.com/512/3050/3050526.png',
    keywords: ['2', '二', 'two'],
    category: '數字'
  },
  {
    id: 'preset-number-3',
    name: '3',
    url: 'https://cdn-icons-png.flaticon.com/512/3050/3050527.png',
    keywords: ['3', '三', 'three'],
    category: '數字'
  },
  {
    id: 'preset-number-10',
    name: '10',
    url: 'https://cdn-icons-png.flaticon.com/512/3050/3050533.png',
    keywords: ['10', '十', 'ten'],
    category: '數字'
  },
  
  // ===== 動物（更多）=====
  {
    id: 'preset-pig',
    name: '豬',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998610.png',
    keywords: ['豬', 'pig'],
    category: '動物'
  },
  {
    id: 'preset-chicken',
    name: '雞',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998618.png',
    keywords: ['雞', 'chicken'],
    category: '動物'
  },
  {
    id: 'preset-duck',
    name: '鴨',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998622.png',
    keywords: ['鴨', 'duck'],
    category: '動物'
  },
  {
    id: 'preset-elephant',
    name: '大象',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998635.png',
    keywords: ['象', '大象', 'elephant'],
    category: '動物'
  },
  {
    id: 'preset-butterfly',
    name: '蝴蝶',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998614.png',
    keywords: ['蝶', '蝴蝶', 'butterfly'],
    category: '動物'
  },
  {
    id: 'preset-bee',
    name: '蜜蜂',
    url: 'https://cdn-icons-png.flaticon.com/512/1998/1998616.png',
    keywords: ['蜂', '蜜蜂', 'bee'],
    category: '動物'
  },
  
  // ===== 表情/情緒 =====
  {
    id: 'preset-happy',
    name: '開心',
    url: 'https://cdn-icons-png.flaticon.com/512/742/742751.png',
    keywords: ['笑', '開心', '快樂', 'happy', 'smile'],
    category: '情緒'
  },
  {
    id: 'preset-sad',
    name: '傷心',
    url: 'https://cdn-icons-png.flaticon.com/512/742/742752.png',
    keywords: ['哭', '傷心', 'sad', 'cry'],
    category: '情緒'
  },
  {
    id: 'preset-angry',
    name: '生氣',
    url: 'https://cdn-icons-png.flaticon.com/512/742/742750.png',
    keywords: ['怒', '生氣', 'angry', 'mad'],
    category: '情緒'
  },
  {
    id: 'preset-sleep',
    name: '睡覺',
    url: 'https://cdn-icons-png.flaticon.com/512/742/742754.png',
    keywords: ['睡', '睡覺', 'sleep'],
    category: '情緒'
  },
  
  // 原有圖片繼續...
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
