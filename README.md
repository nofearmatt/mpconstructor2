# MPConstructor - Платформа для создания контента для маркетплейсов

Продающий сайт с конверсией 30%+ для селлеров WB/Ozon.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Открыть http://localhost:3000
```

## 📋 Технологический стек

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Структура проекта

```
mpconstructor2/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Главная страница
│   └── globals.css          # Глобальные стили
├── components/
│   ├── sections/            # Секции главной страницы
│   │   ├── HeroSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   └── ui/                  # Переиспользуемые UI компоненты
│       └── Button.tsx
├── lib/
│   └── utils.ts             # Утилиты
└── public/                  # Статические файлы

```

## 🎯 Ключевые метрики

- **Целевая конверсия**: 30%
- **Time on page**: > 3 минуты
- **Bounce rate**: < 40%
- **LCP**: < 2.5 секунд

## 📦 Следующие шаги

### Фаза 1 ✅ (Завершена)
- ✅ Настройка Next.js 14 + TypeScript
- ✅ Дизайн-система и UI Kit
- ✅ Hero Section

### Фаза 1 🔄 (В процессе)
- 🔄 Блок "Старый мир vs Наш мир"
- ⏳ Блок "Как это работает"
- ⏳ Галерея "До/После"
- ⏳ Отзывы и статистика
- ⏳ CTA + FAQ

### Фаза 2 (Конфигуратор)
- Package Builder
- Wizard
- Live-калькулятор

### Фаза 3 (Backend)
- Форма заказа
- API + БД
- Email-автоматизация

## 🤝 Контакты

Проект разработан на основе глубокого анализа 4 агентов-экспертов:
- Business Analyst
- UX Designer
- Backend Architect
- SEO Specialist
