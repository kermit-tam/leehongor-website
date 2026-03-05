/**
 * 仔仔溫書圖片管理後台
 * 
 * 功能：
 * - 查看所有生字
 * - 上傳圖片關聯到生字
 * - 預覽已上傳的圖片
 * - 刪除圖片關聯
 * - 匯出/匯入設定（備份）
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRequireAuth } from '@/lib/auth-context';
import Link from 'next/link';

import { ImageCropper } from '@/components/ui/image-cropper';
import { PresetImagePicker } from '@/components/ui/preset-image-picker';
import { 
  getAllStudyCards, 
  getAllImageMappings, 
  setCardImage, 
  removeCardImage,
  exportImageMappings,
  importImageMappings,
  ImageMapping 
} from '@/app/private/study/data/image-service';

export default function StudyImagesAdminPage() {
  const { user, isLoading } = useRequireAuth('/');
  const [mappings, setMappings] = useState<ImageMapping[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<string>('all');
  const [uploadingCardId, setUploadingCardId] = useState<string | null>(null);
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const [cropTargetCard, setCropTargetCard] = useState<{id: string, character: string, lessonId: string} | null>(null);
  const [showPresetPicker, setShowPresetPicker] = useState(false);
  const [presetSearchKeyword, setPresetSearchKeyword] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showExport, setShowExport] = useState(false);
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [stats, setStats] = useState({ total: 0, withImage: 0, withoutImage: 0 });

  const cards = getAllStudyCards();
  const lessons = [
    { id: 'ch-01', title: '第一課' },
    { id: 'ch-02', title: '第二課' },
    { id: 'ch-03', title: '第三課' },
  ];

  // 載入圖片關聯
  const loadMappings = useCallback(() => {
    const data = getAllImageMappings();
    setMappings(data);
    
    // 計算統計
    const withImage = data.length;
    setStats({
      total: cards.length,
      withImage,
      withoutImage: cards.length - withImage,
    });
  }, [cards.length]);

  useEffect(() => {
    loadMappings();
  }, [loadMappings]);

  // 處理文件選擇（先裁剪再上傳）
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, cardId: string, character: string, lessonId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 檢查文件類型
    if (!file.type.startsWith('image/')) {
      alert('請選擇圖片文件');
      return;
    }

    // 檢查文件大小（最大 5MB）
    if (file.size > 5 * 1024 * 1024) {
      alert('圖片大小不能超過 5MB');
      return;
    }

    // 創建本地 URL 並打開裁剪器
    const url = URL.createObjectURL(file);
    setCropImageUrl(url);
    setCropTargetCard({ id: cardId, character, lessonId });
  };

  // 處理裁剪完成
  const handleCropComplete = async (croppedBlob: Blob) => {
    if (!cropTargetCard) return;

    // 將 blob 轉為文件並上傳
    const file = new File([croppedBlob], 'cropped.png', { type: 'image/png' });
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'leehongor');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '上傳失敗');
      }

      // 保存圖片關聯
      setCardImage(cropTargetCard.id, cropTargetCard.character, cropTargetCard.lessonId, data.url);
      loadMappings();
      
      // 清理
      if (cropImageUrl) {
        URL.revokeObjectURL(cropImageUrl);
      }
      setCropImageUrl(null);
      setCropTargetCard(null);
      setUploadingCardId(null);
      
      alert('圖片上傳成功！');
    } catch (error) {
      console.error('Upload error:', error);
      alert('上傳失敗：' + (error instanceof Error ? error.message : '未知錯誤'));
    }
  };

  // 取消裁剪
  const handleCropCancel = () => {
    if (cropImageUrl) {
      URL.revokeObjectURL(cropImageUrl);
    }
    setCropImageUrl(null);
    setCropTargetCard(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 處理預設圖片選擇
  const handlePresetSelect = (url: string) => {
    if (!cropTargetCard) return;
    
    setCardImage(cropTargetCard.id, cropTargetCard.character, cropTargetCard.lessonId, url);
    loadMappings();
    setShowPresetPicker(false);
    setCropTargetCard(null);
    setUploadingCardId(null);
  };

  // 打開預設圖片選擇器
  const openPresetPicker = (cardId: string, character: string, lessonId: string) => {
    setCropTargetCard({ id: cardId, character, lessonId });
    setPresetSearchKeyword(character);
    setShowPresetPicker(true);
  };

  // 處理刪除圖片
  const handleRemoveImage = (cardId: string) => {
    if (confirm('確定要移除這個圖片關聯嗎？')) {
      removeCardImage(cardId);
      loadMappings();
    }
  };

  // 獲取卡片的圖片
  const getCardImageUrl = (cardId: string): string | undefined => {
    const mapping = mappings.find(m => m.cardId === cardId);
    return mapping?.imageUrl;
  };

  // 過濾卡片
  const filteredCards = selectedLesson === 'all' 
    ? cards 
    : cards.filter(c => c.lessonId === selectedLesson);

  // 匯入處理
  const handleImport = () => {
    if (importText.trim()) {
      if (importImageMappings(importText.trim())) {
        alert('匯入成功！');
        loadMappings();
        setImportText('');
        setShowImport(false);
      } else {
        alert('匯入失敗，請檢查 JSON 格式');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>載入中...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* 頂部導航 */}
      <header className="bg-white border-b border-[#E5E5E5] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin" 
                className="text-[#8C8C8C] hover:text-[#4A4A4A] transition-colors"
              >
                ← 返回管理台
              </Link>
              <h1 className="text-xl font-bold text-[#4A4A4A]">
                🖼️ 仔仔溫書圖片管理
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExport(!showExport)}
                className="px-4 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-[#4A4A4A] hover:bg-[#F0F0F0] transition-colors text-sm"
              >
                📤 匯出設定
              </button>
              <button
                onClick={() => setShowImport(!showImport)}
                className="px-4 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-[#4A4A4A] hover:bg-[#F0F0F0] transition-colors text-sm"
              >
                📥 匯入設定
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* 統計卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 border-t border-[#E5E5E5]">
            <p className="text-sm text-[#8C8C8C] mb-1">總生字數</p>
            <p className="text-3xl font-bold text-[#4A4A4A]">{stats.total}</p>
          </div>
          <div className="bg-white p-4 border-t border-[#E5E5E5]">
            <p className="text-sm text-[#8C8C8C] mb-1">已有圖片</p>
            <p className="text-3xl font-bold text-green-600">{stats.withImage}</p>
          </div>
          <div className="bg-white p-4 border-t border-[#E5E5E5]">
            <p className="text-sm text-[#8C8C8C] mb-1">缺少圖片</p>
            <p className="text-3xl font-bold text-orange-500">{stats.withoutImage}</p>
          </div>
        </div>

        {/* 匯出區域 */}
        {showExport && (
          <div className="bg-white p-4 border-t border-[#E5E5E5] mb-6">
            <h3 className="font-bold text-[#4A4A4A] mb-3">📤 匯出圖片設定</h3>
            <p className="text-sm text-[#8C8C8C] mb-3">
              複製以下 JSON 保存為備份，之後可以匯入恢復設定。
            </p>
            <textarea
              value={exportImageMappings()}
              readOnly
              className="w-full h-32 px-4 py-3 bg-[#FAF9F7] border-t border-[#E5E5E5] text-xs font-mono focus:border-[#8C8C8C] focus:outline-none resize-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(exportImageMappings());
                alert('已複製到剪貼簿！');
              }}
              className="mt-2 px-4 py-2 bg-[#4A4A4A] text-white text-sm hover:bg-[#6B6B6B] transition-colors"
            >
              📋 複製到剪貼簿
            </button>
          </div>
        )}

        {/* 匯入區域 */}
        {showImport && (
          <div className="bg-white p-4 border-t border-[#E5E5E5] mb-6">
            <h3 className="font-bold text-[#4A4A4A] mb-3">📥 匯入圖片設定</h3>
            <p className="text-sm text-[#8C8C8C] mb-3">
              貼上之前匯出的 JSON，會覆蓋現有的圖片設定。
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="貼上 JSON..."
              className="w-full h-32 px-4 py-3 bg-[#FAF9F7] border-t border-[#E5E5E5] text-xs font-mono focus:border-[#8C8C8C] focus:outline-none resize-none mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleImport}
                className="px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
              >
                ✓ 確認匯入
              </button>
              <button
                onClick={() => {
                  setImportText('');
                  setShowImport(false);
                }}
                className="px-4 py-2 bg-[#FAF9F7] border-t border-[#E5E5E5] text-[#4A4A4A] hover:bg-[#F0F0F0] transition-colors text-sm"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* 課程過濾 */}
        <div className="bg-white p-4 border-t border-[#E5E5E5] mb-6">
          <div className="flex items-center gap-4">
            <span className="text-[#4A4A4A] font-medium">選擇課程：</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedLesson('all')}
                className={`px-4 py-2 text-sm transition-colors ${
                  selectedLesson === 'all'
                    ? 'bg-[#4A4A4A] text-white'
                    : 'bg-[#FAF9F7] border-t border-[#E5E5E5] text-[#4A4A4A] hover:bg-[#F0F0F0]'
                }`}
              >
                全部
              </button>
              {lessons.map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson.id)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    selectedLesson === lesson.id
                      ? 'bg-[#4A4A4A] text-white'
                      : 'bg-[#FAF9F7] border-t border-[#E5E5E5] text-[#4A4A4A] hover:bg-[#F0F0F0]'
                  }`}
                >
                  {lesson.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 生字列表 */}
        <div className="bg-white border-t border-[#E5E5E5]">
          <div className="p-4 border-b border-[#E5E5E5]">
            <h2 className="font-bold text-[#4A4A4A]">
              生字列表 ({filteredCards.length} 個)
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {filteredCards.map((card) => {
              const imageUrl = getCardImageUrl(card.id);
              const lesson = lessons.find(l => l.id === card.lessonId);
              
              return (
                <div 
                  key={card.id} 
                  className={`border-2 rounded-lg overflow-hidden ${
                    imageUrl ? 'border-green-200 bg-green-50' : 'border-[#E5E5E5] bg-white'
                  }`}
                >
                  {/* 圖片預覽區 */}
                  <div className="aspect-square bg-[#FAF9F7] relative">
                    {imageUrl ? (
                      <>
                        <div className="relative w-full h-full">
                          <Image 
                            src={imageUrl} 
                            alt={card.character}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveImage(card.id)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center"
                          title="移除圖片"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#B5B5B5]">
                        <span className="text-4xl">{getEmojiForCard(card.character || '')}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* 資訊區 */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-[#4A4A4A]">{card.character}</span>
                      <span className="text-xs text-[#8C8C8C] bg-[#F5F5F0] px-2 py-1 rounded">
                        {lesson?.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#8C8C8C] mb-3">{card.meaning}</p>
                    
                    {/* 上傳按鈕 */}
                    {uploadingCardId === card.id ? (
                      <div className="space-y-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e, card.id, card.character || '', card.lessonId || '')}
                          className="hidden"
                          id={`file-upload-${card.id}`}
                        />
                        <label
                          htmlFor={`file-upload-${card.id}`}
                          className="block w-full py-2 text-center text-sm bg-[#FAF9F7] border-t border-[#E5E5E5] text-[#4A4A4A] hover:bg-[#F0F0F0] cursor-pointer transition-colors"
                        >
                          📁 選擇圖片
                        </label>
                        <button
                          onClick={() => openPresetPicker(card.id, card.character || '', card.lessonId || '')}
                          className="w-full py-2 text-center text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          🖼️ 從圖庫選擇
                        </button>
                        <button
                          onClick={() => setUploadingCardId(null)}
                          className="w-full py-1 text-xs text-[#8C8C8C] hover:text-[#4A4A4A]"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setUploadingCardId(card.id)}
                        className={`w-full py-2 text-sm transition-colors ${
                          imageUrl
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-[#FAF9F7] border-t border-[#E5E5E5] text-[#4A4A4A] hover:bg-[#F0F0F0]'
                        }`}
                      >
                        {imageUrl ? '🔄 更換圖片' : '📤 上傳圖片'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 使用說明 */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-2">💡 使用說明</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc ml-4">
            <li>點擊「上傳圖片」按鈕為生字添加圖片</li>
            <li><strong>自己上傳：</strong>選擇圖片後可以裁剪為正方形（拖曳移動，滑桿縮放）</li>
            <li><strong>從圖庫選擇：</strong>直接揀現成圖片（30+ 張免費圖片）</li>
            <li>建議圖片清晰易辨認，小朋友能一眼認出</li>
            <li>沒有圖片的生字會在配對遊戲中顯示 emoji</li>
            <li>使用「匯出設定」可以備份所有圖片關聯</li>
            <li>更換裝置時可以用「匯入設定」恢復</li>
          </ul>
        </div>

        {/* 圖片裁剪器 */}
        {cropImageUrl && (
          <ImageCropper
            imageUrl={cropImageUrl}
            onCrop={handleCropComplete}
            onCancel={handleCropCancel}
          />
        )}

        {/* 預設圖片選擇器 */}
        {showPresetPicker && (
          <PresetImagePicker
            onSelect={handlePresetSelect}
            onCancel={() => {
              setShowPresetPicker(false);
              setCropTargetCard(null);
            }}
            searchKeyword={presetSearchKeyword}
          />
        )}
      </main>
    </div>
  );
}

// 簡單的 emoji 對照（後備用）
function getEmojiForCard(character: string): string {
  const emojiMap: Record<string, string> = {
    '山': '⛰️', '水': '💧', '上': '⬆️', '下': '⬇️',
    '我': '🧒', '你': '👦', '在': '📍', '有': '✋',
    '人': '👤', '牛': '🐮', '去': '🚶', '個': '🔢',
    '爸': '👨', '媽': '👩', '家': '🏠', '和': '🤝',
    '沒': '❌', '中': '🎯', '草': '🌱', '走': '🏃',
    '哥': '👦', '姐': '👧', '弟': '👶', '妹': '🧒',
    '叔': '👨‍💼', '愛': '❤️', '打': '👊', '很': '⭐',
    '高': '📏', '的': '🔗',
  };
  return emojiMap[character] || '❓';
}
