'use server'

import { createServerClient } from '@/utils/supabase'

import { cookies } from 'next/headers'
export async function submitRegistrationRequest(data: {
  name: string
  email: string
  content_text?: string
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase.from('registration_requests').insert([
    {
      name: data.name,
      email: data.email,
      content_text: data.content_text,
      status: 'pending',
    },
  ])

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}
