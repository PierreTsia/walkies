'use client';

import { useUserContext } from '@/providers/UserProvider'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { GlobeIcon } from 'lucide-react'; // Optional icon import

const LocaleSwitcher = () => {
  const { locale, switchLocale } = useUserContext();

  const handleLocaleChange = (newLocale: 'fr' | 'en') => {
    switchLocale(newLocale);
    location.reload(); // Reload the page to apply the new locale
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <GlobeIcon className="w-4 h-4" /> {/* Optional globe icon */}
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
  );
};

export default LocaleSwitcher;
