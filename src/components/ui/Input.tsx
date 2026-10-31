// src/components/ui/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </label>
      <input
        className={`w-full rounded-xl border border-neutral-200/80 bg-white/50 px-3.5 py-2 text-sm text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus:bg-neutral-900 dark:focus:ring-white/10 ${className}`}
        {...props}
      />
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </label>
      <textarea
        rows={3}
        className={`w-full rounded-xl border border-neutral-200/80 bg-white/50 px-3.5 py-2 text-sm text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus:bg-neutral-900 dark:focus:ring-white/10 resize-y ${className}`}
        {...props}
      />
    </div>
  );
};