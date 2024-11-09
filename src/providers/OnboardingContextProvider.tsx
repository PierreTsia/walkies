'use client'

import { createContext, useContext } from 'react'
import { DogWithOwner, RegistrationRequest, UserType } from '@/types'

interface OnboardingContextType {
  request: RegistrationRequest | null
  user: UserType | null
  dogs: DogWithOwner[] | null
  hasAlreadySavedDog: boolean
  setHasAlreadySavedDog: (value: boolean) => void
  dogName: string
  setDogName: (value: string) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
)

export function useOnboardingContext() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error(
      'useOnboardingContext must be used within OnboardingProvider',
    )
  }
  return context
}

export default function OnboardingContextProvider({
  children,
  ...props
}: OnboardingContextType & {
  children: React.ReactNode
}) {
  return (
    <OnboardingContext.Provider value={props}>
      {children}
    </OnboardingContext.Provider>
  )
}
