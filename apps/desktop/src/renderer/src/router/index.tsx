import { AuthCheck } from '@renderer/components/auth-check'
import { Callback } from '@renderer/pages/Callback'
import { Home } from '@renderer/pages/Home'
import { Login } from '@renderer/pages/Login'
import { createHashRouter } from 'react-router-dom'

export const router: ReturnType<typeof createHashRouter> = createHashRouter([
  {
    path: '/',
    element: <AuthCheck />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  {
    path: '/callback',
    element: <Callback />
  }
])
