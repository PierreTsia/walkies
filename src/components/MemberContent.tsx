import { DogWithOwner, UserType } from '@/types'

const MemberContent = ({
  user,
  dogs,
}: {
  user: UserType | null
  dogs: DogWithOwner[] | null
}) => {
  return (
    <span>
      Hey, {user?.email}! You now a member and have completed the onboarding{' '}
      Whats up with {dogs?.[0]?.dog_name} ?
    </span>
  )
}

export default MemberContent
