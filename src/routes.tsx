import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layout/parcel-forwarding'
import { CheckInsList } from './pages/check-in/check-ins'
import { CreateCheckIn } from './pages/create-check-in/create-check-in'
import { Dashboard } from './pages/dashboard/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: 'check-in',
        element: <CheckInsList />,
      },
      {
        path: 'check-in/create',
        element: <CreateCheckIn />,
      },
    ],
  },
])
