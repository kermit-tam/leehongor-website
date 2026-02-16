# Vercel 部署指南

將利康哥日文學習平台部署到 Vercel，並使用自訂域名 `leehongor.com`。

## 🚀 快速部署步驟

### 步驟 1：推送代碼到 GitHub

```bash
# 1. 確保你在項目目錄
cd /Users/Kermit/leehongor-website

# 2. 初始化 Git（如果未初始化）
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "Initial commit - LeeHongor Japanese Learning Platform"

# 5. 在 GitHub 創建新倉庫（名稱：leehongor-website）
# 然後連接並推送
git branch -M main
git remote add origin https://github.com/你的用戶名/leehongor-website.git
git push -u origin main
```

### 步驟 2：在 Vercel 部署

1. 前往 [vercel.com](https://vercel.com) 並登入（可用 GitHub 帳號）
2. 點擊「Add New Project」
3. 導入你的 GitHub 倉庫 `leehongor-website`
4. 配置項目：
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: 自動檢測
5. 點擊「Deploy」

### 步驟 3：設置環境變量

在 Vercel Dashboard 中：

1. 進入你的項目
2. 點擊「Settings」→「Environment Variables」
3. 添加以下變量：

```
# Firebase 配置
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDXELnjUMZuV3X1bXHnzznDOD1ojvvDARw
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=leehongor-japanese.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=leehongor-japanese
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=leehongor-japanese.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=358010923888
NEXT_PUBLIC_FIREBASE_APP_ID=1:358010923888:web:81eeb47b543879ad4cfdb5

# Cloudinary 配置
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drld2cjpo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=leehongor_unsigned
```

4. 點擊「Save」並重新部署

### 步驟 4：設置自訂域名 `leehongor.com`

1. 在 Vercel Dashboard → 你的項目 →「Domains」
2. 點擊「Add」
3. 輸入：`leehongor.com`
4. Vercel 會提供 DNS 記錄（A 記錄或 CNAME）
5. 去你的域名註冊商（如 GoDaddy、Namecheap 等）添加相應的 DNS 記錄
6. 等待 DNS 生效（通常幾分鐘到幾小時）

## ✅ 部署後檢查清單

- [ ] 網站可以訪問 `https://leehongor-website.vercel.app`
- [ ] 自訂域名 `https://leehongor.com` 可以訪問
- [ ] Google 登入功能正常
- [ ] Cloudinary 圖片上傳正常
- [ ] 後台管理可以進入（需設置管理員）

## 🔄 自動部署

每次你推送代碼到 GitHub，Vercel 會自動重新部署！

```bash
# 修改代碼後
git add .
git commit -m "更新內容"
git push

# Vercel 會自動檢測並重新部署
```

## ❌ 常見問題

### Q: 部署後 Firebase Auth 無法運作
**A**: 確保已在 Firebase Authentication → 設定 → 授權網域中添加了你的 Vercel 域名（如 `leehongor-website.vercel.app`）

### Q: Cloudinary 圖片上傳失敗
**A**: 檢查環境變量是否正確設置，然後重新部署

### Q: 自訂域名無法訪問
**A**: DNS 記錄可能需要幾小時生效，使用 `dig leehongor.com` 檢查是否指向 Vercel

---

**完成後，你的日文學習平台就上線了！** 🎉
