'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export async function getMe() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', authUser?.id ?? '')
    .single()

  return user || null
}
