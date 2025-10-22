import type { Material } from '@/lib/types/material'

/**
 * Временное хранилище материалов (MVP)
 * В production будет заменено на файловое хранилище (S3/Supabase Storage)
 */

const materials: Material[] = [
  // Материалы для заказа ORD-1730000003-demo3 (Completed)
  {
    id: 'MAT-001',
    orderId: 'ORD-1730000003-demo3',
    type: 'photo',
    title: 'product-001-main.jpg',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200',
    thumbnail:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    size: 2458000,
    width: 1200,
    height: 1800,
    createdAt: new Date('2024-10-18T10:00:00'),
  },
  {
    id: 'MAT-002',
    orderId: 'ORD-1730000003-demo3',
    type: 'photo',
    title: 'product-001-side.jpg',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200',
    thumbnail:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    size: 2134000,
    width: 1200,
    height: 1800,
    createdAt: new Date('2024-10-18T10:15:00'),
  },
  {
    id: 'MAT-003',
    orderId: 'ORD-1730000003-demo3',
    type: 'photo',
    title: 'product-001-detail.jpg',
    url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200',
    thumbnail:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    size: 1987000,
    width: 1200,
    height: 1800,
    createdAt: new Date('2024-10-18T10:30:00'),
  },
  {
    id: 'MAT-004',
    orderId: 'ORD-1730000003-demo3',
    type: 'infographic',
    title: 'product-001-infographic.jpg',
    url: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1200',
    thumbnail:
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400',
    size: 3245000,
    width: 1200,
    height: 1200,
    createdAt: new Date('2024-10-18T11:00:00'),
  },
  {
    id: 'MAT-005',
    orderId: 'ORD-1730000003-demo3',
    type: 'photo',
    title: 'product-002-main.jpg',
    url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1200',
    thumbnail:
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400',
    size: 2567000,
    width: 1200,
    height: 1800,
    createdAt: new Date('2024-10-18T11:30:00'),
  },
  {
    id: 'MAT-006',
    orderId: 'ORD-1730000003-demo3',
    type: 'photo',
    title: 'product-003-main.jpg',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200',
    thumbnail:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    size: 2789000,
    width: 1200,
    height: 1800,
    createdAt: new Date('2024-10-18T12:00:00'),
  },
]

export function getMaterialsByOrderId(orderId: string): Material[] {
  return materials.filter((material) => material.orderId === orderId)
}

export function getMaterialById(id: string): Material | undefined {
  return materials.find((material) => material.id === id)
}

export function getMaterialsStats(orderId: string) {
  const orderMaterials = getMaterialsByOrderId(orderId)

  const totalSize = orderMaterials.reduce(
    (sum, material) => sum + material.size,
    0
  )

  const byType = {
    photo: orderMaterials.filter((m) => m.type === 'photo').length,
    video: orderMaterials.filter((m) => m.type === 'video').length,
    infographic: orderMaterials.filter((m) => m.type === 'infographic').length,
  }

  return {
    total: orderMaterials.length,
    totalSize,
    byType,
  }
}
