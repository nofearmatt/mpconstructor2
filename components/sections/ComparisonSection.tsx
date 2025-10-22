export default function ComparisonSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Хватит быть продюсером для фотографа.
            <br />
            <span className="text-primary-600">Займитесь бизнесом.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы изменили правила игры, чтобы вы могли сфокусироваться на главном — вашей прибыли.
          </p>
        </div>

        {/* Таблица сравнения */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Старый мир - левая колонка (серая) */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              СТАРЫЙ МИР
              <br />
              <span className="text-base font-normal text-gray-600">(Как работают все)</span>
            </h3>

            <div className="space-y-6">
              {/* Пункт 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">🤯</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Вы составляете ТЗ</h4>
                  <p className="text-gray-600 text-sm">
                    Изучаете ракурсы, ищете референсы, пытаетесь объяснить, что вам нужно.
                  </p>
                </div>
              </div>

              {/* Пункт 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">💸</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Вы платите наперед</h4>
                  <p className="text-gray-600 text-sm">
                    Вносите 50% или 100% предоплаты, еще не видя ни одного кадра. Весь риск на вас.
                  </p>
                </div>
              </div>

              {/* Пункт 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">⏳</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Вы контролируете и ждете</h4>
                  <p className="text-gray-600 text-sm">
                    Согласовываете, вносите правки, ждете результат неделями. Тратите свое время на микроменеджмент.
                  </p>
                </div>
              </div>

              {/* Пункт 4 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">📂</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Вы получаете 5 файлов JPG</h4>
                  <p className="text-gray-600 text-sm">
                    Ваш результат — это несколько файлов в папке. Нужен новый ракурс? Заказывайте новую съёмку.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Наш мир - правая колонка (зеленая) */}
          <div className="bg-primary-50 border-2 border-primary-600 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-primary-900 mb-6 text-center">
              НАШ МИР
              <br />
              <span className="text-base font-normal text-primary-700">(Как работаем мы)</span>
            </h3>

            <div className="space-y-6">
              {/* Пункт 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">✅</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Никакого ТЗ</h4>
                  <p className="text-gray-700 text-sm">
                    Мы — эксперты по маркетплейсам. Наш «Золотой Стандарт» съёмки покрывает 95% потребностей. Для сложных товаров — мы сами зададим 2 уточняющих вопроса.
                  </p>
                </div>
              </div>

              {/* Пункт 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">✅</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Вы платите за результат</h4>
                  <p className="text-gray-700 text-sm">
                    Сначала вы видите все готовые фото в личном кабинете. Понравилось — покупаете. Не понравилось — не платите ничего. Весь риск на нас.
                  </p>
                </div>
              </div>

              {/* Пункт 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">✅</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Вы делегируете и получаете</h4>
                  <p className="text-gray-700 text-sm">
                    Просто передаете нам товар. Мы гарантируем готовый результат в вашем личном кабинете за 24 часа.
                  </p>
                </div>
              </div>

              {/* Пункт 4 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">✅</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Вы получаете контент-актив</h4>
                  <p className="text-gray-700 text-sm">
                    Все 8-12+ отснятых ракурсов хранятся в вашей личной библиотеке. Докупайте нужные фото в любой момент, без новой съёмки.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Центральный тезис */}
        <div className="text-center bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-2xl p-8 mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2">
            Мы не продаем фотографии.
          </h3>
          <p className="text-xl">
            Мы продаем освобожденное время и предсказуемый рост продаж.
          </p>
        </div>

        {/* Дублирующие кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all hover:scale-105">
            🚀 Запустить новый товар
          </button>
          <button className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-all hover:scale-105">
            ♻️ Улучшить существующий
          </button>
        </div>
      </div>
    </section>
  )
}
