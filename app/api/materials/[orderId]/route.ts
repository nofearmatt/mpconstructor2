import { NextRequest, NextResponse } from 'next/server'
import { getMaterialsByOrderId, getMaterialsStats } from '@/lib/admin/mockMaterials'
import { getOrderById } from '@/lib/admin/mockOrders'

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID обязателен' },
        { status: 400 }
      )
    }

    // Check if order exists
    const order = getOrderById(orderId)

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Заказ не найден' },
        { status: 404 }
      )
    }

    // Check if order is completed
    if (order.status !== 'completed') {
      return NextResponse.json(
        {
          success: false,
          error: 'Материалы доступны только для завершённых заказов',
        },
        { status: 403 }
      )
    }

    // Get materials
    const materials = getMaterialsByOrderId(orderId)
    const stats = getMaterialsStats(orderId)

    if (materials.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Материалы ещё не загружены',
        },
        { status: 404 }
      )
    }

    // In production, this would be a signed URL to a ZIP file in S3/Storage
    const downloadAllUrl = `/api/materials/${orderId}/download`

    return NextResponse.json({
      success: true,
      materials,
      stats,
      downloadAllUrl,
    })
  } catch (error) {
    console.error('Error fetching materials:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}
