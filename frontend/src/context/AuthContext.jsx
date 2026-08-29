import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

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
        } else {
          setUser(null)
          localStorage.removeItem('career_user')
        }
      } catch (e) {
        console.log('No active session found', e)
      }
    }
    checkAuthStatus()
  }, [])

  // Memoized helper to get initials
  const initials = useMemo(() => {
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
  }, [user])

  // Memoized login API handler
  const login = useCallback(async (email, password) => {
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
  }, [])

  // Memoized register API handler
  const register = useCallback(async (username, email, password) => {
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
  }, [])

  // Memoized logout handler
  const logout = useCallback(async () => {
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
  }, [])

  const INITIAL_STATS = useMemo(() => ({
    totalInterviews: 0,
    questionsAnswered: 0,
    completedInterviews: 0,
    averageScore: 0,
    technicalCount: 0,
    hrCount: 0,
  }), [])

  const [userStats, setUserStats] = useState(() => {
    try {
      const savedStats = localStorage.getItem('career_user_stats')
      return savedStats ? JSON.parse(savedStats) : INITIAL_STATS
    } catch {
      return INITIAL_STATS
    }
  })

  // Save userStats to localStorage
  useEffect(() => {
    localStorage.setItem('career_user_stats', JSON.stringify(userStats))
  }, [userStats])

  const updateUserStats = useCallback((newStats) => {
    setUserStats((prev) => ({ ...prev, ...newStats }))
  }, [])

  const isAuthenticated = useMemo(() => !!user, [user])

  // Memoize context value to eliminate unnecessary consumer re-renders
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      loading,
      error,
      login,
      register,
      logout,
      initials,
      isAuthenticated,
      userStats,
      updateUserStats,
    }),
    [user, loading, error, login, register, logout, initials, isAuthenticated, userStats, updateUserStats]
  )

  return (
    <AuthContext.Provider value={contextValue}>
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
