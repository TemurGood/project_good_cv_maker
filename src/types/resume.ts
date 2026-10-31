// src/types/resume.ts

export type TemplateId = 'minimal-clean' | 'glass-card' | 'sidebar-modern';
export type ColorTheme = 'ocean-blue' | 'graphite' | 'emerald' | 'sunset-amber';

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string;
}

export interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    telegram?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    birthDate?: string;
    location: string;
    avatarUrl?: string;
    bio: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: {
    hard: string[];
    soft: string[];
  };
  languages: LanguageItem[];
  settings: {
    template: TemplateId;
    colorTheme: ColorTheme;
    isDarkMode: boolean;
  };
}