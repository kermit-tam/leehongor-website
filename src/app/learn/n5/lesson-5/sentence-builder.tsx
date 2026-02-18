'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useAuth } from '@/lib/auth-context';

// ==================== 類型定義 ====================
type BlockCategory = 'time' | 'person' | 'transport' | 'action';

interface Block {
  id: string;
  category: BlockCategory;
  text: string;        // 日文（含漢字）
  hiragana: string;    // 平假名
  meaning: string;     // 中文意思
  cantonese?: string;  // 廣東話諧音
}

interface SelectedBlocks {
  time: Block | null;
  person: Block | null;
  transport: Block | null;
  action: Block | null;
}

// ==================== 積木數據 ====================
const BLOCKS: Record<BlockCategory, Block[]> = {
  time: [
    { id: 't1', category: 'time', text: '今日', hiragana: 'きょう', meaning: '今天', cantonese: '鏡' },
    { id: 't2', category: 'time', text: '明日', hiragana: 'あした', meaning: '明天', cantonese: '阿士他' },
    { id: 't3', category: 'time', text: '先週', hiragana: 'せんしゅう', meaning: '上週', cantonese: '仙修' },
    { id: 't4', category: 'time', text: '来月', hiragana: 'らいげつ', meaning: '下個月', cantonese: '啦衣給刺' },
    { id: 't5', category: 'time', text: '去年', hiragana: 'きょねん', meaning: '去年', cantonese: '鏡年' },
    { id: 't6', category: 'time', text: '毎日', hiragana: 'まいにち', meaning: '每天', cantonese: '嘛衣尼芝' },
  ],
  person: [
    { id: 'p1', category: 'person', text: '一人で', hiragana: 'ひとりで', meaning: '一個人', cantonese: '黑托利爹' },
    { id: 'p2', category: 'person', text: '友達と', hiragana: 'ともだちと', meaning: '和朋友', cantonese: '托莫打芝托' },
    { id: 'p3', category: 'person', text: '家族と', hiragana: 'かぞくと', meaning: '和家人', cantonese: '卡做古托' },
    { id: 'p4', category: 'person', text: '彼と', hiragana: 'かれと', meaning: '和男朋友', cantonese: '卡咧托' },
    { id: 'p5', category: 'person', text: '彼女と', hiragana: 'かのじょと', meaning: '和女朋友', cantonese: '卡諾喲托' },
  ],
  transport: [
    { id: 'tr1', category: 'transport', text: '電車で', hiragana: 'でんしゃで', meaning: '坐電車', cantonese: '電車爹' },
    { id: 'tr2', category: 'transport', text: 'タクシーで', hiragana: 'たくしーで', meaning: '坐出租車', cantonese: '的士爹' },
    { id: 'tr3', category: 'transport', text: '新幹線で', hiragana: 'しんかんせんで', meaning: '坐新幹線', cantonese: '新幹線爹' },
    { id: 'tr4', category: 'transport', text: '歩いて', hiragana: 'あるいて', meaning: '走路', cantonese: '阿路衣爹' },
    { id: 'tr5', category: 'transport', text: '飛行機で', hiragana: 'ひこうきで', meaning: '坐飛機', cantonese: '飛機爹' },
    { id: 'tr6', category: 'transport', text: 'バスで', hiragana: 'ばすで', meaning: '坐巴士', cantonese: '巴士爹' },
    { id: 'tr7', category: 'transport', text: '地下鉄で', hiragana: 'ちかてつで', meaning: '坐地鐵', cantonese: '地下鐵爹' },
  ],
  action: [
    { id: 'a1', category: 'action', text: '京都へ行きます', hiragana: 'きょうとへいきます', meaning: '去京都', cantonese: '鏡托黑 衣ki嘛司' },
    { id: 'a2', category: 'action', text: 'うちへ帰ります', hiragana: 'うちへかえります', meaning: '回家', cantonese: '烏芝黑 卡也利嘛司' },
    { id: 'a3', category: 'action', text: '日本へ来ました', hiragana: 'にほんへきました', meaning: '來了日本', cantonese: '你虹黑 ki嘛西他' },
    { id: 'a4', category: 'action', text: '学校へ行きます', hiragana: 'がっこうへいきます', meaning: '去學校', cantonese: '學校黑 衣ki嘛司' },
    { id: 'a5', category: 'action', text: '駅へ行きます', hiragana: 'えきへいきます', meaning: '去車站', cantonese: '誒ki黑 衣ki嘛司' },
    { id: 'a6', category: 'action', text: '会社へ行きます', hiragana: 'かいしゃへいきます', meaning: '去公司', cantonese: '卡一蝦黑 衣ki嘛司' },
  ],
};

