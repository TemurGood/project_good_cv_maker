// src/components/preview/templates/SidebarModern.tsx
import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Send, Globe, Calendar } from 'lucide-react';

export const SidebarModern: React.FC<{ data: ResumeData; accentColor: string }> = ({
  data,
  accentColor,
}) => {
  const { personal, experience, education, skills, languages } = data;

  return (
    <div className="min-h-full grid grid-cols-1 sm:grid-cols-12 bg-white text-neutral-800 font-sans">
      {/* Левая боковая панель (4 из 12 колонок) */}
      <aside className="sm:col-span-4 bg-neutral-900 text-neutral-200 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {personal.avatarUrl && (
            <img
              src={personal.avatarUrl}
              alt={personal.fullName}
              className="w-28 h-28 rounded-2xl object-cover mb-6 ring-2 ring-white/10"
            />
          )}

          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4 border-b border-neutral-800 pb-2">
            Контакты
          </h2>
          <div className="space-y-3 text-xs text-neutral-300 mb-8">
            {personal.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="truncate">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.telegram && (
              <div className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{personal.telegram}</span>
              </div>
            )}
          </div>

          {/* Hard Skills */}
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 border-b border-neutral-800 pb-2">
            Hard Skills
          </h2>
          <div className="flex flex-wrap gap-1.5 mb-8">
            {skills.hard.map((s, i) => (
              <span
                key={i}
                className="bg-neutral-800 border border-neutral-700/60 rounded-md px-2 py-0.5 text-[11px] text-neutral-200"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Языки */}
          {languages.length > 0 && (
            <>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 border-b border-neutral-800 pb-2">
                Языки
              </h2>
              <div className="space-y-1.5 text-xs text-neutral-300">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="text-neutral-400">{l.level}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Правая основная часть (8 из 12 колонок) */}
      <main className="sm:col-span-8 p-6 sm:p-10 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            {personal.fullName}
          </h1>
          <p className="text-base font-semibold mt-1" style={{ color: accentColor }}>
            {personal.jobTitle}
          </p>
          {personal.bio && (
            <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {personal.bio}
            </p>
          )}
        </div>

        {/* Опыт работы */}
        <div className="border-t border-neutral-100 pt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
            Опыт работы
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-neutral-900">{exp.position}</h3>
                  <span className="text-xs text-neutral-400">
                    {exp.startDate} — {exp.isCurrent ? 'Наст. время' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold mb-1.5" style={{ color: accentColor }}>
                  {exp.company}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Образование */}
        {education.length > 0 && (
          <div className="border-t border-neutral-100 pt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Образование
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-neutral-900">{edu.institution}</div>
                  <div className="text-neutral-500">{edu.degree}</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};