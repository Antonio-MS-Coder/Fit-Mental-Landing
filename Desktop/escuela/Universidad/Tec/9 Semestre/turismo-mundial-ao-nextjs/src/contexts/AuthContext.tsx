"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

export type UserRole = 'job_seeker' | 'employer' | 'admin'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
  // Job Seeker specific
  skills?: string[]
  experience?: string
  location?: string
  phone?: string
  // Employer specific
  companyName?: string
  companyDescription?: string
  website?: string
  industry?: string
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  needsRoleSelection: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithPhone: (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => Promise<ConfirmationResult>
  verifyPhoneCode: (confirmationResult: ConfirmationResult, code: string) => Promise<void>
  signUpWithPhone: (phoneNumber: string, displayName: string, role: UserRole, additionalData?: Partial<UserProfile>) => Promise<void>
  signUp: (email: string, password: string, displayName: string, role: UserRole, additionalData?: Partial<UserProfile>) => Promise<void>
  selectUserRole: (role: UserRole) => Promise<void>
  logout: () => Promise<void>
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [needsRoleSelection, setNeedsRoleSelection] = useState(false)

  // Load user profile from Firestore
  const loadUserProfile = async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        setUserProfile({
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as UserProfile)
        setNeedsRoleSelection(false)
      } else {
        // User exists in Firebase Auth but no profile in Firestore - needs role selection
        setNeedsRoleSelection(true)
        setUserProfile(null)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  // Sign up function
  const signUp = async (
    email: string, 
    password: string, 
    displayName: string, 
    role: UserRole,
    additionalData: Partial<UserProfile> = {}
  ) => {
    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update user profile
      await updateProfile(user, { displayName })
      
      // Create user document in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email,
        displayName,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...additionalData
      }
      
      await setDoc(doc(db, 'users', user.uid), userProfile)
      setUserProfile(userProfile)
      setNeedsRoleSelection(false)
      
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  // Phone authentication
  const signInWithPhone = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
    setLoading(true)
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      setLoading(false)
      return confirmationResult
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const verifyPhoneCode = async (confirmationResult: ConfirmationResult, code: string) => {
    setLoading(true)
    try {
      await confirmationResult.confirm(code)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signUpWithPhone = async (
    phoneNumber: string,
    displayName: string,
    role: UserRole,
    additionalData: Partial<UserProfile> = {}
  ) => {
    if (!user) return
    
    setLoading(true)
    try {
      // Update user profile
      await updateProfile(user, { displayName })
      
      // Create user document in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName,
        role,
        phone: phoneNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...additionalData
      }
      
      await setDoc(doc(db, 'users', user.uid), userProfile)
      setUserProfile(userProfile)
      setNeedsRoleSelection(false)
      
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  // Select user role after Google sign in
  const selectUserRole = async (role: UserRole) => {
    if (!user) return
    
    setLoading(true)
    try {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'Usuario',
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      await setDoc(doc(db, 'users', user.uid), userProfile)
      setUserProfile(userProfile)
      setNeedsRoleSelection(false)
      
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth)
      setUserProfile(null)
      setNeedsRoleSelection(false)
    } catch (error) {
      throw error
    }
  }

  // Update user profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user || !userProfile) return
    
    try {
      const updatedProfile = {
        ...userProfile,
        ...data,
        updatedAt: new Date()
      }
      
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true })
      setUserProfile(updatedProfile)
    } catch (error) {
      throw error
    }
  }

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        await loadUserProfile(user.uid)
      } else {
        setUserProfile(null)
        setNeedsRoleSelection(false)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    needsRoleSelection,
    signIn,
    signInWithGoogle,
    signInWithPhone,
    verifyPhoneCode,
    signUpWithPhone,
    signUp,
    selectUserRole,
    logout,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}