'use client'

import { useState } from 'react'

export default function GallerySection() {
  const [activeSlide, setActiveSlide] = useState(0)

  const beforeAfterExamples = [
    {
      category: 'Косметика',
      before: 'Фото на подоконнике, желтый свет, тени',
      after: 'Идеальный белый фон, профессиональный свет, высокое разрешение',
    },
    {
      category: 'Одежда',
      before: 'Смятая ткань, плохой ракурс, размытость',
      after: 'Аккуратная раскладка, детальные текстуры, четкие края',
    },
    {
      category: 'Электроника',
      before: 'Пыль, отражения, неровный фон',
      after: 'Чистота, идеальная передача цвета, отсутствие бликов',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Превращаем «норм» в «вау!»
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Посмотрите, как наши фото-заготовки становятся основой для карточек, которые продают.
          </p>
        </div>

        {/* Раздел 1: Галерея До/После */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Галерея «ДО / ПОСЛЕ»</h3>

          {/* Slider Controls */}
          <div className="flex justify-center gap-4 mb-8">
            {beforeAfterExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeSlide === index
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {example.category}
              </button>
            ))}
          </div>

          {/* Before/After Comparison */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* ДО */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <div className="bg-gray-200 h-64 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p className="text-sm mb-2">📸 ДО</p>
                    <p className="font-semibold">Фото на телефон</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>Проблемы:</strong> {beforeAfterExamples[activeSlide].before}
                </p>
              </div>

              {/* ПОСЛЕ */}
              <div className="bg-primary-50 rounded-2xl p-6 border-2 border-primary-600 shadow-xl">
                <div className="bg-white h-64 rounded-lg mb-4 flex items-center justify-center border-2 border-primary-200">
                  <div className="text-center text-primary-600">
                    <p className="text-sm mb-2">✨ ПОСЛЕ</p>
                    <p className="font-semibold">Наша фото-заготовка</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Результат:</strong> {beforeAfterExamples[activeSlide].after}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Раздел 2: Конструктор в действии */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Конструктор в действии: от заготовки до шедевра
          </h3>

          <div className="max-w-4xl mx-auto">
            {/* Этап 1: Шасси */}
            <div className="text-center mb-8">
              <p className="text-lg font-semibold text-gray-700 mb-4">
                1. ВАШЕ «ШАССИ» <span className="text-primary-600">(то, что мы даем бесплатно)</span>
              </p>
              <div className="bg-white border-2 border-primary-600 rounded-xl p-8 inline-block">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
                <p className="mt-4 text-gray-600 font-semibold">Идеальная фото-заготовка</p>
              </div>
            </div>

            {/* Стрелка вниз */}
            <div className="text-center text-4xl text-primary-600 mb-8">⬇️</div>

            {/* Этап 2: Навесные модули */}
            <div className="text-center mb-8">
              <p className="text-lg font-semibold text-gray-700 mb-6">
                2. ВАШИ «НАВЕСНЫЕ МОДУЛИ» <span className="text-accent-500">(то, что вы можете добавить)</span>
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-accent-50 border border-accent-300 rounded-lg p-4">
                  <div className="text-3xl mb-2">📊</div>
                  <p className="font-semibold text-sm">Инфографика</p>
                  <p className="text-xs text-gray-600">Текст, иконки, плашки</p>
                </div>
                <div className="bg-accent-50 border border-accent-300 rounded-lg p-4">
                  <div className="text-3xl mb-2">✨</div>
                  <p className="font-semibold text-sm">Глубокая ретушь</p>
                  <p className="text-xs text-gray-600">Идеальная чистота</p>
                </div>
                <div className="bg-accent-50 border border-accent-300 rounded-lg p-4">
                  <div className="text-3xl mb-2">🎥</div>
                  <p className="font-semibold text-sm">Видеообзор</p>
                  <p className="text-xs text-gray-600">360° обзор товара</p>
                </div>
              </div>
            </div>

            {/* Стрелка вниз */}
            <div className="text-center text-4xl text-primary-600 mb-8">⬇️</div>

            {/* Этап 3: Результат */}
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 mb-4">
                3. ВАШ ФИНАЛЬНЫЙ РЕЗУЛЬТАТ
              </p>
              <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-xl p-8">
                <div className="text-4xl mb-4">🎯</div>
                <p className="font-semibold text-xl mb-2">Карточка товара, которая привлекает внимание и продает</p>
                <p className="text-sm opacity-90">Готово к загрузке на Wildberries или Ozon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Раздел 3: Статистика */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Говорят цифры</h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-primary-50 rounded-2xl p-8">
              <div className="text-5xl font-bold text-primary-600 mb-2">+78%</div>
              <p className="text-gray-700 font-semibold mb-1">Средний рост CTR</p>
              <p className="text-sm text-gray-600">главной обложки после нашего «Апгрейда»</p>
            </div>

            <div className="text-center bg-accent-50 rounded-2xl p-8">
              <div className="text-5xl font-bold text-accent-600 mb-2">в 3 раза</div>
              <p className="text-gray-700 font-semibold mb-1">Быстрее</p>
              <p className="text-sm text-gray-600">мы создаем контент по сравнению с фрилансером</p>
            </div>

            <div className="text-center bg-green-50 rounded-2xl p-8">
              <div className="text-5xl font-bold text-green-600 mb-2">-90%</div>
              <p className="text-gray-700 font-semibold mb-1">Времени тратят</p>
              <p className="text-sm text-gray-600">наши клиенты на постановку задач</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="/configurator" className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all hover:scale-105 shadow-lg">
            Попробовать бесплатно для 5 своих товаров
          </a>
        </div>
      </div>
    </section>
  )
}
