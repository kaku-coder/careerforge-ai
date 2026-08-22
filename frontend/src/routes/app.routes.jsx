import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import OverviewPage from '../pages/OverviewPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import { useAuth } from '../context/AuthContext'

// Guard for routes requiring authentication
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children ? children : <Outlet />
}

// Guard for auth pages (redirects authenticated users to overview)
const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth()
  if (user) {
    return <Navigate to="/overview" replace />
  }
  return children ? children : <Outlet />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/overview" replace />,
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
        path: 'overview',
        element: (
          <ProtectedRoute>
            <OverviewPage />
          </ProtectedRoute>
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
            <div className="p-[40px] font-mono text-xl font-bold">INTERVIEW PAGE</div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'roadmap',
        element: (
          <ProtectedRoute>
            <div className="p-[40px] font-mono text-xl font-bold">ROADMAP PAGE</div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'resume',
        element: (
          <ProtectedRoute>
            <div className="p-[40px] font-mono text-xl font-bold">RESUME PAGE</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/overview" replace />,
  },
])

export default router

