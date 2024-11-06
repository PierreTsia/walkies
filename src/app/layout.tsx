import { GeistSans } from 'geist/font/sans'
import ThemeProvider from '@/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { UserProvider } from '@/providers/UserProvider'
import { Toaster } from '@/components/ui/toaster'
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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  return (
    <html
      lang="en"
      className={GeistSans.className}
      style={{ colorScheme: 'dark' }}
    >
      <NextIntlClientProvider messages={messages}>
        <UserProvider>
          <body className="bg-background text-foreground">
            <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
            <ThemeProvider
              attribute="class"
              enableSystem
              disableTransitionOnChange
            >
              <ReactQueryProvider>
                <main className="flex min-h-screen flex-col items-center">
                  {children}

                  <Analytics />
                </main>
                <ReactQueryDevtools initialIsOpen={false} />
              </ReactQueryProvider>
            </ThemeProvider>
            <Toaster />
          </body>
        </UserProvider>
      </NextIntlClientProvider>
    </html>
  )
}
