import Header from '@/components/Header'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

import OnboardingContent from '@/components/OnboardingContent'
import MemberContent from '@/components/MemberContent'
import { redirect } from 'next/navigation'

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

  const { data: dogs, error: viewError } = await supabase
    .from('dog_with_owners')
    .select('*')
    .eq('primary_owner_id', user?.id ?? '')

  const { data: onboarding, error: onboardingError } = await supabase
    .from('onboarding_process_complete')
    .select('*')
    .eq('auth_id', user?.auth_id ?? '')
    .single()

  return (
    <div className="flex w-full flex-1 flex-col items-center pt-2 ">
      <div className="flex  flex-1 flex-col  px-3">
        <Header />
        <main className="flex w-full max-w-[1200px] flex-1  flex-col gap-6 lg:mx-auto">
          <OnboardingContent
            request={existingRequest}
            user={user}
            dogs={dogs}
            onboarding={onboarding}
          />
        </main>
      </div>
    </div>
  )
}
