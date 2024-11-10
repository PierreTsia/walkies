import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { RegistrationRequest } from '@/types'

import { createBrowserClient } from '@/utils/supabase'

const getRegistrationRequests = async () => {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('registration_requests')
    .select('*')
    .order('requested_at', { ascending: false })

  if (error) {
    console.error('Error registrations requests', error)
  }
  return data
}

const useQueryRegistrationRequests = (): UseSuspenseQueryResult<
  RegistrationRequest[],
  Error
> =>
  useSuspenseQuery({
    queryKey: ['/api/registration-requests'],
    queryFn: getRegistrationRequests,
  })

export default useQueryRegistrationRequests
