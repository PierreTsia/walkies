'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

const getMe = async () => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) {
    return null
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', authUser.id)
    .single()

  if (error) {
    console.error('Error fetching user', error)
  }

  return user
}

export default getMe
