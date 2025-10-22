/**
 * Schema.org structured data для SEO
 * Помогает поисковикам лучше понимать контент сайта
 */

import { SITE_CONFIG } from './metadata'

export interface SchemaOrgProps {
  type: 'Organization' | 'Service' | 'BreadcrumbList' | 'Product' | 'FAQPage'
  data?: any
}

/**
 * Organization Schema - информация о компании
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressLocality: 'Москва',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Russian',
    },
    sameAs: [
      // Социальные сети (заполнить реальные ссылки)
      'https://vk.com/mpconstructor',
      'https://t.me/mpconstructor',
    ],
  }
}

/**
 * Service Schema - описание услуги
 */
export function getServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Создание визуального контента для маркетплейсов',
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    serviceType: 'Фотография и видеосъёмка товаров',
    description:
      'Профессиональная съёмка товаров, создание инфографики и видео для маркетплейсов Wildberries и Ozon',
    areaServed: {
      '@type': 'Country',
      name: 'Russia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Пакеты услуг MPConstructor',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Пакет СТАРТ',
            description: 'Базовый набор контента для новичков на маркетплейсах',
          },
          price: '12000',
          priceCurrency: 'RUB',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Пакет СТАНДАРТ',
            description: 'Расширенный контент для роста продаж',
          },
          price: '25000',
          priceCurrency: 'RUB',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Пакет МАКСИМУМ',
            description: 'Полный набор премиум-контента',
          },
          price: '45000',
          priceCurrency: 'RUB',
        },
      ],
    },
  }
}

/**
 * BreadcrumbList Schema - хлебные крошки
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}

/**
 * FAQPage Schema - страница с FAQ
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Product Schema - для отображения товара/услуги
 */
export function getProductSchema({
  name,
  description,
  price,
  imageUrl,
}: {
  name: string
  description: string
  price: number
  imageUrl: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: imageUrl,
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: SITE_CONFIG.url,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  }
}

/**
 * Review Schema - отзывы клиентов
 */
export function getReviewSchema(reviews: {
  author: string
  rating: number
  text: string
  date: string
}[]) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
    },
    reviewBody: review.text,
    datePublished: review.date,
  }))
}
