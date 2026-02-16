# 🚀 準備部署！

你的「利康哥日文學習平台」已經準備好了！

## ✅ 已完成

- [x] Firebase 配置（Google 登入、Firestore）
- [x] Cloudinary 配置（圖片上傳）
- [x] 所有頁面組件
- [x] 後台管理系統
- [x] 六角雷達圖表
- [x] 測驗系統

## 📁 項目文件結構

```
leehongor-website/
├── src/
│   ├── app/                 # 頁面路由
│   │   ├── admin/           # 後台管理
│   │   ├── learn/           # 學習區
│   │   ├── posts/           # 文章區
│   │   ├── leaderboard/     # 排行榜
│   │   ├── profile/         # 個人中心
│   │   ├── layout.tsx       # 根佈局
│   │   └── page.tsx         # 首頁
│   ├── components/          # 組件
│   │   ├── ui/              # UI 組件
│   │   └── charts/          # 圖表組件
│   ├── lib/                 # 工具庫
│   │   ├── firebase.ts      # Firebase 配置
│   │   ├── auth-context.tsx # 認證
│   │   ├── firestore.ts     # 數據庫
│   │   └── cloudinary.ts    # 圖片上傳
│   └── types/               # TypeScript 類型
├── .env.local               # 環境變量（已設置）
├── DEPLOY.md                # Vercel 部署指南
└── package.json             # 依賴
```

## 🛠️ 下一步

### 1. 推送到 GitHub

```bash
cd /Users/Kermit/leehongor-website

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - LeeHongor Japanese Learning Platform"

# 創建 GitHub 倉庫，然後推送
git remote add origin https://github.com/你的用戶名/leehongor-website.git
git push -u origin main
```

### 2. 部署到 Vercel

1. 前往 [vercel.com](https://vercel.com) 登入
2. 「Add New Project」→ 導入 GitHub 倉庫
3. Framework: Next.js
4. 點擊「Deploy」
5. 設置環境變量（見下方）
6. 添加自訂域名 `leehongor.com`

### 3. 設置環境變量

在 Vercel → Settings → Environment Variables：

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDXELnjUMZuV3X1bXHnzznDOD1ojvvDARw
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=leehongor-japanese.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=leehongor-japanese
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=leehongor-japanese.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=358010923888
NEXT_PUBLIC_FIREBASE_APP_ID=1:358010923888:web:81eeb47b543879ad4cfdb5
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drld2cjpo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=leehongor_unsigned
```

### 4. Firebase 設置

1. Firebase Console → Authentication → Settings
2. 添加授權網域：
   - `leehongor.com`
   - `www.leehongor.com`
   - 你的 Vercel 臨時域名（如 `leehongor-xxx.vercel.app`）

### 5. 設置管理員

1. 訪問你的網站，用 Google 登入
2. Firebase Console → Firestore → users 集合
3. 找到你的用戶，將 `role` 改為 `"admin"`

## 🎉 完成後

你的日文學習平台將會在：
- 🔗 `https://leehongor.com`
- 🔗 `https://leehongor-xxx.vercel.app`（備用）

功能：
- 👤 Google 登入
- 📚 文章閱讀（輕鬆學）
- 🎯 課程學習（系統學）
- 📊 六角雷達分析
- 🏆 排行榜
- ⚙️ 後台管理（文章/課程）

## 📖 詳細文檔

- `DEPLOY.md` - Vercel 部署詳細指南
- `PROJECT_README.md` - 項目完整說明
- `CLOUDINARY_SETUP.md` - Cloudinary 設置指南

---

**準備好了嗎？開始部署吧！** 🚀
