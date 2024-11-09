import { UserType } from '@/types'

const MemberContent = ({ user }: { user: UserType | null }) => {
  return (
    <span>
      Hey, {user?.email}! You now a member and have completed the onboarding{' '}
    </span>
  )
}

export default MemberContent
