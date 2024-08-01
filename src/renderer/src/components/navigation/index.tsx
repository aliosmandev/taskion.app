import {
  Chip,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip
} from '@nextui-org/react'
import { ChevronDown, ChevronLeft, ChevronRight, FileIcon, Plus, RefreshCw } from 'lucide-react'

interface PageType {
  title: string
  id: string
}

import { useAuthContext } from '@renderer/contexts/useAuth'
import { usePagesContext } from '@renderer/contexts/usePages'
import { getPages } from '@renderer/libs/api/pages'
import { useWindowScroll } from '@uidotdev/usehooks'
import { useMemo } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { UserProfile } from './user-profile'

const addEllipsisIfSplittable = (text: string) => {
  const parts = text?.split(' ')
  return parts?.length > 1 ? parts[0] + '..' : parts?.[0]
}

export const NavigationBar = () => {
  const { loggedIn } = useAuthContext()
  const {
    handleDeletePage,
    handleSelectPage,
    currentPage,
    handleBackPage,
    handleForwardPage,
    disabledBackPage,
    disabledForwardPage,
    activePages
  } = usePagesContext()
  const [window] = useWindowScroll()

  const { data } = useQuery('pages', getPages, { enabled: !!loggedIn })

  const computedPages = useMemo(() => {
    return (
      data?.results
        .filter((page) => page.properties.title)
        .map((page) => {
          const title = page.properties.title.title[0].plain_text
          const id = page.id
          return { title, id }
        }) ?? []
    )
  }, [data])

  const [shortPages, longPages] = useMemo(() => {
    let shortPages: PageType[] = []
    let longPages: PageType[] = []

    const currentPageIndex = computedPages.findIndex((page) => page.id === currentPage)

    const lastActivePages = computedPages.filter(
      (page) => activePages.includes(page.id) && page.id !== currentPage
    )

    shortPages = [
      ...(activePages.length > 0 ? lastActivePages.slice(lastActivePages.length - 2) : []),
      ...(currentPageIndex !== -1 ? [computedPages[currentPageIndex]] : [])
    ]

    longPages = computedPages.filter((page) => !shortPages.includes(page))

    return [shortPages, longPages]
  }, [computedPages, currentPage, activePages])

  const hasLongPages = longPages.length > 0

  const isScrolled = useMemo(() => (window.y as number) > 10, [window])

  const classes = useMemo(
    () => ({
      container: cn(
        'sticky top-0 z-50',
        isScrolled && 'bg-LightBackground/40 backdrop-blur dark:bg-DarkBackground border-b'
      )
    }),
    [isScrolled]
  )

  return (
    <div
      className={cn(
        'flex flex-wrap justify-between items-center border-zinc-100 dark:border-zinc-900 p-3 border-b w-full',
        classes.container
      )}
    >
      <div className="flex gap-x-1">
        <Tooltip content="Previous page">
          <ChevronLeft
            className={cn('cursor-pointer w-4 h-4 text-zinc-500', {
              'opacity-50': disabledForwardPage
            })}
            onClick={handleForwardPage}
          />
        </Tooltip>
        <Tooltip content="Next page">
          <ChevronRight
            className={cn('cursor-pointer w-4 h-4 text-zinc-500', {
              'opacity-50': disabledBackPage
            })}
            onClick={handleBackPage}
          />
        </Tooltip>
      </div>
      <div className="flex gap-x-1 overflow-x-auto overflow-y-hidden">
        {shortPages?.map((page) => (
          <Tooltip key={page.id} content={page.title} size="sm" radius="sm" color="default">
            <Chip
              className="cursor-pointer select-none"
              key={page.id}
              color={page.id === currentPage ? 'primary' : 'default'}
              radius="sm"
              variant="flat"
              size="sm"
              onClick={() => handleSelectPage(page.id)}
              onClose={() => handleDeletePage(page.id)}
            >
              {addEllipsisIfSplittable(page.title)}
            </Chip>
          </Tooltip>
        ))}
        {shortPages.length > 0 && hasLongPages && (
          <Dropdown>
            <DropdownTrigger>
              <Chip size="sm" variant="flat" radius="sm" className="cursor-pointer">
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </Chip>
            </DropdownTrigger>
            <DropdownMenu>
              {longPages?.map((page) => (
                <DropdownItem
                  key={page.id}
                  onClick={() => handleSelectPage(page.id)}
                  onSelect={() => handleSelectPage(page.id)}
                >
                  {page.title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <div className="flex gap-x-2 items-center">
        <RefreshPages />
        <NewPageButton />
        <UserProfile />
      </div>
    </div>
  )
}

const RefreshPages = () => {
  const queryClient = useQueryClient()
  const { loggedIn } = useAuthContext()
  const { refetch, isFetching } = useQuery('pages', getPages, {
    enabled: !!loggedIn
  })

  const handleRefresh = () => {
    refetch()
    queryClient.invalidateQueries('blocks')
  }

  return (
    <Tooltip content={isFetching ? 'Refreshing...' : 'Refresh'}>
      <Chip
        color="default"
        radius="sm"
        variant="flat"
        size="sm"
        className="cursor-pointer"
        onClick={handleRefresh}
      >
        <RefreshCw
          className={cn('w-4 h-4 text-zinc-500', {
            'animate-spin': isFetching
          })}
        />
      </Chip>
    </Tooltip>
  )
}

const NewPageButton = () => {
  const { loggedIn } = useAuthContext()
  const { handleNewPage } = usePagesContext()
  const { data } = useQuery('pages', getPages, { enabled: !!loggedIn })

  const computedPages = useMemo(() => {
    return data?.results
      .filter((page) => page?.properties?.title)
      .map((page) => {
        const title = page?.properties?.title?.title[0]?.plain_text
        const id = page.id
        return { title, id }
      }) as PageType[]
  }, [data])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Chip color="default" radius="sm" variant="flat" size="sm" className="cursor-pointer">
          <Tooltip content="New page">
            <Plus className="w-4 h-4 text-zinc-500" />
          </Tooltip>
        </Chip>
      </DropdownTrigger>
      <DropdownMenu>
        {computedPages?.map((page) => (
          <DropdownItem
            key={page.id}
            startContent={<FileIcon className="w-4 h-4 text-zinc-500" />}
            className="text-xs"
            onSelect={() => handleNewPage(page.id)}
            onClick={() => handleNewPage(page.id)}
          >
            {page.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
