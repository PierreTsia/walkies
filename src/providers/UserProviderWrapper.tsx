import UserProvider from '@/providers/UserProvider'
import getMe from '@/app/actions/getMe'

export default async function UserProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getMe()

  return <UserProvider user={user}>{children}</UserProvider>
}
