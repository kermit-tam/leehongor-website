#!/bin/bash
# 自動部署設置腳本

echo "🚀 設置 GitHub Actions 自動部署..."
echo ""

# 檢查 firebase CLI
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI 未安裝"
    echo "請先安裝: npm install -g firebase-tools"
    exit 1
fi

# 檢查是否已登入
firebase projects:list > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "🔑 請先登入 Firebase..."
    firebase login
fi

echo "📋 請到以下網址設置 Secrets:"
echo "https://github.com/$(git remote get-url origin | sed 's/.*github.com\///' | sed 's/\.git$//')/settings/secrets/actions"
echo ""

echo "🔐 需要添加的 Secrets:"
echo ""
echo "1. GCP_SA_KEY (Firebase Service Account)"
echo "   獲取方法: Firebase Console → 專案設定 → 服務帳戶 → 產生新的私鑰"
echo "   複製整個 JSON 文件內容作為 secret value"
echo ""

echo "2. Firebase 配置（從 .env.local 複製）:"
if [ -f .env.local ]; then
    grep "NEXT_PUBLIC_FIREBASE" .env.local | while read line; do
        key=$(echo "$line" | cut -d'=' -f1)
        echo "   - $key"
    done
else
    echo "   找不到 .env.local，請手動添加 Firebase 配置"
fi

echo ""
echo "✅ 設置完成後，每次 push 到 main 分支會自動部署！"
echo ""
echo "📝 使用方法:"
echo "   git add ."
echo "   git commit -m '更新'"
echo "   git push origin main"
