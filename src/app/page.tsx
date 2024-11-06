import Header from '@/components/Header'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import OnboardingContent from '@/components/OnboardingContent'
import ReactQueryExample from '@/components/ReactQueryExample'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const existingRequestEmail =
    cookieStore.get('registration_request')?.value ?? ''

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createServerClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: existingRequest, error } = await supabase
    .from('registration_requests')
    .select('*')
    .eq('email', existingRequestEmail)
    .single()

  console.log(existingRequest)

  return (
    <div className="flex w-full flex-1 flex-col items-center pt-2 ">
      <div className="flex  flex-1 flex-col  px-3">
        <Header />
        <main className="flex w-full   max-w-[1200px] flex-1  flex-col gap-6 lg:mx-auto">
          <OnboardingContent user={user} request={existingRequest} />
          <h2 className="mb-4 text-4xl font-bold">Next steps</h2>
          React query example
          <ReactQueryExample />
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
