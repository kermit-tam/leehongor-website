# Cloudinary 圖片上傳設置指南

本項目使用 **Cloudinary 免費層**（25GB/月）處理圖片上傳。

## 🚀 快速設置步驟

### 步驟 1：註冊 Cloudinary

1. 前往 [cloudinary.com/users/register_free](https://cloudinary.com/users/register_free)
2. 點擊「Sign up for free」
3. 選擇：
   - **What best describes you?** → "Developer"
   - **What type of assets will you be managing?** → "Images"
   - **What is your interest in Cloudinary?** → "Personal projects"
4. 使用 Google 帳號註冊

### 步驟 2：獲取 Cloud Name

註冊後會進入 Dashboard，記下 **Cloud name**：

```
┌─────────────────────────────────────┐
│  Account Details                    │
│  ─────────────────────────────────  │
│  Cloud name:  leehongor  ← 記下這個 │
│  API Key:     xxxxxx               │
│  API Secret:  xxxxxx               │
└─────────────────────────────────────┘
```

### 步驟 3：創建 Upload Preset（上傳預設）

這是允許前端直接上傳的關鍵設置：

1. 點擊頂部 **Settings**（齒輪圖示）
2. 選擇 **Upload** 標籤
3. 向下滾動到 **Upload presets**
4. 點擊 **Add upload preset**
5. 填寫：
   - **Upload preset name**: `leehongor_unsigned`
   - **Signing Mode**: `Unsigned` ⚠️ 重要！
   - **Folder**: `leehongor`（可選，會自動創建文件夾）
6. 點擊 **Save**

### 步驟 4：配置項目

在項目根目錄創建 `.env.local` 文件：

```bash
# 替換為你的 Cloud name
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=leehongor
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=leehongor_unsigned
```

或直接在代碼中修改（不推薦）：

```typescript
// src/lib/cloudinary.ts
const CLOUDINARY_CLOUD_NAME = 'leehongor'; // 改為你的
```

### 步驟 5：重啟開發伺服器

```bash
npm run dev
```

## ✅ 測試圖片上傳

1. 訪問後台：http://localhost:3000/admin
2. 進入「文章管理」
3. 點擊「新增文章」
4. 在「封面圖片」區域點擊「上傳封面圖片」
5. 選擇圖片，等待上傳完成
6. 如果成功，會顯示「圖片上傳成功！」

## 📊 免費層額度

Cloudinary 免費層包含：

| 項目 | 額度 |
|------|------|
| 存儲空間 | 25 GB |
| 每月流量 | 25 GB |
| 每月轉換次數 | 25,000 次 |
| 每月請求數 | 250,000 次 |

對於日文學習平台來說，這足夠支持：
- 📚 數千篇文章的封面圖
- 👤 所有用戶的頭像
- 📊 每天數百個用戶訪問

## 🔧 高級設置（可選）

### 自動圖片優化

上傳的圖片會自動：
- 壓縮為 WebP 格式（減少 30-80% 體積）
- 根據設備調整大小
- 使用 CDN 加速

### 手動上傳圖片

如果你想手動管理圖片：

1. Cloudinary Dashboard → **Media Library**
2. 拖拽上傳圖片
3. 點擊圖片 → 複製 **Delivery URL**
4. 貼上到後台的「圖片網址」欄位

## ❌ 常見問題

### Q: 上傳時提示 "Cloudinary 尚未配置"
**A**: 檢查 `.env.local` 文件是否正確設置，然後重啟開發伺服器

### Q: 上傳時提示 "Upload preset not found"
**A**: 確保已創建名為 `leehongor_unsigned` 的 Upload Preset，且 Signing Mode 設為 `Unsigned`

### Q: 圖片上傳成功但不顯示
**A**: 檢查瀏覽器控制台是否有 CORS 錯誤，可能需要等待幾分鐘讓 CDN 生效

### Q: 免費層用完了怎麼辦？
**A**: 可以：
1. 刪除舊圖片釋放空間
2. 升級到付費方案（$25/月起）
3. 切換到其他圖床（如 Imgur）

## 📖 更多資訊

- Cloudinary 文件：https://cloudinary.com/documentation
- 免費層詳情：https://cloudinary.com/pricing

---

**設置完成後，你就可以在後台輕鬆上傳圖片了！** 🎉
