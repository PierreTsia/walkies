'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import Cookies from 'js-cookie'

type Locale = 'fr' | 'en'
const LocaleContext = createContext<{
  locale: string
  switchLocale: (l: Locale) => void
}>({
  locale: 'en',
  switchLocale: () => {},
})

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    const savedLocale = Cookies.get('locale') as Locale
    if (savedLocale && savedLocale !== locale) {
      setLocale(savedLocale)
    }
  }, [locale])

  const switchLocale = (newLocale: Locale) => {
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
