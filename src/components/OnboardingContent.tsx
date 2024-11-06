'use client'

import RegistrationRequestForm from '@/components/RegistrationRequestForm'
import { User } from '@supabase/supabase-js'
import { RegistrationRequest } from '@/lib/supabase-types'
import LoggedInUserContent from '@/components/LoggedInUserContent'
import WaitForRequestApproval from '@/components/WaitForRequestApproval'

const OnboardingContent = ({
  request,
  user,
}: {
  request: RegistrationRequest | null
  user: User | null
}) => {
  if (user) {
    return <LoggedInUserContent user={user} />
  }
  return request ? (
    <WaitForRequestApproval request={request} />
  ) : (
    <RegistrationRequestForm />
  )
}

export default OnboardingContent
