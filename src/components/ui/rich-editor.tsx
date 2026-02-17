/**
 * 富文本編輯器組件
 * Rich Text Editor with Tiptap
 * 
 * 支援：文字樣式、圖片上傳、排版
 */

'use client';

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { useState, useCallback } from 'react';

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichEditor({ content, onChange, placeholder = '輸入內容...' }: RichEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-neutral max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  // 上傳圖片到文章內容
  const addImage = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert('圖片大小不能超過 5MB');
        return;
      }

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'leehongor/content');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || '上傳失敗');
        }

        // 插入圖片到編輯器
        editor?.chain().focus().setImage({ src: data.url, alt: file.name }).run();
      } catch (error) {
        console.error('Upload error:', error);
        alert('圖片上傳失敗：' + (error instanceof Error ? error.message : '未知錯誤'));
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  }, [editor]);

  if (!editor) {
    return <div className="p-4 text-[#8C8C8C]">載入編輯器中...</div>;
  }

  return (
    <div className="border-t border-[#E5E5E5] bg-white">
      {/* 工具欄 */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-[#E5E5E5] bg-[#FAF9F7]">
        {/* 文字樣式 */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 text-sm ${editor.isActive('bold') ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="粗體"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 text-sm italic ${editor.isActive('italic') ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="斜體"
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 text-sm underline ${editor.isActive('underline') ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="底線"
          >
            U
          </button>
        </div>

        <div className="w-px h-6 bg-[#E5E5E5] mx-2" />

        {/* 標題 */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 text-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="大標題"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="中標題"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="小標題"
          >
            H3
          </button>
        </div>

        <div className="w-px h-6 bg-[#E5E5E5] mx-2" />

        {/* 對齊 */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 text-sm ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="左對齊"
          >
            ⬅️
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 text-sm ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="置中"
          >
            ↔️
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 text-sm ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="右對齊"
          >
            ➡️
          </button>
        </div>

        <div className="w-px h-6 bg-[#E5E5E5] mx-2" />

        {/* 列表 */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 text-sm ${editor.isActive('bulletList') ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="項目符號"
          >
            • 列表
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 text-sm ${editor.isActive('orderedList') ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
            title="編號列表"
          >
            1. 列表
          </button>
        </div>

        <div className="w-px h-6 bg-[#E5E5E5] mx-2" />

        {/* 顏色 */}
        <div className="flex items-center gap-1">
          <input
            type="color"
            onInput={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
            className="w-8 h-8 p-0 border-0 cursor-pointer"
            title="文字顏色"
          />
          <button
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="p-2 text-xs hover:bg-[#F5F5F0]"
            title="清除顏色"
          >
            清除
          </button>
        </div>

        <div className="w-px h-6 bg-[#E5E5E5] mx-2" />

        {/* 插入 */}
        <button
          onClick={addImage}
          disabled={isUploading}
          className="p-2 text-sm hover:bg-[#F5F5F0] disabled:opacity-50"
          title="插入圖片"
        >
          {isUploading ? '上傳中...' : '📷 圖片'}
        </button>

        <button
          onClick={() => {
            const url = window.prompt('輸入連結網址:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-2 text-sm ${editor.isActive('link') ? 'bg-[#E0D5C7]' : 'hover:bg-[#F5F5F0]'}`}
          title="插入連結"
        >
          🔗 連結
        </button>

        <div className="w-px h-6 bg-[#E5E5E5] mx-2" />

        {/* 清除格式 */}
        <button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="p-2 text-sm hover:bg-[#F5F5F0]"
          title="清除格式"
        >
          🧹 清除
        </button>
      </div>

      {/* 編輯區域 */}
      <EditorContent editor={editor} className="prose prose-neutral max-w-none" />

      {/* 字數統計 */}
      <div className="px-4 py-2 border-t border-[#E5E5E5] bg-[#FAF9F7] text-xs text-[#8C8C8C]">
        {editor.storage.characterCount?.characters?.() || editor.getText().length} 字
      </div>

      {/* Bubble Menu（選中文字時顯示） */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center gap-1 bg-white border border-[#E5E5E5] shadow-sm p-1">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1 text-sm ${editor.isActive('bold') ? 'bg-[#E0D5C7]' : ''}`}
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1 text-sm italic ${editor.isActive('italic') ? 'bg-[#E0D5C7]' : ''}`}
            >
              I
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1 text-sm underline ${editor.isActive('underline') ? 'bg-[#E0D5C7]' : ''}`}
            >
              U
            </button>
            <input
              type="color"
              onInput={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
              className="w-6 h-6 p-0 border-0 cursor-pointer"
            />
          </div>
        </BubbleMenu>
      )}
    </div>
  );
}

// ==================== 簡化版 Markdown 編輯器（備選）====================

interface SimpleEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SimpleEditor({ value, onChange, placeholder }: SimpleEditorProps) {
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={15}
        className="w-full px-4 py-3 bg-white border-t border-[#E5E5E5] focus:border-[#8C8C8C] focus:outline-none font-mono text-sm"
      />
      <div className="text-xs text-[#8C8C8C]">
        支援 Markdown 語法：# 標題、**粗體**、*斜體*、[連結](url)、![圖片](url)
      </div>
    </div>
  );
}
