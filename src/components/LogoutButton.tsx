'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import useSIgnOutUser from '@/hooks/mutations/useSignOutUser'
import { useUser } from '@/providers/UserProvider'

const LogoutButton = () => {
  const user = useUser()
  const router = useRouter()
  const { mutateAsync, isPending } = useSIgnOutUser()
  const handleLogout = async () => {
    await mutateAsync()
    router.push('/login')
  }

  return (
    user && (
      <Button
        disabled={isPending}
        variant="outline"
        size="icon"
        id="logout-button"
        onClick={handleLogout}
      >
        <LogOut />
      </Button>
    )
  )
}

export default LogoutButton
