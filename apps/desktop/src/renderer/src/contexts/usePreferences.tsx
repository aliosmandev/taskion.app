import { useEffect, useState } from 'react'

export interface Preferences {
  theme: string
  fontSize: string
  font: string
}

const getStoredPreferences = (): Preferences => {
  const storedTheme = localStorage.getItem('theme') || 'light'
  const storedFontSize = localStorage.getItem('fontSize') || 'sm'
  const storedFont = localStorage.getItem('font') || 'inter'

  return {
    theme: storedTheme,
    fontSize: storedFontSize,
    font: storedFont
  }
}

const usePreferences = () => {
  const [preferences, setPreferences] = useState(getStoredPreferences)

  useEffect(() => {
    localStorage.setItem('theme', preferences.theme)
    localStorage.setItem('fontSize', preferences.fontSize)
    localStorage.setItem('font', preferences.font)
  }, [preferences])

  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [preferences.theme])

  useEffect(() => {
    document.body.classList.remove('font-inter', 'font-roboto', 'font-montserrat')
    document.body.classList.add(`font-${preferences.font}`)
  }, [preferences.font])

  useEffect(() => {
    document.body.classList.remove('size-xs', 'size-md', 'size-lg')
    document.body.classList.add(`size-${preferences.fontSize}`)
  }, [preferences.fontSize])

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      ...newPreferences
    }))
  }

  return {
    preferences,
    updatePreferences
  }
}

export default usePreferences
