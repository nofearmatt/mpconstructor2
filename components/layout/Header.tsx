'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">
              MPConstructor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#how-it-works"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Как это работает
            </Link>
            <Link
              href="/#gallery"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Примеры работ
            </Link>
            <Link
              href="/#testimonials"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Отзывы
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Мои заказы
            </Link>
            <Link
              href="/configurator"
              className="inline-flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all active:scale-95"
            >
              Создать заказ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/#how-it-works"
                className="px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Как это работает
              </Link>
              <Link
                href="/#gallery"
                className="px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Примеры работ
              </Link>
              <Link
                href="/#testimonials"
                className="px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Отзывы
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Мои заказы
              </Link>
              <Link
                href="/configurator"
                className="mx-4 px-6 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Создать заказ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
