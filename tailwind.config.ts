import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 無印風格色系 MUJI Style
        muji: {
          // 背景色
          bg: '#F5F5F0',         // 米白紙色
          'bg-warm': '#FAF9F7',  // 暖白
          
          // 文字色
          text: '#4A4A4A',       // 炭灰主文字
          'text-secondary': '#8C8C8C', // 次要文字
          'text-muted': '#B5B5B5',     // 更淡文字
          
          // 主按鈕
          primary: '#8C8C8C',    // 灰
          'primary-hover': '#6B6B6B', // 深灰
          
          // 輔助色
          accent: '#E0D5C7',     // 淡米
          'accent-warm': '#D4C5B9', // 暖米
          
          // 邊框
          border: '#E5E5E5',     // 淺灰邊框
          'border-light': '#F0F0F0',
          
          // 大地色系（用於雷達圖等）
          earth: {
            1: '#C4B9AC',        // 暖灰褐
            2: '#A8B5A0',        // 鼠尾草綠
            3: '#D4C5B9',        // 淺駝色
            4: '#B8B8B8',        // 中性灰
            5: '#D1C7B7',        // 米駝色
            6: '#C9BCAD',        // 暖沙色
          }
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'wide': '0.025em',
        'wider': '0.05em',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'bounce': 'bounce 1s infinite',
        'shrink': 'shrink 1.5s linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' },
        },
        shrink: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
