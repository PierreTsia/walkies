'use client'

import RegistrationRequestForm from '@/components/RegistrationRequestForm'

import OnboardingStepper from '@/components/OnboardingStepper'
import OnboardingContextProvider from '@/providers/OnboardingContextProvider'
import { DogWithOwner, RegistrationRequest, UserType } from '@/types'
import { useState } from 'react'

const OnboardingContent = ({
  request,
  user,
  dogs,
}: {
  request: RegistrationRequest | null
  user: UserType | null
  dogs: DogWithOwner[] | null
}) => {
  const [hasAlreadySavedDog, setHasAlreadySavedDog] = useState(!!dogs?.length)
  const [dogName, setDogName] = useState(dogs?.[0]?.dog_name ?? '')

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
    >
      <OnboardingStepper />
    </OnboardingContextProvider>
  )
}

export default OnboardingContent
