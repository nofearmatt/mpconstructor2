'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { trackPackageSelect } from '@/lib/analytics/events'
import { ecommerceViewItem } from '@/lib/analytics/ecommerce'

interface PackageFeature {
  name: string
  included: boolean
  description?: string
}

interface PackageCardProps {
  name: string
  price: number
  originalPrice?: number
  description: string
  features: PackageFeature[]
  recommended?: boolean
  onSelect: () => void
  onCustomize: () => void
}

export default function PackageCard({
  name,
  price,
  originalPrice,
  description,
  features,
  recommended = false,
  onSelect,
  onCustomize,
}: PackageCardProps) {
  const handleSelect = () => {
    // Track package selection
    trackPackageSelect(name, price)
    ecommerceViewItem({
      id: name.toLowerCase().replace(/\s+/g, '_'),
      name: name,
      category: 'package',
      price: price,
    })
    onSelect()
  }

  const handleCustomize = () => {
    // Track customization click
    trackPackageSelect(`${name} (Кастомизация)`, price)
    onCustomize()
  }

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all ${
        recommended ? 'ring-2 ring-primary-600 scale-105' : ''
      }`}
    >
      {/* Recommended Badge */}
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
          ⭐ Рекомендуем
        </div>
      )}

      <div className="p-8">
        {/* Package Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>

        {/* Price */}
        <div className="mb-4">
          {originalPrice && (
            <span className="text-gray-400 line-through text-lg mr-2">
              {originalPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-primary-600">
              {price === 0 ? 'Бесплатно' : `${price.toLocaleString('ru-RU')} ₽`}
            </span>
            {price > 0 && <span className="text-gray-600">/заказ</span>}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              {feature.included ? (
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check size={14} className="text-green-600" />
                </div>
              ) : (
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                  <span className="text-gray-400 text-xs">✕</span>
                </div>
              )}
              <div>
                <p
                  className={`text-sm ${
                    feature.included ? 'text-gray-900 font-medium' : 'text-gray-400'
                  }`}
                >
                  {feature.name}
                </p>
                {feature.description && (
                  <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSelect}
            variant={recommended ? 'primary' : 'secondary'}
            className="w-full"
          >
            {price === 0 ? '🎁 Начать бесплатно' : 'Выбрать пакет'}
          </Button>
          <button
            onClick={handleCustomize}
            className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            🛠️ Кастомизировать
          </button>
        </div>
      </div>
    </div>
  )
}
