// src/components/assistant/AIAssistantModal.tsx
'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Sparkles, Mic, MicOff, Send, X, Loader2 } from 'lucide-react';

export const AIAssistantModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mergeFromDraft } = useResumeStore();

  // Распознавание голоса (Web Speech API)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Голосовой ввод не поддерживается вашим браузером. Используйте Chrome или Safari.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        interim += event.results[i][0].transcript;
      }
      setText((prev) => (prev ? prev + ' ' + interim : interim));
    };

    recognition.start();
  };

  const handleProcessDraft = async () => {
    if (!text.trim()) return;

    try {
      setIsLoading(true);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'parse-raw-draft',
          payload: { draft: text },
        }),
      });

      const data = await res.json();
      if (data.result) {
        mergeFromDraft(data.result);
        setText('');
        setIsOpen(false);
      } else {
        alert(data.error || 'Ошибка распознавания черновика');
      }
    } catch (e) {
      console.error(e);
      alert('Ошибка запроса');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Кнопка ассистента справа снизу */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-900 text-white px-5 py-3.5 shadow-2xl backdrop-blur-xl border border-white/20 transition-all hover:scale-105 active:scale-95 dark:bg-white/90 dark:text-neutral-900 dark:hover:bg-white"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">Умный черновик</span>
        </button>
      </div>

      {/* Модальное окно ассистента в стиле Apple */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-lg rounded-3xl border border-neutral-200/80 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:border-neutral-800 dark:bg-neutral-900/95 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Ассистент Good CV
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Наговорите или вставьте любой поток мыслей
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Пример: Меня зовут Темур, живу в Ташкенте. Последние 3 года работал Frontend разработчиком в FinTech. Делал клиентский кабинет на Next.js, знаю React, Redux, Tailwind. До этого учился в TUIT..."
                className="w-full h-36 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-3.5 text-xs text-neutral-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-neutral-100 resize-none"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              {/* Кнопка записи голоса */}
              <button
                onClick={toggleSpeechRecognition}
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                {isListening ? 'Идет запись...' : 'Надиктовать'}
              </button>

              {/* Кнопка отправить в Gemini */}
              <button
                onClick={handleProcessDraft}
                disabled={isLoading || !text.trim()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Собираю резюме...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Заполнить резюме
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};