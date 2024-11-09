'use client'

import RegistrationRequestForm from '@/components/RegistrationRequestForm'

import { DogWithOwner, RegistrationRequest, UserType } from '@/types'
import OnboardingStepper from '@/components/OnboardingStepper'
import { useOnboardingContext } from '@/providers/OnboardingProvider'

const OnboardingContent = ({
  request,
  user,
  dogs,
}: {
  request: RegistrationRequest | null
  user: UserType | null
  dogs: DogWithOwner[] | null
}) => {
  if (!request && !user) {
    return <RegistrationRequestForm />
  }
  return <OnboardingStepper />
}

export default OnboardingContent
