import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth, generateAuthToken } from '@/lib/admin/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Пароль обязателен' },
        { status: 400 }
      )
    }

    const isValid = checkAdminAuth(password)

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Неверный пароль' },
        { status: 401 }
      )
    }

    const token = generateAuthToken()

    return NextResponse.json({
      success: true,
      token,
      message: 'Авторизация успешна',
    })
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}
