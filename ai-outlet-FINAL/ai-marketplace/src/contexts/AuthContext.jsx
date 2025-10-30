import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

// Check if we're in demo mode (no real Supabase credentials)
const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'https://demo.supabase.co'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    if (isDemoMode) {
      // In demo mode, check localStorage for user
      const demoUser = JSON.parse(localStorage.getItem('ai_outlet_demo_user') || 'null')
      setUser(demoUser)
      setSession(demoUser ? { user: demoUser } : null)
      setLoading(false)
    } else {
      // Real Supabase mode
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email, password, metadata = {}) => {
    if (isDemoMode) {
      // Demo mode: Create a fake user
      const demoUser = {
        id: 'demo-' + Date.now(),
        email,
        created_at: new Date().toISOString(),
        user_metadata: metadata
      }
      localStorage.setItem('ai_outlet_demo_user', JSON.stringify(demoUser))
      setUser(demoUser)
      setSession({ user: demoUser })
      return { data: { user: demoUser }, error: null }
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }

  const signIn = async (email, password) => {
    if (isDemoMode) {
      // Demo mode: Accept any credentials
      const demoUser = {
        id: 'demo-' + Date.now(),
        email,
        created_at: new Date().toISOString()
      }
      localStorage.setItem('ai_outlet_demo_user', JSON.stringify(demoUser))
      setUser(demoUser)
      setSession({ user: demoUser })
      return { data: { user: demoUser }, error: null }
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }

  const signOut = async () => {
    if (isDemoMode) {
      localStorage.removeItem('ai_outlet_demo_user')
      setUser(null)
      setSession(null)
      return { error: null }
    }
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  }

  const resetPassword = async (email) => {
    try {
      if (isDemoMode) {
        // Demo mode: Just return success
        return { data: { message: 'Password reset email sent (demo mode)' }, error: null }
      }
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isDemoMode
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

