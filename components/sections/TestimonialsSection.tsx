export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Я думала, у меня нормальные фото, пока не увидела результат от MPConstructor. Это просто другой уровень. Продажи выросли почти сразу же!",
      author: "Марина В.",
      business: "бренд аксессуаров",
      rating: 5,
    },
    {
      quote: "Главное, что вы мне продали — это время. Я перестал думать о фотографиях вообще. Просто отправляю партию новых товаров и через день получаю готовые исходники. Гениально.",
      author: "Дмитрий П.",
      business: "товары для дома",
      rating: 5,
    },
    {
      quote: "С вашими фото я наконец-то почувствовала, что у меня серьезный бренд! Раньше стеснялась своих карточек, теперь горжусь ими.",
      author: "Анна С.",
      business: "косметика",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Говорят <span className="text-primary-600">люди</span>
          </h2>
          <p className="text-xl text-gray-600">
            Реальные отзывы от селлеров, которые уже увеличили свои продажи
          </p>
        </div>

        {/* Отзывы */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              {/* Рейтинг */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Цитата */}
              <blockquote className="text-gray-700 mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Автор */}
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительное социальное доказательство */}
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-primary-50 rounded-xl">
            <div className="text-3xl font-bold text-primary-600 mb-1">1,250+</div>
            <p className="text-sm text-gray-600">Довольных клиентов</p>
          </div>
          <div className="text-center p-6 bg-accent-50 rounded-xl">
            <div className="text-3xl font-bold text-accent-600 mb-1">127,000+</div>
            <p className="text-sm text-gray-600">Отснятых товаров</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-1">4.9/5.0</div>
            <p className="text-sm text-gray-600">Средний рейтинг</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-1">24 часа</div>
            <p className="text-sm text-gray-600">SLA гарантия</p>
          </div>
        </div>
      </div>
    </section>
  )
}
