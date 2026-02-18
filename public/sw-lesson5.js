/**
 * 第5課 Service Worker
 * Lesson 5 Service Worker for Offline Support
 */

const CACHE_NAME = 'lesson5-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/learn/n5/lesson-5',
  '/_next/static/css',
  '/_next/static/js',
];

// 安裝：快取靜態資源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).catch((err) => {
      console.error('[SW] Cache failed:', err);
    })
  );
  
  self.skipWaiting();
});

// 啟動：清理舊快取
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  
  self.clients.claim();
});

// 攔截請求
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 只處理 GET 請求
  if (request.method !== 'GET') {
    return;
  }
  
  // 策略：Cache First，Network Fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // 回傳快取，同時在背景更新
        fetchAndCache(request);
        return cachedResponse;
      }
      
      // 沒有快取，從網路獲取
      return fetchAndCache(request);
    }).catch(() => {
      // 離線且沒有快取
      console.log('[SW] Offline, no cache for:', request.url);
      return new Response('Offline', { status: 503 });
    })
  );
});

// 從網路獲取並快取
async function fetchAndCache(request) {
  try {
    const networkResponse = await fetch(request);
    
    // 只快取成功的請求
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    throw error;
  }
}

// 處理後台同步（用於離線數據同步）
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-lesson5-progress') {
    event.waitUntil(syncProgressToServer());
  }
});

// 處理推播通知
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  event.waitUntil(
    self.registration.showNotification(data.title || '利康哥日文', {
      body: data.body || '繼續你的日文學習！',
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      data: data.data || {},
      actions: [
        { action: 'open', title: '打開' },
        { action: 'close', title: '稍後' }
      ]
    })
  );
});

// 處理通知點擊
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/learn/n5/lesson-5')
    );
  }
});

// 模擬進度同步到服務器
async function syncProgressToServer() {
  console.log('[SW] Syncing progress to server...');
  // 這裡會在重新連線時將離線數據同步到Firebase
}

console.log('[SW] Service Worker loaded');
