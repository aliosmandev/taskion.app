import { Button } from '@nextui-org/react'
import { Separator } from '@radix-ui/react-context-menu'
import Logo from '@renderer/assets/logo.svg'
import { AUTHORIZE_URL } from '@renderer/utils/constants'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SiNotion } from 'react-icons/si'
import { Link } from 'react-router-dom'

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const handleLogin = () => {
    setLoading(true)
    window.electron.ipcRenderer.send('open-url', AUTHORIZE_URL)
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('opened-url', () => {
      setLoading(false)
    })
  }, [])

  return (
    <motion.div
      className="w-full h-full flex flex-col gap-y-2 p-4 justify-center relative"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={Logo} alt="logo" className="w-10 h-10" />
      <div className="flex flex-col">
        <h5 className="text-lg font-medium text-gray-800">Start Managing Your Todos</h5>
        <h2 className="text-xl font-medium text-gray-500">Log in to your Notion account</h2>
        <Button
          className="mt-4"
          color="default"
          size="sm"
          startContent={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SiNotion />}
          onClick={handleLogin}
          isDisabled={loading}
        >
          Login with Notion
        </Button>
        <Separator className="w-full h-[1.50px] bg-gray-100 dark:bg-zinc-900 mt-4" />
      </div>
      <div className="flex flex-col absolute bottom-5">
        <p className="text-sm text-gray-500">
          By signing in, you agree to our <Link to="/">Terms of Service</Link> and{' '}
          <Link to="/">Privacy Policy</Link>.
        </p>
      </div>
    </motion.div>
  )
}
