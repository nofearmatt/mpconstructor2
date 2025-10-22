'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { Order } from '@/lib/types/order'

export default function DashboardPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/customer/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Ошибка получения заказов')
      }

      setOrders(data.orders)
      setCustomerEmail(data.email)
      setIsAuthenticated(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка входа')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setOrders([])
    setEmail('')
    setCustomerEmail('')
    setSelectedOrder(null)
  }

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }

    const labels = {
      pending: 'Ожидает',
      confirmed: 'Подтвержден',
      in_progress: 'В работе',
      completed: 'Готов',
      cancelled: 'Отменен',
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {labels[status]}
      </span>
    )
  }

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Н/Д'
    return new Date(date).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Мои заказы
            </h1>
            <p className="text-gray-600">
              Введите email для просмотра ваших заказов
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : 'Войти'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Не помните email? Проверьте письмо с подтверждением заказа
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Мои заказы</h1>
              <p className="text-sm text-gray-500">{customerEmail}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Всего заказов</p>
            <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">В работе</p>
            <p className="text-3xl font-bold text-purple-600">
              {
                orders.filter(
                  (o) =>
                    o.status === 'pending' ||
                    o.status === 'confirmed' ||
                    o.status === 'in_progress'
                ).length
              }
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Завершено</p>
            <p className="text-3xl font-bold text-green-600">
              {orders.filter((o) => o.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Ваши заказы
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Заказ {order.id?.substring(0, 20)}...
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Товары:</span>
                        <p className="font-medium">{order.quantity} шт.</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Категория:</span>
                        <p className="font-medium capitalize">
                          {order.category}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Сумма:</span>
                        <p className="font-medium">
                          {order.total === 0
                            ? 'БЕСПЛАТНО'
                            : `${order.total.toLocaleString('ru-RU')} ₽`}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Дата:</span>
                        <p className="font-medium">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 text-purple-600 hover:text-purple-900 font-medium text-sm">
                    Подробнее →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Заказ {selectedOrder.id}
                  </h2>
                  <div className="mt-2">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Детали заказа
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p>
                    <span className="font-medium">Категория:</span>{' '}
                    {selectedOrder.category}
                  </p>
                  <p>
                    <span className="font-medium">Модули:</span>{' '}
                    {selectedOrder.modules.join(', ')}
                  </p>
                  <p>
                    <span className="font-medium">Количество:</span>{' '}
                    {selectedOrder.quantity} шт.
                  </p>
                  <p>
                    <span className="font-medium">Доставка:</span>{' '}
                    {selectedOrder.deliveryMethod === 'sdek'
                      ? 'СДЭК'
                      : selectedOrder.deliveryMethod === 'courier'
                      ? 'Курьер'
                      : 'Самовывоз'}
                  </p>
                  {selectedOrder.deliveryAddress && (
                    <p>
                      <span className="font-medium">Адрес:</span>{' '}
                      {selectedOrder.deliveryAddress}
                    </p>
                  )}
                  <p className="text-xl font-bold text-purple-600 pt-2">
                    Сумма:{' '}
                    {selectedOrder.total === 0
                      ? 'БЕСПЛАТНО'
                      : `${selectedOrder.total.toLocaleString('ru-RU')} ₽`}
                  </p>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Статус заказа
                </h3>
                <div className="space-y-3">
                  {selectedOrder.status === 'pending' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800">
                        <strong>Ожидает подтверждения</strong>
                        <br />
                        Мы свяжемся с вами в течение 24 часов для уточнения
                        деталей доставки товаров на съёмку.
                      </p>
                    </div>
                  )}
                  {selectedOrder.status === 'confirmed' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">
                        <strong>Заказ подтверждён</strong>
                        <br />
                        Мы получили ваши товары и готовимся к съёмке.
                        Ориентировочный срок готовности: 3-5 рабочих дней.
                      </p>
                    </div>
                  )}
                  {selectedOrder.status === 'in_progress' && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-purple-800">
                        <strong>Заказ в работе</strong>
                        <br />
                        Идёт профессиональная съёмка и обработка ваших товаров.
                        Скоро всё будет готово!
                      </p>
                    </div>
                  )}
                  {selectedOrder.status === 'completed' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800">
                        <strong>Заказ завершён</strong>
                        <br />
                        Материалы готовы! Вы получили ссылку для скачивания на
                        email.
                      </p>
                      <Link href={`/materials/${selectedOrder.id}`}>
                        <Button variant="primary" className="mt-3 w-full">
                          Просмотреть и скачать материалы
                        </Button>
                      </Link>
                    </div>
                  )}
                  {selectedOrder.status === 'cancelled' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800">
                        <strong>Заказ отменён</strong>
                        <br />
                        Если у вас возникли вопросы, пожалуйста, свяжитесь с
                        нами.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamps */}
              <div className="text-sm text-gray-500 space-y-1 pt-4 border-t">
                <p>Создан: {formatDate(selectedOrder.createdAt)}</p>
                <p>Обновлён: {formatDate(selectedOrder.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
