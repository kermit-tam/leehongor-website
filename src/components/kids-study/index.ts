/**
 * 仔仔溫書 - 共用組件和數據
 * Kids Study Shared Components & Data
 */

// 導出類型
export type { StudyCard, Lesson, ImageInfo } from './types';

// 導出數據
export {
  chineseTopics,
  englishLessons,
  getAllLessons,
  englishCards,
} from './index-data';

export { chineseLesson01Cards } from './chinese-lesson-01';
export { chineseLesson02Cards } from './chinese-lesson-02';
export { chineseLesson03Cards } from './chinese-lesson-03';

// 導出組件
export { FlashCard } from './FlashCard';
export { ListeningQuiz } from './ListeningQuiz';
export { SpeakingQuiz } from './SpeakingQuiz';
export { PictureMatch } from './PictureMatch';
export { ProgressBar } from './ProgressBar';

// 導出圖片服務
export { ImageService } from './image-service';
export { presetImages } from './preset-images';
