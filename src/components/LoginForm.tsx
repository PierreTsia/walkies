'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import FormButtons from '@/components/FormButtons'
import useSignInUser from '@/hooks/mutations/useSignInUser'

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address '),
  password: z.string(),
})

type LoginFormValues = z.infer<typeof FormSchema>

const LoginForm = () => {
  const t = useTranslations('Login')
  const { mutateAsync, isError, isPending } = useSignInUser()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => mutateAsync(d))}
        className="block w-full gap-x-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>{t('email_field')}</FormLabel>
              <FormControl>
                <Input placeholder="joe@email.com" id="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>{t('password_field')}</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••"
                  type="password"
                  id="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButtons
          reset={form.reset}
          isLoading={isPending}
          confirmText={t('submit_button')}
          cancelText={t('reset_button')}
        />
      </form>
    </Form>
  )
}

export default LoginForm
