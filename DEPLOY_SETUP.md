# 自動部署設置

## GitHub Actions 自動部署

已配置自動部署，每次 push 到 `main` 或 `master` 分支會自動 build 並部署到 Firebase Hosting。

## 設置步驟（只需一次）

### 1. 生成 Firebase Service Account Key

```bash
# 登入 Firebase
firebase login

# 獲取 CI token（舊方法，可能會被棄用）
firebase login:ci

# 或者使用 Service Account（推薦）
# 到 Firebase Console → 專案設定 → 服務帳戶 → 產生新的私鑰
```

### 2. 在 GitHub 設置 Secrets

到 GitHub Repository → Settings → Secrets and variables → Actions → New repository secret

需要添加以下 secrets：

| Secret Name | 說明 | 來源 |
|------------|------|------|
| `GCP_SA_KEY` | Firebase Service Account JSON | Firebase Console → 專案設定 → 服務帳戶 |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | `.env.local` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth Domain | `.env.local` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID | `.env.local` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage Bucket | `.env.local` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Sender ID | `.env.local` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID | `.env.local` |

### 3. 快速設置腳本

```bash
# 1. 確保已登入 Firebase
firebase login

# 2. 獲取 token
firebase login:ci

# 3. 複製輸出的 token，到 GitHub Secrets 添加 FIREBASE_TOKEN
```

## 使用方法

設置完成後，只需：

```bash
git add .
git commit -m "更新內容"
git push origin main
```

GitHub Actions 會自動：
1. 執行 `npm ci` 安裝依賴
2. 執行 `npm run build` 構建
3. 部署到 Firebase Hosting

## 查看部署狀態

到 GitHub Repository → Actions 查看部署進度。

## 手動部署（備用）

如果自動部署失敗，仍可手動部署：

```bash
npm run build
firebase deploy
```
