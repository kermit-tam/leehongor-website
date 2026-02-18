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
    
    // 檢查是否已安裝
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setState(prev => ({ ...prev, isInstalled: true }));
    }

    // 監聽離線狀態
    const handleOnline = () => setState(prev => ({ ...prev, isOffline: false }));
    const handleOffline = () => setState(prev => ({ ...prev, isOffline: true }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // 初始狀態
    setState(prev => ({ ...prev, isOffline: !navigator.onLine }));

    // 註冊 Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw-lesson5.js', { scope: '/learn/n5/lesson-5' })
        .then((registration) => {
          console.log('[PWA] SW registered:', registration);
        })
        .catch((error) => {
          console.error('[PWA] SW registration failed:', error);
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

    const promptEvent = state.deferredPrompt as any;
    promptEvent.prompt();

    const { outcome } = await promptEvent.userChoice;
    
    if (outcome === 'accepted') {
      console.log('[PWA] User accepted install');
      setState(prev => ({ ...prev, deferredPrompt: null, isInstallable: false }));
    } else {
      console.log('[PWA] User dismissed install');
    }
  }, [state.deferredPrompt]);

  // 請求通知權限
  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('[PWA] Notifications not supported');
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
      console.log('[PWA] Background sync not supported');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      await (registration as any).sync.register(tag);
      return true;
    } catch (error) {
      console.error('[PWA] Sync registration failed:', error);
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
