/**
 * Event Tracking хелперы для Яндекс.Метрики и Google Analytics
 *
 * Единые функции для отправки событий в оба сервиса аналитики
 */

type EventParams = {
  [key: string]: string | number | boolean
}

/**
 * Базовая функция отправки события
 */
function trackEvent(
  eventName: string,
  params: EventParams = {},
  ymGoal?: string
) {
  const ymId = process.env.NEXT_PUBLIC_YM_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  // Яндекс.Метрика
  if (ymId && typeof window !== 'undefined' && window.ym) {
    try {
      // Отправка цели (если указана)
      if (ymGoal) {
        window.ym(Number(ymId), 'reachGoal', ymGoal, params)
      }
      // Отправка параметров визита
      window.ym(Number(ymId), 'params', params)
    } catch (error) {
      console.error('Ошибка отправки в Яндекс.Метрику:', error)
    }
  }

  // Google Analytics
  if (gaId && typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventName, params)
    } catch (error) {
      console.error('Ошибка отправки в Google Analytics:', error)
    }
  }

  // Логирование в dev режиме
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, params, ymGoal ? `Goal: ${ymGoal}` : '')
  }
}

/**
 * Выбор пакета в конфигураторе
 */
export function trackPackageSelect(packageName: string, price: number) {
  trackEvent(
    'package_select',
    {
      package_name: packageName,
      package_price: price,
    },
    'package_select'
  )
}

/**
 * Переход к следующему шагу в Wizard
 */
export function trackConfiguratorStep(step: number, stepName: string) {
  trackEvent(
    'configurator_step',
    {
      step_number: step,
      step_name: stepName,
    },
    `step_${step}`
  )
}

/**
 * Отправка заказа (главная конверсия)
 */
export function trackOrderSubmit(orderData: {
  orderId: string
  category: string
  modules: string[]
  quantity: number
  total: number
  deliveryMethod: string
}) {
  trackEvent(
    'order_submit',
    {
      order_id: orderData.orderId,
      category: orderData.category,
      modules_count: orderData.modules.length,
      quantity: orderData.quantity,
      total: orderData.total,
      delivery_method: orderData.deliveryMethod,
      currency: 'RUB',
    },
    'order_submit' // Цель "Отправка заказа"
  )
}

/**
 * Скачивание материала
 */
export function trackMaterialDownload(materialData: {
  orderId: string
  materialId: string
  materialType: string
  materialTitle: string
}) {
  trackEvent(
    'material_download',
    {
      order_id: materialData.orderId,
      material_id: materialData.materialId,
      material_type: materialData.materialType,
      material_title: materialData.materialTitle,
    },
    'material_download'
  )
}

/**
 * Скачивание всех материалов (ZIP архив)
 */
export function trackAllMaterialsDownload(orderId: string, filesCount: number) {
  trackEvent(
    'all_materials_download',
    {
      order_id: orderId,
      files_count: filesCount,
    },
    'all_materials_download'
  )
}

/**
 * Клик по CTA кнопке
 */
export function trackCTAClick(ctaLocation: string, ctaText: string) {
  trackEvent('cta_click', {
    cta_location: ctaLocation,
    cta_text: ctaText,
  })
}

/**
 * Просмотр раздела FAQ
 */
export function trackFAQView(questionIndex: number, question: string) {
  trackEvent('faq_view', {
    question_index: questionIndex,
    question: question,
  })
}

/**
 * Вход в личный кабинет
 */
export function trackDashboardLogin(email: string) {
  trackEvent(
    'dashboard_login',
    {
      email_domain: email.split('@')[1], // Только домен для приватности
    },
    'dashboard_login'
  )
}

/**
 * Просмотр деталей заказа
 */
export function trackOrderView(orderId: string, orderStatus: string) {
  trackEvent('order_view', {
    order_id: orderId,
    order_status: orderStatus,
  })
}

/**
 * Начало заполнения формы заказа
 */
export function trackFormStart() {
  trackEvent('form_start', {}, 'form_start')
}

/**
 * Ошибка валидации формы
 */
export function trackFormError(fieldName: string, errorMessage: string) {
  trackEvent('form_error', {
    field_name: fieldName,
    error_message: errorMessage,
  })
}

/**
 * Переход на внешнюю ссылку
 */
export function trackOutboundLink(url: string, linkText: string) {
  trackEvent('outbound_link', {
    url: url,
    link_text: linkText,
  })
}
