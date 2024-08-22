import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layout/parcel-forwarding'
import { CheckInsList } from './pages/check-in/index'
import { CompanyLogin } from './pages/company-login'
import { CreateCheckIn } from './pages/create-check-in'
import { Dashboard } from './pages/dashboard/dashboard'
import ProtectedRoute from './protected-route'

export const router = createBrowserRouter([
  {
    path: '/login',
    children: [
      {
        path: 'company',
        element: <CompanyLogin />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: 'check-in',
        element: <ProtectedRoute element={<CheckInsList />} />,
      },
      {
        path: 'check-in/create',
        element: <ProtectedRoute element={<CreateCheckIn />} />,
      },
    ],
  },
])
