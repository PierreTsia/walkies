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
import { SpeedInsights } from '@vercel/speed-insights/next'

import UserProviderWrapper from '@/providers/UserProviderWrapper'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Walkies Peupliers App',
  description: 'A private network for dogs and humans',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  const messages = await getMessages()

  return (
    <html lang={locale ?? 'en'} className={GeistSans.className}>
      <NextIntlClientProvider messages={messages}>
        <LocaleProvider>
          <UserProviderWrapper>
            <body className="bg-background text-foreground">
              <NextTopLoader showSpinner={false} height={2} color="#3f51b5" />
              <ThemeProvider
                attribute="class"
                enableSystem
                disableTransitionOnChange
              >
                <ReactQueryProvider>
                  <main className="flex min-h-[100vh] flex-col items-center">
                    {children}
                    <Toaster />
                    <Analytics />
                    <Footer />
                  </main>
                  <ReactQueryDevtools initialIsOpen={false} />
                </ReactQueryProvider>
              </ThemeProvider>
              <SpeedInsights />
            </body>
          </UserProviderWrapper>
        </LocaleProvider>
      </NextIntlClientProvider>
    </html>
  )
}
