/**
 * BB 風格 iKON
 * 可愛卡通圖案，唔用 Emoji
 */

export function TrainIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* 車身 */}
      <rect x="8" y="20" width="48" height="32" rx="8" fill="#74B9FF" />
      <rect x="8" y="20" width="48" height="32" rx="8" stroke="#0984E3" strokeWidth="2" />
      {/* 車窗 */}
      <rect x="14" y="26" width="12" height="10" rx="2" fill="white" />
      <rect x="30" y="26" width="12" height="10" rx="2" fill="white" />
      {/* 車頭燈 */}
      <circle cx="14" cy="44" r="4" fill="#FFE66D" />
      <circle cx="50" cy="44" r="4" fill="#FFE66D" />
      {/* 車輪 */}
      <circle cx="18" cy="56" r="6" fill="#2D3436" />
      <circle cx="18" cy="56" r="3" fill="#636E72" />
      <circle cx="46" cy="56" r="6" fill="#2D3436" />
      <circle cx="46" cy="56" r="3" fill="#636E72" />
      {/* 煙囱 */}
      <rect x="42" y="8" width="8" height="12" rx="2" fill="#FF7675" />
      {/* 煙 */}
      <circle cx="46" cy="4" r="3" fill="#DDD" opacity="0.6" />
      <circle cx="50" cy="2" r="2" fill="#DDD" opacity="0.4" />
    </svg>
  );
}

export function BookIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* 書本 */}
      <rect x="8" y="12" width="48" height="40" rx="6" fill="#FF7675" />
      <rect x="8" y="12" width="48" height="40" rx="6" stroke="#D63031" strokeWidth="2" />
      {/* 書頁 */}
      <path d="M16 20 L32 28 L48 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 28 L32 36 L48 28" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M16 36 L32 44 L48 36" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      {/* 書脊裝飾 */}
      <rect x="28" y="12" width="8" height="40" fill="#D63031" opacity="0.3" />
      {/* 小星星 */}
      <circle cx="52" cy="16" r="3" fill="#FFE66D" />
      <circle cx="12" cy="48" r="2" fill="#FFE66D" />
    </svg>
  );
}

export function BabyIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* 頭 */}
      <circle cx="24" cy="20" r="14" fill="#FDCB6E" />
      {/* 頭髮 */}
      <path d="M10 16 Q14 8 24 8 Q34 8 38 16" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* 眼 */}
      <circle cx="18" cy="20" r="3" fill="#2D3436" />
      <circle cx="30" cy="20" r="3" fill="#2D3436" />
      <circle cx="19" cy="19" r="1" fill="white" />
      <circle cx="31" cy="19" r="1" fill="white" />
      {/* 咀 */}
      <path d="M20 28 Q24 32 28 28" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* 面紅 */}
      <circle cx="12" cy="24" r="3" fill="#FF7675" opacity="0.5" />
      <circle cx="36" cy="24" r="3" fill="#FF7675" opacity="0.5" />
    </svg>
  );
}

export function StarIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2 L19 12 L30 12 L21 19 L24 30 L16 23 L8 30 L11 19 L2 12 L13 12 Z"
        fill="#FFE66D"
        stroke="#FDCB6E"
        strokeWidth="1"
      />
    </svg>
  );
}
