import { getAuthenticatedUser } from '@/app/actions/getAuthenticatedUser'
import UserProvider from '@/providers/UserProvider'

export default async function UserProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAuthenticatedUser()

  return <UserProvider user={user}>{children}</UserProvider>
}
