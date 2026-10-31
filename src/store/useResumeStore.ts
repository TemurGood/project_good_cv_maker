// src/store/useResumeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ResumeData,
  ExperienceItem,
  EducationItem,
  LanguageItem,
  TemplateId,
  ColorTheme,
} from '@/types/resume';

const initialResumeData: ResumeData = {
  personal: {
    fullName: 'Алексей Смирнов',
    jobTitle: 'Senior Frontend Engineer',
    email: 'alexey.smirnov@example.com',
    phone: '+7 (999) 000-00-00',
    telegram: '@alex_frontend',
    github: 'https://github.com',
    linkedin: '',
    website: 'https://alexey.design',
    birthDate: '1995-04-12',
    location: 'Ташкент, Узбекистан',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Фронтенд-разработчик с 6+ годами опыта создания высокопроизводительных веб-интерфейсов. Фокусируюсь на минималистичном дизайне, микроанимациях и масштабируемой архитектуре Next.js.',
  },
  experience: [
    {
      id: '1',
      company: 'FinTech Ecosystem',
      position: 'Lead Frontend Developer',
      startDate: '2022-01',
      endDate: '',
      isCurrent: true,
      description: 'Руководство командой из 5 инженеров. Перевел ядро приложения на Next.js App Router, сократив время первой отрисовки на 38%. Внедрил дизайн-систему с фокусом на доступность.',
    },
    {
      id: '2',
      company: 'Creative Studio',
      position: 'Frontend Developer',
      startDate: '2019-06',
      endDate: '2021-12',
      isCurrent: false,
      description: 'Разработка интерактивных промо-сайтов с 3D-анимациями (Three.js, GSAP). Запустил более 15 коммерческих проектов с наградами Awwwards.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Университет Информационных Технологий',
      degree: 'Информатика и программная инженерия (Бакалавр)',
      startDate: '2013',
      endDate: '2017',
    },
  ],
  skills: {
    hard: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Node.js', 'Docker'],
    soft: ['Team Leadership', 'Product Thinking', 'Code Review', 'Agile/Scrum'],
  },
  languages: [
    { id: '1', language: 'Русский', level: 'Родной' },
    { id: '2', language: 'Английский', level: 'C1 (Advanced)' },
  ],
  settings: {
    template: 'minimal-clean',
    colorTheme: 'ocean-blue',
    isDarkMode: false,
  },
};

interface ResumeStore {
  data: ResumeData;
  updatePersonal: (fields: Partial<ResumeData['personal']>) => void;
  // Опыт работы
  addExperience: () => void;
  updateExperience: (id: string, fields: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  // Образование
  addEducation: () => void;
  updateEducation: (id: string, fields: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  // Навыки
  setSkills: (skills: { hard: string[]; soft: string[] }) => void;
  // Языки
  addLanguage: () => void;
  updateLanguage: (id: string, fields: Partial<LanguageItem>) => void;
  deleteLanguage: (id: string) => void;
  // Настройки
  setTemplate: (template: TemplateId) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleDarkMode: () => void;
  // Умный ассистент и сброс
  mergeFromDraft: (draftData: any) => void;
  resetToDefault: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialResumeData,

      updatePersonal: (fields) =>
        set((state) => ({
          data: { ...state.data, personal: { ...state.data.personal, ...fields } },
        })),

      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              {
                id: crypto.randomUUID(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                isCurrent: false,
                description: '',
              },
              ...state.data.experience,
            ],
          },
        })),

      updateExperience: (id, fields) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((item) =>
              item.id === id ? { ...item, ...fields } : item
            ),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((item) => item.id !== id),
          },
        })),

      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              {
                id: crypto.randomUUID(),
                institution: '',
                degree: '',
                startDate: '',
                endDate: '',
              },
              ...state.data.education,
            ],
          },
        })),

      updateEducation: (id, fields) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((item) =>
              item.id === id ? { ...item, ...fields } : item
            ),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((item) => item.id !== id),
          },
        })),

      setSkills: (skills) =>
        set((state) => ({
          data: { ...state.data, skills },
        })),

      addLanguage: () =>
        set((state) => ({
          data: {
            ...state.data,
            languages: [
              ...state.data.languages,
              { id: crypto.randomUUID(), language: '', level: 'Intermediate' },
            ],
          },
        })),

      updateLanguage: (id, fields) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.map((item) =>
              item.id === id ? { ...item, ...fields } : item
            ),
          },
        })),

      deleteLanguage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.filter((item) => item.id !== id),
          },
        })),

      setTemplate: (template) =>
        set((state) => ({
          data: { ...state.data, settings: { ...state.data.settings, template } },
        })),

      setColorTheme: (colorTheme) =>
        set((state) => ({
          data: { ...state.data, settings: { ...state.data.settings, colorTheme } },
        })),

      toggleDarkMode: () =>
        set((state) => ({
          data: {
            ...state.data,
            settings: {
              ...state.data.settings,
              isDarkMode: !state.data.settings.isDarkMode,
            },
          },
        })),

      // Функция автозаполнения из умного черновика Gemini
      mergeFromDraft: (draftData) =>
        set((state) => ({
          data: {
            ...state.data,
            personal: {
              ...state.data.personal,
              ...(draftData.personal || {}),
            },
            experience: draftData.experience?.length
              ? draftData.experience.map((e: any) => ({
                  id: crypto.randomUUID(),
                  company: e.company || '',
                  position: e.position || '',
                  startDate: e.startDate || '',
                  endDate: e.endDate || '',
                  isCurrent: Boolean(e.isCurrent),
                  description: e.description || '',
                }))
              : state.data.experience,
            education: draftData.education?.length
              ? draftData.education.map((ed: any) => ({
                  id: crypto.randomUUID(),
                  institution: ed.institution || '',
                  degree: ed.degree || '',
                  startDate: ed.startDate || '',
                  endDate: ed.endDate || '',
                }))
              : state.data.education,
            skills: {
              hard: draftData.skills?.hard?.length ? draftData.skills.hard : state.data.skills.hard,
              soft: draftData.skills?.soft?.length ? draftData.skills.soft : state.data.skills.soft,
            },
          },
        })),

      resetToDefault: () => set({ data: initialResumeData }),
    }),
    {
      name: 'good-cv-storage',
    }
  )
);