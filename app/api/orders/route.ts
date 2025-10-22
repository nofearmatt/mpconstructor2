import { NextRequest, NextResponse } from 'next/server'
import { orderSchemaWithDeliveryValidation } from '@/lib/validations/order'
import type { Order, OrderResponse } from '@/lib/types/order'
import { sendWelcomeEmail } from '@/lib/email/sender'
import { getAllOrders, addOrder, getOrderStats } from '@/lib/admin/mockOrders'

export async function GET(request: NextRequest) {
  try {
    const orders = getAllOrders()
    const stats = getOrderStats()

    return NextResponse.json({
      success: true,
      orders,
      stats,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка при получении заказов' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the order data
    const validationResult = orderSchemaWithDeliveryValidation.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ошибка валидации данных',
          details: validationResult.error.errors,
        },
        { status: 400 }
      )
    }

    // Extract order data
    const orderData: Order = {
      ...validationResult.data,
      category: body.category || 'other',
      modules: body.modules || [],
      quantity: body.quantity || 1,
      total: body.total || 0,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Generate a temporary order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    orderData.id = orderId

    // Save to mock storage (will be replaced with Supabase)
    addOrder(orderData)
    console.log('📦 New order received:', orderData)

    // Send welcome email
    try {
      await sendWelcomeEmail(orderData)
      console.log('📧 Welcome email sent to:', orderData.email)
    } catch (emailError) {
      // Don't fail the order if email fails
      console.error('⚠️  Email sending failed:', emailError)
    }

    const response: OrderResponse = {
      success: true,
      orderId: orderId,
      message: 'Заказ успешно создан! Проверьте email для подтверждения.',
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error processing order:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Внутренняя ошибка сервера. Попробуйте позже.',
      },
      { status: 500 }
    )
  }
}
