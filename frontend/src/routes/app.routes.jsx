import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import MainLayout from '../mainPages/MainLayout'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import ResumePage from '../pages/ResumePage'
import { useAuth } from '../context/AuthContext'

// Guard for routes requiring authentication
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children ? children : <Outlet />
}

// Guard for auth pages (redirects authenticated users to home)
const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth()
  if (user) {
    return <Navigate to="/" replace />
  }
  return children ? children : <Outlet />
}

import HomePage from '../mainPages/HomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'login',
        element: (
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'interview',
        element: (
          <ProtectedRoute>
            <div className="p-8 sm:p-10 font-mono text-xl font-bold">// INTERVIEW SYSTEM</div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'roadmap',
        element: (
          <ProtectedRoute>
            <div className="p-8 sm:p-10 font-mono text-xl font-bold">// ROADMAP SYSTEM</div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'resume',
        element: (
          <ProtectedRoute>
            <ResumePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'scorer',
        element: (
          <ProtectedRoute>
            <div className="p-8 sm:p-10 font-mono text-xl font-bold">// RESUME SCORER</div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'analytics',
        element: (
          <ProtectedRoute>
            <div className="p-8 sm:p-10 font-mono text-xl font-bold">// ANALYTICS SYSTEM</div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'agents',
        element: (
          <ProtectedRoute>
            <div className="p-8 sm:p-10 font-mono text-xl font-bold">// AI AGENTS HUB</div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <div className="p-8 sm:p-10 font-mono text-xl font-bold">// SYSTEM SETTINGS</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default router

