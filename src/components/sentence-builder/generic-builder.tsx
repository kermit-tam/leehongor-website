'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useAuth } from '@/lib/auth-context';

// ==================== 類型定義 ====================
type BlockCategory = 'subject' | 'particle' | 'object' | 'verb' | 'time' | 'place';

interface Block {
  id: string;
  category: BlockCategory;
  text: string;
  hiragana: string;
  meaning: string;
  cantonese?: string;
}

interface SelectedBlocks {
  time?: Block | null;
  place?: Block | null;
  subject?: Block | null;
  particle?: Block | null;
  object?: Block | null;
  verb?: Block | null;
}

interface SentenceBuilderProps {
  lessonNum: number;
  lessonTitle: string;
  blocks: Record<BlockCategory, Block[]>;
  categoryOrder: BlockCategory[];
  categoryNames: Record<BlockCategory, { title: string; subtitle: string; color: string }>;
}

// ==================== 輔助函數 ====================
const combineSentence = (blocks: SelectedBlocks, order: BlockCategory[]): { text: string; hiragana: string; meaning: string } => {
  const parts: Block[] = [];
  
  for (const cat of order) {
    const block = blocks[cat];
    if (block) parts.push(block);
  }
  
  if (parts.length === 0) return { text: '', hiragana: '', meaning: '' };

  const text = parts.map(p => p.text).join('');
  const hiragana = parts.map(p => p.hiragana).join('');
  const meaning = parts.map(p => p.meaning).join('，');

  return { text, hiragana, meaning };
};

