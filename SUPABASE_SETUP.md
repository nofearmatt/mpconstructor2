# Настройка Supabase для MPConstructor

## Шаг 1: Создание проекта в Supabase

1. Перейдите на https://app.supabase.com
2. Создайте новый проект
3. Выберите регион (рекомендуется ближайший к вашим пользователям)
4. Задайте пароль для базы данных (сохраните его!)

## Шаг 2: Создание таблицы заказов

Выполните следующий SQL в разделе SQL Editor:

```sql
-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Contact information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,

  -- Company information (optional)
  company_name TEXT,
  inn TEXT,

  -- Delivery
  delivery_method TEXT NOT NULL CHECK (delivery_method IN ('sdek', 'courier', 'pickup')),
  delivery_address TEXT,
  delivery_city TEXT,

  -- Additional
  comment TEXT,

  -- Consent
  privacy_consent BOOLEAN NOT NULL DEFAULT false,
  newsletter BOOLEAN DEFAULT false,

  -- Order details
  category TEXT NOT NULL,
  modules JSONB DEFAULT '[]'::jsonb,
  quantity INTEGER NOT NULL DEFAULT 1,
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,

  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_email ON orders(email);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can create an order)
CREATE POLICY "Allow public insert" ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated read (admins can read all orders)
CREATE POLICY "Allow authenticated read" ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Шаг 3: Получение ключей API

1. Перейдите в Settings → API
2. Скопируйте следующие значения:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Шаг 4: Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Шаг 5: Установка Supabase Client

```bash
npm install @supabase/supabase-js
```

## Шаг 6: Создание Supabase клиента

Создайте файл `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Шаг 7: Обновление API route

Обновите `app/api/orders/route.ts` для использования Supabase:

```typescript
import { supabase } from '@/lib/supabase'

// В функции POST, замените TODO комментарий на:
const { data, error } = await supabase
  .from('orders')
  .insert([orderData])
  .select()
  .single()

if (error) {
  throw new Error('Ошибка при сохранении заказа')
}

const orderId = data.id
```

## Проверка

После настройки проверьте:
1. Отправьте тестовый заказ через форму
2. Проверьте, что данные появились в Supabase (Table Editor → orders)
3. Проверьте логи в API route (консоль сервера)

## Безопасность

**Важно!** Никогда не коммитьте `.env.local` в Git!

Файл `.gitignore` уже содержит:
```
.env*.local
```

## Дополнительные возможности

### Webhooks для уведомлений

В Supabase можно настроить Database Webhooks для отправки уведомлений при создании заказа.

### Real-time подписки

Для админ-панели можно использовать real-time подписки:

```typescript
supabase
  .channel('orders')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'orders' },
    (payload) => {
      console.log('Новый заказ!', payload)
    }
  )
  .subscribe()
```
