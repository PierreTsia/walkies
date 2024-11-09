'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import Cookies from 'js-cookie'

const LocaleContext = createContext<{
  locale: string
  switchLocale: (l: string) => void
}>({
  locale: 'en',
  switchLocale: () => {},
})

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    const savedLocale = Cookies.get('locale')
    if (savedLocale && savedLocale !== locale) {
      setLocale(savedLocale)
    }
  }, [locale])

  const switchLocale = (newLocale: string) => {
    setLocale(newLocale)
    Cookies.set('locale', newLocale, { expires: 365 }) // Set locale cookie for future visits
  }

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocaleContext = () => useContext(LocaleContext)
