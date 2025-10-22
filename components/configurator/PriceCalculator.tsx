'use client'

import { useEffect, useState } from 'react'

interface Module {
  id: string
  name: string
  price: number
}

interface PriceCalculatorProps {
  selectedModules?: Module[]
  quantity?: number
  discount?: number
  className?: string
}

export default function PriceCalculator({
  selectedModules = [],
  quantity = 1,
  discount = 0,
  className = '',
}: PriceCalculatorProps) {
  const [total, setTotal] = useState(0)
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    // Calculate subtotal
    const modulesTotal = selectedModules.reduce((sum, module) => sum + module.price, 0)
    const calculatedSubtotal = modulesTotal * quantity
    setSubtotal(calculatedSubtotal)

    // Apply discount
    const discountAmount = (calculatedSubtotal * discount) / 100
    const finalTotal = calculatedSubtotal - discountAmount
    setTotal(finalTotal)
  }, [selectedModules, quantity, discount])

  const discountAmount = (subtotal * discount) / 100

  return (
    <div
      className={`bg-white rounded-2xl border-2 border-gray-200 shadow-lg sticky top-4 ${className}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Калькулятор стоимости
          </h3>
          <p className="text-sm text-gray-600">Расчёт в реальном времени</p>
        </div>

        {/* Quantity */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Количество товаров:</span>
            <span className="text-lg font-semibold text-gray-900">{quantity} шт.</span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Скидка на партию:</span>
              <span className="text-sm font-semibold text-accent-600">-{discount}%</span>
            </div>
          )}
        </div>

        {/* Modules Breakdown */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Выбранные модули:
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">✓ Базовая съёмка</span>
              <span className="text-green-600 font-medium">Бесплатно</span>
            </div>
            {selectedModules.map((module) => (
              <div key={module.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">✓ {module.name}</span>
                <span className="font-medium text-gray-900">
                  {module.price * quantity} ₽
                </span>
              </div>
            ))}
            {selectedModules.length === 0 && (
              <p className="text-sm text-gray-400 italic">
                Дополнительные модули не выбраны
              </p>
            )}
          </div>
        </div>

        {/* Price Summary */}
        <div className="space-y-2 mb-6">
          {discount > 0 && (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Промежуточный итог:</span>
                <span className="font-medium text-gray-700">
                  {subtotal.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Скидка ({discount}%):</span>
                <span className="font-medium text-accent-600">
                  -{discountAmount.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </>
          )}
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Итого:</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {total === 0 ? 'Бесплатно' : `${total.toLocaleString('ru-RU')} ₽`}
              </div>
              {quantity <= 5 && total === 0 && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  🎁 Первые 5 товаров бесплатно!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Free Offer Notice */}
        {quantity <= 5 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-green-800">
              <strong>Ваш бесплатный тест-драйв!</strong> Все выбранные модули входят в стоимость первого заказа.
            </p>
          </div>
        )}

        {/* Trust Signals */}
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Гарантия 24 часа</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Оплата за результат</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Полная передача прав</span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer (optional) */}
      <div className="lg:hidden bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Итого:</span>
          <span className="text-xl font-bold text-primary-600">
            {total === 0 ? 'Бесплатно' : `${total.toLocaleString('ru-RU')} ₽`}
          </span>
        </div>
      </div>
    </div>
  )
}
