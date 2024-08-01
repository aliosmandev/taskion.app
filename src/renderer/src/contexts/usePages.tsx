import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface PagesContextType {
  currentPage: string | null
  activePages: string[]
  handleSelectPage: (page: string) => void
  handleNewPage: (page: string) => void
  handleDeletePage: (page: string) => void
  handleTogglePage: (page: string) => void
  handleBackPage: () => void
  handleForwardPage: () => void
  disabledBackPage: boolean
  disabledForwardPage: boolean
  historyIndex: number
  activePageHistory: string[]
}

const PagesContext = createContext<PagesContextType | undefined>(undefined)

interface PagesProviderProps {
  children: ReactNode
}

const LOCAL_STORAGE_KEY = 'pagesContext'

export default function PagesProvider({ children }: PagesProviderProps) {
  const [currentPage, setCurrentPage] = useState<string | null>(null)
  const [activePageHistory, setActivePageHistory] = useState<string[]>([])
  const [activePages, setActivePages] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedData) {
      const { currentPage, activePageHistory, activePages, historyIndex } = JSON.parse(storedData)
      setCurrentPage(currentPage)
      setActivePageHistory(activePageHistory)
      setActivePages(activePages)
      setHistoryIndex(historyIndex)
    }
  }, [])

  useEffect(() => {
    const dataToStore = {
      currentPage,
      activePageHistory,
      activePages,
      historyIndex
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore))
  }, [currentPage, activePageHistory, activePages, historyIndex])

  const disabledBackPage = historyIndex <= 0
  const disabledForwardPage = historyIndex >= activePageHistory.length - 1

  const handleSelectPage = (page: string | null) => {
    if (page) {
      const newHistory = [...activePageHistory.slice(0, historyIndex + 2), page]
      setActivePageHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
      setCurrentPage(page)
    } else {
      setCurrentPage(null)
    }
  }

  const handleNewPage = (page: string) => {
    if (!activePages.includes(page)) {
      setActivePages([...activePages, page])
    }
    handleSelectPage(page)
  }

  const handleDeletePage = (page: string) => {
    setActivePages(activePages.filter((p) => p !== page))
    if (currentPage === page) {
      handleSelectPage(null)
    }
  }

  const handleTogglePage = (page: string) => {
    if (activePages.includes(page)) {
      setActivePages(activePages.filter((p) => p !== page))
      if (currentPage === page) {
        handleSelectPage(null)
      }
    } else {
      setActivePages([...activePages, page])
      handleSelectPage(page)
    }
  }

  const handleBackPage = () => {
    if (!disabledBackPage) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      const activePage = activePageHistory[newIndex]
      if (activePages.includes(activePage)) {
        setCurrentPage(activePage)
      } else {
        handleNewPage(activePage)
      }
    }
  }

  const handleForwardPage = () => {
    if (!disabledForwardPage) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      const activePage = activePageHistory[newIndex]
      if (activePages.includes(activePage)) {
        setCurrentPage(activePage)
      } else {
        handleNewPage(activePage)
      }
    }
  }

  return (
    <PagesContext.Provider
      value={{
        activePages,
        handleSelectPage,
        handleNewPage,
        handleDeletePage,
        currentPage,
        handleTogglePage,
        handleBackPage,
        handleForwardPage,
        disabledBackPage,
        disabledForwardPage,
        historyIndex,
        activePageHistory
      }}
    >
      {children}
    </PagesContext.Provider>
  )
}

export function usePagesContext() {
  const context = useContext(PagesContext)
  if (!context) {
    throw new Error('usePagesContext must be used within a PagesProvider')
  }
  return context
}
