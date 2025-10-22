import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders } from '@/lib/admin/mockOrders'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email обязателен' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Некорректный email' },
        { status: 400 }
      )
    }

    // Get all orders and filter by email
    const allOrders = getAllOrders()
    const customerOrders = allOrders.filter(
      (order) => order.email.toLowerCase() === email.toLowerCase()
    )

    if (customerOrders.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Заказы с этим email не найдены',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      orders: customerOrders,
      email: email,
    })
  } catch (error) {
    console.error('Error fetching customer orders:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}
