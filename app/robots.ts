import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo/metadata'

/**
 * Генерирует robots.txt для управления индексацией
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'], // Закрываем API и админку от индексации
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
