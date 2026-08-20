import { useState, useCallback } from 'react'

export const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  const execute = useCallback(
    async (...params) => {
      setLoading(true)
      setError(null)
      try {
        const response = await asyncFunction(...params)
        setValue(response)
        return response
      } catch (err) {
        setError(err.message || 'An error occurred')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [asyncFunction]
  )

  return { execute, loading, value, error }
}

export default useAsync
