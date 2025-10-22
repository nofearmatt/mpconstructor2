# Changelog

Все важные изменения в проекте MPConstructor документируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

---

## [0.9.0] - 2024-10-22 - ТЕКУЩАЯ ВЕРСИЯ

### Added
- 🎯 **Google Analytics 4** (ID: G-M1TZ288T41)
  - Enhanced E-commerce tracking
  - Custom events для конверсий
  - Realtime monitoring
  - `components/analytics/GoogleAnalytics.tsx`
- 📊 **Яндекс.Метрика** (ID: 104777349)
  - WebVisor для записи сессий
  - Карта кликов
  - E-commerce tracking
  - Точный показатель отказов
  - `components/analytics/YandexMetrika.tsx`
- 📈 **Централизованное управление аналитикой**
  - `components/analytics/Analytics.tsx` - единый компонент
  - `lib/analytics/events.ts` - 15 функций отслеживания событий
  - `lib/analytics/ecommerce.ts` - 5 функций e-commerce
- 🎯 **Отслеживание конверсионной воронки**
  - `trackPackageSelect()` - выбор пакета
  - `trackConfiguratorStep()` - шаги конфигуратора
  - `trackFormStart()` - начало заполнения формы
  - `trackOrderSubmit()` - отправка заказа ⭐
  - `ecommercePurchase()` - покупка
- 📚 **Документация**
  - `ANALYTICS_SETUP.md` - полное руководство по аналитике (440 строк)
  - `.github/PROJECT_ISSUES.md` - GitHub Issues документация (600+ строк)
  - `CHANGELOG.md` - хронологическая история изменений

### Changed
- 🔄 Updated `app/layout.tsx` - добавлен `<Analytics />` компонент
- 🔄 Updated `components/configurator/Wizard.tsx` - интеграция tracking событий
- 🔄 Updated `components/configurator/PackageCard.tsx` - tracking выбора пакетов
- 🔄 Updated `.env.local` и `.env.example` - добавлены переменные аналитики

### Technical
- TypeScript global declarations для `window.ym` и `window.gtag`
- Development логи для отладки событий
- SSR-compatible интеграция через Next.js Script
- Non-blocking загрузка аналитических скриптов

---

## [0.8.0] - 2024-10-21

### Added
- 🔍 **SEO Optimization**
  - `components/SEO/JsonLd.tsx` - Schema.org разметка
  - `app/sitemap.ts` - динамический XML sitemap
  - `app/robots.ts` - robots.txt конфигурация
- 📱 **Schema.org микроразметка**
  - Organization schema
  - Service schema
  - BreadcrumbList schema
  - FAQ schema
- 🎨 **Open Graph & Twitter Cards**
  - Meta tags для социальных сетей
  - OG изображения
  - Twitter card метаданные

### Changed
- 🔄 Updated `app/layout.tsx` - SEO meta tags
- 🔄 Updated `app/page.tsx` - Schema.org разметка

---

## [0.7.0] - 2024-10-20

### Added
- 👤 **Личный кабинет пользователя**
  - `app/dashboard/page.tsx` - главная страница кабинета
  - Список заказов с детальной информацией
  - Статусы заказов с индикаторами
  - Кнопка "Посмотреть материалы"
- 📦 **Страница материалов**
  - `app/dashboard/materials/[orderId]/page.tsx`
  - Галерея материалов с preview
  - Скачивание отдельных файлов
  - Скачивание всех материалов одним ZIP архивом
  - Защищенный доступ только к своим заказам
- 🔐 **Система авторизации**
  - `app/auth/page.tsx` - страница входа
  - Вход по email + код из письма
  - `app/api/auth/send-code/route.ts` - отправка кода
  - `app/api/auth/verify-code/route.ts` - проверка кода
  - Сессионное хранилище пользователей

### Changed
- 🔄 Updated Header - кнопка "Личный кабинет"
- 🔄 Updated email templates - добавлен код авторизации

---

## [0.6.0] - 2024-10-19

### Added
- 📧 **Email-автоматизация через Resend**
  - `lib/email/templates.tsx` - 5 React email шаблонов
  - `lib/email/resend.ts` - клиент Resend
  - Письмо подтверждения заказа (клиенту)
  - Уведомление о новом заказе (админу)
  - Письмо о готовности материалов
  - Письмо о доставке
  - Письмо с кодом авторизации
- 👨‍💼 **Административная панель**
  - `app/admin/page.tsx` - список заказов
  - `app/admin/orders/[id]/page.tsx` - детали заказа
  - Простая аутентификация (ADMIN_PASSWORD)
  - Изменение статусов заказов
  - Редактирование информации о доставке

### Changed
- 🔄 Updated `app/api/orders/route.ts` - отправка писем
- 🔄 Updated `app/api/orders/[id]/route.ts` - обновление статусов

### Fixed
- 🐛 Исправлена типизация email компонентов

---

## [0.5.0] - 2024-10-18

### Added
- 💾 **Backend для заказов**
  - `lib/db/supabase.ts` - клиент Supabase
  - `lib/db/schema.sql` - SQL схема базы данных
  - PostgreSQL база через Supabase
  - Таблица `orders` с полями:
    - Конфигурация (category, modules, quantity)
    - Контактная информация
    - Способ доставки
    - Статус заказа (new, in_progress, ready, delivered)
    - Timestamps
