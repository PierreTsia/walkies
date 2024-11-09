import {
  UseQueryResult,
  useQuery,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query'
import axios from 'axios'

// Creating a reusable hook to get messages, need to use axios here since Next patches fetch
// and causes issues with msw
const useGetMessage = (): UseSuspenseQueryResult<{ message: string }, Error> =>
  useSuspenseQuery({
    queryKey: ['/api/message'],
    queryFn: async () => {
      const { data } = await axios.get('/api/message')

      return data
    },
  })

export default useGetMessage
