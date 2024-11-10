'use server'
import { cookies } from 'next/headers'

import { createServerClient } from '@/utils/supabase'

const logout = async () => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(`Error signing out ${error.message}`)
  }
}

export default logout
