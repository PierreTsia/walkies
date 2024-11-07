'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export async function getAuthenticatedUser() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session?.user || null
}
