/**
 * 圖片服務 - 自動獲取圖片
 * Image Service for Auto-fetching Images
 */

// 方案1: 使用 Unsplash API (免費，需要API key)
// 方案2: 使用 Flaticon/Freepik (免費插圖)
// 方案3: 使用 emoji + 簡單圖形生成
// 方案4: 預先準備圖片庫

// 詞彙對應的圖片關鍵詞
const vocabImageKeywords: Record<string, string> = {
  // 交通工具
  'いきます': 'person walking silhouette',
  'きます': 'person arriving train station',
  'かえります': 'person going home house',
  'ちかてつ': 'subway metro underground',
  'しんかんせん': 'shinkansen bullet train japan',
  'バス': 'bus public transport',
  'タクシー': 'taxi cab car',
  'じてんしゃ': 'bicycle cycling bike',
  'あるいて': 'walking pedestrian',
  'ひこうき': 'airplane flight sky',
  'ふね': 'ship boat ferry',
  'でんしゃ': 'train electric railway',
  
  // 人物
  'ひと': 'person silhouette human',
  'ともだち': 'friends together happy',
  'かれ': 'man male boyfriend',
  'かのじょ': 'woman female girlfriend',
  'かぞく': 'family parents children',
  'ひとりで': 'alone solo person',
  
  // 場所
  'がっこう': 'school building education',
  'スーパー': 'supermarket grocery store',
  'えき': 'train station platform',
  
  // 時間
  'せんしゅう': 'last week calendar',
  'こんしゅう': 'this week calendar',
  'らいしゅう': 'next week calendar',
  'せんげつ': 'last month calendar',
  'こんげつ': 'this month calendar',
  'らいげつ': 'next month calendar',
  'きょねん': 'last year calendar',
  'ことし': 'this year calendar',
  'らいねん': 'next year calendar',
  
  // 日期
  'たんじょうび': 'birthday cake celebration',
  'いつ': 'when question time',
};

/**
 * 方案1: 使用 Unsplash Source (免費但有限制)
 * 注意：Unsplash Source 已於 2024 年停止服務
 */
export function getUnsplashImage(keyword: string, size: string = '400x400'): string {
  // 使用 picsum 作為替代方案
  return `https://picsum.photos/seed/${encodeURIComponent(keyword)}/${size}`;
}

/**
 * 方案2: 使用 Flaticon (需要 API key)
 */
export async function getFlaticonImage(keyword: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.flaticon.com/v3/search/icons?q=${encodeURIComponent(keyword)}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.data?.[0]?.images?.png?.[128] || null;
  } catch (error) {
    console.error('Failed to fetch Flaticon image:', error);
    return null;
  }
}

/**
 * 方案3: 生成簡單 SVG 圖形
 */
export function generateSVGImage(emoji: string, text: string): string {
  const svg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#F5F5F0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E0D5C7;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#grad)" rx="40"/>
      <text x="200" y="200" font-size="180" text-anchor="middle" dominant-baseline="middle">
        ${emoji}
      </text>
      <text x="200" y="320" font-size="40" text-anchor="middle" fill="#4A4A4A" font-family="sans-serif">
        ${text}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * 方案4: 使用 GIPHY Stickers (需要 API key)
 */
export async function getGiphySticker(keyword: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/stickers/search?q=${encodeURIComponent(keyword)}&limit=1&api_key=${apiKey}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.data?.[0]?.images?.fixed_height_small?.url || null;
  } catch (error) {
    console.error('Failed to fetch Giphy sticker:', error);
    return null;
  }
}

/**
 * 推薦方案: 使用 Cloudinary 動態生成
 * 需要 Cloudinary cloud name
 */
export function getCloudinaryImage(emoji: string, text: string, cloudName: string): string {
  // 使用 Cloudinary 的文本和表情符號疊加功能
  const transformations = [
    'w_400,h_400,c_fill',  // 裁剪為 400x400
    'bg_rgb:F5F5F0',       // 背景色
    `l_text:Noto Sans JP_60:${encodeURIComponent(emoji)},x_0,y_-30`,  // 表情符號
    `l_text:Noto Sans JP_24:${encodeURIComponent(text)},x_0,y_80,co_rgb:4A4A4A`,  // 文字
  ].join('/');
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/sample.jpg`;
}

/**
 * 獲取詞彙對應的圖片 URL
 */
export function getVocabImage(hiragana: string, emoji?: string): string {
  // 優先使用 emoji 生成 SVG
  if (emoji) {
    return generateSVGImage(emoji, hiragana);
  }
  
  // 否則使用關鍵詞搜索
  const keyword = vocabImageKeywords[hiragana] || 'japanese';
  return getUnsplashImage(keyword);
}

/**
 * 預先準備的圖片映射（推薦）
 * 你可以將這些圖片上傳到 Cloudinary 或其他 CDN
 */
export const presetImages: Record<string, string> = {
  // 格式: 'hiragana': 'https://your-cdn.com/image-path.jpg'
  // 需要手動上傳或批量導入
};

// 批量上傳工具建議：
// 1. 使用 Cloudinary Upload Widget
// 2. 寫一個腳本批量上傳到 Cloudinary
// 3. 使用 Google Cloud Storage + Cloudflare CDN
// 4. 使用 Vercel Blob (Next.js 原生支援)
