'use client'

import RegistrationRequestForm from '@/components/RegistrationRequestForm'

import { RegistrationRequest, UserType } from '@/types'
import OnboardingStepper from '@/components/OnboardingStepper'

const OnboardingContent = ({
  request,
  user,
}: {
  request: RegistrationRequest | null
  user: UserType | null
}) => {
  if (!request && !user) {
    return <RegistrationRequestForm />
  }
  return <OnboardingStepper request={request} user={user} />
}

export default OnboardingContent
