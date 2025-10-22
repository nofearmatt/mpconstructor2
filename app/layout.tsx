import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import { DEFAULT_METADATA } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { getOrganizationSchema, getServiceSchema } from '@/lib/seo/schemas'
import { Analytics } from '@/components/analytics/Analytics'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = DEFAULT_METADATA

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <JsonLd
          data={[getOrganizationSchema(), getServiceSchema()]}
        />
      </head>
      <body className="font-sans antialiased">
        <Analytics />
        <Header />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  )
}
