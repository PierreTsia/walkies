'use client'

import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { registerDog } from '@/app/actions/registerDog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormButtons from '@/components/FormButtons'
import { Switch } from '@/components/ui/switch'
import DogBreedSelect from '@/components/DogBreedSelect'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/tailwind'
import useDateFormats from '@/hooks/useDateFormats'
import { toast } from '@/hooks/use-toast'

const isImpossibleDogDoB = (date: Date) => {
  return date < new Date() && date > new Date('2000-01-01')
}

const createDogRegistrationSchema = (translate: (key: string) => string) =>
  z.object({
    name: z.string().min(3, translate('errors.dog_name_min_length')),
    breed: z.string().optional(),
    dob: z
      .date()
      .refine(isImpossibleDogDoB, translate('errors.dog_dob_invalid')),
  })

export type DogRegistrationFormData = z.infer<
  ReturnType<typeof createDogRegistrationSchema>
>
const DogRegistrationForm = () => {
  const t = useTranslations('DogRegistrationForm')
  const [isLoading, setIsLoading] = useState(false)

  const [isPureBreed, setIsPureBreed] = useState(false)

  const form = useForm<DogRegistrationFormData>({
    resolver: zodResolver(createDogRegistrationSchema(t)),
    defaultValues: {
      name: '',
      breed: '',
      dob: undefined,
    },
  })

  const { datePickerDateFormat } = useDateFormats()

  const onSubmit = async (data: DogRegistrationFormData) => {
    setIsLoading(true)

    const isSuccess = await registerDog(data)
    setIsLoading(false)

    toast({
      title: isSuccess ? t('success_toast') : t('error_toast'),
      variant: isSuccess ? 'default' : 'destructive',
    })
  }

  const togglePureBreed = () => {
    setIsPureBreed((prevState) => {
      const newState = !prevState
      if (!newState && form.getValues('breed')) {
        form.setValue('breed', '')
      }
      return newState
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full gap-x-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input placeholder="Vendetta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col  items-baseline gap-x-2 md:flex-row">
          <FormField
            control={form.control}
            name="breed"
            disabled={!isPureBreed}
            render={({ field }) => (
              <FormItem className="flex h-[60px] w-full flex-col">
                <FormLabel className={'flex h-4 items-center gap-x-2'}>
                  {t('breed_label')}
                  <Switch
                    checked={isPureBreed}
                    onClick={togglePureBreed}
                    className="scale-90"
                  />
                </FormLabel>
                <DogBreedSelect
                  value={field.value}
                  isDisabled={!isPureBreed}
                  setValue={form.setValue}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="my-4 flex h-[60px] w-full flex-col ">
                <FormLabel className="h-4">{t('dob')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-8 w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          datePickerDateFormat(field.value)
                        ) : (
                          <span>{t('dob_placeholder')}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={isImpossibleDogDoB}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormButtons
          reset={form.reset}
          isLoading={isLoading}
          confirmText={t('submit_button')}
          cancelText={t('reset_button')}
        />
      </form>
    </Form>
  )
}

export default DogRegistrationForm
