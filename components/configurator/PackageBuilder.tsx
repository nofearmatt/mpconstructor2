'use client'

import { useState } from 'react'
import PackageCard from './PackageCard'
import Wizard from './Wizard'

export default function PackageBuilder() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showWizard, setShowWizard] = useState(false)

  const packages = [
    {
      id: 'start',
      name: 'СТАРТ',
      price: 0,
      originalPrice: 50000,
      description: 'Идеально для первого знакомства с нашим сервисом. Бесплатно для первых 5 товаров.',
      features: [
        {
          name: 'До 5 товаров',
          included: true,
          description: 'Профессиональная съёмка любых 5 товаров',
        },
        {
          name: 'Базовая фотосъёмка',
          included: true,
          description: '8-12 ракурсов по "Золотому Стандарту"',
        },
        {
          name: '40-60 фото-заготовок',
          included: true,
          description: 'Высокое разрешение, белый фон',
        },
        {
          name: 'Личный кабинет (DAM)',
          included: true,
          description: 'Доступ ко всем превью и материалам',
        },
        {
          name: 'Бесплатное скачивание ВСЕХ материалов',
          included: true,
          description: 'Полная передача прав на использование',
        },
        {
          name: 'Базовая ретушь',
          included: true,
          description: 'Коррекция цвета, удаление дефектов',
        },
        {
          name: 'Инфографика',
          included: false,
        },
        {
          name: 'Видеообзор',
          included: false,
        },
        {
          name: 'SEO-оптимизация для МП',
          included: false,
        },
      ],
      recommended: false,
    },
    {
      id: 'standard',
      name: 'СТАНДАРТ',
      price: 2400,
      description: 'Оптимальный выбор для регулярных продаж на маркетплейсах.',
      features: [
        {
          name: 'До 15 товаров',
          included: true,
          description: 'Съёмка партии товаров со скидкой',
        },
        {
          name: 'Расширенная фотосъёмка',
          included: true,
          description: '12-16 ракурсов + детальные планы',
        },
        {
          name: '80-120 фото-заготовок',
          included: true,
          description: 'Включая lifestyle-кадры',
        },
        {
          name: 'Личный кабинет (DAM)',
          included: true,
          description: 'Расширенное хранилище',
        },
        {
          name: 'Бесплатное скачивание материалов',
          included: true,
        },
        {
          name: 'Глубокая ретушь',
          included: true,
          description: 'Детальная обработка каждого кадра',
        },
        {
          name: 'Базовая инфографика',
          included: true,
          description: '3-5 информационных слайдов',
        },
        {
          name: 'Видеообзор (15 сек)',
          included: true,
          description: 'Короткий динамичный обзор',
        },
        {
          name: 'SEO-оптимизация для WB/Ozon',
          included: true,
          description: 'Ключевые слова, описание',
        },
      ],
      recommended: true,
    },
    {
      id: 'maximum',
      name: 'МАКСИМУМ',
      price: 4900,
      description: 'Полный цикл контент-производства для серьёзного бизнеса на МП.',
      features: [
        {
          name: 'До 30 товаров',
          included: true,
          description: 'Максимальная скидка на партию',
        },
        {
          name: 'Premium-съёмка',
          included: true,
          description: '16-20 ракурсов + креативные концепции',
        },
        {
          name: '150-200+ фото-заготовок',
          included: true,
          description: 'Включая lifestyle, детали, упаковку',
        },
        {
          name: 'Личный кабинет Premium',
          included: true,
          description: 'Безлимитное хранилище + приоритет',
        },
        {
          name: 'Бесплатное скачивание материалов',
          included: true,
        },
        {
          name: 'Профессиональная ретушь',
          included: true,
          description: 'Студийное качество каждого пикселя',
        },
        {
          name: 'Полная инфографика',
          included: true,
          description: '8-12 дизайнерских слайдов',
        },
        {
          name: 'Видеообзор (до 60 сек)',
          included: true,
          description: 'Профессиональный монтаж + звук',
        },
        {
          name: 'SEO + копирайтинг',
          included: true,
          description: 'Полное описание карточек для МП',
        },
        {
          name: 'Экспертный отзыв',
          included: true,
          description: 'Реальный отзыв от эксперта',
        },
        {
          name: 'Приоритетная поддержка',
          included: true,
          description: 'Выделенный менеджер',
        },
      ],
      recommended: false,
    },
  ]

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId)
    // TODO: Redirect to order form or next step
    console.log('Selected package:', packageId)
  }

  const handleCustomizePackage = (packageId: string) => {
    setShowWizard(true)
  }

  if (showWizard) {
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setShowWizard(false)}
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
          >
            ← Вернуться к готовым пакетам
          </button>
        </div>
        <Wizard />
      </div>
    )
  }

  return (
    <div>
      {/* Packages Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            name={pkg.name}
            price={pkg.price}
            originalPrice={pkg.originalPrice}
            description={pkg.description}
            features={pkg.features}
            recommended={pkg.recommended}
            onSelect={() => handleSelectPackage(pkg.id)}
            onCustomize={() => handleCustomizePackage(pkg.id)}
          />
        ))}
      </div>

      {/* Comparison Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h3 className="text-2xl font-bold text-center mb-6">
          Не уверены, какой пакет выбрать?
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-4xl mb-3">🎁</div>
            <h4 className="font-semibold mb-2">СТАРТ</h4>
            <p className="text-sm text-gray-600">
              Для новичков в e-commerce или тестирования нового товара
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3">⭐</div>
            <h4 className="font-semibold mb-2">СТАНДАРТ</h4>
            <p className="text-sm text-gray-600">
              Для постоянных продаж и роста на маркетплейсах
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3">💎</div>
            <h4 className="font-semibold mb-2">МАКСИМУМ</h4>
            <p className="text-sm text-gray-600">
              Для масштабного бизнеса с регулярными новинками
            </p>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-1">24 часа</div>
            <p className="text-sm text-gray-700">Гарантия по SLA</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-600 mb-1">100%</div>
            <p className="text-sm text-gray-700">Возврат, если не понравится</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-1">1,250+</div>
            <p className="text-sm text-gray-700">Довольных клиентов</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-1">4.9/5</div>
            <p className="text-sm text-gray-700">Средний рейтинг</p>
          </div>
        </div>
      </div>
    </div>
  )
}
