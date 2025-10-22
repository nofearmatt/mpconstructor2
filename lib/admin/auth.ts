/**
 * Простая аутентификация для админ-панели (MVP версия)
 * В production рекомендуется использовать NextAuth.js или Clerk
 */

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export function checkAdminAuth(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function getAdminAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('admin_auth_token')
}

export function setAdminAuthToken(token: string): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('admin_auth_token', token)
}

export function clearAdminAuthToken(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem('admin_auth_token')
}

export function generateAuthToken(): string {
  return `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
