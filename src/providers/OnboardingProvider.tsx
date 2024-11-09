'use client'

import { createContext, useContext } from 'react'
import { User } from '@supabase/supabase-js'
import { DogWithOwner, RegistrationRequest, UserType } from '@/types'

interface OnboardingContextType {
  request: RegistrationRequest | null
  user: UserType | null
  dogs: DogWithOwner[] | null
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

export default function OnboardingProvider({
  user,
  request,
  dogs,
  children,
}: OnboardingContextType & {
  children: React.ReactNode
}) {
  return (
    <OnboardingContext.Provider value={{ user, request, dogs }}>
      {children}
    </OnboardingContext.Provider>
  )
}
