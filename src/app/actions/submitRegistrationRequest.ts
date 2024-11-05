'use server'

import { createServerClient } from '@/utils/supabase'

import { cookies } from 'next/headers'
export async function submitRegistrationRequest(data: {
  name: string
  email: string
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase
    .from('registration_requests')
    .insert([{ name: data.name, email: data.email, status: 'pending' }])

  if (error) {
    throw new Error('Failed to submit request')
  }

  return { success: true }
}