- 🔌 **API маршруты**
  - `app/api/orders/route.ts` - POST создание заказа
  - `app/api/orders/[id]/route.ts` - GET/PATCH обновление заказа
  - `app/api/orders/[id]/status/route.ts` - обновление статуса
- ✅ **Валидация данных**
  - `lib/validators/order.ts` - Zod схемы
  - Server-side валидация
  - Client-side валидация

### Changed
- 🔄 Updated `components/configurator/Wizard.tsx` - интеграция с API
- 🔄 Updated OrderForm - отправка на backend

---

## [0.4.0] - 2024-10-17

### Added
- 📝 **Форма заказа (Шаг 4)**
  - `components/configurator/OrderForm.tsx`
  - React Hook Form + Zod валидация
  - Поля: имя, email, телефон, комментарий
  - Выбор способа доставки (СДЭК/Почта/Самовывоз)
  - Обработка ошибок валидации
- 🧮 **Калькулятор стоимости**
  - `components/configurator/PriceCalculator.tsx`
  - Live обновление цены
  - Итоговая стоимость с доставкой
  - Скидки на объем

### Changed
- 🔄 Updated `components/configurator/Wizard.tsx` - добавлен шаг 4

### Technical
- Zod для типобезопасной валидации
- React Hook Form для производительности
- TypeScript интерфейсы для форм

---

## [0.3.0] - 2024-10-16

### Added
- 🧙 **Wizard конфигуратора**
  - `components/configurator/Wizard.tsx` - 4 шага
  - Навигация между шагами
  - Валидация перед переходом
  - Progress indicator
- 📦 **Package Builder**
  - `components/configurator/PackageCard.tsx` - карточка пакета
  - 3 готовых пакета:
    - 🌱 Старт (12,000 ₽)
    - 🚀 Стандарт (25,000 ₽) - рекомендуемый
    - 💎 Максимум (50,000 ₽)
  - Список features с чекбоксами
  - Кнопка кастомизации
- 🎯 **Категории и модули**
  - `components/configurator/CategorySelector.tsx` - выбор категории
  - `components/configurator/ModuleSelector.tsx` - выбор модулей
  - `components/configurator/QuantitySelector.tsx` - количество товаров

### Changed
- 🔄 Updated все CTA кнопки - ведут на `/configurator`
- 🔄 Updated Header - активное состояние для /configurator

---

## [0.2.0] - 2024-10-15

### Added
- 🎨 **Дизайн-система и UI Kit**
  - `components/ui/Button.tsx` - 4 варианта кнопок
  - `components/ui/Card.tsx` - карточка с тенью
  - `components/ui/Badge.tsx` - бейджи и теги
  - `components/ui/Input.tsx` - текстовые поля
  - Tailwind CSS утилиты
  - Radix UI primitives
- 🏠 **Landing Page компоненты**
  - `components/Hero.tsx` - hero секция с видео
  - `components/Comparison.tsx` - "Старый мир vs Наш мир"
  - `components/HowItWorks.tsx` - "Как это работает" (3 шага)
  - `components/BeforeAfter.tsx` - галерея до/после
  - `components/Testimonials.tsx` - отзывы + статистика
  - `components/FAQ.tsx` - accordion с вопросами
  - `components/FinalCTA.tsx` - финальный призыв к действию
- 🎥 **Видео background**
  - Looped видео в Hero секции
  - Оптимизация для производительности

### Changed
- 🔄 Updated `app/page.tsx` - собран полный landing
- 🔄 Updated `app/globals.css` - кастомные Tailwind утилиты

### Fixed
- 🐛 Исправлена ошибка Next.js 14.2.0 на Windows с `next/font`
  - Обновление до Next.js 14.2.20
  - Webpack fallback для `node:os` в `next.config.mjs`

---

## [0.1.0] - 2024-10-14

### Added
- ⚡ **Инициализация проекта**
  - Next.js 14 App Router
  - TypeScript 5
  - Tailwind CSS 3
  - ESLint + Prettier
- 🏗️ **Базовая структура**
  - `app/layout.tsx` - корневой layout
  - `app/page.tsx` - главная страница
  - `components/Header.tsx` - навигация
  - `public/` - статические файлы
- 📦 **Зависимости**
  - React 18.3.1
  - Next.js 14.2.20
  - Tailwind CSS 3.4.1
  - Radix UI компоненты
  - Lucide React иконки
  - Zod для валидации
  - React Hook Form
  - Supabase клиент
  - Resend для email

### Technical
- TypeScript strict mode
- ESLint конфигурация
- Prettier форматирование
- Git инициализация

---

## Легенда

- ⚡ Инициализация
- 🎨 UI/UX
- 📝 Формы
- 💾 Backend
- 📧 Email
- 👨‍💼 Админка
- 👤 Личный кабинет
- 🔍 SEO
- 📊 Аналитика
- 🐛 Исправления
- 🔄 Обновления
- 📚 Документация

---

## [Unreleased] - Планируется

### Phase 6: Тестирование и запуск
- [ ] QA тестирование
- [ ] Beta-тест (10-20 пользователей)
- [ ] Soft launch
- [ ] Production мониторинг

---

**Версионирование:**
- **0.x.x** - Pre-release разработка MVP
- **1.0.0** - Production launch
- **1.x.x** - Post-launch улучшения

**Статус проекта:** ✅ Готов к тестированию (100% разработки, 28/28 задач)

**Следующая версия:** v1.0.0 (Production Launch после QA и Beta-теста)
