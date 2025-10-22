export type MaterialType = 'photo' | 'video' | 'infographic'

export interface Material {
  id: string
  orderId: string
  type: MaterialType
  title: string
  url: string
  thumbnail: string
  size: number // в байтах
  width?: number
  height?: number
  createdAt: Date
}

export interface MaterialsResponse {
  success: boolean
  materials?: Material[]
  error?: string
  downloadAllUrl?: string
}
