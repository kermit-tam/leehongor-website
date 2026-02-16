/**
 * Cloudinary 圖片上傳服務
 * Cloudinary Image Upload Service
 * 
 * 使用 Cloudinary 免費層（25GB/月）儲存圖片
 * https://cloudinary.com
 */

// ==================== Cloudinary 配置 ====================
// 請在 .env.local 中填入你的配置，或直接修改這裡

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'leehongor_unsigned';

/**
 * 上傳圖片到 Cloudinary
 * @param file 圖片文件
 * @param folder 上傳文件夾（可選）
 * @returns 上傳後的圖片 URL
 */
export async function uploadImage(
  file: File,
  folder: string = 'leehongor'
): Promise<string> {
  if (CLOUDINARY_CLOUD_NAME === 'your-cloud-name') {
    throw new Error('Cloudinary 尚未配置。請設置 NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || '上傳失敗');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

/**
 * 檢查 Cloudinary 是否已配置
 */
export function isCloudinaryConfigured(): boolean {
  return CLOUDINARY_CLOUD_NAME !== 'your-cloud-name' && 
         CLOUDINARY_UPLOAD_PRESET !== 'leehongor_unsigned';
}

/**
 * 獲取 Cloudinary 圖片 URL（帶優化參數）
 * @param publicId 圖片 Public ID
 * @param options 優化選項
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}
): string {
  const { width, height, quality = 'auto', format = 'auto' } = options;
  
  let transformations = 'f_auto,q_auto';
  
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  if (format !== 'auto') transformations = transformations.replace('f_auto', `f_${format}`);
  if (quality !== 'auto') transformations = transformations.replace('q_auto', `q_${quality}`);
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

/**
 * 從完整 URL 提取 Public ID
 */
export function extractPublicId(url: string): string | null {
  const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+)$/);
  return match ? match[1] : null;
}

/**
 * 獲取配置警告
 */
export function getCloudinaryWarning(): string | null {
  if (!isCloudinaryConfigured()) {
    return '⚠️ Cloudinary 尚未配置。圖片上傳功能將無法使用。';
  }
  return null;
}
