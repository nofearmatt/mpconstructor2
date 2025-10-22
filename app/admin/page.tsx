'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import type { Order } from '@/lib/types/order'
import {
  getAdminAuthToken,
  setAdminAuthToken,
  clearAdminAuthToken,
} from '@/lib/admin/auth'

interface OrderStats {
  total: number
  pending: number
  confirmed: number
  inProgress: number
  completed: number
  cancelled: number
  totalRevenue: number
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<OrderStats | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    const token = getAdminAuthToken()
    if (token) {
      setIsAuthenticated(true)
      fetchOrders()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Ошибка авторизации')
      }

      setAdminAuthToken(data.token)
      setIsAuthenticated(true)
      fetchOrders()
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Ошибка входа')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    clearAdminAuthToken()
    setIsAuthenticated(false)
    setOrders([])
    setStats(null)
    setPassword('')
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()

      if (data.success) {
        setOrders(data.orders || [])
        setStats(data.stats || null)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        // Update local state
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        )
        setSelectedOrder((prev) =>
          prev?.id === orderId ? { ...prev, status: newStatus } : prev
        )
        // Refresh stats
        fetchOrders()
      }
    } catch (error) {
      console.error('Error updating order:', error)
    } finally {
      setIsUpdating(false)
    }
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
      completed: 'Завершен',
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Админ-панель</h1>
          <p className="text-gray-600 mb-8">MPConstructor</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Введите пароль"
                required
              />
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{authError}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-6 text-center">
            По умолчанию: admin123 (установите ADMIN_PASSWORD в .env)
          </p>
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
              <h1 className="text-2xl font-bold text-gray-900">
                Админ-панель MPConstructor
              </h1>
              <p className="text-sm text-gray-500">Управление заказами</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Всего заказов</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">В работе</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.pending + stats.confirmed + stats.inProgress}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Завершено</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.completed}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Доход</p>
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalRevenue.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Все заказы</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Товары
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id?.substring(0, 15)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.fullName}
                      </div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.quantity} шт.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {order.total === 0
                        ? 'БЕСПЛАТНО'
                        : `${order.total.toLocaleString('ru-RU')} ₽`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-purple-600 hover:text-purple-900 font-medium"
                      >
                        Подробнее
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {orders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Заказов пока нет</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Заказ {selectedOrder.id}
                </h2>
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
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Информация о клиенте
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p>
                    <span className="font-medium">Имя:</span>{' '}
                    {selectedOrder.fullName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{' '}
                    {selectedOrder.email}
                  </p>
                  <p>
                    <span className="font-medium">Телефон:</span>{' '}
                    {selectedOrder.phone}
                  </p>
                  {selectedOrder.companyName && (
                    <p>
                      <span className="font-medium">Компания:</span>{' '}
                      {selectedOrder.companyName}
                    </p>
                  )}
                </div>
              </div>

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
                    {selectedOrder.deliveryMethod}
                  </p>
                  {selectedOrder.deliveryAddress && (
                    <p>
                      <span className="font-medium">Адрес:</span>{' '}
                      {selectedOrder.deliveryAddress}
                    </p>
                  )}
                  <p className="text-xl font-bold text-purple-600">
                    Сумма:{' '}
                    {selectedOrder.total === 0
                      ? 'БЕСПЛАТНО'
                      : `${selectedOrder.total.toLocaleString('ru-RU')} ₽`}
                  </p>
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Управление статусом
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span>Текущий статус:</span>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateOrderStatus(selectedOrder.id!, 'pending')
                    }
                    disabled={isUpdating || selectedOrder.status === 'pending'}
                  >
                    Ожидает
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateOrderStatus(selectedOrder.id!, 'confirmed')
                    }
                    disabled={
                      isUpdating || selectedOrder.status === 'confirmed'
                    }
                  >
                    Подтвердить
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateOrderStatus(selectedOrder.id!, 'in_progress')
                    }
                    disabled={
                      isUpdating || selectedOrder.status === 'in_progress'
                    }
                  >
                    В работу
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      updateOrderStatus(selectedOrder.id!, 'completed')
                    }
                    disabled={
                      isUpdating || selectedOrder.status === 'completed'
                    }
                  >
                    Завершить
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateOrderStatus(selectedOrder.id!, 'cancelled')
                    }
                    disabled={
                      isUpdating || selectedOrder.status === 'cancelled'
                    }
                    className="col-span-2 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Отменить
                  </Button>
                </div>
              </div>

              {/* Timestamps */}
              <div className="text-sm text-gray-500 space-y-1">
                <p>Создан: {formatDate(selectedOrder.createdAt)}</p>
                <p>Обновлен: {formatDate(selectedOrder.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
