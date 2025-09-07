"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { NAVIGATION_ITEMS } from '@/data/constants'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { LogOutIcon, UserIcon } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, userProfile, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      closeMenu()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getDashboardLink = () => {
    if (!userProfile) return '/'
    switch (userProfile.role) {
      case 'job_seeker':
        return '/dashboard/job-seeker'
      case 'employer':
        return '/dashboard/employer'
      case 'admin':
        return '/dashboard/admin'
      default:
        return '/'
    }
  }

  return (
    <nav className="main-nav fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200" role="navigation" aria-label="Navegación principal">
      <div className="nav-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Simplified Brand */}
          <div className="nav-brand flex items-center">
            <Link href="/" className="flex items-center gap-3" aria-label="Turismo Mundial AO - Página de inicio">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">AO</span>
              </div>
              <div className="hidden sm:block">
                <span className="nav-brand-text text-lg font-bold text-primary leading-tight">
                  Turismo Mundial AO
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            <div className="nav-modules flex items-center gap-1">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    pathname === item.href
                      ? "text-primary bg-primary/5"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                  )}
                  title={item.description}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>

            <div className="nav-auth flex items-center gap-3 ml-6">
              {user && userProfile ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                  >
                    <Link href={getDashboardLink()}>
                      <UserIcon className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                  >
                    <Link href="/auth/signin">
                      Iniciar Sesión
                    </Link>
                  </Button>
                  <Button 
                    size="sm"
                    asChild
                  >
                    <Link href="/auth/signup">
                      Comenzar
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Simple Mobile menu button */}
          <button
            className="nav-toggle lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors gap-1"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            type="button"
          >
            <span className={cn(
              "block w-5 h-0.5 bg-gray-700 transition-all duration-200",
              isMenuOpen && "rotate-45 translate-y-1.5"
            )} />
            <span className={cn(
              "block w-5 h-0.5 bg-gray-700 transition-all duration-200",
              isMenuOpen && "opacity-0"
            )} />
            <span className={cn(
              "block w-5 h-0.5 bg-gray-700 transition-all duration-200",
              isMenuOpen && "-rotate-45 -translate-y-1.5"
            )} />
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden border-t border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out",
            isMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          )}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="nav-menu py-6 space-y-2">
            <div className="nav-modules space-y-2 mb-8">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link flex items-center gap-4 px-6 py-4 text-base font-medium transition-all duration-200 rounded-xl mx-4 border",
                    pathname === item.href
                      ? "text-primary bg-primary/10 border-primary/20 shadow-sm"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5 border-transparent hover:border-primary/10 hover:shadow-sm"
                  )}
                  onClick={closeMenu}
                  role="menuitem"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
                    <item.icon className="nav-icon w-5 h-5 text-gray-600" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-500 font-normal leading-relaxed">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="nav-auth space-y-4 px-6 pt-6 border-t border-gray-200">
              {user && userProfile ? (
                <>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full justify-center py-3 hover:bg-primary/5 border-primary/20"
                    asChild
                  >
                    <Link href={getDashboardLink()} onClick={closeMenu}>
                      <UserIcon className="w-4 h-4 mr-2" />
                      Mi Dashboard
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="w-full justify-center py-3"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full justify-center py-3 hover:bg-primary/5 border-primary/20"
                    aria-label="Acceder a cuenta existente"
                    asChild
                  >
                    <Link href="/auth/signin" onClick={closeMenu}>
                      Iniciar Sesión
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    className="w-full justify-center py-3 shadow-md hover:shadow-lg transition-all duration-200"
                    aria-label="Crear nueva cuenta en la plataforma"
                    asChild
                  >
                    <Link href="/auth/signup" onClick={closeMenu}>
                      Comenzar Ahora
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}