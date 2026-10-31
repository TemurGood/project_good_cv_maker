// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { ResumeEditor } from '@/components/editor/ResumeEditor';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { AIAssistantModal } from '@/components/assistant/AIAssistantModal';
import { useResumeStore } from '@/store/useResumeStore';
import { Moon, Sun } from 'lucide-react';

export default function Home() {
  const { data, toggleDarkMode } = useResumeStore();

  // Синхронизация Dark Mode с корневым тегом html
  useEffect(() => {
    if (data.settings.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [data.settings.isDarkMode]);

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Верхний стеклянный навбар */}
      <header className="sticky top-0 z-30 border-b border-neutral-200/60 bg-white/60 backdrop-blur-xl dark:border-neutral-800 dark:bg-black/60 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-bold text-xs tracking-tighter">
            GC
          </div>
          <span className="font-semibold tracking-tight text-base">Good CV</span>
          <span className="rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
            AI Powered
          </span>
        </div>

        {/* Кнопка смены темы оформления */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
          title="Сменить тему"
        >
          {data.settings.isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <ResumeEditor />
          </div>
          <div className="lg:col-span-7 lg:sticky lg:top-20">
            <ResumePreview />
          </div>
        </div>
      </main>

      {/* Плавающий ассистент умного черновика */}
      <AIAssistantModal />
    </div>
  );
}