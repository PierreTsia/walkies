'use client'

import RegistrationRequestForm from '@/components/RegistrationRequestForm'

import OnboardingStepper from '@/components/OnboardingStepper'
import OnboardingContextProvider from '@/providers/OnboardingContextProvider'
import {
  DogWithOwner,
  OnboardingType,
  RegistrationRequest,
  UserType,
} from '@/types'
import { useState } from 'react'

const OnboardingContent = ({
  request,
  user,
  dogs,
  onboarding,
}: {
  request: RegistrationRequest | null
  user: UserType | null
  dogs: DogWithOwner[] | null
  onboarding: OnboardingType | null
}) => {
  const [hasAlreadySavedDog, setHasAlreadySavedDog] = useState(!!dogs?.length)
  const [dogName, setDogName] = useState(dogs?.[0]?.dog_name ?? '')
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(
    !!onboarding?.is_completed,
  )

  if (!request && !user) {
    return <RegistrationRequestForm />
  }
  return (
    <OnboardingContextProvider
      request={request}
      user={user}
      dogs={dogs}
      hasAlreadySavedDog={hasAlreadySavedDog}
      dogName={dogName}
      setDogName={setDogName}
      setHasAlreadySavedDog={setHasAlreadySavedDog}
      hasCompletedOnboarding={hasCompletedOnboarding}
      setHasCompletedOnboarding={setHasCompletedOnboarding}
    >
      <OnboardingStepper />
    </OnboardingContextProvider>
  )
}

export default OnboardingContent
