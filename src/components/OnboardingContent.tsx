'use client'

import useGetAnonymousRegistrationRequest from '@/hooks/useGetAnonymousRegistrationRequest'
import { useUser } from '@/providers/UserProvider'
import RegistrationRequestForm from '@/components/RegistrationRequestForm'
import OnboardingContextProvider from '@/providers/OnboardingContextProvider'
import OnboardingStepper from '@/components/OnboardingStepper'
import useGetUserDogs from '@/hooks/useGetUserDogs'

const OnboardingContent = () => {
  const { data: request } = useGetAnonymousRegistrationRequest()
  const { data: dogs } = useGetUserDogs()
  const user = useUser()

  if (!request && !user) {
    return <RegistrationRequestForm />
  }
  return (
    <OnboardingContextProvider request={request} user={user} dogs={dogs}>
      <OnboardingStepper />
    </OnboardingContextProvider>
  )
}

export default OnboardingContent
