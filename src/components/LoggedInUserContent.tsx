import { User } from '@supabase/supabase-js'

const LoggedInUserContent = ({ user }: { user: User }) => {
  return <span>Hey, {user?.email}! </span>
}

export default LoggedInUserContent
