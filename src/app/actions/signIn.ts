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

  if (error) {
    throw new Error(`Error signing in ${error.message}`)
  }
}

export default signIn
