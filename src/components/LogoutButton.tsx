'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LogoutButton = ({ logout }: { logout: () => Promise<any> }) => {
  return (
    <Button variant="outline" size="icon" onClick={() => logout()}>
      <LogOut />
    </Button>
  )
}

export default LogoutButton
