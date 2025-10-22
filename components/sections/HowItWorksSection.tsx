import { Package, Factory, Download, TrendingUp } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Package,
      title: 'ВЫ СОЗДАЕТЕ ЗАДАЧУ',
      description: 'Вы выбираете свой сценарий (Новый товар или Существующий), указываете количество и передаете нам товары удобным способом (СДЭК, такси или лично). На этом ваша работа закончена.',
      time: '5 минут',
      color: 'primary',
    },
    {
      icon: Factory,
      title: 'НАША ФАБРИКА РАБОТАЕТ',
      description: 'Наши эксперты принимают товар, проводят съёмку по «Золотому Стандарту» (8-12+ ракурсов), делают базовую обработку и загружают все превью в ваш личный кабинет.',
      time: '24 часа',
      color: 'accent',
    },
    {
      icon: Download,
      title: 'ВЫ СОБИРАЕТЕ РЕЗУЛЬТАТ',
      description: 'Вы заходите в личный кабинет и видите все готовые материалы. Как в конструкторе, вы выбираете и скачиваете только то, что вам нужно: базовые фото-заготовки, готовые слайды, видеообзоры.',
      time: '10 минут',
      color: 'primary',
    },
    {
      icon: TrendingUp,
      title: 'ВАШИ ПРОДАЖИ РАСТУТ',
      description: 'Вы загружаете новый, профессиональный контент на маркетплейс и наблюдаете за ростом CTR, конверсии и продаж. Ваша контент-рутина теперь полностью делегирована.',
      time: 'Навсегда',
      color: 'green',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            От товара до продающей карточки
            <br />
            <span className="text-primary-600">за 3 простых шага</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создали конвейер, где от вас требуется минимальное участие.
          </p>
        </div>

        {/* Шаги процесса */}
        <div className="relative">
          {/* Connecting Line - только на desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-300 via-accent-300 to-green-300 -translate-y-1/2" style={{ top: '80px' }} />

          <div className="grid lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {/* Шаг */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                    {/* Иконка */}
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center
                      ${step.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                        step.color === 'accent' ? 'bg-accent-100 text-accent-600' :
                        'bg-green-100 text-green-600'}`}
                    >
                      <Icon size={32} />
                    </div>

                    {/* Номер шага */}
                    <div className="text-center mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                        ${step.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                          step.color === 'accent' ? 'bg-accent-100 text-accent-700' :
                          'bg-green-100 text-green-700'}`}
                      >
                        Шаг {index + 1}
                      </span>
                    </div>

                    {/* Заголовок */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>

                    {/* Описание */}
                    <p className="text-gray-600 text-sm mb-4 text-center">
                      {step.description}
                    </p>

                    {/* Время */}
                    <div className="text-center">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {step.time}
                      </span>
                    </div>
                  </div>

                  {/* Стрелка между шагами - только на desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 -right-4 text-gray-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA кнопка */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Посмотрите, как это выглядит вживую
          </h3>
          <a href="/configurator" className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
            💻 Открыть Конфигуратор Заказа
          </a>
        </div>
      </div>
    </section>
  )
}
