import ThemeToggle from '@/components/ThemeToggle'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import LogoutButton from '@/components/LogoutButton'
import { useUser } from '@/providers/UserProvider'

const Footer = () => {
  return (
    <footer className="h-[80px] w-full border-t border-t-foreground/10 p-8 text-center text-xs">
      <div className="flex w-full justify-end gap-2">
        <ThemeToggle />
        <LocaleSwitcher />
        <LogoutButton />
      </div>
    </footer>
  )
}

export default Footer
