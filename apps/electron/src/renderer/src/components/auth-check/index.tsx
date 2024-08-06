import { useAuthContext } from '@renderer/contexts/useAuth'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const AuthCheck = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { loggedIn, loading } = useAuthContext()

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate('/login')
    } else if (!loading && loggedIn) {
      if (location.pathname === '/login') {
        navigate('/')
      }
    }
  }, [loading, loggedIn])

  return loading ? (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 className="w-4 h-4 animate-spin" />
    </div>
  ) : (
    <Outlet />
  )
}
