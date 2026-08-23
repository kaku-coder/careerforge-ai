import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/app.routes'
import { AuthProvider } from './context/AuthContext'
import { StatsProvider } from './context/StatsContext'

const App = () => {
  return (
    <AuthProvider>
      <StatsProvider>
        <RouterProvider router={router} />
      </StatsProvider>
    </AuthProvider>
  )
}

export default App