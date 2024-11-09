'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { DogRegistrationFormData } from '@/components/DogRegistrationForm'

export async function completeOnboarding() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const authId = session?.user.id

  if (!authId) {
    console.log('User not authenticated')
    return false
  }

  const { error: onboardingError } = await supabase
    .from('onboarding_process_complete')
    .update({ is_completed: true })
    .eq('auth_id', authId)

  if (onboardingError) {
    console.log('ONBOARDING ERROR', onboardingError.message)
    return false
  }

  return true
}
