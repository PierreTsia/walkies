'use client'
import { useUser } from '@/providers/UserProvider' // Import the custom hook to check user status
import ThemeToggle from '@/components/ThemeToggle'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import LogoutButton from '@/components/LogoutButton'

const Footer = () => {
  const user = useUser() // Retrieve user state and onboarding status

  const isOnboarded = user?.onboarding_completed // Check if user has completed onboarding

  // Show different footers based on user connection and onboarding status
  if (user && isOnboarded) {
    return (
      <footer className="fixed bottom-0 flex w-full justify-around border-t border-t-foreground/10 bg-background/95 p-4 text-center text-xs">
        {/* Replace with action bar similar to the provided model */}
        <button className="action-button">Home</button>
        <button className="action-button">Walks</button>
        <button className="action-button">Profile</button>
        <LogoutButton />
      </footer>
    )
  }

  // Render anonymous footer if not connected or not onboarded
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 text-center text-xs">
      <div className="flex w-full justify-start gap-2">
        <ThemeToggle />
        <LocaleSwitcher />
        <LogoutButton />
      </div>
    </footer>
  )
}

export default Footer

/*
import ThemeToggle from '@/components/ThemeToggle'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import LogoutButton from '@/components/LogoutButton'

const Footer = () => {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 text-center text-xs">
      <div className="flex w-full justify-start gap-2">
        <ThemeToggle />
        <LocaleSwitcher />
        <LogoutButton />
      </div>
    </footer>
  )
}

export default Footer


// this is the anonymous footer component
// in the end we want to swap this with a manu action bar on the model of https://v0.dev/t/mGVggH0RgOv
// if the user is connected and with onboarded complete
// we can use the useUser hook to check if the user is connected
// this is currently a server component, keep client side logic as minimal as possible

*/
