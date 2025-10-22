'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import OrderForm from '@/components/order/OrderForm'
import type { OrderFormData } from '@/lib/validations/order'
import {
  trackConfiguratorStep,
  trackOrderSubmit,
  trackFormStart,
} from '@/lib/analytics/events'
import { ecommercePurchase } from '@/lib/analytics/ecommerce'

interface WizardData {
  category: string
  modules: string[]
  quantity: number
  scenario: 'new' | 'upgrade'
}

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<WizardData>({
    category: '',
    modules: [],
    quantity: 1,
    scenario: 'new',
  })

  const totalSteps = 4

  const categories = [
    { id: 'cosmetics', name: 'Косметика и уход', icon: '💄' },
    { id: 'clothing', name: 'Одежда и аксессуары', icon: '👗' },
    { id: 'electronics', name: 'Электроника', icon: '📱' },
    { id: 'home', name: 'Товары для дома', icon: '🏠' },
    { id: 'kids', name: 'Детские товары', icon: '🍼' },
    { id: 'food', name: 'Продукты питания', icon: '🍕' },
    { id: 'sports', name: 'Спорт и отдых', icon: '⚽' },
    { id: 'other', name: 'Другое', icon: '📦' },
  ]

  const modules = [
    {
      id: 'base_photos',
      name: 'Базовые фото-заготовки',
      price: 0,
      description: '8-12 ракурсов, белый фон',
      included: true,
    },
    {
      id: 'deep_retouch',
      name: 'Глубокая ретушь',
      price: 200,
      description: 'Детальная обработка каждого кадра',
    },
    {
      id: 'infographics',
      name: 'Инфографика',
      price: 300,
      description: '3-5 информационных слайдов',
    },
    {
      id: 'video',
      name: 'Видеообзор (15 сек)',
      price: 400,
      description: 'Короткий динамичный обзор товара',
    },
    {
      id: 'seo',
      name: 'SEO-оптимизация',
      price: 150,
      description: 'Ключевые слова для WB/Ozon',
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle-съёмка',
      price: 500,
      description: 'Товар в использовании, 5-8 кадров',
    },
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)

      // Track step progression
      const stepNames = [
        'category_selection',
        'modules_selection',
        'quantity_selection',
        'order_form',
      ]
      trackConfiguratorStep(nextStep, stepNames[nextStep - 1])

      // Track form start when entering step 4
      if (nextStep === 4) {
        trackFormStart()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    setWizardData({ ...wizardData, category: categoryId })
  }

  const handleModuleToggle = (moduleId: string) => {
    const currentModules = wizardData.modules
    if (currentModules.includes(moduleId)) {
      setWizardData({
        ...wizardData,
        modules: currentModules.filter((id) => id !== moduleId),
      })
    } else {
      setWizardData({
        ...wizardData,
        modules: [...currentModules, moduleId],
      })
    }
  }

  const handleQuantityChange = (quantity: number) => {
    setWizardData({ ...wizardData, quantity })
  }

  const calculateTotal = () => {
    const selectedModules = modules.filter((m) => wizardData.modules.includes(m.id))
    const modulesTotal = selectedModules.reduce((sum, m) => sum + m.price, 0)
    return modulesTotal * wizardData.quantity
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleOrderSubmit = async (formData: OrderFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    // Combine wizard data with form data
    const orderData = {
      ...formData,
      category: wizardData.category,
      modules: wizardData.modules,
      quantity: wizardData.quantity,
      total: calculateTotal(),
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Ошибка при отправке заказа')
      }

      // Success
      alert(`✅ ${result.message}\n\nНомер заказа: ${result.orderId}`)

      // Track successful order submission
      trackOrderSubmit({
        orderId: result.orderId,
        category: orderData.category,
        modules: orderData.modules,
        quantity: orderData.quantity,
        total: orderData.total,
        deliveryMethod: orderData.deliveryMethod,
      })

      // Track e-commerce purchase
      ecommercePurchase({
        orderId: result.orderId,
        category: orderData.category,
        modules: orderData.modules,
        quantity: orderData.quantity,
        total: orderData.total,
        deliveryMethod: orderData.deliveryMethod,
      })

      // Reset wizard
      setCurrentStep(1)
      setWizardData({
        category: '',
        modules: [],
        quantity: 1,
        scenario: 'new',
      })
    } catch (error) {
      console.error('Error submitting order:', error)
      setSubmitError(
        error instanceof Error ? error.message : 'Произошла ошибка при отправке заказа'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Шаг 1: Выберите категорию товара
            </h3>
            <p className="text-gray-600 mb-6">
              Это поможет нам подобрать оптимальные ракурсы и стиль съёмки
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    wizardData.category === category.id
                      ? 'border-primary-600 bg-primary-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <p className="font-semibold text-gray-900">{category.name}</p>
                  {wizardData.category === category.id && (
                    <div className="mt-2 flex justify-center">
                      <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Шаг 2: Выберите дополнительные модули
            </h3>
            <p className="text-gray-600 mb-6">
              Базовая съёмка включена бесплатно. Добавьте то, что нужно вам
            </p>

            <div className="space-y-4">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    module.included || wizardData.modules.includes(module.id)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={module.included || wizardData.modules.includes(module.id)}
                        disabled={module.included}
                        onChange={() => !module.included && handleModuleToggle(module.id)}
                        className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{module.name}</h4>
                          {module.included && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Включено
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-primary-600">
                        {module.price === 0 ? 'Бесплатно' : `${module.price} ₽`}
                      </span>
                      <p className="text-xs text-gray-500">/товар</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Шаг 3: Сколько товаров нужно отснять?
            </h3>
            <p className="text-gray-600 mb-6">
              Чем больше партия — тем выгоднее цена за единицу
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { value: 1, label: '1-5 товаров', discount: 0 },
                { value: 10, label: '6-15 товаров', discount: 10 },
                { value: 20, label: '16-30 товаров', discount: 20 },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleQuantityChange(option.value)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    wizardData.quantity === option.value
                      ? 'border-primary-600 bg-primary-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                >
                  <p className="font-semibold text-gray-900 mb-1">{option.label}</p>
                  {option.discount > 0 && (
                    <span className="inline-block bg-accent-100 text-accent-700 px-2 py-1 rounded text-sm font-semibold">
                      -{option.discount}% скидка
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <label className="block mb-4">
                <span className="text-sm font-semibold text-gray-700 mb-2 block">
                  Или укажите точное количество:
                </span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={wizardData.quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </label>
            </div>
          </div>
        )

      case 4:
        const total = calculateTotal()
        const selectedModulesData = modules.filter((m) =>
          wizardData.modules.includes(m.id)
        )
        const selectedCategory = categories.find((c) => c.id === wizardData.category)

        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Шаг 4: Оформление заказа
            </h3>
            <p className="text-gray-600 mb-6">
              Заполните контактную информацию для завершения заказа
            </p>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border-2 border-primary-200 p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Ваш заказ:</h4>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="flex justify-between sm:flex-col sm:justify-start">
                  <span className="text-sm text-gray-600">Категория:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedCategory?.icon} {selectedCategory?.name}
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col sm:justify-start">
                  <span className="text-sm text-gray-600">Количество товаров:</span>
                  <span className="font-semibold text-gray-900">{wizardData.quantity} шт.</span>
                </div>
              </div>

              <h5 className="font-semibold text-gray-900 mb-2 text-sm">Выбранные модули:</h5>
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">✓ Базовые фото-заготовки</span>
                  <span className="text-green-600 font-semibold">Бесплатно</span>
                </div>
                {selectedModulesData.map((module) => (
                  <div key={module.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">✓ {module.name}</span>
                    <span className="font-semibold text-gray-900">
                      {module.price * wizardData.quantity} ₽
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary-300 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Итого:</span>
                <span className="text-2xl font-bold text-primary-600">
                  {total === 0 ? 'Бесплатно' : `${total.toLocaleString('ru-RU')} ₽`}
                </span>
              </div>

              {wizardData.quantity <= 5 && (
                <div className="mt-4 bg-green-100 border border-green-300 rounded-lg p-3">
                  <p className="text-green-800 text-sm">
                    <strong>🎁 Ваш первый заказ!</strong> Первые 5 товаров полностью бесплатно!
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm">
                  <strong>Ошибка:</strong> {submitError}
                </p>
              </div>
            )}

            {/* Order Form */}
            <OrderForm onSubmit={handleOrderSubmit} isLoading={isSubmitting} />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step === currentStep
                    ? 'bg-primary-600 text-white ring-4 ring-primary-200'
                    : step < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < currentStep ? <Check size={20} /> : step}
              </div>
              {step < totalSteps && (
                <div
                  className={`h-1 flex-1 mx-2 rounded ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>Категория</span>
          <span>Модули</span>
          <span>Количество</span>
          <span>Итог</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">{renderStep()}</div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handleBack}
          disabled={currentStep === 1}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Назад
        </Button>

        {currentStep < totalSteps && (
          <Button
            onClick={handleNext}
            disabled={currentStep === 1 && !wizardData.category}
            className="flex items-center gap-2"
          >
            Далее
            <ChevronRight size={20} />
          </Button>
        )}
      </div>
    </div>
  )
}
