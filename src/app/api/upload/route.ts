/**
 * 圖片上傳 API Route
 * 服務端處理 Cloudinary 上傳
 */

import { NextRequest, NextResponse } from 'next/server';

// 硬編碼 Cloudinary 配置
const CLOUDINARY_CLOUD_NAME = 'drld2cjpo';
const CLOUDINARY_UPLOAD_PRESET = 'leehongor_unsigned';

export async function POST(request: NextRequest) {
  console.log('API Upload: 收到請求');
  
  try {
    // 檢查配置
    if (CLOUDINARY_CLOUD_NAME === 'your-cloud-name') {
      console.error('API Upload: Cloudinary 未配置');
      return NextResponse.json(
        { error: 'Cloudinary 尚未配置' },
        { status: 500 }
      );
    }

    console.log('API Upload: 配置檢查通過', CLOUDINARY_CLOUD_NAME);

    // 獲取上傳的圖片
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('API Upload: 文件信息', { 
      hasFile: !!file, 
      fileType: file?.type, 
      fileSize: file?.size 
    });

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
    // folder 會使用 Preset 設置的 leehongor

    console.log('API Upload: 開始上傳到 Cloudinary');
    console.log('API Upload: Upload Preset', CLOUDINARY_UPLOAD_PRESET);

    // 上傳到 Cloudinary
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    console.log('API Upload: URL', uploadUrl);
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    console.log('API Upload: Cloudinary 響應狀態', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Upload: Cloudinary 錯誤響應', errorText);
      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { message: errorText };
      }
      return NextResponse.json(
        { error: error.error?.message || error.message || '上傳到 Cloudinary 失敗' },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('API Upload: 成功', data.secure_url);
    
    // 返回成功結果
    return NextResponse.json({
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
    });

  } catch (error) {
    console.error('API Upload: 意外錯誤', error);
    return NextResponse.json(
      { error: '上傳過程中發生錯誤: ' + (error instanceof Error ? error.message : '未知錯誤') },
      { status: 500 }
    );
  }
}

// 檢查配置狀態
export async function GET() {
  console.log('API Upload: GET 請求');
  
  const isConfigured = CLOUDINARY_CLOUD_NAME !== 'your-cloud-name';
  
  console.log('API Upload: 配置狀態', { isConfigured, cloudName: CLOUDINARY_CLOUD_NAME });
  
  return NextResponse.json({
    configured: isConfigured,
    cloudName: isConfigured ? CLOUDINARY_CLOUD_NAME : null,
    timestamp: new Date().toISOString(),
  });
}
