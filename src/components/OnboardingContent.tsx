'use client'

import useGetAnonymousRegistrationRequest from '@/hooks/useGetAnonymousRegistrationRequest'
import { useUser } from '@/providers/UserProvider'
import RegistrationRequestForm from '@/components/RegistrationRequestForm'
import OnboardingContextProvider from '@/providers/OnboardingContextProvider'
import OnboardingStepper from '@/components/OnboardingStepper'
import useGetUserDogs from '@/hooks/useGetUserDogs'
import { useState } from 'react'

const OnboardingContent = () => {
  const { data: request } = useGetAnonymousRegistrationRequest()
  const { data: dogs } = useGetUserDogs()
  const user = useUser()

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
