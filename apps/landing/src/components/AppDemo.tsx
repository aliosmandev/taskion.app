'use client'

import { AppScreen } from '@/components/AppScreen'

import { NavigationBar } from 'ui/navigation'
import { PagesProvider } from 'ui/pages-context'
import { PageRenderer } from 'ui/page-renderer'

export function AppDemo() {
  return (
    <PagesProvider>
    <AppScreen>
      <AppScreen.Header>
        {/* <div className='flex justify-between'>
        <div className='flex gap-x-2 p-2'>
          <span className="inline-flex items-center rounded-full bg-red-400 p-2 text-xs font-medium ring-1 ring-inset ring-red-700/20"></span>
          <span className="inline-flex items-center rounded-full bg-yellow-400 p-2 text-xs font-medium ring-1 ring-inset ring-yellow-700/20"></span>
          <span className="inline-flex items-center rounded-full bg-green-400 p-2 text-xs font-medium ring-1 ring-inset ring-green-700/20"></span>
          </div>
        </div> */}
        <NavigationBar />
      </AppScreen.Header>
      <AppScreen.Body>
        <PageRenderer />
      </AppScreen.Body>
    </AppScreen>
    </PagesProvider>
  )
}
