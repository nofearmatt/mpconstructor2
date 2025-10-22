'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react'

export default function HeroSection() {
  const [selectedScenario, setSelectedScenario] = useState<'new' | 'upgrade' | null>(null)

  const handleScenarioSelect = (scenario: 'new' | 'upgrade') => {
    setSelectedScenario(scenario)
    // Переход на страницу конфигуратора
    window.location.href = '/configurator'
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      {/* Video Background (заглушка на MVP, можно добавить позже) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-accent-500/5 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Главный заголовок */}
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 text-balance">
            Получите контент, который <span className="text-primary-600">продает</span>.
            <br />
            <span className="text-accent-500">Не рискуя ничем.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto text-balance">
            Профессиональная съёмка для маркетплейсов с оплатой за результат.
            <br />
            <strong className="text-primary-600">Первые 5 товаров — полностью за наш счёт.</strong>
          </p>
        </div>

        {/* Сегментация - 2 кнопки выбора сценария */}
        <div className="animate-slide-up mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Какая задача перед вами стоит?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Кнопка А: Новый товар */}
            <button
              onClick={() => handleScenarioSelect('new')}
              className={cn(
                'group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105',
                selectedScenario === 'new'
                  ? 'border-primary-600 bg-primary-50 shadow-xl'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-lg'
              )}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    🚀 Запустить новый товар
                  </h3>
                  <p className="text-gray-600">
                    У вас товар на руках, которого еще нет на маркетплейсе.
                  </p>
                </div>
              </div>

              {selectedScenario === 'new' && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>

            {/* Кнопка Б: Улучшить существующий */}
            <button
              onClick={() => handleScenarioSelect('upgrade')}
              className={cn(
                'group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105',
                selectedScenario === 'upgrade'
                  ? 'border-primary-600 bg-primary-50 shadow-xl'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-lg'
              )}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center text-white">
                  <RefreshCw size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-accent-500 transition-colors">
                    ♻️ Улучшить существующий
                  </h3>
                  <p className="text-gray-600">
                    Ваш товар уже продается на WB/Ozon, и вы хотите увеличить продажи.
                  </p>
                </div>
              </div>

              {selectedScenario === 'upgrade' && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <span>4.9/5.0 на основе 1,250+ отзывов</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span>Средний рост CTR: +78%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>Гарантия 24 часа</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Импорт cn утилиты
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
