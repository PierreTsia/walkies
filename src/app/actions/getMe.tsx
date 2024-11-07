'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export async function getMe() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', session?.user?.id ?? '')
    .single()

  return user || null
}
