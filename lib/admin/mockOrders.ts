import type { Order } from '@/lib/types/order'

/**
 * Временное хранилище заказов (MVP)
 * В production будет заменено на Supabase
 */

let orders: Order[] = [
  {
    id: 'ORD-1730000001-demo1',
    fullName: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 900 123-45-67',
    deliveryMethod: 'pickup',
    privacyConsent: true,
    category: 'cosmetics',
    modules: ['photo', 'infographics'],
    quantity: 10,
    total: 0, // Бесплатный тест
    status: 'pending',
    createdAt: new Date('2024-10-15T10:30:00'),
    updatedAt: new Date('2024-10-15T10:30:00'),
  },
  {
    id: 'ORD-1730000002-demo2',
    fullName: 'Мария Сидорова',
    email: 'maria@example.com',
    phone: '+7 911 234-56-78',
    deliveryMethod: 'sdek',
    deliveryAddress: 'Москва, ул. Тверская, д. 10, кв. 5',
    privacyConsent: true,
    category: 'electronics',
    modules: ['photo', 'video', 'infographics'],
    quantity: 20,
    total: 14000,
    status: 'in_progress',
    createdAt: new Date('2024-10-14T14:20:00'),
    updatedAt: new Date('2024-10-16T09:15:00'),
  },
  {
    id: 'ORD-1730000003-demo3',
    fullName: 'Алексей Смирнов',
    email: 'alex@example.com',
    phone: '+7 922 345-67-89',
    deliveryMethod: 'courier',
    deliveryAddress: 'Санкт-Петербург, Невский проспект, 28',
    privacyConsent: true,
    category: 'clothing',
    modules: ['photo', 'video', 'infographics', 'copywriting'],
    quantity: 50,
    total: 32500,
    status: 'completed',
    createdAt: new Date('2024-10-10T16:45:00'),
    updatedAt: new Date('2024-10-18T11:00:00'),
  },
]

export function getAllOrders(): Order[] {
  return [...orders].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
    return dateB - dateA // Новые первыми
  })
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((order) => order.id === id)
}

export function addOrder(order: Order): void {
  orders.push(order)
}

export function updateOrderStatus(
  id: string,
  status: Order['status']
): Order | null {
  const orderIndex = orders.findIndex((order) => order.id === id)
  if (orderIndex === -1) return null

  orders[orderIndex] = {
    ...orders[orderIndex],
    status,
    updatedAt: new Date(),
  }

  return orders[orderIndex]
}

export function deleteOrder(id: string): boolean {
  const initialLength = orders.length
  orders = orders.filter((order) => order.id !== id)
  return orders.length < initialLength
}

export function getOrderStats() {
  const total = orders.length
  const pending = orders.filter((o) => o.status === 'pending').length
  const confirmed = orders.filter((o) => o.status === 'confirmed').length
  const inProgress = orders.filter((o) => o.status === 'in_progress').length
  const completed = orders.filter((o) => o.status === 'completed').length
  const cancelled = orders.filter((o) => o.status === 'cancelled').length

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0)

  return {
    total,
    pending,
    confirmed,
    inProgress,
    completed,
    cancelled,
    totalRevenue,
  }
}
