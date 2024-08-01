import { Button } from '@nextui-org/react'
import { PublicNavigation } from '@renderer/components/public-navigation'
import { SiNotion } from 'react-icons/si'

export const Login = () => {
  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL

  const handleLogin = () => {
    // window.location.href = apiUrl + '/auth/authorize'
    window.electron.ipcRenderer.send('open-url', apiUrl + '/auth/authorize')
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <PublicNavigation />
      <div className="flex flex-col gap-y-2 p-3">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-sm text-gray-500">Please enter your email and password to login.</p>
        <Button color="default" size="sm" startContent={<SiNotion />} onClick={handleLogin}>
          Login with Notion
        </Button>
      </div>
    </div>
  )
}
