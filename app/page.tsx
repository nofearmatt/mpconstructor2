import HeroSection from '@/components/sections/HeroSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import GallerySection from '@/components/sections/GallerySection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import { JsonLd } from '@/components/seo/JsonLd'
import { getFAQSchema } from '@/lib/seo/schemas'

const faqs = [
  {
    question: 'В чем подвох? Почему это бесплатно?',
    answer:
      'Никакого подвоха. Мы инвестируем в долгосрочные отношения. Мы настолько уверены, что вы будете в восторге от нашего качества и удобства, что станете нашим постоянным клиентом. Наш бесплатный тест-драйв — это самый честный способ это доказать.',
  },
  {
    question: 'Кто платит за доставку товаров?',
    answer:
      'Логистика — это ваша зона ответственности. Вы организуете доставку товаров к нам и обратно удобным для вас способом (СДЭК, курьер, лично). Фото — наша работа, доставка — ваша.',
  },
  {
    question: 'Вы точно снимете то, что мне нужно, без ТЗ?',
    answer:
      'Да, в 95% случаев. Наши «Золотые Стандарты» основаны на анализе тысяч успешных карточек. Для остальных 5% уникальных товаров у нас есть опция короткого «экспертного звонка», чтобы мы точно вас поняли.',
  },
  {
    question: 'Что будет после бесплатных 5 товаров?',
    answer:
      'Вы сможете заказывать съёмку для любого количества товаров. Сама съёмка и создание превью в вашем кабинете всегда будут бесплатными. Вы будете платить только за те фото и модули, которые решите скачать, по прозрачному прайсу в конфигураторе.',
  },
  {
    question: 'Какая гарантия на сроки?',
    answer:
      'Мы гарантируем 24 часа от получения товара до готовых фото в вашем личном кабинете. Это наш обязательный SLA. Если не уложимся — следующий заказ со скидкой 50%.',
  },
]

export default function Home() {
  return (
    <>
      <JsonLd data={getFAQSchema(faqs)} />
      <main className="min-h-screen">
        {/* Hero Section - Главный экран с оффером */}
        <HeroSection />

        {/* Сравнение: Старый мир vs Наш мир */}
        <ComparisonSection />

        {/* Как это работает за 3 шага */}
        <HowItWorksSection />

        {/* Галерея "До/После" */}
        <GallerySection />

        {/* Отзывы и статистика */}
        <TestimonialsSection />

        {/* Финальный CTA + FAQ */}
        <CTASection />
      </main>
    </>
  )
}
