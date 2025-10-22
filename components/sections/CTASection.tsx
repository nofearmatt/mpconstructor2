'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function CTASection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      question: 'В чем подвох? Почему это бесплатно?',
      answer: 'Никакого подвоха. Мы инвестируем в долгосрочные отношения. Мы настолько уверены, что вы будете в восторге от нашего качества и удобства, что станете нашим постоянным клиентом. Наш бесплатный тест-драйв — это самый честный способ это доказать.'
    },
    {
      question: 'Кто платит за доставку товаров?',
      answer: 'Логистика — это ваша зона ответственности. Вы организуете доставку товаров к нам и обратно удобным для вас способом (СДЭК, курьер, лично). Фото — наша работа, доставка — ваша.'
    },
    {
      question: 'Вы точно снимете то, что мне нужно, без ТЗ?',
      answer: 'Да, в 95% случаев. Наши «Золотые Стандарты» основаны на анализе тысяч успешных карточек. Для остальных 5% уникальных товаров у нас есть опция короткого «экспертного звонка», чтобы мы точно вас поняли.'
    },
    {
      question: 'Что будет после бесплатных 5 товаров?',
      answer: 'Вы сможете заказывать съёмку для любого количества товаров. Сама съёмка и создание превью в вашем кабинете всегда будут бесплатными. Вы будете платить только за те фото и модули, которые решите скачать, по прозрачному прайсу в конфигураторе.'
    },
    {
      question: 'Какая гарантия на сроки?',
      answer: 'Мы гарантируем 24 часа от получения товара до готовых фото в вашем личном кабинете. Это наш обязательный SLA. Если не уложимся — следующий заказ со скидкой 50%.'
    },
  ]

  return (
    <section id="cta" className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Главный заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Готовы делегировать контент-рутину?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Попробуйте нашу платформу на полную мощность без каких-либо вложений.
          </p>
        </div>

        {/* Бесплатный оффер - выделенный блок */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-6 text-center">
              Ваш Бесплатный Тест-Драйв<br />
              (Для первых 5 товаров)
            </h3>

            {/* Чек-лист */}
            <div className="space-y-4 mb-8 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold">✓</div>
                <p className="text-white"><strong>Профессиональная съёмка</strong> до 5 товаров по нашему «Золотому Стандарту» (40-60 фото-заготовок).</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold">✓</div>
                <p className="text-white"><strong>Полный доступ</strong> ко всем превью в вашем личном кабинете (DAM).</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold">✓</div>
                <p className="text-white"><strong>Бесплатное скачивание ВСЕХ</strong> отснятых материалов с полной передачей прав.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold">✓</div>
                <p className="text-white"><strong>(Опционально)</strong> Для товаров на МП — SEO-выкуп, экспертный отзыв, дизайн инфографики и видеообзор также за наш счёт.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold">✓</div>
                <p className="text-white"><strong>Никаких скрытых платежей</strong>, обязательств или привязки карты.</p>
              </div>
            </div>

            {/* Ценность */}
            <div className="text-center mb-8">
              <p className="text-2xl font-semibold mb-2">
                Денежная ценность вашего бесплатного пакета: <span className="line-through opacity-75">~50,000 ₽</span>
              </p>
              <p className="text-4xl font-bold">Ваша цена: 0 ₽</p>
            </div>

            {/* CTA Кнопка */}
            <div className="text-center">
              <a href="/configurator" className="inline-block bg-white text-primary-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl">
                🚀 Начать бесплатный тест-драйв
              </a>
              <p className="text-sm mt-4 opacity-90">
                Регистрация займет 3 минуты. Никаких сложных анкет и привязки карты.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Часто Задаваемые Вопросы</h3>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Финальный призыв */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ваш рост в e-commerce начинается здесь
          </p>
          <a href="/configurator" className="inline-block px-10 py-5 bg-primary-600 text-white font-bold text-xl rounded-xl hover:bg-primary-700 transition-all hover:scale-105 shadow-lg">
            Начать сейчас →
          </a>
        </div>
      </div>
    </section>
  )
}
