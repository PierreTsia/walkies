import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { RegistrationRequest } from '@/types'

import { createBrowserClient } from '@/utils/supabase'
import Cookies from 'js-cookie'

const getRegistrationRequestFromCookies = async () => {
  const supabase = createBrowserClient()
  const email = Cookies.get('registration_request') ?? null

  if (!email) {
    return null
  }
  const { data, error } = await supabase
    .from('registration_requests')
    .select('*')
    .eq('email', email)
    .single()

  if (error) {
    console.error('Error registrations request', error)
  }
  return data
}

const useQueryRegistrationRequests = (): UseSuspenseQueryResult<
  RegistrationRequest | null,
  Error
> =>
  useSuspenseQuery({
    queryKey: ['/api/get-anonymous-registration-request'],
    queryFn: getRegistrationRequestFromCookies,
  })

export default useQueryRegistrationRequests
