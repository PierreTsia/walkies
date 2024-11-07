import { GeistSans } from 'geist/font/sans'
import ThemeProvider from '@/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { LocaleProvider } from '@/providers/LocaleProvider'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import UserProviderWrapper from '@/providers/UserProviderWrapper'

import ReactQueryExample from '@/components/ReactQueryExample'
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  const messages = await getMessages()

  const logout = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    await supabase.auth.signOut()

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return (
    <html lang={locale ?? 'en'} className={GeistSans.className}>
      <NextIntlClientProvider messages={messages}>
        <LocaleProvider>
          <UserProviderWrapper>
            <body className="bg-background text-foreground">
              <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
              <ThemeProvider
                attribute="class"
                enableSystem
                disableTransitionOnChange
              >
                <ReactQueryProvider>
                  <main className="flex min-h-[calc(100vh-90px)] flex-col items-center">
                    {children}
                    <Analytics />
                  </main>
                  <Footer logout={logout} />
                  <ReactQueryDevtools initialIsOpen={false} />
                </ReactQueryProvider>
              </ThemeProvider>
              <Toaster />
            </body>
          </UserProviderWrapper>
        </LocaleProvider>
      </NextIntlClientProvider>
    </html>
  )
}
