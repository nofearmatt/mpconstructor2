import type { Order } from '@/lib/types/order'
import {
  getWelcomeEmailTemplate,
  getOrderConfirmationTemplate,
  getMaterialsReadyTemplate,
} from './templates'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

/**
 * Отправка email через Resend API
 * Документация: https://resend.com/docs/send-with-nextjs
 */
async function sendEmail(options: EmailOptions): Promise<boolean> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@mpconstructor.ru'

  // В development режиме просто логируем
  if (process.env.NODE_ENV === 'development' && !RESEND_API_KEY) {
    console.log('📧 Email (DEV MODE):')
    console.log('To:', options.to)
    console.log('Subject:', options.subject)
    console.log('---')
    return true
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY не настроен')
    return false
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Ошибка отправки email:', error)
      return false
    }

    const data = await response.json()
    console.log('✅ Email отправлен:', data.id)
    return true
  } catch (error) {
    console.error('Ошибка при отправке email:', error)
    return false
  }
}

/**
 * Отправка приветственного письма при создании заказа
 */
export async function sendWelcomeEmail(order: Order): Promise<boolean> {
  const template = getWelcomeEmailTemplate(order)

  return sendEmail({
    to: order.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  })
}

/**
 * Отправка подтверждения получения товаров
 */
export async function sendOrderConfirmationEmail(order: Order): Promise<boolean> {
  const template = getOrderConfirmationTemplate(order)

  return sendEmail({
    to: order.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  })
}

/**
 * Уведомление о готовности материалов
 */
export async function sendMaterialsReadyEmail(
  order: Order,
  downloadLink: string
): Promise<boolean> {
  const template = getMaterialsReadyTemplate(order, downloadLink)

  return sendEmail({
    to: order.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  })
}
