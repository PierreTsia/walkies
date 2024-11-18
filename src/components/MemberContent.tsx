'use client'

import useGetUserDogs from '@/hooks/queries/useGetUserDogs'

const MemberContent = () => {
  const { data: dogs, isPending } = useGetUserDogs()

  if (isPending || !dogs || !dogs.length) {
    return null
  }

  return (
    <span>
      Hey, {dogs[0].primary_owner_email}! You are now a member and have
      completed the onboarding. What is up with {dogs[0].dog_name}?
    </span>
  )
}

export default MemberContent
