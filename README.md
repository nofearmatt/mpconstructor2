# MPConstructor - Контент-студия для маркетплейсов

> ✅ **Статус:** Готов к тестированию (100% разработки, 28/28 задач)
> 🚀 **Версия:** v0.9.0 (MVP)
> 🎯 **Цель:** Конверсия 30%+ для селлеров WB/Ozon

Полнофункциональная платформа для создания профессионального контента для маркетплейсов с интерактивным конфигуратором, системой заказов и личным кабинетом.

---

## 🚀 Быстрый старт

```bash
# Клонировать репозиторий
git clone https://github.com/nofearmatt/mpconstructor2.git
cd mpconstructor2

# Установка зависимостей
npm install

# Настроить переменные окружения
cp .env.example .env.local
# Отредактировать .env.local с вашими credentials

# Запуск dev сервера
npm run dev

# Открыть http://localhost:3004
```

## 📋 Технологический стек

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

### Backend
- **Database:** PostgreSQL (Supabase)
- **Email:** Resend API
- **Authentication:** Magic Link (Email codes)

### Analytics & SEO
- **Analytics:** Яндекс.Метрика + Google Analytics 4
- **SEO:** Schema.org, Sitemap, Robots.txt
- **Meta:** Open Graph, Twitter Cards

## 📁 Структура проекта

```
mpconstructor2/
├── app/                                  # Next.js App Router
│   ├── page.tsx                         # Landing page
│   ├── configurator/page.tsx            # Wizard конфигуратора
│   ├── dashboard/page.tsx               # Личный кабинет
│   ├── materials/[orderId]/page.tsx     # Страница материалов
│   ├── admin/page.tsx                   # Админ-панель
│   ├── api/                             # API Routes
│   │   ├── orders/route.ts              # CRUD заказов
│   │   ├── admin/                       # Admin endpoints
│   │   └── materials/                   # Materials endpoints
│   ├── layout.tsx                       # Root layout
│   ├── sitemap.ts                       # Dynamic sitemap
│   └── robots.ts                        # Robots.txt
├── components/
│   ├── sections/                        # Landing sections
│   │   ├── HeroSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── configurator/                    # Configurator components
│   │   ├── Wizard.tsx                   # 4-step wizard
│   │   ├── PackageCard.tsx              # Package selection
│   │   └── PriceCalculator.tsx          # Live price calculator
│   ├── order/
│   │   └── OrderForm.tsx                # Order form (React Hook Form + Zod)
│   ├── analytics/                       # Analytics integration
│   │   ├── Analytics.tsx                # Central component
│   │   ├── YandexMetrika.tsx            # YM tracker
│   │   └── GoogleAnalytics.tsx          # GA4 tracker
│   ├── seo/
│   │   └── JsonLd.tsx                   # Schema.org components
│   └── ui/                              # Reusable UI components
│       └── Button.tsx
├── lib/
│   ├── analytics/                       # Analytics utilities
│   │   ├── events.ts                    # 15 tracking functions
│   │   └── ecommerce.ts                 # E-commerce tracking
│   ├── email/                           # Email system
│   │   ├── templates.ts                 # 5 email templates
│   │   └── sender.ts                    # Resend integration
│   ├── seo/                             # SEO utilities
│   │   ├── metadata.ts
│   │   └── schemas.ts
│   ├── validations/
│   │   └── order.ts                     # Zod schemas
│   └── types/                           # TypeScript types
├── .github/
│   └── PROJECT_ISSUES.md                # GitHub Issues documentation
├── docs/                                # Project documentation (20 artifacts)
├── ANALYTICS_SETUP.md                   # Analytics guide
├── SEO_SETUP.md                         # SEO guide
├── EMAIL_SETUP.md                       # Email automation guide
├── SUPABASE_SETUP.md                    # Database setup guide
├── CHANGELOG.md                         # Version history
└── README.md
```

## ✨ Основные фичи

### 🏠 Landing Page
- Hero с видео background
- "Старый мир vs Наш мир" сравнение
- "Как это работает" (3 шага)
- Галерея "До/После"
- Отзывы + статистика
- FAQ accordion
- CTA секции

