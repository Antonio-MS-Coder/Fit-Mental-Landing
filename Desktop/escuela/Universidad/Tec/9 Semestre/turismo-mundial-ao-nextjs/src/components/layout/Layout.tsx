"use client"

import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
        tabIndex={1}
      >
        Saltar al contenido principal
      </a>
      
      <Header />
      <main 
        id="main-content"
        className={`main-content flex-1 pt-18 ${className || ''}`}
        role="main"
        aria-label="Contenido principal"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout