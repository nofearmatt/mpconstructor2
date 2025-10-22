'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId: string
}

/**
 * Google Analytics 4 компонент для Next.js 14
 *
 * Функции:
 * - Автоматическое отслеживание просмотров страниц
 * - Enhanced E-commerce tracking
 * - Custom events
 * - User ID tracking
 *
 * @param gaId - Google Analytics Measurement ID (G-XXXXXXXXXX)
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

/**
 * TypeScript declaration для глобального объекта gtag
 */
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}
