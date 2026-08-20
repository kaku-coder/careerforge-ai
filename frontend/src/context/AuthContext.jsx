import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const API_BASE_URL = 'http://localhost:5000/api/auth'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('career_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Save user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('career_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('career_user')
    }
  }, [user])

  // Fetch current user profile on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })
        const data = await response.json()
        if (response.ok && data.success && data.user) {
          setUser(data.user)
        }
      } catch (e) {
        console.log('No active session found', e)
      }
    }
    checkAuthStatus()
  }, [])

  // Helper to get initials from name or email
  const getInitials = () => {
    if (!user) return ''
    const nameStr = user.username || user.name || user.email || ''
    if (!nameStr) return 'U'

    const parts = nameStr.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    } else if (parts[0].length >= 2) {
      return parts[0].substring(0, 2).toUpperCase()
    }
    return parts[0][0].toUpperCase()
  }

  // Real login API handler
  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check your credentials.')
      }

      setUser(data.user)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Real register API handler
  const register = async (username, email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed. Please try again.')
      }

      setUser(data.user)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Logout handler
  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (e) {
      console.error(e)
    }
    setUser(null)
    localStorage.removeItem('career_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        login,
        register,
        logout,
        initials: getInitials(),
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
