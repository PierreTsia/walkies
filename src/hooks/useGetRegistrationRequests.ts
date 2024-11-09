import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { axiosInstance } from '../../axios-instance'
import { RegistrationRequest } from '@/types'

const useGetRegistrationRequests = (): UseSuspenseQueryResult<
  RegistrationRequest[],
  Error
> =>
  useSuspenseQuery({
    queryKey: ['/api/registration-requests'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/api/registration-requests')

      return data
    },
  })

export default useGetRegistrationRequests
