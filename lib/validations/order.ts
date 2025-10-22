import { z } from 'zod'

// Схема валидации для формы заказа
export const orderSchema = z.object({
  // Контактная информация
  fullName: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(100, 'Имя слишком длинное')
    .regex(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробелы и дефисы'),

  email: z
    .string()
    .email('Неверный формат email')
    .toLowerCase(),

  phone: z
    .string()
    .regex(
      /^(\+7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
      'Неверный формат телефона. Пример: +7 900 123-45-67'
    ),

  // Информация о компании (опционально)
  companyName: z.string().optional(),
  inn: z
    .string()
    .regex(/^(\d{10}|\d{12})$/, 'ИНН должен содержать 10 или 12 цифр')
    .optional()
    .or(z.literal('')),

  // Способ доставки товаров
  deliveryMethod: z.enum(['sdek', 'courier', 'pickup'], {
    required_error: 'Выберите способ доставки',
  }),

  // Адрес доставки (для СДЭК и курьера)
  deliveryAddress: z.string().optional(),
  deliveryCity: z.string().optional(),

  // Комментарий к заказу
  comment: z.string().max(500, 'Комментарий не должен превышать 500 символов').optional(),

  // Согласие на обработку персональных данных
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Необходимо согласие на обработку персональных данных',
    }),

  // Подписка на новости (опционально)
  newsletter: z.boolean().optional().default(false),
})

// Рефайнмент для проверки адреса при выборе доставки
export const orderSchemaWithDeliveryValidation = orderSchema.superRefine((data, ctx) => {
  if (data.deliveryMethod === 'sdek' || data.deliveryMethod === 'courier') {
    if (!data.deliveryAddress || data.deliveryAddress.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите адрес доставки',
        path: ['deliveryAddress'],
      })
    }
    if (!data.deliveryCity || data.deliveryCity.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Укажите город доставки',
        path: ['deliveryCity'],
      })
    }
  }
})

// Тип данных формы заказа
export type OrderFormData = z.infer<typeof orderSchemaWithDeliveryValidation>

// Значения по умолчанию
export const defaultOrderValues: Partial<OrderFormData> = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  inn: '',
  deliveryMethod: undefined,
  deliveryAddress: '',
  deliveryCity: '',
  comment: '',
  privacyConsent: false,
  newsletter: false,
}
