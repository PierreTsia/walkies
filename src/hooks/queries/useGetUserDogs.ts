import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { DogWithOwner } from '@/types'
import { createBrowserClient } from '@/utils/supabase'

const getMe = async () => {
  const supabase = createBrowserClient()
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser()

  if (!authUser) return null

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

const getUserDogs = async (): Promise<DogWithOwner[] | null> => {
  const me = await getMe()
  if (!me) return null

  const supabase = createBrowserClient()

  const { data: dogs, error } = await supabase
    .from('dog_with_owners')
    .select('*')
    .eq('primary_owner_id', me.id)

  if (error) {
    console.error('Error fetching dogs', error)
  }
  return dogs
}

const useGetUserDogs = (): UseSuspenseQueryResult<DogWithOwner[], Error> =>
  useSuspenseQuery({
    queryKey: ['/api/get-user-dogs'],
    queryFn: getUserDogs,
  })

export default useGetUserDogs
