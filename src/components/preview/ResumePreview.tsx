// src/components/preview/ResumePreview.tsx
'use client';

import React, { useRef, useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { MinimalClean } from './templates/MinimalClean';
import { GlassCard } from './templates/GlassCard';
import { SidebarModern } from './templates/SidebarModern';
import { Printer, Layout, Monitor, FileText } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { TemplateId } from '@/types/resume';

const COLOR_MAP = {
  'ocean-blue': '#0071e3',
  'graphite': '#2d3436',
  'emerald': '#059669',
  'sunset-amber': '#d97706',
};

const TEMPLATE_NAMES: Record<TemplateId, string> = {
  'minimal-clean': 'Minimal',
  'glass-card': 'Glass Card',
  'sidebar-modern': 'Sidebar',
};

export const ResumePreview: React.FC = () => {
  const { data, setColorTheme, setTemplate } = useResumeStore();
  const [viewMode, setViewMode] = useState<'a4' | 'portfolio'>('a4');
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${data.personal.fullName || 'Resume'}_GoodCV`,
  });

  const activeColor = COLOR_MAP[data.settings.colorTheme] || '#0071e3';

  // Рендер выбранного шаблона
  const renderTemplate = () => {
    switch (data.settings.template) {
      case 'glass-card':
        return <GlassCard data={data} accentColor={activeColor} />;
      case 'sidebar-modern':
        return <SidebarModern data={data} accentColor={activeColor} />;
      case 'minimal-clean':
      default:
        return <MinimalClean data={data} accentColor={activeColor} />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Верхняя панель настроек превью */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200/80 bg-white/70 p-3 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/60 no-print">
        {/* Выбор шаблона */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
          {(Object.keys(TEMPLATE_NAMES) as TemplateId[]).map((tId) => (
            <button
              key={tId}
              onClick={() => setTemplate(tId)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                data.settings.template === tId
                  ? 'bg-white shadow-xs text-neutral-900 dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {TEMPLATE_NAMES[tId]}
            </button>
          ))}
        </div>

        {/* Выбор цвета и режим отображения */}
        <div className="flex items-center gap-4">
          {/* Палитра */}
          <div className="flex items-center gap-1.5">
            {(Object.keys(COLOR_MAP) as Array<keyof typeof COLOR_MAP>).map((key) => (
              <button
                key={key}
                onClick={() => setColorTheme(key)}
                style={{ backgroundColor: COLOR_MAP[key] }}
                className={`w-4 h-4 rounded-full transition-transform ${
                  data.settings.colorTheme === key ? 'scale-125 ring-2 ring-neutral-400' : 'hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Режим A4 / Web Portfolio */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('a4')}
              title="Формат A4 (Печать)"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'a4'
                  ? 'bg-white shadow-xs text-neutral-900 dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-500'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('portfolio')}
              title="Мини-сайт портфолио"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'portfolio'
                  ? 'bg-white shadow-xs text-neutral-900 dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-500'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Экспорт */}
          <button
            onClick={() => handlePrint()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-neutral-800 transition-all dark:bg-white dark:text-neutral-900"
          >
            <Printer className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>
      </div>

      {/* Оболочка документа */}
      <div className="overflow-x-auto rounded-3xl border border-neutral-200/60 bg-neutral-100/60 p-2 sm:p-6 shadow-inner dark:border-neutral-800 dark:bg-neutral-950 flex justify-center">
        <div
          ref={printRef}
          className={`w-full bg-white transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden print:m-0 print:shadow-none print:w-full print:rounded-none ${
            viewMode === 'a4'
              ? 'max-w-[800px] min-h-[1050px]'
              : 'max-w-4xl min-h-[600px] border border-neutral-200'
          }`}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};