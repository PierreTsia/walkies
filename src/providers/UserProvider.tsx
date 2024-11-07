'use client'

import { createContext, useContext } from 'react'
import { User } from '@supabase/supabase-js'
import { UserType } from '@/types'

interface UserContextType {
  user: UserType | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context.user
}

export default function UserProvider({
  user,
  children,
}: {
  user: UserType | null
  children: React.ReactNode
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
