import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const StatsContext = createContext(null)

const INITIAL_STATS = {
  totalInterviews: 0,
  questionsAnswered: 0,
  completedInterviews: 0,
  averageScore: 0,
  technicalCount: 0,
  hrCount: 0,
}

export const StatsProvider = ({ children }) => {
  const [userStats, setUserStats] = useState(() => {
    try {
      const savedStats = localStorage.getItem('career_user_stats')
      return savedStats ? JSON.parse(savedStats) : INITIAL_STATS
    } catch {
      return INITIAL_STATS
    }
  })

  // Persist userStats to localStorage
  useEffect(() => {
    localStorage.setItem('career_user_stats', JSON.stringify(userStats))
  }, [userStats])

  const updateUserStats = useCallback((newStats) => {
    setUserStats((prev) => ({ ...prev, ...newStats }))
  }, [])

  const resetUserStats = useCallback(() => {
    setUserStats(INITIAL_STATS)
    localStorage.removeItem('career_user_stats')
  }, [])

  const contextValue = useMemo(
    () => ({
      userStats,
      setUserStats,
      updateUserStats,
      resetUserStats,
    }),
    [userStats, updateUserStats, resetUserStats]
  )

  return (
    <StatsContext.Provider value={contextValue}>
      {children}
    </StatsContext.Provider>
  )
}

export const useStats = () => {
  const context = useContext(StatsContext)
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider')
  }
  return context
}

export default StatsContext
