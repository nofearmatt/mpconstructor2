# SEO Оптимизация MPConstructor

Полная документация по SEO инфраструктуре проекта.

## 📋 Содержание

- [Обзор](#обзор)
- [Структура файлов](#структура-файлов)
- [Meta Tags](#meta-tags)
- [Schema.org разметка](#schemaorg-разметка)
- [Sitemap и Robots](#sitemap-и-robots)
- [Тестирование](#тестирование)
- [Чеклист перед запуском](#чеклист-перед-запуском)

---

## 🎯 Обзор

Реализована комплексная SEO оптимизация для максимальной видимости в поисковых системах:

✅ **Meta Tags**: Полный набор тегов для Google, Яндекс, социальных сетей
✅ **Schema.org**: Структурированные данные (Organization, Service, FAQ, Breadcrumbs)
✅ **Sitemap.xml**: Автоматическая генерация карты сайта
✅ **Robots.txt**: Управление индексацией
✅ **Open Graph**: Оптимизация для соцсетей (VK, Telegram, Facebook)
✅ **Twitter Cards**: Rich-preview в Twitter

---

## 📁 Структура файлов

```
lib/seo/
├── metadata.ts          # Централизованная SEO конфигурация
└── schemas.ts           # Schema.org функции

components/seo/
└── JsonLd.tsx          # Компонент для внедрения JSON-LD

app/
├── layout.tsx          # Глобальные meta tags + схемы
├── page.tsx            # FAQ schema для главной
├── configurator/
│   └── page.tsx        # Breadcrumbs для конфигуратора
├── sitemap.ts          # Автогенерация sitemap.xml
└── robots.ts           # Автогенерация robots.txt
```

---

## 🏷️ Meta Tags

### Глобальные теги (все страницы)

```typescript
// app/layout.tsx
import { DEFAULT_METADATA } from '@/lib/seo/metadata'

export const metadata: Metadata = DEFAULT_METADATA
```

**Включает:**
- Title + Description
- Keywords (10+ ключевых слов)
- Open Graph (изображение 1200x630)
- Twitter Card
- Canonical URL
- Robots directives
- Google/Yandex verification codes

### Теги для конкретной страницы

```typescript
// app/configurator/page.tsx
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata = generatePageMetadata({
  title: 'Конфигуратор заказа',
  description: 'Выберите готовый пакет...',
  path: '/configurator',
  ogImage: '/og-configurator.jpg', // опционально
  noIndex: false, // true для закрытия от индексации
})
```

---

## 🏗️ Schema.org разметка

### 1. Organization Schema (глобальная)

```typescript
// app/layout.tsx
import { getOrganizationSchema } from '@/lib/seo/schemas'

<JsonLd data={getOrganizationSchema()} />
```

**Что включено:**
- Название компании
- Логотип
- Адрес
- Контактная информация
- Социальные сети

### 2. Service Schema (глобальная)

```typescript
<JsonLd data={getServiceSchema()} />
```

**Что включено:**
- Описание услуги
- Пакеты и цены (Старт/Стандарт/Максимум)
- Зона обслуживания (Россия)

### 3. FAQ Schema (главная страница)

```typescript
// app/page.tsx
import { getFAQSchema } from '@/lib/seo/schemas'

const faqs = [
  { question: '...', answer: '...' },
  // ... 5 вопросов
]

<JsonLd data={getFAQSchema(faqs)} />
```

**Преимущества:**
- Появление в "Люди также спрашивают" Google
- Rich Snippets в выдаче
- Увеличение CTR на 20-40%

### 4. BreadcrumbList Schema (все внутренние страницы)

```typescript
// app/configurator/page.tsx
import { getBreadcrumbSchema } from '@/lib/seo/schemas'

const breadcrumbs = [
  { name: 'Главная', url: '/' },
  { name: 'Конфигуратор', url: '/configurator' },
]

<JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
```

**Преимущества:**
- Хлебные крошки в сниппете Google
- Лучшая навигация для пользователей

### 5. Product/Review Schema (опционально)

```typescript
import { getProductSchema, getReviewSchema } from '@/lib/seo/schemas'

// Для отдельных пакетов
<JsonLd data={getProductSchema({
  name: 'Пакет СТАРТ',
  description: '...',
  price: 12000,
  imageUrl: '/packages/start.jpg',
})} />

// Для отзывов
<JsonLd data={getReviewSchema([
  { author: 'Иван И.', rating: 5, text: '...', date: '2024-10-01' },
])} />
```

---

## 🗺️ Sitemap и Robots

### Sitemap.xml

**Автогенерация** при каждом билде:

```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://mpconstructor.ru/', lastModified: new Date(), priority: 1.0 },
    { url: 'https://mpconstructor.ru/configurator', priority: 0.8 },
    // ...
  ]
}
```

**Доступ:** `https://mpconstructor.ru/sitemap.xml`

### Robots.txt

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://mpconstructor.ru/sitemap.xml',
  }
}
```

**Доступ:** `https://mpconstructor.ru/robots.txt`

---

## 🧪 Тестирование

### 1. Проверка Meta Tags

```bash
# Откройте в браузере
curl -I http://localhost:3004

# Просмотр исходного кода
View Page Source -> Ctrl+F -> "og:image"
```

**Инструменты:**
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Яндекс Вебмастер](https://webmaster.yandex.ru/)

### 2. Проверка Schema.org

**Google Rich Results Test:**
```
https://search.google.com/test/rich-results
```

1. Введите URL: `http://localhost:3004`
2. Проверьте наличие:
   - Organization
   - Service
   - FAQPage
   - BreadcrumbList

**Валидатор Schema.org:**
```
https://validator.schema.org/
```

### 3. Проверка Sitemap

```bash
# Локально
curl http://localhost:3004/sitemap.xml

# Production
curl https://mpconstructor.ru/sitemap.xml
```

### 4. Проверка Robots.txt

```bash
curl http://localhost:3004/robots.txt
```

Должно содержать:
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://mpconstructor.ru/sitemap.xml
```

---

## ✅ Чеклист перед запуском

### 1. Конфигурация

- [ ] Обновить `SITE_CONFIG.url` в `lib/seo/metadata.ts` на production URL
- [ ] Добавить реальные ссылки на соцсети в `getOrganizationSchema()`
- [ ] Создать OG изображение 1200x630 (`public/og-image.jpg`)
- [ ] Добавить логотип компании (`public/logo.png`)

### 2. Верификация поисковых систем

- [ ] Получить Google Search Console verification code
- [ ] Получить Яндекс.Вебмастер verification code
- [ ] Обновить коды в `lib/seo/metadata.ts`:

```typescript
verification: {
  google: 'your-google-verification-code',
  yandex: 'your-yandex-verification-code',
},
```

### 3. Google Search Console

1. Зарегистрировать сайт: [search.google.com/search-console](https://search.google.com/search-console)
2. Подтвердить владение через meta-tag
3. Отправить sitemap: `https://mpconstructor.ru/sitemap.xml`
4. Запросить индексацию главной страницы

### 4. Яндекс.Вебмастер

1. Добавить сайт: [webmaster.yandex.ru](https://webmaster.yandex.ru/)
2. Подтвердить владение
3. Загрузить sitemap
4. Настроить регион (Россия)

### 5. Social Media

- [ ] Протестировать OG теги через Facebook Debugger
- [ ] Протестировать Twitter Card
- [ ] Проверить preview в VK (vk.com/dev/pages.clearCache)

### 6. Производительность

- [ ] Сжать OG изображения (WebP/Optimized JPEG)
- [ ] Проверить Core Web Vitals: [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Lighthouse Score > 90 для SEO

---

## 📊 Ожидаемые результаты

### Rich Snippets в Google

✅ **FAQPage** → Блок "Люди также спрашивают"
✅ **BreadcrumbList** → Хлебные крошки в сниппете
✅ **Organization** → Карточка компании справа
✅ **AggregateRating** → Звёзды в выдаче (после добавления отзывов)

### Метрики

- **Индексация:** 100% страниц в течение 1-2 недель
- **CTR:** Увеличение на 30-50% благодаря Rich Snippets
- **Позиции:** ТОП-10 по low-frequency запросам через 2-4 недели
- **Трафик:** Органика 20-30% от общего через 2 месяца

---

## 🔧 Обслуживание

### Регулярные задачи

**Еженедельно:**
- Проверка позиций в Google Search Console
- Анализ поисковых запросов
- Обновление FAQ при появлении новых вопросов

**Ежемесячно:**
- Аудит битых ссылок
- Обновление sitemap при добавлении страниц
- Анализ конкурентов

**Ежеквартально:**
- Обновление keywords в `lib/seo/metadata.ts`
- Оптимизация медленных страниц
- A/B тестирование Title/Description

---

## 🚀 Дальнейшие улучшения

1. **Видео Schema** → Для видео-контента
2. **LocalBusiness Schema** → Если будет физический офис
3. **Хлебные крошки на сайте** → Визуальные, не только schema
4. **AMP версии страниц** → Для мобильной выдачи
5. **Интеграция с Яндекс.Турбо** → Ускорение загрузки

---

## 📚 Полезные ссылки

- [Google Search Central](https://developers.google.com/search/docs)
- [Schema.org Documentation](https://schema.org/)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Яндекс SEO Guide](https://yandex.ru/support/webmaster/recommendations/seo.html)

---

**Создано:** October 2024
**Версия:** 1.0
**Автор:** MPConstructor Team
