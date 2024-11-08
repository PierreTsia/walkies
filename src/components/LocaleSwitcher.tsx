'use client'

import { useLocaleContext } from '@/providers/LocaleProvider'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { GlobeIcon } from 'lucide-react' // Optional icon import

const LocaleSwitcher = () => {
  const { locale, switchLocale } = useLocaleContext()

  const handleLocaleChange = (newLocale: 'fr' | 'en') => {
    switchLocale(newLocale)
    location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <GlobeIcon className="h-4 w-4" /> {/* Optional globe icon */}
          {locale === 'en' ? 'English' : 'Français'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLocaleChange('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocaleChange('fr')}>
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LocaleSwitcher
