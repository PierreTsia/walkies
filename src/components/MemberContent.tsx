'use client'

import useGetUserDogs from '@/hooks/queries/useGetUserDogs'

const MemberContent = () => {
  const { data: dogs } = useGetUserDogs()

  return (
    <span>
      Hey, {dogs[0].primary_owner_email}! You now a member and have completed
      the onboarding Whats up with {dogs[0].dog_name} ?
    </span>
  )
}

export default MemberContent
