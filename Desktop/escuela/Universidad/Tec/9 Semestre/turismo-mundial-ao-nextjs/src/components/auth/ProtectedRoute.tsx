"use client"

import React from 'react'
import { useAuth, UserRole } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectTo = '/auth/signin' 
}: ProtectedRouteProps) {
  const { user, userProfile, needsRoleSelection, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
        // Redirect based on user role
        switch (userProfile.role) {
          case 'job_seeker':
            router.push('/dashboard/job-seeker')
            break
          case 'employer':
            router.push('/dashboard/employer')
            break
          case 'admin':
            router.push('/dashboard/admin')
            break
          default:
            router.push('/')
        }
        return
      }
    }
  }, [user, userProfile, loading, allowedRoles, redirectTo, router])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-secondary-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // User not authenticated
  if (!user) {
    return null
  }

  // User doesn't have required role
  if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
    return null
  }

  return <>{children}</>
}