### 🛠️ Конфигуратор
- **Package Builder:** 3 готовых пакета (Старт/Стандарт/Максимум)
- **4-шаговый Wizard:**
  1. Выбор категории (Детская одежда, Техника, и т.д.)
  2. Выбор модулей контента (Фото, Видео, Инфографика, и т.д.)
  3. Количество товаров
  4. Форма заказа с валидацией
- **Live калькулятор** стоимости
- Tracking всех событий (YM + GA4)

### 💾 Backend
- **PostgreSQL** через Supabase
- **REST API** для заказов
- **5 Email шаблонов** (Resend):
  - Подтверждение заказа
  - Уведомление админу
  - Готовность материалов
  - Доставка
  - Код авторизации

### 👤 Личный кабинет
- Авторизация по email (Magic Link)
- Список заказов
- Просмотр материалов
- Скачивание файлов (отдельно + ZIP архив)

### 👨‍💼 Админ-панель
- Простая аутентификация (password-based)
- Dashboard с метриками
- Управление заказами
- Изменение статусов
- Редактирование информации о доставке

### 🔍 SEO & Analytics
- **Schema.org разметка:** Organization, Service, FAQ
- **Meta tags:** Open Graph, Twitter Cards
- **Динамический Sitemap.xml**
- **Robots.txt**
- **Яндекс.Метрика** (104777349)
  - WebVisor
  - Карта кликов
  - E-commerce tracking
- **Google Analytics 4** (G-M1TZ288T41)
  - Enhanced E-commerce
  - Custom events
  - Conversion tracking

## 🎯 Ключевые метрики

- **Целевая конверсия:** 30%
- **Time on page:** > 3 минуты
- **Bounce rate:** < 40%
- **LCP:** < 2.5 секунд

## 📊 Прогресс разработки

### ✅ Фаза 1: Landing Page (100%)
- ✅ Next.js 14 + TypeScript setup
- ✅ Дизайн-система и UI Kit
- ✅ 6 секций landing page
- ✅ Hero с video background
- ✅ FAQ accordion

### ✅ Фаза 2: Конфигуратор (100%)
- ✅ Страница /configurator
- ✅ 3 готовых пакета
- ✅ 4-шаговый Wizard
- ✅ Live калькулятор
- ✅ Интеграция с CTA

### ✅ Фаза 3: Backend & Email (100%)
- ✅ Форма заказа (React Hook Form + Zod)
- ✅ API endpoints (PostgreSQL + Supabase)
- ✅ Email автоматизация (Resend)
- ✅ Админ-панель

### ✅ Фаза 4: Личный кабинет (100%)
- ✅ Авторизация (Magic Link)
- ✅ Dashboard с заказами
- ✅ Страница материалов
- ✅ Скачивание файлов

### ✅ Фаза 5: SEO & Analytics (100%)
- ✅ Meta tags + SEO
- ✅ Schema.org разметка
- ✅ Sitemap + Robots.txt
- ✅ Яндекс.Метрика + Google Analytics 4

### 📋 Фаза 6: Тестирование (0%)
- ⏳ QA тестирование
- ⏳ Beta-тест (10-20 пользователей)
- ⏳ Soft launch

## 📚 Документация

- **[ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md)** - Настройка аналитики (680 строк)
- **[SEO_SETUP.md](./SEO_SETUP.md)** - SEO оптимизация
- **[EMAIL_SETUP.md](./EMAIL_SETUP.md)** - Email автоматизация
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - База данных
- **[CHANGELOG.md](./CHANGELOG.md)** - История версий
- **[.github/PROJECT_ISSUES.md](./.github/PROJECT_ISSUES.md)** - GitHub Issues (600+ строк)

## 🤝 Вклад в проект

```bash
# Создать новую ветку
git checkout -b feature/your-feature

# Внести изменения и закоммитить
git add .
git commit -m "feat: описание изменений"

# Запушить
git push origin feature/your-feature

# Создать Pull Request
```

## 📞 Контакты

**GitHub:** https://github.com/nofearmatt/mpconstructor2
**Версия:** v0.9.0 (MVP)
**Статус:** ✅ Готов к тестированию

---

🤖 Разработано с помощью Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
