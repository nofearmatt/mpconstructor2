import { NextRequest, NextResponse } from 'next/server'
import { updateOrderStatus, getOrderById } from '@/lib/admin/mockOrders'
import type { Order } from '@/lib/types/order'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const { id } = params

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Статус обязателен' },
        { status: 400 }
      )
    }

    const validStatuses: Order['status'][] = [
      'pending',
      'confirmed',
      'in_progress',
      'completed',
      'cancelled',
    ]

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Неверный статус' },
        { status: 400 }
      )
    }

    const updatedOrder = updateOrderStatus(id, status)

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: 'Заказ не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: 'Статус обновлен',
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const order = getOrderById(id)

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Заказ не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}
