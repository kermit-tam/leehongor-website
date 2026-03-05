/**
 * 圖片上傳組件（使用 API Route）
 * Image Upload Component
 */

'use client';

import { useState, useRef, useEffect } from 'react';
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
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 檢查 Cloudinary 配置
  useEffect(() => {
    checkConfig();
  }, []);

  const checkConfig = async () => {
    try {
      const response = await fetch('/api/upload');
      const data = await response.json();
      setIsConfigured(data.configured);
    } catch {
      setIsConfigured(false);
    }
  };

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

    // 上傳到服務器
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '上傳失敗');
      }

      onChange(data.url);
      setPreview(data.url);
      alert('圖片上傳成功！');
    } catch {
      alert('上傳失敗');
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

  // 加載中狀態
  if (isConfigured === null) {
    return (
      <div className="space-y-3">
        <div className="aspect-video bg-[#FAF9F7] border-t border-[#E5E5E5] flex items-center justify-center">
          <span className="text-[#8C8C8C]">檢查配置中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* 預覽區域 */}
      <div className="relative aspect-video bg-[#FAF9F7] border-t border-[#E5E5E5] overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#B5B5B5]">
            <div className="text-center">
              <span className="text-3xl">🖼️</span>
              <p className="mt-2 text-sm tracking-wide">尚未選擇圖片</p>
            </div>
          </div>
        )}
        
        {/* 上傳中遮罩 */}
        {isUploading && (
          <div className="absolute inset-0 bg-[#F5F5F0]/80 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border border-[#8C8C8C] border-t-transparent mx-auto mb-2" />
              <p className="text-sm text-[#4A4A4A] tracking-wide">上傳中...</p>
            </div>
          </div>
        )}
      </div>

      {/* 未配置警告 */}
      {isConfigured === false && (
        <div className="p-3 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm text-[#8C8C8C]">
          <p>⚠️ Cloudinary 配置檢查失敗</p>
        </div>
      )}

      {/* 上傳按鈕 */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading || isConfigured === false}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`flex-1 flex items-center justify-center px-4 py-3 border-t cursor-pointer transition-colors ${
            isUploading || isConfigured === false
              ? 'border-[#E5E5E5] text-[#B5B5B5] cursor-not-allowed'
              : 'border-[#8C8C8C] text-[#4A4A4A] hover:bg-[#FAF9F7]'
          }`}
        >
          <span className="mr-2">📤</span>
          <span className="tracking-wide">{isUploading ? '上傳中...' : label}</span>
        </label>
        
        {preview && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setPreview('');
            }}
            className="px-4 py-3 text-[#8C8C8C] hover:text-[#4A4A4A] hover:bg-[#FAF9F7] transition-colors"
          >
            🗑️
          </button>
        )}
      </div>

      {/* URL 輸入 */}
      <div>
        <label className="block text-xs text-[#8C8C8C] mb-1 tracking-wide">
          或貼上圖片網址
        </label>
        <input
          type="url"
          value={value}
          onChange={handleUrlChange}
          placeholder="https://..."
          className="w-full px-4 py-3 bg-[#FAF9F7] border-t border-[#E5E5E5] text-sm focus:border-[#8C8C8C] focus:outline-none transition-colors"
        />
      </div>

      {/* 提示 */}
      <p className="text-xs text-[#B5B5B5] tracking-wide">
        支援 JPG、PNG、GIF、WebP 格式，最大 5MB
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
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/upload')
      .then(res => res.json())
      .then(data => setIsConfigured(data.configured))
      .catch(() => setIsConfigured(false));
  }, []);

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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '上傳失敗');
      }

      onUpload(data.url);
    } catch {
      alert('上傳失敗');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (isConfigured === false) {
    return (
      <div className="text-sm text-[#8C8C8C]">
        ⚠️ 上傳功能暫時不可用
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
        className={`inline-flex items-center px-3 py-2 text-sm cursor-pointer transition-colors ${
          isUploading
            ? 'bg-[#F5F5F0] text-[#B5B5B5] cursor-not-allowed'
            : 'bg-[#FAF9F7] text-[#4A4A4A] hover:bg-[#F0F0F0] border-t border-[#E5E5E5]'
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
