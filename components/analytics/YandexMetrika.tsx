'use client'

import Script from 'next/script'

interface YandexMetrikaProps {
  ymId: string
}

/**
 * Яндекс.Метрика компонент для Next.js 14
 *
 * Функции:
 * - WebVisor (запись сессий пользователей)
 * - Карта кликов
 * - E-commerce tracking через dataLayer
 * - Точный показатель отказов
 * - Отслеживание внешних ссылок
 *
 * @param ymId - ID счётчика Яндекс.Метрики
 */
export function YandexMetrika({ ymId }: YandexMetrikaProps) {
  return (
    <>
      {/* Основной скрипт Яндекс.Метрики */}
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

            ym(${ymId}, 'init', {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              ecommerce: "dataLayer"
            });
          `,
        }}
      />

      {/* Noscript fallback для случаев, когда JS отключен */}
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${ymId}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}

/**
 * TypeScript declaration для глобального объекта ym
 */
declare global {
  interface Window {
    ym: (
      counterId: number,
      method: string,
      ...params: any[]
    ) => void
    dataLayer: any[]
  }
}
