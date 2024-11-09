'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { DogRegistrationFormData } from '@/components/DogRegistrationForm'

export async function registerDog(data: DogRegistrationFormData) {
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

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', authId)
    .single()

  if (userError) {
    console.log('USER ERROR', userError.message)
    return false
  }

  if (!user) {
    console.log('User not found')
    return false
  }

  const { error: insertError } = await supabase.from('dogs').insert([
    {
      ...data,
      dob: data.dob.toISOString(),
      owner_id: user.id,
    },
  ])

  if (insertError) {
    console.log('Error inserting dog', insertError.message)
    return false
  }

  return true
}
