import { useSuspenseQuery } from '@tanstack/react-query'
import { createBrowserClient } from '@/utils/supabase'

const getMe = async () => {
  const supabase = createBrowserClient()
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser()
  if (!authUser || authError) {
    return null
  }

  console.log('authUser', authError, authUser)
  /*  const supabase = createBrowserClient()
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser()
  if (!authUser || authError) {
    return null
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', authUser?.id ?? '')
    .single()

  if (error) {
    console.error('Error fetching user', error)
    return null
  }

  return user*/
}

const useWhoAmI = () => {
  return useSuspenseQuery({
    queryKey: ['/api/who-am-i'],
    queryFn: getMe,
  })
}

export default useWhoAmI
