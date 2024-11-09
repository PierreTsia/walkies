'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export async function completeUserOnboarding() {
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

  const { error } = await supabase
    .from('users')
    .update({ onboarding_completed: true })
    .eq('auth_id', authId)

  if (error) {
    console.error('Error updating user', error)
    return false
  }

  return true
}
