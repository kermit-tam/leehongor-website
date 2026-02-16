/**
 * 圖片上傳組件
 * Image Upload Component
 * 
 * 使用 Cloudinary 上傳圖片
 */

'use client';

import { useState, useRef } from 'react';
import { uploadImage, isCloudinaryConfigured } from '@/lib/cloudinary';
import { Button } from './button';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = 'leehongor',
  label = '上傳圖片',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isConfigured = isCloudinaryConfigured();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // 顯示本地預覽
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    // 上傳到 Cloudinary
    setIsUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      setPreview(url);
      alert('圖片上傳成功！');
    } catch (error) {
      console.error('Upload error:', error);
      alert('上傳失敗：' + (error instanceof Error ? error.message : '未知錯誤'));
      setPreview(value); // 恢復原值
    } finally {
      setIsUploading(false);
      // 清空 input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    setPreview(url);
  };

  return (
    <div className="space-y-3">
      {/* 預覽區域 */}
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <span className="text-4xl">🖼️</span>
              <p className="mt-2 text-sm">尚未選擇圖片</p>
            </div>
          </div>
        )}
        
        {/* 上傳中遮罩 */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-white border-t-transparent mx-auto mb-2" />
              <p className="text-sm">上傳中...</p>
            </div>
          </div>
        )}
      </div>

      {/* 未配置警告 */}
      {!isConfigured && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <div className="font-medium mb-1">⚠️ Cloudinary 尚未配置</div>
          <p>請在 .env.local 中設置 NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</p>
        </div>
      )}

      {/* 上傳按鈕 */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading || !isConfigured}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
            isUploading || !isConfigured
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400'
          }`}
        >
          <span className="mr-2">📤</span>
          {isUploading ? '上傳中...' : label}
        </label>
        
        {preview && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setPreview('');
            }}
            className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            🗑️
          </button>
        )}
      </div>

      {/* URL 輸入 */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          或貼上圖片網址
        </label>
        <input
          type="url"
          value={value}
          onChange={handleUrlChange}
          placeholder="https://..."
          className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {/* 提示 */}
      <p className="text-xs text-gray-400">
        💡 支援 JPG、PNG、GIF、WebP 格式，最大 5MB
        {isConfigured && '，圖片會自動壓縮優化'}
      </p>
    </div>
  );
}

// ==================== 簡化版圖片選擇器 ====================

interface SimpleImageUploadProps {
  onUpload: (url: string) => void;
  folder?: string;
}

export function SimpleImageUpload({ onUpload, folder = 'leehongor' }: SimpleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isConfigured = isCloudinaryConfigured();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('請選擇圖片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('圖片大小不能超過 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onUpload(url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('上傳失敗：' + (error instanceof Error ? error.message : '未知錯誤'));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (!isConfigured) {
    return (
      <div className="text-sm text-gray-500">
        ⚠️ Cloudinary 未配置，請手動輸入圖片網址
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={isUploading}
        className="hidden"
        id="simple-image-upload"
      />
      <label
        htmlFor="simple-image-upload"
        className={`inline-flex items-center px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
          isUploading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
        }`}
      >
        {isUploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            上傳中...
          </>
        ) : (
          <>
            📤 上傳圖片
          </>
        )}
      </label>
    </div>
  );
}
