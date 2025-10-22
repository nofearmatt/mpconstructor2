import { Metadata } from 'next'

/**
 * SEO конфигурация для MPConstructor
 * Централизованное управление мета-тегами и Open Graph
 */

export const SITE_CONFIG = {
  name: 'MPConstructor',
  title: 'MPConstructor — Профессиональный контент для маркетплейсов',
  description:
    'Создаём визуальный контент для товаров на WB и Ozon: фото, видео, инфографика. Увеличиваем продажи на 40% за 5 дней. Без студии и бюрократии.',
  url: 'https://mpconstructor.ru',
  ogImage: '/og-image.jpg',
  keywords: [
    'контент для маркетплейсов',
    'фото для Wildberries',
    'фото для Ozon',
    'инфографика для WB',
    'видео для маркетплейсов',
    'съёмка товаров',
    'визуальный контент',
    'увеличение продаж на маркетплейсах',
    'карточка товара',
    'rich-контент',
  ],
  authors: [{ name: 'MPConstructor Team' }],
  creator: 'MPConstructor',
  publisher: 'MPConstructor',
  language: 'ru',
  locale: 'ru_RU',
}

export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: SITE_CONFIG.authors,
  creator: SITE_CONFIG.creator,
  publisher: SITE_CONFIG.publisher,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: '@mpconstructor',
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

/**
 * Генерирует метаданные для конкретной страницы
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
  noIndex?: boolean
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}
