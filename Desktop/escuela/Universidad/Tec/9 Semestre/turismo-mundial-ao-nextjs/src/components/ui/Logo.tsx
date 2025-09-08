import React from 'react'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
}

export function Logo({ size = 'md', className = '', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  }

  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 shadow-lg`}>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-2 border-white rounded-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-white/70"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-full bg-white/70"></div>
            </div>
          </div>
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-gray-900 leading-tight`}>TURISMO</span>
          <span className={`${textSizeClasses[size]} font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 leading-tight`}>MUNDIAL AO</span>
        </div>
      )}
    </Link>
  )
}