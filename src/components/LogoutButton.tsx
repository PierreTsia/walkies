'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const LogoutButton = ({ logout }: { logout: () => Promise<any> }) => {
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <Button variant="outline" size="icon" onClick={handleLogout}>
      <LogOut />
    </Button>
  )
}

export default LogoutButton
