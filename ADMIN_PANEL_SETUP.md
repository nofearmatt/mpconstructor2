# Администраторская панель MPConstructor

## Обзор

Базовая админ-панель для управления заказами с простой аутентификацией.

## Доступ к панели

URL: `http://localhost:3004/admin` (в production: `https://yourdomain.com/admin`)

### Первый вход

1. Откройте `/admin`
2. Введите пароль (по умолчанию: `admin123`)
3. Нажмите "Войти"

Сессия сохраняется в `sessionStorage` браузера.

## Настройка пароля

### Development

Создайте файл `.env.local`:

```env
ADMIN_PASSWORD=your_secure_password_here
```

### Production

Установите переменную окружения `ADMIN_PASSWORD` в настройках хостинга (Vercel/Netlify/etc)

**Важно:** Используйте надёжный пароль в production! Рекомендуется минимум 16 символов.

## Функционал

### 1. Dashboard со статистикой

- **Всего заказов** - общее количество
- **В работе** - Pending + Confirmed + In Progress
- **Завершено** - Completed заказы
- **Доход** - Сумма всех незавершённых заказов (₽)

### 2. Таблица заказов

Отображает все заказы с информацией:

- ID заказа (укороченный)
- Клиент (ФИО + email)
- Количество товаров
- Сумма заказа
- Текущий статус
- Дата создания
- Кнопка "Подробнее"

### 3. Детальный просмотр заказа

При клике на "Подробнее" открывается модальное окно с полной информацией:

#### Информация о клиенте

- ФИО
- Email
- Телефон
- Компания (если указана)

#### Детали заказа

- Категория товаров
- Выбранные модули
- Количество товаров
- Способ доставки
- Адрес доставки (если применимо)
- Итоговая сумма

#### Управление статусом

Кнопки для изменения статуса заказа:

- **Ожидает** (Pending) - новый заказ
- **Подтвердить** (Confirmed) - получены товары на съёмку
- **В работу** (In Progress) - идёт съёмка/обработка
- **Завершить** (Completed) - материалы готовы
- **Отменить** (Cancelled) - отменённый заказ

При изменении статуса:
- Автоматически обновляется поле `updatedAt`
- Обновляется статистика на dashboard
- Данные синхронизируются во всех открытых окнах

## Интеграция с email-уведомлениями

**Запланировано (следующий релиз):**

При изменении статуса будут автоматически отправляться email:

- **Pending → Confirmed**: "Товары получены" (функция уже есть: `sendOrderConfirmationEmail`)
- **In Progress → Completed**: "Материалы готовы" (функция уже есть: `sendMaterialsReadyEmail`)

Интеграция:

```typescript
// В app/api/admin/orders/[id]/route.ts
import { sendOrderConfirmationEmail, sendMaterialsReadyEmail } from '@/lib/email/sender'

// После обновления статуса
if (status === 'confirmed') {
  await sendOrderConfirmationEmail(updatedOrder)
} else if (status === 'completed') {
  const downloadLink = 'https://...' // Ссылка на материалы
  await sendMaterialsReadyEmail(updatedOrder, downloadLink)
}
```

## Хранение данных

### MVP (текущая версия)

Данные хранятся в памяти (in-memory storage) в файле `lib/admin/mockOrders.ts`.

**Ограничения:**
- ✅ Демо-данные доступны сразу
- ❌ Данные сбрасываются при перезапуске сервера
- ❌ Не подходит для production

### Production (следующий шаг)

Интеграция с Supabase (PostgreSQL):

1. Замените импорты в `app/api/orders/route.ts`:
   ```typescript
   // Было:
   import { getAllOrders, addOrder } from '@/lib/admin/mockOrders'

   // Станет:
   import { supabase } from '@/lib/supabase/client'
   ```

2. Обновите функции для работы с БД:
   ```typescript
   const { data: orders } = await supabase
     .from('orders')
     .select('*')
     .order('created_at', { ascending: false })
   ```

См. `SUPABASE_SETUP.md` для настройки базы данных.

## Безопасность

### Текущая реализация (MVP)

- ✅ Простая password-based аутентификация
- ✅ Session хранится в sessionStorage
- ✅ Пароль через environment variables
- ❌ Нет защиты от brute-force
- ❌ Нет ролевой модели
- ❌ Нет логирования действий

