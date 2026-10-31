// src/components/editor/ResumeEditor.tsx
'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Input, Textarea } from '@/components/ui/Input';
import { Sparkles, Plus, Trash2, Loader2 } from 'lucide-react';

export const ResumeEditor: React.FC = () => {
  const {
    data,
    updatePersonal,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    setSkills,
    addLanguage,
    updateLanguage,
    deleteLanguage,
  } = useResumeStore();

  const [loadingBio, setLoadingBio] = useState(false);
  const [loadingExpId, setLoadingExpId] = useState<string | null>(null);
  const [loadingSkills, setLoadingSkills] = useState(false);

  // Gemini: Генерация "О себе"
  const handleGenerateBio = async () => {
    try {
      setLoadingBio(true);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-bio',
          payload: {
            fullName: data.personal.fullName,
            jobTitle: data.personal.jobTitle,
            experience: data.experience,
            skills: data.skills,
          },
        }),
      });
      const result = await res.json();
      if (result.result) {
        updatePersonal({ bio: result.result });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingBio(false);
    }
  };

  // Gemini: Улучшение опыта
  const handleImproveExperience = async (id: string, text: string, position: string, company: string) => {
    if (!text.trim()) return;
    try {
      setLoadingExpId(id);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'improve-experience',
          payload: { text, position, company },
        }),
      });
      const result = await res.json();
      if (result.result) {
        updateExperience(id, { description: result.result });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingExpId(null);
    }
  };

  // Gemini: Выделение ключевых навыков
  const handleExtractSkills = async () => {
    try {
      setLoadingSkills(true);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'extract-skills',
          payload: {
            jobTitle: data.personal.jobTitle,
            experience: data.experience,
          },
        }),
      });
      const result = await res.json();
      if (result.result?.hard) {
        setSkills(result.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSkills(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* 1. Личные данные */}
      <section className="rounded-3xl border border-neutral-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/60">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white mb-4">
          Личная информация
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Полное имя"
            value={data.personal.fullName}
            onChange={(e) => updatePersonal({ fullName: e.target.value })}
            placeholder="Иван Иванов"
          />
          <Input
            label="Желаемая должность"
            value={data.personal.jobTitle}
            onChange={(e) => updatePersonal({ jobTitle: e.target.value })}
            placeholder="Frontend Developer"
          />
          <Input
            label="Email"
            type="email"
            value={data.personal.email}
            onChange={(e) => updatePersonal({ email: e.target.value })}
          />
          <Input
            label="Телефон"
            value={data.personal.phone}
            onChange={(e) => updatePersonal({ phone: e.target.value })}
          />
          <Input
            label="Город, Страна"
            value={data.personal.location}
            onChange={(e) => updatePersonal({ location: e.target.value })}
          />
          <Input
            label="Дата рождения"
            type="date"
            value={data.personal.birthDate || ''}
            onChange={(e) => updatePersonal({ birthDate: e.target.value })}
          />
          <Input
            label="Telegram"
            value={data.personal.telegram || ''}
            onChange={(e) => updatePersonal({ telegram: e.target.value })}
          />
          <Input
            label="GitHub / Портфолио URL"
            value={data.personal.github || ''}
            onChange={(e) => updatePersonal({ github: e.target.value })}
          />
          <div className="md:col-span-2">
            <Input
              label="Ссылка на аватар (URL)"
              value={data.personal.avatarUrl || ''}
              onChange={(e) => updatePersonal({ avatarUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Gemini Bio */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              О себе (Bio)
            </label>
            <button
              onClick={handleGenerateBio}
              disabled={loadingBio}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors disabled:opacity-50"
            >
              {loadingBio ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              Сгенерировать с Gemini
            </button>
          </div>
          <Textarea
            label=""
            rows={4}
            value={data.personal.bio}
            onChange={(e) => updatePersonal({ bio: e.target.value })}
            placeholder="Расскажите о своем ключевом опыте..."
          />
        </div>
      </section>

      {/* 2. Опыт работы */}
      <section className="rounded-3xl border border-neutral-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Опыт работы
          </h2>
          <button
            onClick={addExperience}
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
          >
            <Plus className="w-3.5 h-3.5" /> Добавить
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {data.experience.map((exp) => (
            <div
              key={exp.id}
              className="relative rounded-2xl border border-neutral-200/60 bg-white/40 p-4 dark:border-neutral-800 dark:bg-neutral-900/40"
            >
              <button
                onClick={() => deleteExperience(exp.id)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 pr-8">
                <Input
                  label="Компания"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                />
                <Input
                  label="Должность"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                />
                <Input
                  label="Период (Начало)"
                  value={exp.startDate}
                  placeholder="2021-01"
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                />
                <Input
                  label="Период (Окончание)"
                  value={exp.endDate}
                  placeholder="По настоящее время"
                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    Обязанности и достижения
                  </label>
                  <button
                    onClick={() => handleImproveExperience(exp.id, exp.description, exp.position, exp.company)}
                    disabled={loadingExpId === exp.id}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 disabled:opacity-50"
                  >
                    {loadingExpId === exp.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    Улучшить с Gemini
                  </button>
                </div>
                <Textarea
                  label=""
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="Опишите, что делали и какие результаты получили..."
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Навыки */}
      <section className="rounded-3xl border border-neutral-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Навыки (Skills)
          </h2>
          <button
            onClick={handleExtractSkills}
            disabled={loadingSkills}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 disabled:opacity-50"
          >
            {loadingSkills ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            Подобрать навыки по опыту
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5 block">
              Hard Skills (через запятую)
            </label>
            <input
              className="w-full rounded-xl border border-neutral-200/80 bg-white/50 px-3.5 py-2 text-sm text-neutral-900 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100"
              value={data.skills.hard.join(', ')}
              onChange={(e) =>
                setSkills({
                  ...data.skills,
                  hard: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5 block">
              Soft Skills (через запятую)
            </label>
            <input
              className="w-full rounded-xl border border-neutral-200/80 bg-white/50 px-3.5 py-2 text-sm text-neutral-900 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100"
              value={data.skills.soft.join(', ')}
              onChange={(e) =>
                setSkills({
                  ...data.skills,
                  soft: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
            />
          </div>
        </div>
      </section>

      {/* 4. Образование */}
      <section className="rounded-3xl border border-neutral-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Образование
          </h2>
          <button
            onClick={addEducation}
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
          >
            <Plus className="w-3.5 h-3.5" /> Добавить
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {data.education.map((edu) => (
            <div
              key={edu.id}
              className="relative rounded-2xl border border-neutral-200/60 bg-white/40 p-4 dark:border-neutral-800 dark:bg-neutral-900/40"
            >
              <button
                onClick={() => deleteEducation(edu.id)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                <Input
                  label="Учебное заведение"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                />
                <Input
                  label="Специальность / Степень"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                />
                <Input
                  label="Год начала"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                />
                <Input
                  label="Год окончания"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Языки */}
      <section className="rounded-3xl border border-neutral-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Языки
          </h2>
          <button
            onClick={addLanguage}
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
          >
            <Plus className="w-3.5 h-3.5" /> Добавить
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.languages.map((lang) => (
            <div
              key={lang.id}
              className="flex items-center gap-2 rounded-2xl border border-neutral-200/60 bg-white/40 p-3 dark:border-neutral-800 dark:bg-neutral-900/40"
            >
              <input
                className="w-1/2 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                placeholder="Язык"
                value={lang.language}
                onChange={(e) => updateLanguage(lang.id, { language: e.target.value })}
              />
              <input
                className="w-1/2 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                placeholder="Уровень"
                value={lang.level}
                onChange={(e) => updateLanguage(lang.id, { level: e.target.value })}
              />
              <button
                onClick={() => deleteLanguage(lang.id)}
                className="text-neutral-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};