// ==================== 輔助函數 ====================
const combineSentence = (blocks: SelectedBlocks): { text: string; hiragana: string; meaning: string } => {
  const parts: Block[] = [blocks.time, blocks.person, blocks.transport, blocks.action].filter(Boolean) as Block[];
  
  if (parts.length === 0) {
    return { text: '', hiragana: '', meaning: '' };
  }

  // 組合句子 - 日本語不需要頓號，直接連接
  const text = parts.map(p => p.text).join('');
  const hiragana = parts.map(p => p.hiragana).join('');
  // 中文翻譯用逗號分隔
  const meaning = parts.map(p => p.meaning).join('，');

  return { text, hiragana, meaning };
};

// ==================== 主組件 ====================
export default function SentenceBuilder() {
  // 用戶認證
  const { user } = useAuth();
  
  // 狀態
  const [selected, setSelected] = useState<SelectedBlocks>({
    time: null,
    person: null,
    transport: null,
    action: null,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [diaryText, setDiaryText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMyRecordings, setShowMyRecordings] = useState(false);
  const [savedRecordings, setSavedRecordings] = useState<any[]>([]);
  const [shareImageUrl, setShareImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Refs
  const shareCardRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordedAudioUrlRef = useRef<string | null>(null);

  // 加載可用語音
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices.filter(v => v.lang.includes('ja')));
    };
    
    loadVoices();
    
    // Chrome 需要等待 voiceschanged 事件
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // 當前句子
  const currentSentence = combineSentence(selected);

  // 選擇積木
  const selectBlock = (block: Block) => {
    setSelected(prev => ({ ...prev, [block.category]: block }));
  };

  // 清除選擇
  const clearSelection = () => {
    setSelected({ time: null, person: null, transport: null, action: null });
  };

  // 播放設定
  const [speechRate, setSpeechRate] = useState<0.6 | 0.8 | 1>(0.8);
  const [speechGender, setSpeechGender] = useState<'female' | 'male'>('female');
  const [showSettings, setShowSettings] = useState(false);

  // 播放語音
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

  // 開始錄音
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        recordedAudioUrlRef.current = audioUrl;
        setRecordedAudioUrl(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('無法開始錄音:', err);
      alert('無法存取麥克風，請確認已授予權限。');
    }
  };

  // 停止錄音
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  // 播放錄音
  const playRecording = () => {
    if (recordedAudioUrl && !isPlayingRecording) {
      const audio = new Audio(recordedAudioUrl);
      audioPlayerRef.current = audio;
      audio.onplay = () => setIsPlayingRecording(true);
      audio.onended = () => setIsPlayingRecording(false);
      audio.play();
    }
  };

  // 開啟日記模式
  const openDiary = () => {
    if (!currentSentence.text) {
      alert('請先選擇積木組成句子！');
      return;
    }
    const initialText = `${currentSentence.text}。\n\n感想：______`;
    setDiaryText(initialText);
    setShowDiary(true);
  };

  // 生成分享圖片
  const generateShareImage = async () => {
    if (!shareCardRef.current || !currentSentence.text) return;
    
    setIsGeneratingImage(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        width: 1080,
        height: 1920,
        scale: 1,
        backgroundColor: null,
        useCORS: true,
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      setShareImageUrl(imageUrl);
    } catch (err) {
      console.error('生成圖片失敗:', err);
      alert('生成圖片失敗，請重試。');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // 下載圖片
  const downloadImage = () => {
    if (!shareImageUrl) return;
    const link = document.createElement('a');
    link.download = `nihongo-sentence-${Date.now()}.png`;
    link.href = shareImageUrl;
    link.click();
  };

  // 分享按鈕點擊
  const handleShare = () => {
    if (!currentSentence.text) {
      alert('請先選擇積木組成句子！');
      return;
    }
    setShowShareModal(true);
    generateShareImage();
  };

  // 字數統計
  const charCount = diaryText.length;

  // 加載用戶錄音
  const loadMyRecordings = () => {
    if (!user?.uid) return;
    const allRecordings = JSON.parse(localStorage.getItem('user-recordings') || '[]');
    const myRecordings = allRecordings.filter((r: any) => r.userId === user.uid);
    setSavedRecordings(myRecordings);
    setShowMyRecordings(true);
  };

  // 刪除錄音
  const deleteRecording = (recordingId: number) => {
    const allRecordings = JSON.parse(localStorage.getItem('user-recordings') || '[]');
    const updated = allRecordings.filter((r: any) => r.id !== recordingId);
    localStorage.setItem('user-recordings', JSON.stringify(updated));
    setSavedRecordings(updated.filter((r: any) => r.userId === user?.uid));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] pb-20">
      {/* 頂部標題 */}
      <div className="bg-white border-b border-[#E5E5E5] px-4 py-6 sticky top-0 z-40">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-normal text-[#4A4A4A] mb-1">🧱 積木造句機</h1>
            <p className="text-sm text-[#8C8C8C]">第5課：交通與移動 · 組合你的日文句子</p>
          </div>
          {user?.uid && (
            <button
              onClick={loadMyRecordings}
              className="text-sm text-[#6B5B95] hover:bg-[#F3E5F5] px-3 py-1.5 rounded-full transition-colors"
            >
              🎙️ 我的錄音
            </button>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* 句子顯示區 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="text-xs text-[#8C8C8C] mb-2">你的句子</div>
          <div className="min-h-[120px] flex flex-col justify-center">
            {currentSentence.text ? (
              <>
                <div className="text-2xl text-[#4A4A4A] font-medium mb-2 leading-relaxed" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  {currentSentence.text}
                </div>
                <div className="text-lg text-[#8C8C8C] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  {currentSentence.hiragana}
                </div>
                <div className="text-sm text-[#6B5B95]">
                  {currentSentence.meaning}
                </div>
              </>
            ) : (
              <div className="text-center text-[#8C8C8C] py-8">
                請從下方選擇積木組成句子
              </div>
            )}
          </div>

          {/* 操作按 */}
          {currentSentence.text && (
            <div className="space-y-2 mt-4 pt-4 border-t border-[#E5E5E5]">
              {/* 播放設定 */}
              <div className="flex items-center justify-center gap-4 mb-2">
                {/* 速度選擇 */}
                <div className="flex items-center gap-1 bg-[#F5F5F0] rounded-full px-2 py-1">
                  <span className="text-xs text-[#8C8C8C]">速度:</span>
                  {([
                    { val: 0.6, label: '慢' },
                    { val: 0.8, label: '中' },
                    { val: 1, label: '快' }
                  ] as const).map(({ val, label }) => (
                    <button
                      key={val}
                      onClick={() => setSpeechRate(val)}
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        speechRate === val
                          ? 'bg-[#6B5B95] text-white'
                          : 'text-[#8C8C8C] hover:bg-[#E0E0E0]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                
                {/* 性別選擇 */}
                <div className="flex items-center gap-1 bg-[#F5F5F0] rounded-full px-2 py-1">
                  <span className="text-xs text-[#8C8C8C]">聲音:</span>
                  <button
                    onClick={() => setSpeechGender('female')}
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      speechGender === 'female'
                        ? 'bg-[#E91E63] text-white'
                        : 'text-[#8C8C8C] hover:bg-[#E0E0E0]'
                    }`}
                  >
                    👩 女
                  </button>
                  <button
                    onClick={() => setSpeechGender('male')}
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      speechGender === 'male'
                        ? 'bg-[#2196F3] text-white'
                        : 'text-[#8C8C8C] hover:bg-[#E0E0E0]'
                    }`}
                  >
                    👨 男
                  </button>
                </div>
              </div>
              
              {/* 男聲提示 */}
              {speechGender === 'male' && (
                <p className="text-xs text-[#8C8C8C] text-center">
                  💡 瀏覽器限制：男聲會用較低音調模擬
                </p>
              )}
              
              {/* 第一行：播放、跟讀、分享 */}
              <div className="flex gap-2">
                <button
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="flex-1 py-2 bg-[#E3F2FD] text-[#1976D2] rounded-full text-sm font-medium flex items-center justify-center gap-2"
                >
                  {isPlaying ? '🔊 播放中...' : '▶️ 播放'}
                </button>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`flex-1 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 ${
                    isRecording 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-[#E8F5E9] text-[#4CAF50]'
                  }`}
                >
                  {isRecording ? '⏹️ 停止' : '🎤 跟讀'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 py-2 bg-[#F3E5F5] text-[#6B5B95] rounded-full text-sm font-medium flex items-center justify-center gap-2"
                >
                  📤 分享
                </button>
              </div>
              
              {/* 第二行：播放錄音（如果有錄音） */}
              {recordedAudioUrl && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={playRecording}
                      disabled={isPlayingRecording}
                      className="flex-1 py-2 bg-[#FFF3E0] text-[#F57C00] rounded-full text-sm font-medium flex items-center justify-center gap-2"
                    >
                      {isPlayingRecording ? '🔊 播放中...' : '🔈 聽自己的錄音'}
                    </button>
                    <button
                      onClick={() => {
                        setRecordedAudioUrl(null);
                        recordedAudioUrlRef.current = null;
                      }}
                      className="px-4 py-2 bg-[#F5F5F0] text-[#8C8C8C] rounded-full text-sm"
                    >
                      🗑️ 刪除
                    </button>
                  </div>
                  
                  {/* 保存錄音按鈕 */}
                  {user?.uid && (
                    <button
                      onClick={async () => {
                        if (!recordedAudioUrl || !user.uid) return;
                        
                        try {
                          // 將錄音轉換為 base64
                          const response = await fetch(recordedAudioUrl);
                          const blob = await response.blob();
                          const reader = new FileReader();
                          reader.onloadend = async () => {
                            const base64data = reader.result as string;
                            
                            // 保存到 localStorage
                            const savedRecordings = JSON.parse(localStorage.getItem('user-recordings') || '[]');
                            savedRecordings.push({
                              id: Date.now(),
                              userId: user.uid,
                              sentence: currentSentence.text,
                              hiragana: currentSentence.hiragana,
                              meaning: currentSentence.meaning,
                              audioData: base64data,
                              timestamp: new Date().toISOString(),
                            });
                            localStorage.setItem('user-recordings', JSON.stringify(savedRecordings));
                            
                            alert('錄音已保存到你的帳戶！');
                          };
                          reader.readAsDataURL(blob);
                        } catch (err) {
                          console.error('保存錄音失敗:', err);
                          alert('保存失敗，請重試。');
                        }
                      }}
                      className="w-full py-2 bg-[#E8F5E9] text-[#4CAF50] rounded-full text-sm font-medium flex items-center justify-center gap-2"
                    >
                      💾 保存到我的帳戶
                    </button>
                  )}
                </div>
              )}
              
              {/* 提示文字 */}
              {recordedAudioUrl && (
                <p className="text-xs text-[#8C8C8C] text-center">
                  💡 建議：先聽原音，再聽自己的錄音，比較差異
                </p>
              )}
            </div>
          )}
        </div>

        {/* 積木選擇區 */}
        <div className="space-y-4">
          {/* 時間積木 */}
          <BlockSection 
            title="🕐 時間" 
            blocks={BLOCKS.time} 
            selected={selected.time}
            onSelect={selectBlock}
            color="bg-[#E3F2FD]"
            activeColor="bg-[#6B5B95] text-white"
          />

          {/* 人物積木 */}
          <BlockSection 
            title="👥 人物" 
            blocks={BLOCKS.person} 
            selected={selected.person}
            onSelect={selectBlock}
            color="bg-[#E8F5E9]"
            activeColor="bg-[#6B5B95] text-white"
          />

          {/* 交通工具積木 */}
          <BlockSection 
            title="🚃 交通工具" 
            blocks={BLOCKS.transport} 
            selected={selected.transport}
            onSelect={selectBlock}
            color="bg-[#FFF3E0]"
            activeColor="bg-[#6B5B95] text-white"
          />

          {/* 地點動作積木 */}
          <BlockSection 
            title="📍 地點動作" 
            blocks={BLOCKS.action} 
            selected={selected.action}
            onSelect={selectBlock}
            color="bg-[#FFEBEE]"
            activeColor="bg-[#6B5B95] text-white"
          />
        </div>

        {/* 底部按鈕 */}
        <div className="flex gap-3">
          <button
            onClick={clearSelection}
            className="flex-1 py-3 border border-[#E0E0E0] text-[#8C8C8C] rounded-xl text-sm"
          >
            🗑️ 清除
          </button>
          <button
            onClick={openDiary}
            disabled={!currentSentence.text}
            className="flex-1 py-3 bg-[#6B5B95] text-white rounded-xl text-sm disabled:opacity-50"
          >
            📝 寫日記
          </button>
        </div>
      </div>

      {/* 日記彈窗 */}
      <AnimatePresence>
        {showDiary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4"
            onClick={() => setShowDiary(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#4A4A4A]">📝 寫日記</h3>
                <button onClick={() => setShowDiary(false)} className="text-[#8C8C8C]">✕</button>
              </div>
              <textarea
                value={diaryText}
                onChange={(e) => setDiaryText(e.target.value)}
                className="w-full h-48 p-4 bg-[#F5F5F0] rounded-xl text-[#4A4A4A] resize-none focus:outline-none focus:ring-2 focus:ring-[#6B5B95]"
                style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-[#8C8C8C]">{charCount} 字</span>
                <button
                  onClick={() => {
                    alert('日記已保存！');
                    setShowDiary(false);
                  }}
                  className="px-6 py-2 bg-[#6B5B95] text-white rounded-full text-sm"
                >
                  保存
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 我的錄音彈窗 */}
      <AnimatePresence>
        {showMyRecordings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4"
            onClick={() => setShowMyRecordings(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#4A4A4A]">🎙️ 我的錄音</h3>
                <button onClick={() => setShowMyRecordings(false)} className="text-[#8C8C8C]">✕</button>
              </div>
              
              {savedRecordings.length === 0 ? (
                <div className="text-center py-8 text-[#8C8C8C]">
                  還沒有保存的錄音<br/>
                  <span className="text-sm">錄製你的第一句話吧！</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedRecordings.map((recording) => (
                    <div key={recording.id} className="bg-[#F5F5F0] rounded-xl p-4">
                      <div className="text-sm font-medium text-[#4A4A4A] mb-1">{recording.sentence}</div>
                      <div className="text-xs text-[#8C8C8C] mb-2">{recording.hiragana}</div>
                      <div className="text-xs text-[#6B5B95] mb-3">{recording.meaning}</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const audio = new Audio(recording.audioData);
                            audio.play();
                          }}
                          className="flex-1 py-1.5 bg-[#E3F2FD] text-[#1976D2] rounded-full text-xs"
                        >
                          ▶️ 播放
                        </button>
                        <button
                          onClick={() => deleteRecording(recording.id)}
                          className="px-3 py-1.5 bg-[#FFEBEE] text-[#F44336] rounded-full text-xs"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="text-xs text-[#8C8C8C] mt-2">
                        {new Date(recording.timestamp).toLocaleDateString('zh-HK')}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#4A4A4A]">📤 分享句子</h3>
                <button onClick={() => setShowShareModal(false)} className="text-[#8C8C8C]">✕</button>
              </div>

              {/* 隱藏的分享卡片（用於生成圖片） */}
              <div 
                ref={shareCardRef}
                className="w-[1080px] h-[1920px] p-20 flex flex-col justify-center items-center text-center"
                style={{
                  background: 'linear-gradient(135deg, #6B5B95 0%, #8B7BB5 50%, #6B5B95 100%)',
                  position: 'absolute',
                  left: '-9999px',
                }}
              >
                {/* Logo 位置 */}
                <div className="text-white/80 text-3xl mb-16 tracking-widest">
                  LEEHONGOR 日本語
                </div>

                {/* 日文句子 */}
                <div 
                  className="text-white text-7xl font-bold mb-8 leading-tight"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                >
                  {currentSentence.text}
                </div>

                {/* 平假名 */}
                <div 
                  className="text-white/90 text-4xl mb-12"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                >
                  {currentSentence.hiragana}
                </div>

                {/* 中文翻譯 */}
                <div className="text-white/80 text-4xl mb-20">
                  {currentSentence.meaning}
                </div>

                {/* 裝飾線 */}
                <div className="w-32 h-1 bg-white/50 rounded-full mb-20"></div>

                {/* Hashtag */}
                <div className="text-white/70 text-2xl">
                  #利康哥日本語 #N5 #日文學習
                </div>

                {/* 底部網址 */}
                <div className="absolute bottom-16 text-white/60 text-2xl">
                  leehongor.com
                </div>
              </div>

              {/* 預覽（縮小版） */}
              <div className="bg-[#F5F5F0] rounded-xl p-4 mb-4">
                {isGeneratingImage ? (
                  <div className="aspect-[9/16] flex items-center justify-center text-[#8C8C8C]">
                    生成圖片中...
                  </div>
                ) : shareImageUrl ? (
                  <img 
                    src={shareImageUrl} 
                    alt="分享圖片" 
                    className="w-full rounded-lg"
                  />
                ) : null}
              </div>

              <div className="space-y-2">
                <button
                  onClick={downloadImage}
                  disabled={!shareImageUrl}
                  className="w-full py-3 bg-[#6B5B95] text-white rounded-xl text-sm font-medium disabled:opacity-50"
                >
                  ⬇️ 下載圖片
                </button>
                
                {/* WhatsApp 分享 */}
                <button
                  onClick={() => {
                    const text = `我正在學習日文！\n\n${currentSentence.text}\n${currentSentence.hiragana}\n${currentSentence.meaning}\n\n來自利康哥日文學習平台 🎌`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full py-3 bg-[#25D366] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                >
                  💬 分享到 WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== 子組件：積木區塊 ====================
interface BlockSectionProps {
  title: string;
  blocks: Block[];
  selected: Block | null;
  onSelect: (block: Block) => void;
  color: string;
  activeColor: string;
}

function BlockSection({ title, blocks, selected, onSelect, color, activeColor }: BlockSectionProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#E8E8E8]">
      <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {blocks.map((block) => {
          const isSelected = selected?.id === block.id;
          return (
            <button
              key={block.id}
              onClick={() => onSelect(block)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                isSelected 
                  ? activeColor 
                  : `${color} text-[#4A4A4A] hover:opacity-80`
              }`}
              title={`${block.meaning}${block.cantonese ? ` (${block.cantonese})` : ''}`}
            >
              <span className="font-medium">{block.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
