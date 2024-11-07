import { UserType } from '@/types'

const LoggedInUserContent = ({ user }: { user: UserType }) => {
  return <span>Hey, {user?.email}! </span>
}

export default LoggedInUserContent
