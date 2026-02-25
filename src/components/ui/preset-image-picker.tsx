/**
 * 預設圖片選擇器
 * 
 * 從預設圖片庫中選擇圖片
 */

'use client';

import { useState } from 'react';
import { presetImages, getCategories, findPresetImages, PresetImage } from '@/app/private/study/data/preset-images';

interface PresetImagePickerProps {
  onSelect: (url: string) => void;
  onCancel: () => void;
  searchKeyword?: string; // 預設搜索關鍵詞
}

export function PresetImagePicker({ onSelect, onCancel, searchKeyword = '' }: PresetImagePickerProps) {
  const [search, setSearch] = useState(searchKeyword);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['all', ...getCategories()];
  
  // 過濾圖片
  const filteredImages = search.trim() 
    ? findPresetImages(search)
    : selectedCategory === 'all'
      ? presetImages
      : presetImages.filter(img => img.category === selectedCategory);

  const handleConfirm = () => {
    if (selectedImage) {
      onSelect(selectedImage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* 標題 */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-3">🖼️ 選擇預設圖片</h3>
          
          {/* 搜索框 */}
          <div className="relative mb-3">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedCategory('all');
              }}
              placeholder="搜索圖片..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          
          {/* 分類過濾 */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearch('');
                }}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? '全部' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 圖片網格 */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-4xl mb-2">🔍</p>
              <p>沒有找到相關圖片</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
              {filteredImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img.url
                      ? 'border-indigo-500 ring-2 ring-indigo-200 scale-105'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {selectedImage === img.url && (
                    <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 底部按鈕 */}
        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedImage}
            className="flex-1 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            確認選擇
          </button>
        </div>

        {/* 版權聲明 */}
        <p className="px-4 pb-4 text-xs text-gray-400 text-center">
          圖片來自 Flaticon 免費圖標庫，僅供教育用途使用
        </p>
      </div>
    </div>
  );
}
