#!/bin/bash

# 利康哥網站快速部署腳本
# 用法: ./deploy.sh "你的提交訊息"

echo "🚀 開始部署流程..."

# 檢查是否有未提交嘅更改
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ 冇需要提交嘅更改"
    exit 0
fi

# 獲取提交訊息
MESSAGE=${1:-"更新網站內容"}

echo "📝 提交訊息: $MESSAGE"

# 添加所有更改
echo "➕ 添加更改..."
git add -A

# 提交
echo "💾 提交更改..."
git commit -m "$MESSAGE"

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git push origin main

echo ""
echo "✅ 完成！Vercel 將會自動部署："
echo "🌐 https://leehongor.com"
echo ""
echo "⏱️  部署通常需要 1-2 分鐘"
