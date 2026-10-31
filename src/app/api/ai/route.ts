// src/app/api/ai/route.ts
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API-ключ GEMINI_API_KEY не найден в .env.local' },
      { status: 500 }
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const { action, payload } = await req.json();

    let prompt = '';

    if (action === 'generate-bio') {
      prompt = `
      На основе следующей информации о кандидате напиши емкое, сильное и профессиональное резюме "О себе" (3-4 предложения) от первого лица.
      Имя: ${payload.fullName}
      Должность: ${payload.jobTitle}
      Опыт: ${JSON.stringify(payload.experience)}
      Навыки: ${JSON.stringify(payload.skills)}
      
      Верни ТОЛЬКО готовый текст без лишних пояснений.
      `;
    } else if (action === 'improve-experience') {
      prompt = `
      Перепиши описание опыта работы кандидата. Сделай его емким, сильным, добавь фокус на результат, метрики и ценность.
      Должность: ${payload.position}
      Компания: ${payload.company}
      Черновой текст: "${payload.text}"
      
      Верни ТОЛЬКО улучшенный текст.
      `;
    } else if (action === 'extract-skills') {
      prompt = `
      Выдели из опыта работы список релевантных навыков:
      Должность: ${payload.jobTitle}
      Опыт: ${JSON.stringify(payload.experience)}
      
      Верни СТРОГО валидный JSON (без \`\`\`json):
      {"hard": ["скилл 1", "скилл 2"], "soft": ["скилл 1", "скилл 2"]}
      `;
    } else if (action === 'parse-raw-draft') {
      prompt = `
      Ты — интеллектуальный ассистент Good CV. Пользователь предоставил сумбурный черновик (надиктованный или скопированный текст).
      Твоя задача — извлечь данные и вернуть их СТРОГО в виде JSON по следующей схеме (без \`\`\`json и пояснений):
      
      {
        "personal": {
          "fullName": "Имя Фамилия",
          "jobTitle": "Желаемая позиция",
          "email": "email если есть",
          "phone": "телефон если есть",
          "location": "город/страна если есть",
          "bio": "краткое связное описание на основе черновика"
        },
        "experience": [
          {
            "company": "Название компании",
            "position": "Должность",
            "startDate": "Год или период",
            "endDate": "Год или Наст. время",
            "isCurrent": false,
            "description": "Профессионально оформленный список обязанностей и достижений"
          }
        ],
        "education": [
          {
            "institution": "ВУЗ / курсы",
            "degree": "Специальность / Степень",
            "startDate": "Год",
            "endDate": "Год"
          }
        ],
        "skills": {
          "hard": ["навык1", "навык2"],
          "soft": ["навык1", "навык2"]
        }
      }

      Черновик пользователя:
      """${payload.draft}"""
      `;
    } else {
      return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 });
    }

    // Приоритетный список моделей (включая экспериментальные и стабильные варианты)
    const priorityModels = [
      'gemini-2.5-flash',
      'gemini-3.8-flash',
      'gemini-2.5-pro',
      'gemini-flash-latest',
    ];

    let output = '';
    let lastError = null;

    // Пробуем каждую модель, а при 503 делаем короткую паузу и пробуем снова
    for (const model of priorityModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
          });
          output = response.text?.trim() || '';
          if (output) break;
        } catch (err: any) {
          lastError = err;
          // Если 404 (модели нет), сразу переходим к следующей модели
          if (err?.status === 404 || err?.message?.includes('404')) {
            break;
          }
          // Если 503 (перегруз), ждем 1.5 секунды перед повтором
          if (err?.status === 503 && attempt === 1) {
            console.log(`[503] Модель ${model} занята, ждем 1.5 сек...`);
            await new Promise((r) => setTimeout(r, 1500));
          }
        }
      }
      if (output) {
        console.log(`Успешно сгенерировано моделью: ${model}`);
        break;
      }
    }

    if (!output) {
      throw lastError || new Error('Все модели Gemini временно недоступны');
    }

    // Обработка JSON-ответов
    if (action === 'extract-skills' || action === 'parse-raw-draft') {
      const cleaned = output.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({ result: parsed });
    }

    return NextResponse.json({ result: output });
  } catch (error: any) {
    console.error('Gemini Route Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Сервисы Gemini перегружены, повторите клик' },
      { status: 500 }
    );
  }
}