// src/components/preview/templates/MinimalClean.tsx
import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Send, Globe, Calendar } from 'lucide-react';

export const MinimalClean: React.FC<{ data: ResumeData; accentColor: string }> = ({
  data,
  accentColor,
}) => {
  const { personal, experience, education, skills, languages } = data;

  return (
    <div className="min-h-full bg-white p-8 sm:p-12 text-neutral-800 font-sans leading-relaxed">
      {/* Шапка */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-neutral-100 pb-8">
        {personal.avatarUrl && (
          <img
            src={personal.avatarUrl}
            alt={personal.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-sm ring-1 ring-neutral-200/50"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            {personal.fullName}
          </h1>
          <p className="text-lg font-medium mt-1" style={{ color: accentColor }}>
            {personal.jobTitle}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-neutral-500">
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
            {personal.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> {personal.website}
              </span>
            )}
            {personal.birthDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {personal.birthDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* О себе */}
      {personal.bio && (
        <div className="mt-6 border-b border-neutral-100 pb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            О себе
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{personal.bio}</p>
        </div>
      )}

      {/* Опыт работы */}
      {experience.length > 0 && (
        <div className="mt-6 border-b border-neutral-100 pb-6">
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
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Навыки */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Навыки
          </h2>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skills.hard.map((skill, i) => (
              <span
                key={i}
                className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700"
              >
                {skill}
              </span>
            ))}
          </div>
          {skills.soft.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {skills.soft.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Образование и языки */}
        <div className="space-y-5">
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Образование
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-semibold text-neutral-900">{edu.institution}</div>
                  <div className="text-neutral-500">{edu.degree}</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Языки
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600">
                {languages.map((l) => (
                  <span key={l.id}>
                    <strong className="text-neutral-800">{l.language}:</strong> {l.level}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};