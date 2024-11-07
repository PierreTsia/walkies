import Header from '@/components/Header'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

import OnboardingContent from '@/components/OnboardingContent'
import ReactQueryExample from '@/components/ReactQueryExample'
import LoggedInUserContent from '@/components/LoggedInUserContent'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const existingRequestEmail =
    cookieStore.get('registration_request')?.value ?? ''

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  const { data: user, error: fetchUserError } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', authUser?.id ?? '')
    .single()

  const { data: existingRequest, error } = await supabase
    .from('registration_requests')
    .select('*')
    .eq('email', existingRequestEmail)
    .single()

  // TODO handle dogs asscoiated with user
  // @ts-ignore
  const dogs = []

  const hasFullfilledOnboarding = user && dogs?.length //

  return (
    <div className="flex w-full flex-1 flex-col items-center pt-2 ">
      <div className="flex  flex-1 flex-col  px-3">
        <Header />
        <main className="flex w-full   max-w-[1200px] flex-1  flex-col gap-6 lg:mx-auto">
          {hasFullfilledOnboarding ? (
            <LoggedInUserContent user={user} />
          ) : (
            <OnboardingContent request={existingRequest} user={user} />
          )}
          <h2 className="mb-4 text-4xl font-bold">Next steps</h2>
          React query example
          <ReactQueryExample />
        </main>
      </div>
    </div>
  )
}
