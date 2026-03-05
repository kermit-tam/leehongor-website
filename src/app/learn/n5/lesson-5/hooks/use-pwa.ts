/**
 * PWA 註冊與管理 Hook
 * PWA Registration Hook
 */

import { useState, useEffect, useCallback } from 'react';

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  deferredPrompt: Event | null;
}

export function usePWA() {
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOffline: false,
    deferredPrompt: null,
  });

  // 註冊 Service Worker
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // 使用 setTimeout 避免同步調用 setState
    const initTimer = setTimeout(() => {
      // 檢查是否已安裝
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as { standalone?: boolean }).standalone === true) {
        setState(prev => ({ ...prev, isInstalled: true }));
      }

      // 初始狀態
      setState(prev => ({ ...prev, isOffline: !navigator.onLine }));
    }, 0);

    // 監聽離線狀態
    const handleOnline = () => setState(prev => ({ ...prev, isOffline: false }));
    const handleOffline = () => setState(prev => ({ ...prev, isOffline: true }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 註冊 Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw-lesson5.js', { scope: '/learn/n5/lesson-5' })
        .then(() => {
          // SW registered
        })
        .catch(() => {
          // SW registration failed
        });

      // 監聽 beforeinstallprompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setState(prev => ({ ...prev, deferredPrompt: e, isInstallable: true }));
      };
      
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // 監聽 appinstalled
      const handleAppInstalled = () => {
        setState(prev => ({ 
          ...prev, 
          isInstalled: true, 
          isInstallable: false, 
          deferredPrompt: null 
        }));
      };
      
      window.addEventListener('appinstalled', handleAppInstalled);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }
  }, []);

  // 觸發安裝
  const install = useCallback(async () => {
    if (!state.deferredPrompt) return;

    interface BeforeInstallPromptEvent extends Event {
      prompt: () => void;
      userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    }
    const promptEvent = state.deferredPrompt as BeforeInstallPromptEvent;
    promptEvent.prompt();

    const { outcome } = await promptEvent.userChoice;
    
    if (outcome === 'accepted') {
      setState(prev => ({ ...prev, deferredPrompt: null, isInstallable: false }));
    }
  }, [state.deferredPrompt]);

  // 請求通知權限
  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }, []);

  // 發送本地通知
  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options);
    });
  }, []);

  // 後台同步
  const sync = useCallback(async (tag: string) => {
    if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (registration as { sync: { register: (tag: string) => Promise<void> } }).sync.register(tag);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    ...state,
    install,
    requestNotificationPermission,
    sendNotification,
    sync,
  };
}
