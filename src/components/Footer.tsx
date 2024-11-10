'use client'

import ThemeToggle from '@/components/ThemeToggle'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import LogoutButton from '@/components/LogoutButton'
import { User } from '@supabase/supabase-js'
import { useUser } from '@/providers/UserProvider'

type FooterProps = {
  logout: () => Promise<{
    redirect: { permanent: boolean; destination: string }
  }>
}

const Footer = ({ logout }: FooterProps) => {
  const user = useUser()
  return (
    <footer className="h-[80px] w-full border-t border-t-foreground/10 p-8 text-center text-xs">
      <div className="flex w-full justify-end gap-2">
        <ThemeToggle />
        <LocaleSwitcher />
        {user && <LogoutButton />}
      </div>
    </footer>
  )
}

export default Footer
