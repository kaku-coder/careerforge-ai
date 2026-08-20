import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

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
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      await fetch('http://localhost:8000/api/auth/logout', { method: 'POST' })
    } catch (e) {
      console.error(e)
    }
    setUser(null)
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
