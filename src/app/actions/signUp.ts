'use server'

import { SignUpFormData } from '@/components/SignUpForm'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { TablesInsert } from '@/lib/supabase-types'

export async function signUp(data: SignUpFormData): Promise<boolean> {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  // ensure the is a request approved in db
  const { data: request, error: fetchRequestError } = await supabase
    .from('registration_requests')
    .select()
    .eq('email', data.email)
    .single()

  if (fetchRequestError || !request) {
    console.log('FETCH REQUEST ERROR', fetchRequestError)
    return false
  } else if (request.status !== 'approved') {
    console.log('REQUEST NOT APPROVED')
    return false
  }

  // create a new user
  const {
    error: signUpError,
    data: { user },
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (signUpError || !user) {
    console.log('SIGN UP ERROR', signUpError?.message)
    return false
  }

  // Fetch the current session to ensure the user is authenticated
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError || !session) {
    console.log('SESSION ERROR', sessionError?.message)
    return false
  }
  const userData: TablesInsert<'users'> = {
    email: data.email,
    name: request.name,
    auth_id: user.id,
  }

  const { error: userError } = await supabase.from('users').insert([userData])

  if (userError) {
    console.log('USER ERROR', userError.message)
    return false
  }

  cookieStore.delete('registration_request')
  return true
}
