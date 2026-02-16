# 利康哥日文學習平台 (LeeHongor Japanese)

一個完整的日文學習平台，包含文章閱讀區和結構化課程區，具有遊戲化學習系統。

## 🎯 核心功能

### 區域A：輕鬆學（文章區）
- 📚 瀑布流文章列表
- 🔍 分類篩選和搜尋
- 📝 Markdown 文章閱讀
- 🏷️ 標籤系統

### 區域B：系統學（課程區）
- 🗺️ 課程地圖
- 📊 六角雷達實力分析（6維度：發音、漢字、詞彙、文法、聽力、應用）
- 📝 互動測驗
- 🎮 遊戲化系統（等級、成就分數、徽章）
- 🔓 課程解鎖機制

### 排行榜
- 🏆 全站排名
- 📈 成就分數排行

### 後台管理（手機優先）
- 📝 文章管理（新增、編輯、刪除）
- 📚 課程管理（內容、測驗題目）
- 👤 管理員權限控制

## 🛠️ 技術棧

- **框架**: Next.js 14 (App Router)
- **認證**: Firebase Authentication (Google 登入)
- **資料庫**: Firestore
- **存儲**: Firebase Storage
- **樣式**: Tailwind CSS
- **圖表**: Recharts
- **Markdown**: react-markdown

## 🚀 快速開始

### 1. Firebase 設置

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 創建新項目
3. 啟用 **Authentication** → **Google 登入**
4. 創建 **Firestore Database**（測試模式）
5. 啟用 **Storage**
6. 獲取配置信息：
   - 項目設定 → 一般 → 你的應用 → 配置

### 2. 配置 Firebase

編輯 `src/lib/firebase.ts`：

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

或使用環境變量：

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 3. 設置管理員

1. 使用 Google 登入應用
2. 在 Firebase Console → Firestore 中找到你的用戶文檔
3. 將 `role` 字段從 `"user"` 改為 `"admin"`

### 4. 運行項目

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 生產構建
npm run build
npm start
```

## 📁 項目結構

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # 後台管理
│   │   ├── page.tsx       # Dashboard
│   │   ├── posts/         # 文章管理
│   │   └── lessons/       # 課程管理
│   ├── learn/             # 學習區
│   │   ├── page.tsx       # 課程地圖
│   │   └── [lessonId]/    # 課程詳情
│   │       ├── page.tsx
│   │       └── quiz/      # 測驗
│   ├── posts/             # 文章區
│   │   ├── page.tsx       # 文章列表
│   │   └── [id]/          # 文章詳情
│   ├── leaderboard/       # 排行榜
│   ├── profile/           # 個人中心
│   ├── layout.tsx         # 根佈局
│   ├── page.tsx           # 首頁
│   └── globals.css        # 全局樣式
├── components/
│   ├── ui/                # UI 組件
│   │   ├── button.tsx
│   │   ├── navbar.tsx
│   │   ├── card.tsx
│   │   └── quiz.tsx
│   └── charts/            # 圖表組件
│       └── radar-chart.tsx
├── lib/
│   ├── firebase.ts        # Firebase 配置
│   ├── auth-context.tsx   # 認證上下文
│   └── firestore.ts       # Firestore 服務
└── types/
    └── index.ts           # TypeScript 類型
```

## 🎮 遊戲化系統說明

### 分數計算

**成就分數（Achievement EXP）**
- 每次完成測驗：+50 EXP
- 用於等級提升和排行榜排名

**實力分數（六角雷達）**
- 六個維度：發音、漢字、詞彙、文法、聽力、應用
- 每個維度只記錄最高分
- 可無限重做，但只有更高分才會更新

### 等級系統
- 每 500 EXP 升一級
- 公式：`等級 = Math.floor(EXP / 500) + 1`

### 解鎖機制
- 第0課（五十音）預設解鎖
- 後續課程需完成前置課程並達到及格分數（預設60分）

## 📝 Firestore 數據結構

### users 集合
```javascript
{
  uid: string,
  email: string,
  name: string,
  avatar: string,
  role: "user" | "admin",
  achievementExp: number,
  level: number,
  streakDays: number,
  badges: string[],
  abilityScores: {
    pronunciation: { best: number, attempts: number },
    kanji: { best: number, attempts: number },
    vocabulary: { best: number, attempts: number },
    grammar: { best: number, attempts: number },
    listening: { best: number, attempts: number },
    application: { best: number, attempts: number }
  },
  unlockedLessons: string[],
  completedLessons: string[],
  lastLogin: timestamp
}
```

### posts 集合
```javascript
{
  id: string,
  title: string,
  content: string,        // Markdown
  category: string,
  tags: string[],
  imageUrl: string,
  createdAt: timestamp,
  authorId: string
}
```

### lessons 集合
```javascript
{
  id: string,
  title: string,
  description: string,
  category: string,
  order: number,
  unlockRequirement: string | null,
  contentBlocks: [
    { type: "text" | "image" | "video" | "audio", content?: string, url?: string }
  ],
  quiz: {
    questions: [
      {
        id: string,
        dimension: string,
        question: string,
        options: string[],
        correct: number,
        explanation: string
      }
    ],
    expReward: number,
    passScore: number
  }
}
```

### practice_records 集合
```javascript
{
  userId: string,
  lessonId: string,
  scores: { [dimension: string]: number, overall: number },
  isNewBest: { [dimension: string]: boolean },
  achievementExpEarned: number,
  answers: [{ questionId: string, selected: number, correct: boolean }],
  completedAt: timestamp
}
```

## 🎨 主題顏色

- 主色：#667eea（靛藍色）
- 輔色：#764ba2（紫色）
- 成功：#10b981（翠綠色）
- 警告：#f59e0b（琥珀色）
- 錯誤：#ef4444（紅色）

## 📱 手機優先設計

- 最小觸控目標：44px
- 按鈕尺寸：XL（56px）適合手機操作
- 字體大小：最小 16px（防止 iOS 縮放）
- 響應式斷點：sm (640px), md (768px), lg (1024px)

## 🔒 安全規則

### Firestore Security Rules（建議）

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用戶數據：只有自己能修改
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 文章：所有人可讀，管理員可寫
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    
    // 課程：所有人可讀，管理員可寫
    match /lessons/{lessonId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    
    // 練習記錄：自己可讀寫
    match /practice_records/{recordId} {
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
  }
}
```

## 🚀 部署到 Vercel

1. 推送代碼到 GitHub
2. 在 [Vercel](https://vercel.com) 導入項目
3. 設置環境變量（Firebase 配置）
4. 部署

## 🐛 常見問題

### Q: 無法登入
- 檢查 Firebase 配置是否正確
- 確認 Authentication 已啟用 Google 登入
- 檢查網域名稱是否已添加到授權域名

### Q: 無法讀取數據
- 檢查 Firestore 安全規則
- 確認數據庫已創建

### Q: 無法訪問後台
- 確認用戶 role 字段已設為 "admin"

## 📄 許可證

MIT License

---

**利康哥日文學習平台** © 2024
