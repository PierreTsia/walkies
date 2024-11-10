'use server'
import { cookies } from 'next/headers'

import { createServerClient } from '@/utils/supabase'
const signIn = async (data: { email: string; password: string }) => {
  const { email, password } = data
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { success: !error, error }
}

export default signIn
