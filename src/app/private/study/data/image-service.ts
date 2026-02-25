/**
 * 圖片管理服務
 * 用 localStorage 儲存生字與圖片的關聯
 */

import { chineseLesson01Cards } from './chinese-lesson-01';
import { chineseLesson02Cards } from './chinese-lesson-02';
import { chineseLesson03Cards } from './chinese-lesson-03';

const STORAGE_KEY = 'study-images-mapping';

// 圖片關聯類型
export interface ImageMapping {
  cardId: string;
  character: string;
  lessonId: string;
  imageUrl: string;
  uploadedAt: string;
}

// 獲取所有生字（供管理介面使用）
export const getAllStudyCards = () => {
  return [
    ...chineseLesson01Cards,
    ...chineseLesson02Cards,
    ...chineseLesson03Cards,
  ];
};

// 獲取圖片關聯（從 localStorage）
export const getImageMappings = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const mappings: ImageMapping[] = JSON.parse(stored);
      // 轉換為 cardId -> imageUrl 的格式
      return mappings.reduce((acc, m) => {
        acc[m.cardId] = m.imageUrl;
        return acc;
      }, {} as Record<string, string>);
    }
  } catch (error) {
    console.error('讀取圖片關聯失敗:', error);
  }
  
  return {};
};

// 獲取單個生字的圖片
export const getCardImage = (cardId: string): string | undefined => {
  const mappings = getImageMappings();
  return mappings[cardId];
};

// 設定圖片關聯
export const setCardImage = (cardId: string, character: string, lessonId: string, imageUrl: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let mappings: ImageMapping[] = stored ? JSON.parse(stored) : [];
    
    // 移除舊的關聯（如果存在）
    mappings = mappings.filter(m => m.cardId !== cardId);
    
    // 添加新關聯
    mappings.push({
      cardId,
      character,
      lessonId,
      imageUrl,
      uploadedAt: new Date().toISOString(),
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mappings));
  } catch (error) {
    console.error('儲存圖片關聯失敗:', error);
  }
};

// 移除圖片關聯
export const removeCardImage = (cardId: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      let mappings: ImageMapping[] = JSON.parse(stored);
      mappings = mappings.filter(m => m.cardId !== cardId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mappings));
    }
  } catch (error) {
    console.error('移除圖片關聯失敗:', error);
  }
};

// 獲取所有圖片關聯（詳細資訊）
export const getAllImageMappings = (): ImageMapping[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('讀取圖片關聯失敗:', error);
    return [];
  }
};

// 匯出圖片關聯（方便備份）
export const exportImageMappings = (): string => {
  const mappings = getAllImageMappings();
  return JSON.stringify(mappings, null, 2);
};

// 匯入圖片關聯
export const importImageMappings = (jsonString: string): boolean => {
  try {
    const mappings: ImageMapping[] = JSON.parse(jsonString);
    if (Array.isArray(mappings)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mappings));
      return true;
    }
    return false;
  } catch (error) {
    console.error('匯入圖片關聯失敗:', error);
    return false;
  }
};
