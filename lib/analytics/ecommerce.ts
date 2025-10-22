/**
 * E-commerce tracking для Яндекс.Метрики и Google Analytics
 *
 * Отслеживание товаров, корзины и покупок через dataLayer
 */

/**
 * Инициализация dataLayer если его нет
 */
function initDataLayer() {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = []
  }
}

/**
 * Отправка события в dataLayer
 */
function pushToDataLayer(data: any) {
  if (typeof window === 'undefined') return

  initDataLayer()

  try {
    window.dataLayer.push(data)

    // Логирование в dev режиме
    if (process.env.NODE_ENV === 'development') {
      console.log('🛒 E-commerce Event:', data)
    }
  } catch (error) {
    console.error('Ошибка отправки в dataLayer:', error)
  }
}

/**
 * Просмотр товара (пакета)
 */
export function ecommerceViewItem(itemData: {
  id: string
  name: string
  category: string
  price: number
}) {
  pushToDataLayer({
    ecommerce: {
      currencyCode: 'RUB',
      detail: {
        products: [
          {
            id: itemData.id,
            name: itemData.name,
            category: itemData.category,
            price: itemData.price,
            brand: 'MPConstructor',
          },
        ],
      },
    },
  })

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'RUB',
      value: itemData.price,
      items: [
        {
          item_id: itemData.id,
          item_name: itemData.name,
          item_category: itemData.category,
          price: itemData.price,
        },
      ],
    })
  }
}

/**
 * Добавление товара в корзину
 */
export function ecommerceAddToCart(itemData: {
  id: string
  name: string
  category: string
  price: number
  quantity: number
}) {
  pushToDataLayer({
    ecommerce: {
      currencyCode: 'RUB',
      add: {
        products: [
          {
            id: itemData.id,
            name: itemData.name,
            category: itemData.category,
            price: itemData.price,
            quantity: itemData.quantity,
            brand: 'MPConstructor',
          },
        ],
      },
    },
  })

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'RUB',
      value: itemData.price * itemData.quantity,
      items: [
        {
          item_id: itemData.id,
          item_name: itemData.name,
          item_category: itemData.category,
          price: itemData.price,
          quantity: itemData.quantity,
        },
      ],
    })
  }
}

/**
 * Начало оформления заказа
 */
export function ecommerceBeginCheckout(itemData: {
  id: string
  name: string
  category: string
  price: number
  quantity: number
}) {
  pushToDataLayer({
    ecommerce: {
      currencyCode: 'RUB',
      checkout: {
        actionField: {
          step: 1,
        },
        products: [
          {
            id: itemData.id,
            name: itemData.name,
            category: itemData.category,
            price: itemData.price,
            quantity: itemData.quantity,
            brand: 'MPConstructor',
          },
        ],
      },
    },
  })

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'RUB',
      value: itemData.price * itemData.quantity,
      items: [
        {
          item_id: itemData.id,
          item_name: itemData.name,
          item_category: itemData.category,
          price: itemData.price,
          quantity: itemData.quantity,
        },
      ],
    })
  }
}

/**
 * Покупка (главное событие для e-commerce)
 */
export function ecommercePurchase(purchaseData: {
  orderId: string
  category: string
  modules: string[]
  quantity: number
  total: number
  deliveryMethod: string
}) {
  const products = [
    {
      id: `${purchaseData.category}_${purchaseData.modules.join('_')}`,
      name: `Пакет ${purchaseData.category}`,
      category: purchaseData.category,
      price: purchaseData.total,
      quantity: purchaseData.quantity,
      brand: 'MPConstructor',
      variant: purchaseData.modules.join(', '),
    },
  ]

  pushToDataLayer({
    ecommerce: {
      currencyCode: 'RUB',
      purchase: {
        actionField: {
          id: purchaseData.orderId,
          revenue: purchaseData.total,
          shipping: 0, // Пока бесплатная доставка
        },
        products: products,
      },
    },
  })

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: purchaseData.orderId,
      value: purchaseData.total,
      currency: 'RUB',
      shipping: 0,
      items: [
        {
          item_id: products[0].id,
          item_name: products[0].name,
          item_category: products[0].category,
          price: products[0].price,
          quantity: products[0].quantity,
        },
      ],
    })
  }
}

/**
 * Удаление товара из корзины (если понадобится)
 */
export function ecommerceRemoveFromCart(itemData: {
  id: string
  name: string
  category: string
  price: number
  quantity: number
}) {
  pushToDataLayer({
    ecommerce: {
      currencyCode: 'RUB',
      remove: {
        products: [
          {
            id: itemData.id,
            name: itemData.name,
            category: itemData.category,
            price: itemData.price,
            quantity: itemData.quantity,
            brand: 'MPConstructor',
          },
        ],
      },
    },
  })

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      currency: 'RUB',
      value: itemData.price * itemData.quantity,
      items: [
        {
          item_id: itemData.id,
          item_name: itemData.name,
          item_category: itemData.category,
          price: itemData.price,
          quantity: itemData.quantity,
        },
      ],
    })
  }
}
