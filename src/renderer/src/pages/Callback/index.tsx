import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

import { getAuthMe } from '@renderer/libs/api/auth'
import { setAuthToken } from '@renderer/libs/api/instance'
import { useState } from 'react'

export const Callback = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const accessToken = searchParams.get('accessToken')
  console.log('test, selam')

  const getUser = async () => {
    if (accessToken) {
      setAuthToken(accessToken)
      const userResponse = await getAuthMe()
      if (userResponse.results[0].name) {
        localStorage.setItem('access_token', accessToken)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [accessToken])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {isLoading ? <Loader2 className="h-10 w-10 animate-spin" /> : <Navigate to="/" />}
    </div>
  )
}
