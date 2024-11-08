import { UseFormSetValue } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import breedCodes from '@/domain/breeds'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/tailwind'
import { ChevronsUpDown, PawPrint } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { DogRegistrationFormData } from '@/components/DogRegistrationForm'

const DogBreedSelect = ({
  value,
  isDisabled = true,
  setValue,
}: {
  value?: string
  isDisabled: boolean
  setValue: UseFormSetValue<DogRegistrationFormData>
}) => {
  const t = useTranslations('Dogs.breeds')

  const breedOptions = useMemo(
    () =>
      breedCodes.map((breed) => ({
        label: t(breed),
        value: breed,
      })),
    [t],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            disabled={isDisabled}
            className={cn(
              'h-8 w-full justify-between',
              !value && 'text-muted-foreground',
            )}
          >
            {value ? t(value) : 'Select breed'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search breed..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Breed found.</CommandEmpty>
            <CommandGroup>
              {breedOptions.map((breed) => (
                <CommandItem
                  value={breed.label}
                  key={breed.value}
                  onSelect={() => {
                    setValue('breed', breed.value)
                  }}
                >
                  {breed.label}
                  <PawPrint
                    className={cn(
                      'ml-auto h-4 w-4',
                      breed.value === value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default DogBreedSelect
