import { AuthCheck } from '@renderer/components/auth-check'
import { Callback } from '@renderer/pages/Callback'
import { Home } from '@renderer/pages/Home'
import { Login } from '@renderer/pages/Login'
import { createBrowserRouter } from 'react-router-dom'

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
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
