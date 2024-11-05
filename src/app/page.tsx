import AuthButton from '@/components/AuthButton'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import RegistrationRequestForm from '@/components/RegistrationRequestForm'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
        <Header />
        <main className="flex flex-1 flex-col gap-6">
          {user ? <span>Hey, {user.email}!</span> : <RegistrationRequestForm />}
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
