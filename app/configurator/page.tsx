import PackageBuilder from '@/components/configurator/PackageBuilder'
import { JsonLd } from '@/components/seo/JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo/schemas'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata = generatePageMetadata({
  title: 'Конфигуратор заказа',
  description:
    'Выберите готовый пакет или создайте свой собственный план контент-съёмки для маркетплейсов',
  path: '/configurator',
})

const breadcrumbs = [
  { name: 'Главная', url: '/' },
  { name: 'Конфигуратор', url: '/configurator' },
]

export default function ConfiguratorPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-primary-600">
              MPConstructor
            </a>
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Вернуться на главную
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Конфигуратор заказа
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Выберите готовый пакет или кастомизируйте его под свои задачи
          </p>
        </div>

        {/* Package Builder Component */}
        <PackageBuilder />
      </div>
    </div>
    </>
  )
}
