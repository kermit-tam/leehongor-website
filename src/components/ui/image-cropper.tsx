/**
 * 圖片裁剪組件
 * Image Cropper Component
 * 
 * 功能：
 * - 上傳後裁剪圖片為正方形
 * - 縮放和拖曳調整
 * - 預覽裁剪結果
 */

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface ImageCropperProps {
  imageUrl: string;
  onCrop: (croppedBlob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number; // 預設 1:1 正方形
}

export function ImageCropper({ 
  imageUrl, 
  onCrop, 
  onCancel, 
  aspectRatio = 1 
}: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  // 計算裁剪區域尺寸
  const cropSize = 280; // 裁剪框大小

  // 處理縮放
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  // 處理拖曳開始
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  // 處理拖曳移動
  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  // 處理拖曳結束
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 添加全局事件監聽
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 執行裁剪
  const performCrop = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 設置 canvas 尺寸
    const outputSize = 300;
    canvas.width = outputSize;
    canvas.height = outputSize;

    // 計算縮放後的圖片尺寸
    const scaledWidth = img.naturalWidth * scale;
    const scaledHeight = img.naturalHeight * scale;

    // 計算裁剪區域（相對於圖片）
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    // 圖片在容器中的位置
    const imageX = position.x + (cropSize - scaledWidth) / 2;
    const imageY = position.y + (cropSize - scaledHeight) / 2;

    // 計算源圖片上的裁剪坐標
    const sourceX = ((0 - imageX) / cropSize) * scaledWidth;
    const sourceY = ((0 - imageY) / cropSize) * scaledHeight;
    const sourceWidth = (cropSize / scaledWidth) * img.naturalWidth;
    const sourceHeight = (cropSize / scaledHeight) * img.naturalHeight;

    // 清空畫布
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, outputSize, outputSize);

    // 繪製裁剪後的圖片
    ctx.drawImage(
      img,
      Math.max(0, -sourceX),
      Math.max(0, -sourceY),
      Math.min(sourceWidth, img.naturalWidth),
      Math.min(sourceHeight, img.naturalHeight),
      Math.max(0, (sourceX / sourceWidth) * outputSize),
      Math.max(0, (sourceY / sourceHeight) * outputSize),
      outputSize,
      outputSize
    );

    // 轉換為 blob
    canvas.toBlob((blob) => {
      if (blob) {
        onCrop(blob);
      }
    }, 'image/png', 0.9);
  };

  // 重置位置
  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📐 裁剪圖片</h3>
        
        {/* 裁剪區域 */}
        <div 
          ref={containerRef}
          className="relative w-[280px] h-[280px] mx-auto bg-gray-100 rounded-xl overflow-hidden mb-4"
          style={{ 
            backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          {/* 裁剪框遮罩 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border-2 border-white/50">
              {/* 網格線 */}
              <div className="absolute inset-0 border border-white/30" style={{ 
                background: 'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '33.33% 33.33%'
              }} />
            </div>
          </div>
          
          {/* 可拖曳的圖片 */}
          <img
            ref={imageRef}
            src={imageUrl}
            alt="待裁剪"
            className={`absolute cursor-move select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              width: imageLoaded ? `${imageSize.width * scale * (280 / Math.max(imageSize.width, imageSize.height))}px` : 'auto',
              height: 'auto',
              maxWidth: 'none',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: '50%',
              top: '50%',
              marginLeft: imageLoaded ? `${-imageSize.width * scale * (280 / Math.max(imageSize.width, imageSize.height)) / 2}px` : 0,
              marginTop: imageLoaded ? `${-imageSize.height * scale * (280 / Math.max(imageSize.width, imageSize.height)) / 2}px` : 0,
            }}
            onLoad={(e) => {
              const img = e.currentTarget;
              setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
              setImageLoaded(true);
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            draggable={false}
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-2 border-gray-400 border-t-transparent rounded-full" />
            </div>
          )}
        </div>

        {/* 縮放控制 */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">🔍 縮放</span>
            <span className="text-sm text-gray-400">{Math.round(scale * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={scale}
            onChange={handleScaleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* 提示 */}
        <p className="text-sm text-gray-500 mb-4 text-center">
          👆 拖曳移動圖片位置，使用滑桿縮放
        </p>

        {/* 隱藏的 canvas 用於生成裁剪結果 */}
        <canvas ref={canvasRef} className="hidden" />

        {/* 按鈕 */}
        <div className="flex gap-3">
          <button
            onClick={resetPosition}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
          >
            🔄 重置
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
          >
            取消
          </button>
          <button
            onClick={performCrop}
            disabled={!imageLoaded}
            className="flex-1 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✓ 確認裁剪
          </button>
        </div>
      </div>
    </div>
  );
}
