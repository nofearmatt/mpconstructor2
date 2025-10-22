import type { Order } from '@/lib/types/order'

interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export function getWelcomeEmailTemplate(order: Order): EmailTemplate {
  return {
    subject: `Заказ ${order.id} принят! Добро пожаловать в MPConstructor`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Спасибо за заказ!</h1>
              <p>Ваш заказ успешно принят в работу</p>
            </div>

            <div class="content">
              <p>Здравствуйте, ${order.fullName}!</p>

              <p>Мы получили ваш заказ и уже начали работу над созданием профессионального контента для ваших товаров.</p>

              <div class="order-details">
                <h3>Детали заказа:</h3>
                <div class="detail-row">
                  <span><strong>Номер заказа:</strong></span>
                  <span>${order.id}</span>
                </div>
                <div class="detail-row">
                  <span><strong>Количество товаров:</strong></span>
                  <span>${order.quantity} шт.</span>
                </div>
                <div class="detail-row">
                  <span><strong>Итоговая стоимость:</strong></span>
                  <span><strong>${order.total === 0 ? 'БЕСПЛАТНО 🎁' : `${order.total.toLocaleString('ru-RU')} ₽`}</strong></span>
                </div>
                ${order.deliveryMethod ? `
                <div class="detail-row">
                  <span><strong>Способ доставки:</strong></span>
                  <span>${order.deliveryMethod === 'sdek' ? 'СДЭК' : order.deliveryMethod === 'courier' ? 'Курьер' : 'Самовывоз'}</span>
                </div>
                ` : ''}
              </div>

              <h3>Что дальше?</h3>
              <ol>
                <li><strong>Отправка товаров</strong> - В течение 24 часов мы свяжемся с вами для уточнения деталей доставки товаров на съёмку</li>
                <li><strong>Съёмка</strong> - Профессиональная фотосъёмка займёт 1-2 рабочих дня</li>
                <li><strong>Обработка</strong> - Ретушь и подготовка материалов - ещё 1-2 дня</li>
                <li><strong>Готово!</strong> - Вы получите доступ ко всем материалам в личном кабинете</li>
              </ol>

              ${order.total === 0 ? `
              <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <strong>🎁 Ваш бесплатный тест-драйв активирован!</strong><br>
                Первые 5 товаров - полностью бесплатно, включая все выбранные модули.<br>
                Это отличная возможность оценить качество нашей работы без рисков!
              </div>
              ` : ''}

              <p>Если у вас возникли вопросы, просто ответьте на это письмо - мы всегда на связи!</p>

              <p>С уважением,<br><strong>Команда MPConstructor</strong></p>
            </div>

            <div class="footer">
              <p>MPConstructor - Профессиональный контент для маркетплейсов</p>
              <p>Это письмо отправлено автоматически, пожалуйста, не отвечайте на него.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Здравствуйте, ${order.fullName}!

Спасибо за заказ! Ваш заказ успешно принят в работу.

Номер заказа: ${order.id}
Количество товаров: ${order.quantity} шт.
Итоговая стоимость: ${order.total === 0 ? 'БЕСПЛАТНО 🎁' : `${order.total.toLocaleString('ru-RU')} ₽`}

Что дальше?
1. Отправка товаров - В течение 24 часов мы свяжемся с вами
2. Съёмка - 1-2 рабочих дня
3. Обработка - 1-2 дня
4. Готово! - Доступ в личном кабинете

С уважением,
Команда MPConstructor
    `,
  }
}

export function getOrderConfirmationTemplate(order: Order): EmailTemplate {
  return {
    subject: `Товары получены! Заказ ${order.id} в работе`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #667eea;">✅ Товары получены!</h1>
            <p>Здравствуйте, ${order.fullName}!</p>
            <p>Мы получили ваши товары и приступили к съёмке.</p>
            <p><strong>Примерная дата готовности:</strong> ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}</p>
            <p>Вы получите уведомление, как только материалы будут готовы.</p>
            <p>С уважением,<br>Команда MPConstructor</p>
          </div>
        </body>
      </html>
    `,
    text: `Товары получены! Заказ ${order.id} в работе. Примерная дата готовности: ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}`,
  }
}

export function getMaterialsReadyTemplate(order: Order, downloadLink: string): EmailTemplate {
  return {
    subject: `🎉 Материалы готовы! Заказ ${order.id}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #667eea;">🎉 Ваши материалы готовы!</h1>
            <p>Здравствуйте, ${order.fullName}!</p>
            <p>Отличные новости! Все материалы для вашего заказа готовы и доступны для скачивания.</p>
            <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Что вас ждёт:</h3>
              <ul>
                <li>Профессиональные фотографии товаров</li>
                <li>Обработанные изображения в высоком разрешении</li>
                <li>Готовые к загрузке на маркетплейсы</li>
              </ul>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${downloadLink}" style="display: inline-block; background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Скачать материалы
              </a>
            </div>
            <p>Материалы будут доступны в течение 30 дней.</p>
            <p>Если у вас есть вопросы или пожелания - пишите, мы всегда рады помочь!</p>
            <p>С уважением,<br>Команда MPConstructor</p>
          </div>
        </body>
      </html>
    `,
    text: `Материалы готовы! Скачать: ${downloadLink}`,
  }
}
