import { OrderFormData } from '@/lib/validations/order'

export interface Order extends OrderFormData {
  id?: string
  category: string
  modules: string[]
  quantity: number
  total: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  createdAt?: Date
  updatedAt?: Date
}

export interface OrderResponse {
  success: boolean
  orderId?: string
  message?: string
  error?: string
}
