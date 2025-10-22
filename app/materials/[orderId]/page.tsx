'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import type { Material } from '@/lib/types/material'

export default function MaterialsPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string

  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  )
  const [downloadAllUrl, setDownloadAllUrl] = useState('')
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetchMaterials()
  }, [orderId])

  const fetchMaterials = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/materials/${orderId}`)
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Ошибка загрузки материалов')
      }

      setMaterials(data.materials)
      setStats(data.stats)
      setDownloadAllUrl(data.downloadAllUrl)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка загрузки')
    } finally {
      setIsLoading(false)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getTypeLabel = (type: Material['type']) => {
    const labels = {
      photo: 'Фото',
      video: 'Видео',
      infographic: 'Инфографика',
    }
    return labels[type]
  }

  const getTypeBadge = (type: Material['type']) => {
    const styles = {
      photo: 'bg-blue-100 text-blue-800',
      video: 'bg-purple-100 text-purple-800',
      infographic: 'bg-green-100 text-green-800',
    }

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${styles[type]}`}
      >
        {getTypeLabel(type)}
      </span>
    )
  }

  const handleDownloadAll = () => {
    alert(
      'В production версии здесь будет скачивание ZIP-архива со всеми материалами через Supabase Storage или S3'
    )
  }

  const handleDownloadSingle = (material: Material) => {
    // In production, this would download the file
    alert(`Скачивание: ${material.title}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка материалов...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Ошибка
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button variant="primary" onClick={() => router.push('/dashboard')}>
              Вернуться к заказам
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Материалы заказа
              </h1>
              <p className="text-sm text-gray-500 mt-1">ID: {orderId}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Назад к заказам
              </Button>
              <Button variant="primary" onClick={handleDownloadAll}>
                Скачать все ({formatSize(stats?.totalSize || 0)})
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Всего файлов</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Фотографии</p>
              <p className="text-3xl font-bold text-blue-600">
                {stats.byType.photo}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Инфографика</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.byType.infographic}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Общий размер</p>
              <p className="text-3xl font-bold text-purple-600">
                {formatSize(stats.totalSize)}
              </p>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedMaterial(material)}
            >
              <div className="aspect-square relative bg-gray-100">
                <img
                  src={material.thumbnail}
                  alt={material.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getTypeBadge(material.type)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate mb-2">
                  {material.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatSize(material.size)}</span>
                  {material.width && material.height && (
                    <span>
                      {material.width}×{material.height}
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownloadSingle(material)
                  }}
                >
                  Скачать
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedMaterial && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMaterial(null)}
        >
          <button
            onClick={() => setSelectedMaterial(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedMaterial.url}
              alt={selectedMaterial.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <div className="bg-white rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedMaterial.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatSize(selectedMaterial.size)} •{' '}
                    {selectedMaterial.width}×{selectedMaterial.height}
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => handleDownloadSingle(selectedMaterial)}
                >
                  Скачать
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
