/**
 * 圖片上傳 API Route
 * 服務端處理 Cloudinary 上傳
 */

import { NextRequest, NextResponse } from 'next/server';

// 硬編碼 Cloudinary 配置
const CLOUDINARY_CLOUD_NAME = 'drld2cjpo';
const CLOUDINARY_UPLOAD_PRESET = 'leehongor_unsigned';

export async function POST(request: NextRequest) {
  try {
    // 檢查配置
    if (CLOUDINARY_CLOUD_NAME === 'your-cloud-name') {
      return NextResponse.json(
        { error: 'Cloudinary 尚未配置' },
        { status: 500 }
      );
    }

    // 獲取上傳的圖片
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'leehongor';

    if (!file) {
      return NextResponse.json(
        { error: '沒有提供圖片文件' },
        { status: 400 }
      );
    }

    // 檢查文件類型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '只支援圖片文件' },
        { status: 400 }
      );
    }

    // 檢查文件大小（最大 5MB）
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: '圖片大小不能超過 5MB' },
        { status: 400 }
      );
    }

    // 準備 Cloudinary 上傳
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    cloudinaryFormData.append('folder', folder);

    // 上傳到 Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Cloudinary error:', error);
      return NextResponse.json(
        { error: error.error?.message || '上傳到 Cloudinary 失敗' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // 返回成功結果
    return NextResponse.json({
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: '上傳過程中發生錯誤' },
      { status: 500 }
    );
  }
}

// 檢查配置狀態
export async function GET() {
  const isConfigured = CLOUDINARY_CLOUD_NAME !== 'your-cloud-name';
  
  return NextResponse.json({
    configured: isConfigured,
    cloudName: isConfigured ? CLOUDINARY_CLOUD_NAME : null,
  });
}
