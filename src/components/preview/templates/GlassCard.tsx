// src/components/preview/templates/GlassCard.tsx
import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Send, Globe, Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';

export const GlassCard: React.FC<{ data: ResumeData; accentColor: string }> = ({
  data,
  accentColor,
}) => {
  const { personal, experience, education, skills, languages } = data;

  return (
    <div className="min-h-full bg-neutral-50/80 p-8 sm:p-12 text-neutral-800 font-sans space-y-6">
      {/* Верхняя визитка-карточка */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        {personal.avatarUrl && (
          <img
            src={personal.avatarUrl}
            alt={personal.fullName}
            className="w-28 h-28 rounded-3xl object-cover shadow-md ring-2 ring-white"
          />
        )}
        <div className="flex-1">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white inline-block mb-2"
            style={{ backgroundColor: accentColor }}
          >
            {personal.jobTitle || 'Специалист'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            {personal.fullName}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-xl">{personal.bio}</p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mt-4 text-xs text-neutral-500">
            {personal.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {personal.phone}
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {personal.location}
              </span>
            )}
            {personal.telegram && (
              <span className="flex items-center gap-1">
                <Send className="w-3.5 h-3.5" /> {personal.telegram}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Опыт работы */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
            <Briefcase className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-neutral-900">Опыт работы</h2>
        </div>

        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id} className="relative pl-6 border-l-2 border-neutral-200">
              <span
                className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-white ring-2"
                style={{ borderColor: accentColor }}
              />
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold text-neutral-900">{exp.position}</h3>
                <span className="text-xs text-neutral-400">
                  {exp.startDate} — {exp.isCurrent ? 'Сейчас' : exp.endDate}
                </span>
              </div>
              <div className="text-xs font-semibold mb-2" style={{ color: accentColor }}>
                {exp.company}
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Сетка Навыки + Образование */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Навыки */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
                <Award className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-neutral-900">Ключевые навыки</h2>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {skills.hard.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-medium text-white shadow-xs"
                  style={{ backgroundColor: accentColor }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {languages.length > 0 && (
            <div className="pt-4 border-t border-neutral-100">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                Языки
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {languages.map((l) => (
                  <span key={l.id} className="bg-neutral-100 px-2.5 py-1 rounded-lg text-neutral-700">
                    <strong>{l.language}:</strong> {l.level}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Образование */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-neutral-900">Образование</h2>
          </div>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="font-bold text-neutral-900 text-sm">{edu.institution}</div>
                <div className="text-neutral-600 mt-0.5">{edu.degree}</div>
                <div className="text-neutral-400 mt-1">
                  {edu.startDate} — {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};