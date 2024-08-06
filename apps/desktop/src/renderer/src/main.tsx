import { Providers } from '@renderer/components/providers'
import { router } from '@renderer/router'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
)
