import Header from '@/components/Header'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import OnboardingContent from '@/components/OnboardingContent'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const existingRequestEmail =
    cookieStore.get('registration_request')?.value ?? ''

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: existingRequest, error } = await supabase
    .from('registration_requests')
    .select('*')
    .eq('email', existingRequestEmail)
    .single()

  return (
    <div className="flex w-full flex-1 flex-col items-center pt-2 ">
      <div className="flex  flex-1 flex-col gap-20 px-3">
        <Header />
        <main className="flex max-w-4xl flex-1 flex-col gap-6">
          <OnboardingContent user={user} request={existingRequest} />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 text-center text-xs">
        <div className="flex w-full justify-end gap-2">
          <ThemeToggle />
          <LocaleSwitcher />
        </div>
      </footer>
    </div>
  )
}
