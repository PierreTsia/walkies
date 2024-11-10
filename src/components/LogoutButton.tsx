'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import useSIgnOutUser from '@/hooks/useSignOutUser'

const LogoutButton = () => {
  const router = useRouter()
  const { mutateAsync, isPending } = useSIgnOutUser()
  const handleLogout = async () => {
    await mutateAsync()
    router.push('/login')
  }

  return (
    <Button
      disabled={isPending}
      variant="outline"
      size="icon"
      onClick={handleLogout}
    >
      <LogOut />
    </Button>
  )
}

export default LogoutButton
