'use server'
import { cookies } from 'next/headers'

import { createServerClient } from '@/utils/supabase'

export const logout = async () => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  await supabase.auth.signOut()

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}
