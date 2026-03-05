/**
 * 佈局包裝器 - 根據 hostname 條件渲染日文網站元素
 * Layout Wrapper - Conditionally renders Japanese site elements based on hostname
 */

'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { CheckinModal } from '@/components/checkin';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isJapaneseSite, setIsJapaneseSite] = useState(true);
  
  useEffect(() => {
    // 檢查 hostname
    const hostname = window.location.hostname;
    const isCEMSite = hostname.startsWith('study.') || hostname.startsWith('kids.');
    // Schedule state update to avoid synchronous setState in effect
    queueMicrotask(() => setIsJapaneseSite(!isCEMSite));
  }, []);
  
  return (
    <>
      {isJapaneseSite && <Navbar />}
      <main>{children}</main>
      {isJapaneseSite && <CheckinModal />}
    </>
  );
}
