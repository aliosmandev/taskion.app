import AuthProvider from '@renderer/contexts/useAuth'
import PagesProvider from '@renderer/contexts/usePages'
import { QueryClient, QueryClientProvider } from 'react-query'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 15,
        cacheTime: 1000 * 60 * 60
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PagesProvider>{children}</PagesProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
