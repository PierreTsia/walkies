'use client'

import { createContext, useContext } from 'react'
import { User } from '@supabase/supabase-js'
import { DogWithOwner, RegistrationRequest, UserType } from '@/types'

interface MemberContextType {
  user: UserType | null
  dogs: DogWithOwner[] | null
}

const MemberContext = createContext<MemberContextType | undefined>(undefined)

export function useMemberContext() {
  const context = useContext(MemberContext)
  if (context === undefined) {
    throw new Error(
      'useMemberContext must be used within MemberContextProvider',
    )
  }
  return context
}

export default function MemberContextProvider({
  user,
  dogs,
  children,
}: MemberContextType & {
  children: React.ReactNode
}) {
  return (
    <MemberContext.Provider value={{ user, dogs }}>
      {children}
    </MemberContext.Provider>
  )
}
