import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { DogWithOwner } from '@/types'
import getMe from '@/app/actions/getMe'
import getDogsByOwnerId from '@/app/actions/getMyDogs'

const getUserDogs = async (): Promise<DogWithOwner[] | null> => {
  const me = await getMe()
  return await getDogsByOwnerId(me?.id ?? '')
}

const useGetUserDogs = (): UseSuspenseQueryResult<DogWithOwner[], Error> =>
  useSuspenseQuery({
    queryKey: ['/api/get-user-dogs'],
    queryFn: getUserDogs,
  })

export default useGetUserDogs
