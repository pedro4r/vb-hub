import React, { ReactElement, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { verifyToken } from './api/token-verify'

interface ProtectedRouteProps {
  element: ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await verifyToken()
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      }
    }

    checkAuthentication()
  }, [])

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/company" replace />
  }

  return element
}

export default ProtectedRoute
