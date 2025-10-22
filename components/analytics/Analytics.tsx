import { YandexMetrika } from './YandexMetrika'
import { GoogleAnalytics } from './GoogleAnalytics'

/**
 * Централизованный компонент аналитики
 *
 * Управляет всеми трекерами через environment variables:
 * - NEXT_PUBLIC_YM_ID - Яндекс.Метрика
 * - NEXT_PUBLIC_GA_ID - Google Analytics 4
 *
 * Трекеры загружаются только если указаны соответствующие ID
 */
export function Analytics() {
  const ymId = process.env.NEXT_PUBLIC_YM_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <>
      {/* Яндекс.Метрика */}
      {ymId && <YandexMetrika ymId={ymId} />}

      {/* Google Analytics 4 */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  )
}
