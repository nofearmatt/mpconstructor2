'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  orderSchemaWithDeliveryValidation,
  defaultOrderValues,
  type OrderFormData,
} from '@/lib/validations/order'

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void
  isLoading?: boolean
}

export default function OrderForm({ onSubmit, isLoading = false }: OrderFormProps) {
  const [showCompanyFields, setShowCompanyFields] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchemaWithDeliveryValidation),
    defaultValues: defaultOrderValues,
  })

  const deliveryMethod = watch('deliveryMethod')
  const showDeliveryAddress = deliveryMethod === 'sdek' || deliveryMethod === 'courier'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Контактная информация */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Контактная информация</h3>

        <div className="space-y-4">
          {/* ФИО */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              ФИО <span className="text-red-500">*</span>
            </label>
            <input
              {...register('fullName')}
              type="text"
              id="fullName"
              placeholder="Иванов Иван Иванович"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.fullName
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-primary-500'
              } focus:outline-none`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="example@email.com"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.email
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-primary-500'
              } focus:outline-none`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Телефон */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон <span className="text-red-500">*</span>
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              placeholder="+7 900 123-45-67"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.phone
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-primary-500'
              } focus:outline-none`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Информация о компании (опционально) */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Информация о компании</h3>
          <button
            type="button"
            onClick={() => setShowCompanyFields(!showCompanyFields)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {showCompanyFields ? 'Скрыть' : 'Показать'}
          </button>
        </div>

        {showCompanyFields && (
          <div className="space-y-4">
            {/* Название компании */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Название компании
              </label>
              <input
                {...register('companyName')}
                type="text"
                id="companyName"
                placeholder="ООО 'Моя компания'"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
              />
            </div>

            {/* ИНН */}
            <div>
              <label htmlFor="inn" className="block text-sm font-medium text-gray-700 mb-1">
                ИНН
              </label>
              <input
                {...register('inn')}
                type="text"
                id="inn"
                placeholder="1234567890 или 123456789012"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                  errors.inn
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-primary-500'
                } focus:outline-none`}
              />
              {errors.inn && (
                <p className="mt-1 text-sm text-red-600">{errors.inn.message}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Доставка */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Доставка товаров</h3>

        <div className="space-y-4">
          {/* Способ доставки */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Выберите способ доставки <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-start p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 cursor-pointer transition-colors">
                <input
                  {...register('deliveryMethod')}
                  type="radio"
                  value="sdek"
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">СДЭК</div>
                  <div className="text-sm text-gray-600">
                    Доставка курьерской службой СДЭК по всей России
                  </div>
                </div>
              </label>

              <label className="flex items-start p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 cursor-pointer transition-colors">
                <input
                  {...register('deliveryMethod')}
                  type="radio"
                  value="courier"
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">Курьер по Москве</div>
                  <div className="text-sm text-gray-600">
                    Доставка курьером в пределах МКАД
                  </div>
                </div>
              </label>

              <label className="flex items-start p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 cursor-pointer transition-colors">
                <input
                  {...register('deliveryMethod')}
                  type="radio"
                  value="pickup"
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">Самовывоз</div>
                  <div className="text-sm text-gray-600">
                    Забрать лично в нашем офисе
                  </div>
                </div>
              </label>
            </div>
            {errors.deliveryMethod && (
              <p className="mt-2 text-sm text-red-600">{errors.deliveryMethod.message}</p>
            )}
          </div>

          {/* Адрес доставки (условное отображение) */}
          {showDeliveryAddress && (
            <>
              <div>
                <label htmlFor="deliveryCity" className="block text-sm font-medium text-gray-700 mb-1">
                  Город доставки <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('deliveryCity')}
                  type="text"
                  id="deliveryCity"
                  placeholder="Москва"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.deliveryCity
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-primary-500'
                  } focus:outline-none`}
                />
                {errors.deliveryCity && (
                  <p className="mt-1 text-sm text-red-600">{errors.deliveryCity.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Адрес доставки <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('deliveryAddress')}
                  type="text"
                  id="deliveryAddress"
                  placeholder="ул. Примерная, д. 1, кв. 1"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.deliveryAddress
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-primary-500'
                  } focus:outline-none`}
                />
                {errors.deliveryAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress.message}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Комментарий к заказу */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Дополнительно</h3>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Комментарий к заказу
          </label>
          <textarea
            {...register('comment')}
            id="comment"
            rows={4}
            placeholder="Укажите особые пожелания или требования к заказу..."
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors resize-none ${
              errors.comment
                ? 'border-red-300 focus:border-red-500'
                : 'border-gray-200 focus:border-primary-500'
            } focus:outline-none`}
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
          )}
        </div>
      </div>

      {/* Согласия */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="space-y-3">
          {/* Согласие на обработку данных */}
          <div>
            <label className="flex items-start cursor-pointer">
              <input
                {...register('privacyConsent')}
                type="checkbox"
                className="mt-1 mr-3"
              />
              <span className="text-sm text-gray-700">
                Я согласен на{' '}
                <a href="/privacy" className="text-primary-600 hover:underline">
                  обработку персональных данных
                </a>{' '}
                <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.privacyConsent && (
              <p className="mt-1 ml-6 text-sm text-red-600">{errors.privacyConsent.message}</p>
            )}
          </div>

          {/* Подписка на новости */}
          <div>
            <label className="flex items-start cursor-pointer">
              <input
                {...register('newsletter')}
                type="checkbox"
                className="mt-1 mr-3"
              />
              <span className="text-sm text-gray-700">
                Хочу получать новости и спецпредложения
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Отправка...' : 'Оформить заказ'}
      </button>

      {/* Информация о безопасности */}
      <div className="text-center text-xs text-gray-600">
        <p>🔒 Ваши данные защищены и не передаются третьим лицам</p>
      </div>
    </form>
  )
}
