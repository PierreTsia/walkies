'use client'

import RegistrationRequestForm from '@/components/RegistrationRequestForm'
import { User } from '@supabase/supabase-js'
import { RegistrationRequest } from '@/types'
import LoggedInUserContent from '@/components/LoggedInUserContent'
import OnboardingStepper from '@/components/OnboardingStepper'

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
    <OnboardingStepper request={request} />
  ) : (
    <RegistrationRequestForm />
  )
}

export default OnboardingContent
