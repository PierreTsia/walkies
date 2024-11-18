'use client'

import { Suspense } from 'react'
import useGetUserDogs from '@/hooks/queries/useGetUserDogs'

const MemberContent = () => {
  const { data } = useGetUserDogs()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <span>
        Hey, {data[0].primary_owner_name}! You now a member and have completed
        the onboarding Whats up with {data[0].dog_name} ?
      </span>
    </Suspense>
  )
}

export default MemberContent
