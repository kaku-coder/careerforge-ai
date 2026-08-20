import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import OverviewPage from '../pages/OverviewPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

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
        path: 'overview',
        element: <OverviewPage />,
      },
      {
        path: 'interview',
        element: <div className="p-8 font-mono text-xl font-bold">INTERVIEW PAGE</div>,
      },
      {
        path: 'roadmap',
        element: <div className="p-8 font-mono text-xl font-bold">ROADMAP PAGE</div>,
      },
      {
        path: 'resume',
        element: <div className="p-8 font-mono text-xl font-bold">RESUME PAGE</div>,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/overview" replace />,
  },
])

export default router
