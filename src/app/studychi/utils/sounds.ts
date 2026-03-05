/**
 * 港鐵音效生成器
 * 用 Web Audio API 生成各種港鐵聲音
 */

// 創建 audio context
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  return new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
};

/**
 * 生成「嘟嘟嘟」閂門警告聲
 * 連續 8 聲，每聲 100ms，頻率 800Hz
 */
export function playDoorCloseBeep(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const beepCount = 8;
  const beepDuration = 0.08; // 每聲 80ms
  const gap = 0.12; // 間隔 120ms

  for (let i = 0; i < beepCount; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // 設置頻率（800Hz 似港鐵聲）
    osc.frequency.value = 800;
    osc.type = 'square'; // 方波音色較似電子聲

    // 設置音量包絡
    const startTime = now + i * gap;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + beepDuration);

    // 連接節點
    osc.connect(gain);
    gain.connect(ctx.destination);

    // 播放
    osc.start(startTime);
    osc.stop(startTime + beepDuration);
  }
}

/**
 * 生成「叮」到站聲
 * 高頻清脆聲
 */
export function playArrivalBeep(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.frequency.value = 1200;
  osc.type = 'sine';

  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.3);
}

/**
 * 生成「叮咚」開門聲
 * 雙音階效果
 */
export function playDoorOpenBeep(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 第一聲「叮」
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.frequency.value = 1000;
  osc1.type = 'sine';
  gain1.gain.setValueAtTime(0.15, now);
  gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.2);

  // 第二聲「咚」（低八度）
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.frequency.value = 500;
  osc2.type = 'sine';
  gain2.gain.setValueAtTime(0.15, now + 0.15);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.15);
  osc2.stop(now + 0.5);
}

/**
 * 生成列車行駛聲
 * 低頻隆隆聲
 */
export function playTrainMovingSound(duration: number = 2): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // 低頻噪音
  osc.frequency.value = 100;
  osc.type = 'sawtooth';

  // 低通濾波器
  filter.type = 'lowpass';
  filter.frequency.value = 200;

  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.1, now + 0.5);
  gain.gain.setValueAtTime(0.1, now + duration - 0.5);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}
