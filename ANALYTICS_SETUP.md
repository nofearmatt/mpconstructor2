# Интеграция Аналитики MPConstructor

Полная документация по настройке и использованию Яндекс.Метрики и Google Analytics 4.

## 📋 Содержание

- [Обзор](#обзор)
- [Установка](#установка)
- [Структура файлов](#структура-файлов)
- [Отслеживаемые события](#отслеживаемые-события)
- [Тестирование](#тестирование)
- [Добавление новых событий](#добавление-новых-событий)
- [Цели и конверсии](#цели-и-конверсии)

---

## 🎯 Обзор

Реализована комплексная система аналитики:

✅ **Яндекс.Метрика 104777349**
- WebVisor (запись сессий)
- Карта кликов
- Точный показатель отказов
- E-commerce tracking

✅ **Google Analytics 4** (готов к подключению)
- Автотрекинг страниц
- Custom events
- Enhanced E-commerce

✅ **Централизованное управление**
- Единые функции для обоих сервисов
- TypeScript типизация
- Development логи

---

## 🔧 Установка

### 1. Переменные окружения

Создайте файл `.env.local` (или добавьте в существующий):

```env
# Яндекс.Метрика - ID счётчика
NEXT_PUBLIC_YM_ID=104777349

# Google Analytics 4 - Measurement ID (добавить позже)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. Проверка интеграции

Запустите dev сервер:

```bash
npm run dev
```

Откройте консоль браузера (F12) → Console. При работе с сайтом должны появляться логи:

```
📊 Analytics Event: package_select {...}
🛒 E-commerce Event: {...}
```

---

## 📁 Структура файлов

```
components/analytics/
├── Analytics.tsx          # Главный компонент (подключен в layout)
├── YandexMetrika.tsx      # Скрипт Яндекс.Метрики
└── GoogleAnalytics.tsx    # Скрипт Google Analytics 4

lib/analytics/
├── events.ts              # Функции для event tracking
└── ecommerce.ts           # Функции для e-commerce tracking

# Интегрировано в:
app/layout.tsx              # <Analytics /> компонент
components/configurator/
├── Wizard.tsx              # Tracking заказа и шагов
└── PackageCard.tsx         # Tracking выбора пакета
```

---

## 📊 Отслеживаемые события

### 1. Конфигуратор и заказы

| Событие | Функция | Триггер | Цель в ЯМ |
|---------|---------|---------|-----------|
| **Выбор пакета** | `trackPackageSelect()` | Клик на "Выбрать пакет" | `package_select` |
| **Шаг конфигуратора** | `trackConfiguratorStep()` | Переход между шагами | `step_1`, `step_2`, ... |
| **Начало заполнения формы** | `trackFormStart()` | Открытие шага 4 | `form_start` |
| **Отправка заказа** | `trackOrderSubmit()` | Успешная отправка | `order_submit` ⭐ |

### 2. E-commerce события

| Событие | Функция | Описание |
|---------|---------|----------|
| **Просмотр товара** | `ecommerceViewItem()` | Клик на пакет |
| **Добавление в корзину** | `ecommerceAddToCart()` | (не используется пока) |
| **Покупка** | `ecommercePurchase()` | Успешный заказ ⭐ |

### 3. Другие события (доступны для использования)

```typescript
trackMaterialDownload()      // Скачивание материала
trackAllMaterialsDownload()  // Скачивание ZIP архива
trackCTAClick()              // Клик по CTA кнопке
trackFAQView()               // Просмотр вопроса FAQ
trackDashboardLogin()        // Вход в личный кабинет
trackOrderView()             // Просмотр деталей заказа
trackFormError()             // Ошибка валидации формы
trackOutboundLink()          // Клик по внешней ссылке
```

---

## 🧪 Тестирование

### 1. Проверка в Development

**Console логи:**
```bash
npm run dev
# Откройте http://localhost:3004
# Откройте DevTools → Console
# Взаимодействуйте с сайтом
# Увидите логи: 📊 Analytics Event: ...
```

**Network запросы:**
```
DevTools → Network → Filter: "yandex" или "google"
```

Должны появляться запросы:
- `mc.yandex.ru/metrika/tag.js` (загрузка скрипта)
- `mc.yandex.ru/watch/104777349` (отправка событий)

### 2. Проверка в Яндекс.Метрике

1. Откройте [Яндекс.Метрику](https://metrika.yandex.ru/dashboard?id=104777349)
2. Перейдите в **Отчёты → В режиме реального времени**
3. Выполните действие на сайте (выбор пакета, отправка заказа)
4. События должны появиться в течение 1-2 минут

**Цели** (настроить в ЯМ):
- `package_select` - Выбор пакета
- `step_1`, `step_2`, `step_3`, `step_4` - Прохождение шагов
- `form_start` - Начало заполнения формы
- `order_submit` - Отправка заказа ⭐ (главная конверсия)

### 3. Проверка E-commerce

1. **Яндекс.Метрика:**
   - Отчёты → E-commerce → Транзакции
   - Должны появиться заказы с суммами

2. **dataLayer проверка:**
```javascript
// В консоли браузера:
console.log(window.dataLayer)
```

Должны быть объекты с:
```javascript
{
  ecommerce: {
    purchase: {
      actionField: { id: "ORD-...", revenue: 12000 },
      products: [...]
    }
  }
}
```

---

## ➕ Добавление новых событий

### Пример 1: Отслеживание клика по кнопке

```typescript
// 1. Импортировать функцию
import { trackCTAClick } from '@/lib/analytics/events'

// 2. Добавить в обработчик клика
<Button onClick={() => {
  trackCTAClick('hero_section', 'Создать заказ')
  // ... остальная логика
}}>
  Создать заказ
</Button>
```

### Пример 2: Создание нового события

```typescript
// lib/analytics/events.ts

export function trackCustomEvent(eventData: {
  eventName: string
  category: string
  value: number
}) {
  trackEvent(
    eventData.eventName,
    {
      category: eventData.category,
      value: eventData.value,
    },
    eventData.eventName // Цель в ЯМ
  )
}
```

### Пример 3: E-commerce событие

```typescript
// lib/analytics/ecommerce.ts

export function ecommerceAddToWishlist(itemData: {
  id: string
  name: string
  price: number
}) {
  pushToDataLayer({
    ecommerce: {
      add: {
        products: [{
          id: itemData.id,
          name: itemData.name,
          price: itemData.price,
        }]
      }
    }
  })
}
```

---

## 🎯 Цели и конверсии

### Настройка целей в Яндекс.Метрике

1. Откройте [Настройки счётчика](https://metrika.yandex.ru/settings/?id=104777349)
2. Перейдите в **Цели**
3. Создайте цели:

#### Главная конверсия: Отправка заказа
```
Название: Отправка заказа
Тип: JavaScript-событие
Идентификатор: order_submit
Значение: Доход с транзакции
```

#### Микроконверсии:
```
1. Выбор пакета
   - Идентификатор: package_select

2. Начало заполнения формы
   - Идентификатор: form_start

3. Прохождение шагов
   - Идентификатор: step_1, step_2, step_3, step_4
```

### Настройка воронки

**Цели → Воронки → Создать:**
```
1. Выбор пакета (package_select)
2. Шаг 1: Категория (step_1)
3. Шаг 2: Модули (step_2)
4. Шаг 3: Количество (step_3)
5. Шаг 4: Форма (step_4)
6. Отправка заказа (order_submit)
```

---

## 🔮 Google Analytics 4

### ✅ Активно (ID: G-M1TZ288T41)

Google Analytics 4 полностью интегрирован и работает параллельно с Яндекс.Метрикой.

### 1. Проверка работы GA4

**Realtime Report:**
```
1. Откройте https://analytics.google.com/
2. Выберите Property "MPConstructor"
3. Reports → Realtime
4. Взаимодействуйте с сайтом
5. События должны появиться в течение 10-30 секунд
```

**События в GA4:**
```
Reports → Events
```

Должны отслеживаться:
- `page_view` - автоматически
- `package_select` - выбор пакета
- `configurator_step` - шаги конфигуратора
- `form_start` - начало формы
- `order_submit` - отправка заказа ⭐
- `purchase` - E-commerce покупка

### 2. Настройка конверсий в GA4

**Admin → Events → Mark as conversion:**

1. Откройте Admin (левый нижний угол)
2. Выберите Property → Events
3. Найдите событие в списке
4. Включите тумблер "Mark as conversion"

**Ключевые конверсии:**
- ✅ `order_submit` - главная конверсия
- ✅ `purchase` - E-commerce конверсия
- ✅ `package_select` - микроконверсия
- ✅ `form_start` - микроконверсия

### 3. Enhanced E-commerce в GA4

**Отчёты:**
```
Reports → Monetization → Ecommerce purchases
```

**Проверка событий:**
```javascript
// В консоли браузера:
dataLayer.filter(item => item.event === 'purchase')
```

Должны быть объекты с:
```javascript
{
  event: 'purchase',
  ecommerce: {
    transaction_id: 'ORD-...',
    value: 12000,
    currency: 'RUB',
    items: [
      {
        item_id: 'start_package',
        item_name: 'Пакет Старт',
        item_category: 'Старт',
        price: 12000,
        quantity: 10
      }
    ]
  }
}
```

### 4. Воронка конверсий (Funnel Exploration)

**Explore → Funnel exploration:**

1. Откройте Explore (левое меню)
2. Выберите "Funnel exploration"
3. Добавьте шаги:

```
Шаг 1: package_select (Выбор пакета)
  ↓
Шаг 2: configurator_step (где step = 1)
  ↓
Шаг 3: configurator_step (где step = 2)
  ↓
Шаг 4: configurator_step (где step = 3)
  ↓
Шаг 5: form_start (Начало формы)
  ↓
Шаг 6: order_submit (Отправка заказа) ⭐
  ↓
Шаг 7: purchase (Покупка)
```

**Настройка каждого шага:**
- Event name: `[название события]`
- Condition: `event_name = [название]`
- Для шагов конфигуратора добавить параметр: `step = [номер]`

### 5. Custom Dimensions (Параметры)

**Admin → Custom definitions → Create custom dimension:**

| Display Name | Event parameter | Scope |
|-------------|----------------|-------|
| Package Name | package_name | Event |
| Package Price | package_price | Event |
| Step Number | step | Event |
| Step Name | step_name | Event |
| Order ID | order_id | Event |
| Category | category | Event |
| Modules | modules | Event |

**Зачем нужны:**
- Детальная сегментация событий
- Анализ популярных пакетов
- Отслеживание прохождения шагов
- Связь заказов с событиями

### 6. Аудитории (Audiences)

**Admin → Audiences → Create audience:**

**Аудитория "Выбрали пакет, но не купили":**
```
Условия:
- Включить: событие package_select
- Исключить: событие order_submit
- Временной интервал: последние 7 дней

Использование: Ремаркетинг, email кампании
```

**Аудитория "Начали форму, но не отправили":**
```
Условия:
- Включить: событие form_start
- Исключить: событие order_submit
- Временной интервал: последние 3 дня

Использование: Таргетированные напоминания
```

**Аудитория "Прошли 3+ шага":**
```
Условия:
- Событие configurator_step, где step >= 3
- Исключить: order_submit

Использование: Высокая заинтересованность
```

### 7. Отчёты и метрики

**Ключевые отчёты:**

1. **Reports → Realtime**
   - Активные пользователи сейчас
   - События в реальном времени
   - Просматриваемые страницы

2. **Reports → Acquisition → Traffic acquisition**
   - Источники трафика
   - Каналы привлечения
   - Конверсии по каналам

3. **Reports → Engagement → Events**
   - Топ событий
   - Частота событий
   - Конверсии по событиям

4. **Reports → Monetization → Ecommerce purchases**
   - Доход
   - Транзакции
   - Средний чек
   - Популярные товары

### 8.Debbugging в GA4

**Debug Mode:**
```javascript
// В консоли браузера (для dev):
gtag('config', 'G-M1TZ288T41', {
  debug_mode: true
})
```

**DebugView:**
```
Admin → DebugView
```

Показывает события в реальном времени с полными данными.

### 9. Сравнение YM vs GA4

| Функция | Яндекс.Метрика | Google Analytics 4 |
|---------|---------------|-------------------|
| **WebVisor** | ✅ Да | ❌ Нет |
| **Карта кликов** | ✅ Да | ❌ Нет |
| **Realtime** | ✅ Да | ✅ Да |
| **E-commerce** | ✅ Да | ✅ Да |
| **Custom events** | ✅ Да (Цели) | ✅ Да (Events) |
| **Воронки** | ✅ Да | ✅ Да (Exploration) |
| **Аудитории** | ✅ Да | ✅ Да |
| **Интеграция с рекламой** | ✅ Яндекс.Директ | ✅ Google Ads |
| **Экспорт данных** | ✅ API | ✅ BigQuery |

**Рекомендация:** Использовать оба сервиса параллельно для:
- ЯМ: Поведенческий анализ (WebVisor, клики)
- GA4: Маркетинговая аналитика, интеграция с Google Ads

### 10. Troubleshooting GA4

**Проблема: События не появляются в Realtime**

**Проверьте:**
1. Network → Filter: "google-analytics"
2. Должны быть запросы к `www.google-analytics.com/g/collect`
3. Проверьте console на ошибки
4. Убедитесь, что `NEXT_PUBLIC_GA_ID=G-M1TZ288T41` в `.env.local`

**Проблема: Purchase события не работают**

**Проверьте:**
1. `window.dataLayer` содержит объект с `event: 'purchase'`
2. `transaction_id` уникален для каждой покупки
3. `value` и `currency` корректны
4. В Admin → Events включена отметка "Mark as conversion" для `purchase`

**Проблема: Custom dimensions не показывают данные**

**Проверьте:**
1. Custom dimension создан в Admin
2. `Event parameter` совпадает с отправляемым параметром
3. Данные появятся через 24-48 часов после создания dimension

---

## 📈 Ожидаемые метрики

### Через 1 неделю:
- ✅ Все события отслеживаются
- ✅ Цели настроены в ЯМ
- ✅ Воронка работает

### Через 1 месяц:
- **Конверсия воронки:** 15-25%
- **Отказы:** < 40%
- **Глубина просмотра:** 3-5 страниц
- **Время на сайте:** 2-4 минуты

---

## 🐛 Troubleshooting

### Проблема: События не отправляются

**Проверьте:**
1. Переменные окружения в `.env.local`
2. Перезапустите dev сервер
3. Проверьте консоль на ошибки
4. Проверьте Network → Filter: "yandex"

### Проблема: E-commerce не работает

**Проверьте:**
1. `window.dataLayer` в консоли
2. Яндекс.Метрика → Настройки → E-commerce включен
3. События `purchase` в dataLayer

### Проблема: TypeScript ошибки

**Проверьте:**
```typescript
// Глобальные типы должны быть объявлены:
declare global {
  interface Window {
    ym: (...) => void
    gtag: (...) => void
    dataLayer: any[]
  }
}
```

---

## 📚 Полезные ссылки

- [Яндекс.Метрика Dashboard](https://metrika.yandex.ru/dashboard?id=104777349)
- [Яндекс.Метрика E-commerce](https://yandex.ru/support/metrica/data/e-commerce.html)
- [Google Analytics 4 Docs](https://support.google.com/analytics/answer/9304153)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

**Создано:** October 2024
**Версия:** 1.0
**Счётчик ЯМ:** 104777349
**Автор:** MPConstructor Team