### Рекомендации для Production

1. **Замените на NextAuth.js** (запланировано в Фазе 4):
   ```bash
   npm install next-auth
   ```

2. **Добавьте rate limiting**:
   ```bash
   npm install express-rate-limit
   ```

3. **Включите HTTPS** (автоматически на Vercel/Netlify)

4. **Ограничьте доступ по IP** (в настройках хостинга)

5. **Добавьте 2FA** (через NextAuth providers)

## API Endpoints

### GET /api/orders

Получить все заказы со статистикой.

**Response:**
```json
{
  "success": true,
  "orders": [...],
  "stats": {
    "total": 3,
    "pending": 1,
    "confirmed": 0,
    "inProgress": 1,
    "completed": 1,
    "cancelled": 0,
    "totalRevenue": 46500
  }
}
```

### GET /api/admin/orders/[id]

Получить детали конкретного заказа.

**Response:**
```json
{
  "success": true,
  "order": {...}
}
```

### PATCH /api/admin/orders/[id]

Обновить статус заказа.

**Request:**
```json
{
  "status": "confirmed"
}
```

**Valid statuses:**
- `pending`
- `confirmed`
- `in_progress`
- `completed`
- `cancelled`

**Response:**
```json
{
  "success": true,
  "order": {...},
  "message": "Статус обновлен"
}
```

### POST /api/admin/auth

Аутентификация администратора.

**Request:**
```json
{
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "admin_1730000000_abc123xyz",
  "message": "Авторизация успешна"
}
```

## Тестирование

### 1. Проверка аутентификации

```bash
# Правильный пароль
curl -X POST http://localhost:3004/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"password": "admin123"}'

# Неправильный пароль
curl -X POST http://localhost:3004/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"password": "wrong"}'
```

### 2. Получение заказов

```bash
curl http://localhost:3004/api/orders
```

### 3. Изменение статуса

```bash
curl -X PATCH http://localhost:3004/api/admin/orders/ORD-1730000001-demo1 \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

## Демо-данные

По умолчанию доступны 3 тестовых заказа:

1. **ORD-1730000001-demo1**
   - Клиент: Иван Петров
   - Товары: 10 шт (косметика)
   - Сумма: БЕСПЛАТНО
   - Статус: Pending

2. **ORD-1730000002-demo2**
   - Клиент: Мария Сидорова
   - Товары: 20 шт (электроника)
   - Сумма: 14,000 ₽
   - Статус: In Progress

3. **ORD-1730000003-demo3**
   - Клиент: Алексей Смирнов
   - Товары: 50 шт (одежда)
   - Сумма: 32,500 ₽
   - Статус: Completed

## Устранение проблем

### Не могу войти

1. Проверьте пароль в `.env.local`
2. Убедитесь, что используете правильный пароль (по умолчанию: `admin123`)
3. Очистите sessionStorage: DevTools → Application → Session Storage → Clear

### Заказы не отображаются

1. Проверьте консоль браузера на ошибки
2. Убедитесь, что сервер запущен: `npm run dev`
3. Проверьте ответ API: откройте DevTools → Network → `/api/orders`

### Не обновляется статус

1. Проверьте консоль браузера на ошибки
2. Убедитесь, что ID заказа корректный
3. Проверьте ответ API: DevTools → Network → PATCH request

### Данные сбросились после перезапуска

Это ожидаемое поведение для MVP версии (in-memory storage). Для постоянного хранения настройте Supabase.

## Roadmap

### v1.1 (Текущая версия)
- ✅ Базовая аутентификация
- ✅ Просмотр заказов
- ✅ Управление статусами
- ✅ Статистика

### v1.2 (Планируется)
- ⏳ Интеграция с Supabase
- ⏳ Автоматическая отправка email при смене статуса
- ⏳ Поиск и фильтрация заказов
- ⏳ Экспорт данных (CSV/Excel)

### v2.0 (Будущее)
- ⏳ NextAuth.js с ролевой моделью
- ⏳ История изменений заказов
- ⏳ Загрузка материалов (фото/видео)
- ⏳ Чат с клиентами
- ⏳ Уведомления в реальном времени

---

**Готово!** Админ-панель настроена и готова к использованию.

Для перехода к production: настройте Supabase и замените простую аутентификацию на NextAuth.js.
