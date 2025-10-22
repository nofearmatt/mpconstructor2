import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo/metadata'

/**
 * Генерирует sitemap.xml для поисковых систем
 * Автоматически обновляется при билде
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  // Основные страницы сайта
  const routes = ['', '/configurator', '/dashboard', '/admin'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : 0.8,
  }))

  return routes
}
