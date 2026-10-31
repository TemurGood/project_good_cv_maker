import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AuraCV — AI Resume & Portfolio Builder',
  description: 'Создай современное минималистичное резюме и портфолио с помощью Gemini AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}