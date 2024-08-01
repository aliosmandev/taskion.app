/* eslint-disable no-async-promise-executor */
import { getAuthMe } from '@renderer/libs/api/auth'
import { setAuthToken } from '@renderer/libs/api/instance'
import { UserResult } from '@renderer/libs/types/api/user'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface AuthContextType {
  loading: boolean
  user: UserResult | null
  loggedIn: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserResult | null>(null)

  const getUserWithCode = (authCode: string) =>
    new Promise(async (resolve, reject) => {
      setAuthToken(authCode)
      setLoading(true)
      try {
        const userResponse = await getAuthMe()
        if (userResponse.results[0].name) {
          localStorage.setItem('access_token', authCode)
          setLoading(false)
          setLoggedIn(true)
          setUser(userResponse.results[0])
          resolve(userResponse.results[0])
        }
      } catch (error) {
        setLoading(false)
        reject(error)
      }
    })

  useEffect(() => {
    window.electron.ipcRenderer.on('oauth-code', async (_event, authCode) => {
      toast.promise(getUserWithCode(authCode), {
        loading: 'Loading...',
        success: 'User fetched successfully!',
        error: 'User fetch failed!'
      })
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('oauth-code')
    }
  }, [])

  const handleGetUser = async () => {
    setLoading(true)
    const storedToken = localStorage.getItem('access_token')
    if (storedToken) {
      setToken(storedToken)
      setAuthToken(storedToken)
      const userResponse = await getAuthMe()
      if (userResponse.results[0].name) {
        setUser(userResponse.results[0])
        setLoggedIn(true)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetUser()
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setToken(token)
    setLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ loggedIn, token, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