// ==================== 主組件 ====================
export function GenericSentenceBuilder({ lessonNum, lessonTitle, blocks, categoryOrder, categoryNames }: SentenceBuilderProps) {
  const { user } = useAuth();
  
  const initialState: SelectedBlocks = {};
  categoryOrder.forEach(cat => { initialState[cat] = null; });
  
  const [selected, setSelected] = useState<SelectedBlocks>(initialState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState<0.5 | 0.7 | 0.9 | 1.1>(0.7);
  const [speechGender, setSpeechGender] = useState<'female' | 'male'>('female');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordedAudioUrlRef = useRef<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);
  
  const [showMyRecordings, setShowMyRecordings] = useState(false);
  const [savedRecordings, setSavedRecordings] = useState<any[]>([]);

  const currentSentence = combineSentence(selected, categoryOrder);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices.filter(v => v.lang.includes('ja')));
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const selectBlock = (block: Block) => {
    setSelected(prev => ({ ...prev, [block.category]: block }));
  };

  const clearSelection = () => {
    const empty: SelectedBlocks = {};
    categoryOrder.forEach(cat => { empty[cat] = null; });
    setSelected(empty);
    setRecordedAudioUrl(null);
  };

  const playAudio = useCallback(() => {
    if (!currentSentence.hiragana || isPlaying) return;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSentence.hiragana);
      utterance.lang = 'ja-JP';
      utterance.rate = speechRate;
      
      // 根據性別設置語音
      if (speechGender === 'female') {
        // 女聲：高音調
        utterance.pitch = 1.2;
        
        // 嘗試搵女聲
        if (availableVoices.length > 0) {
          const femaleVoice = availableVoices.find(v => {
            const name = v.name.toLowerCase();
            return name.includes('female') || name.includes('nanami');
          });
          if (femaleVoice) utterance.voice = femaleVoice;
        }
      } else {
        // 男聲：低音調
        utterance.pitch = 0.6;
        
        // 嘗試搵男聲
        if (availableVoices.length > 0) {
          const maleVoice = availableVoices.find(v => {
            const name = v.name.toLowerCase();
            return name.includes('male') || name.includes('keita') || name.includes('takumi');
          });
          if (maleVoice) {
            utterance.voice = maleVoice;
            utterance.pitch = 0.8; // 有真正男聲就用較正常音調
          }
        }
      }
      
      console.log(`播放: ${speechGender}, pitch: ${utterance.pitch}, 語音: ${utterance.voice?.name || '默認'}`);
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [currentSentence.hiragana, isPlaying, speechRate, speechGender, availableVoices]);

  // 獲取最佳支持的 MIME 類型
  const getSupportedMimeType = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/mpeg',
      'audio/ogg;codecs=opus',
      'audio/ogg',
    ];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return ''; // 使用默認
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        } 
      });
      
      const mimeType = getSupportedMimeType();
      const options = mimeType ? { mimeType } : {};
      const mediaRecorder = new MediaRecorder(stream, options);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const finalMimeType = mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: finalMimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        recordedAudioUrlRef.current = audioUrl;
        setRecordedAudioUrl(audioUrl);
      };

      mediaRecorder.start(100); // 每 100ms 收集數據，確保數據不會丟失
      setIsRecording(true);
    } catch (err) {
      console.error('Recording error:', err);
      alert('無法存取麥克風，請確認已授予權限。在 iOS 上請使用 Safari 瀏覽器。');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const playRecording = async () => {
    if (recordedAudioUrl && !isPlayingRecording) {
      try {
        // 創建音頻元素
        const audio = new Audio(recordedAudioUrl);
        audioPlayerRef.current = audio;
        
        // iOS Safari 需要設置這些屬性
        audio.preload = 'auto';
        (audio as any).playsInline = true; // iOS 視頻屬性，對音頻也有幫助
        audio.muted = false;
        
        // 等待音頻加載
        await new Promise((resolve, reject) => {
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
          // 超時處理
          setTimeout(() => reject(new Error('Audio load timeout')), 5000);
        });
        
        audio.onplay = () => setIsPlayingRecording(true);
        audio.onended = () => setIsPlayingRecording(false);
        audio.onerror = () => {
          setIsPlayingRecording(false);
          alert('播放失敗，請重試');
        };
        
        // 確保音頻上下文已恢復（針對 iOS）
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const audioContext = new AudioContext();
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
        }
        
        await audio.play();
      } catch (err) {
        console.error('Playback error:', err);
        setIsPlayingRecording(false);
        alert('播放失敗，請重試。在 iOS 上請確保靜音開關已關閉。');
      }
    }
  };

  const handleShare = () => {
    if (!currentSentence.text) {
      alert('請先選擇積木組成句子！');
      return;
    }
    setShowShareModal(true);
    generateShareImage();
  };

  const generateShareImage = async () => {
    if (!shareCardRef.current || !currentSentence.text) return;
    setIsGeneratingImage(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        width: 1080, height: 1920, scale: 1, backgroundColor: null, useCORS: true,
      });
      setShareImageUrl(canvas.toDataURL('image/png'));
    } catch (err) {
      alert('生成圖片失敗，請重試。');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const downloadImage = () => {
    if (!shareImageUrl) return;
    const link = document.createElement('a');
    link.download = `nihongo-sentence-${Date.now()}.png`;
    link.href = shareImageUrl;
    link.click();
  };

  const loadMyRecordings = () => {
    if (!user?.uid) return;
    const all = JSON.parse(localStorage.getItem('user-recordings') || '[]');
    setSavedRecordings(all.filter((r: any) => r.userId === user.uid && r.lessonNum === lessonNum));
    setShowMyRecordings(true);
  };

  const deleteRecording = (id: number) => {
    const all = JSON.parse(localStorage.getItem('user-recordings') || '[]');
    const updated = all.filter((r: any) => r.id !== id);
    localStorage.setItem('user-recordings', JSON.stringify(updated));
    setSavedRecordings(updated.filter((r: any) => r.userId === user?.uid && r.lessonNum === lessonNum));
  };

  const saveRecording = async () => {
    if (!recordedAudioUrl || !user?.uid) return;
    try {
      const response = await fetch(recordedAudioUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const saved = JSON.parse(localStorage.getItem('user-recordings') || '[]');
        saved.push({
          id: Date.now(), userId: user.uid, lessonNum,
          sentence: currentSentence.text, hiragana: currentSentence.hiragana,
          meaning: currentSentence.meaning, audioData: base64data,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('user-recordings', JSON.stringify(saved));
        alert('錄音已保存！');
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      alert('保存失敗，請重試。');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] pb-20">
      <div className="bg-white border-b border-[#E5E5E5] px-4 py-6 sticky top-0 z-40">
        <div className="flex justify-between items-start max-w-lg mx-auto">
          <div>
            <h1 className="text-2xl font-normal text-[#4A4A4A] mb-1">🧱 積木造句機</h1>
            <p className="text-sm text-[#8C8C8C]">第{lessonNum}課：{lessonTitle}</p>
          </div>
          {user?.uid && (
            <button onClick={loadMyRecordings} className="text-sm text-[#6B5B95] hover:bg-[#F3E5F5] px-3 py-1.5 rounded-full">🎙️ 我的錄音</button>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="text-xs text-[#8C8C8C] mb-2">你的句子</div>
          <div className="min-h-[120px] flex flex-col justify-center">
            {currentSentence.text ? (
              <>
                <div className="text-2xl text-[#4A4A4A] font-medium mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{currentSentence.text}</div>
                <div className="text-lg text-[#8C8C8C] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{currentSentence.hiragana}</div>
                <div className="text-sm text-[#6B5B95]">{currentSentence.meaning}</div>
              </>
            ) : (
              <div className="text-center text-[#8C8C8C] py-8">請從下方選擇積木組成句子</div>
            )}
          </div>

          {currentSentence.text && (
            <div className="space-y-2 mt-4 pt-4 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                <div className="flex items-center gap-1 bg-[#F5F5F0] rounded-full px-2 py-1">
                  {[
                    { val: 0.5, label: '🐢 新手' },
                    { val: 0.7, label: '📚 學習' },
                    { val: 0.9, label: '✏️ 考試' },
                    { val: 1.1, label: '💬 日常' }
                  ].map(({ val, label }) => (
                    <button key={val} onClick={() => setSpeechRate(val as 0.5 | 0.7 | 0.9 | 1.1)}
                      className={`px-2 py-0.5 rounded-full text-xs ${speechRate === val ? 'bg-[#6B5B95] text-white' : 'text-[#8C8C8C]'}`}>{label}</button>
                  ))}
                </div>
                <div className="flex items-center gap-1 bg-[#F5F5F0] rounded-full px-2 py-1">
                  <span className="text-xs text-[#8C8C8C]">聲音:</span>
                  <button onClick={() => setSpeechGender('female')} className={`px-2 py-0.5 rounded-full text-xs ${speechGender === 'female' ? 'bg-[#E91E63] text-white' : 'text-[#8C8C8C]'}`}>👩</button>
                  <button onClick={() => setSpeechGender('male')} className={`px-2 py-0.5 rounded-full text-xs ${speechGender === 'male' ? 'bg-[#2196F3] text-white' : 'text-[#8C8C8C]'}`}>👨</button>
                </div>
              </div>
              
              {/* 男聲提示 */}
              {speechGender === 'male' && (
                <p className="text-xs text-[#8C8C8C] text-center mb-2">
                  💡 瀏覽器限制：男聲會用較低音調模擬
                </p>
              )}

              <div className="flex gap-2">
                <button onClick={playAudio} disabled={isPlaying} className="flex-1 py-2 bg-[#E3F2FD] text-[#1976D2] rounded-full text-sm">{isPlaying ? '🔊 播放中...' : '▶️ 播放'}</button>
                <button onClick={isRecording ? stopRecording : startRecording} className={`flex-1 py-2 rounded-full text-sm ${isRecording ? 'bg-red-100 text-red-600' : 'bg-[#E8F5E9] text-[#4CAF50]'}`}>{isRecording ? '⏹️ 停止' : '🎤 跟讀'}</button>
                <button onClick={handleShare} className="flex-1 py-2 bg-[#F3E5F5] text-[#6B5B95] rounded-full text-sm">📤 分享</button>
              </div>

              {recordedAudioUrl && (
                <div className="space-y-2 pt-2 border-t border-[#E5E5E5]">
                  <div className="flex gap-2">
                    <button onClick={playRecording} disabled={isPlayingRecording} className="flex-1 py-2 bg-[#FFF3E0] text-[#F57C00] rounded-full text-sm">{isPlayingRecording ? '🔊 播放中...' : '🔈 聽錄音'}</button>
                    <button onClick={() => { setRecordedAudioUrl(null); recordedAudioUrlRef.current = null; }} className="px-4 py-2 bg-[#F5F5F0] text-[#8C8C8C] rounded-full text-sm">🗑️</button>
                  </div>
                  {user?.uid && <button onClick={saveRecording} className="w-full py-2 bg-[#E8F5E9] text-[#4CAF50] rounded-full text-sm">💾 保存到我的帳戶</button>}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {categoryOrder.map((cat) => (
            <div key={cat} className={`rounded-xl p-4 border border-[#E8E8E8] ${categoryNames[cat].color}`}>
              <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">{categoryNames[cat].title}</h3>
              <div className="flex flex-wrap gap-2">
                {blocks[cat]?.map((block) => {
                  const isSelected = selected[cat]?.id === block.id;
                  return (
                    <button key={block.id} onClick={() => selectBlock(block)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${isSelected ? 'bg-[#6B5B95] text-white' : 'bg-white text-[#4A4A4A] border border-[#E5E5E5]'}`} title={block.meaning}>{block.text}</button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button onClick={clearSelection} className="w-full py-3 border border-[#E0E0E0] text-[#8C8C8C] rounded-xl text-sm">🗑️ 清除</button>
      </div>

      {/* 我的錄音彈窗 */}
      <AnimatePresence>
        {showMyRecordings && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4" onClick={() => setShowMyRecordings(false)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#4A4A4A]">🎙️ 我的錄音</h3>
                <button onClick={() => setShowMyRecordings(false)} className="text-[#8C8C8C]">✕</button>
              </div>
              {savedRecordings.length === 0 ? (
                <div className="text-center py-8 text-[#8C8C8C]">還沒有保存的錄音</div>
              ) : (
                <div className="space-y-3">
                  {savedRecordings.map((r) => (
                    <div key={r.id} className="bg-[#F5F5F0] rounded-xl p-4">
                      <div className="text-sm font-medium text-[#4A4A4A] mb-1">{r.sentence}</div>
                      <div className="text-xs text-[#8C8C8C] mb-2">{r.hiragana}</div>
                      <div className="flex gap-2">
                        <button onClick={async () => { 
                          try {
                            const a = new Audio(r.audioData);
                            a.preload = 'auto';
                            (a as any).playsInline = true;
                            await a.play();
                          } catch (e) {
                            alert('播放失敗，請重試');
                          }
                        }} className="flex-1 py-1.5 bg-[#E3F2FD] text-[#1976D2] rounded-full text-xs">▶️ 播放</button>
                        <button onClick={() => deleteRecording(r.id)} className="px-3 py-1.5 bg-[#FFEBEE] text-[#F44336] rounded-full text-xs">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 分享彈窗 */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#4A4A4A]">📤 分享句子</h3>
                <button onClick={() => setShowShareModal(false)} className="text-[#8C8C8C]">✕</button>
              </div>
              <div ref={shareCardRef} className="w-[1080px] h-[1920px] p-20 flex flex-col justify-center items-center text-center"
                style={{ background: 'linear-gradient(135deg, #6B5B95 0%, #8B7BB5 50%, #6B5B95 100%)', position: 'absolute', left: '-9999px' }}>
                <div className="text-white/80 text-3xl mb-16">LEEHONGOR 日本語</div>
                <div className="text-white text-7xl font-bold mb-8">{currentSentence.text}</div>
                <div className="text-white/90 text-4xl mb-12">{currentSentence.hiragana}</div>
                <div className="text-white/80 text-4xl mb-20">{currentSentence.meaning}</div>
                <div className="text-white/70 text-2xl">#利康哥日本語</div>
              </div>
              <div className="bg-[#F5F5F0] rounded-xl p-4 mb-4">
                {isGeneratingImage ? <div className="aspect-[9/16] flex items-center justify-center">生成中...</div> : shareImageUrl ? <img src={shareImageUrl} className="w-full rounded-lg" /> : null}
              </div>
              <div className="space-y-2">
                <button onClick={downloadImage} disabled={!shareImageUrl} className="w-full py-3 bg-[#6B5B95] text-white rounded-xl text-sm disabled:opacity-50">⬇️ 下載</button>
                <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${currentSentence.text}\n${currentSentence.hiragana}\n${currentSentence.meaning}\n\n來自利康哥日文 🎌`)}`, '_blank')} className="w-full py-3 bg-[#25D366] text-white rounded-xl text-sm">💬 WhatsApp</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
