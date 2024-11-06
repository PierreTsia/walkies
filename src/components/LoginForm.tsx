'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address '),
  password: z.string(),
})

type LoginFormValues = z.infer<typeof FormSchema>

const LoginForm = ({ signIn }: { signIn: SubmitHandler<LoginFormValues> }) => {
  const t = useTranslations('Login')

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
        onSubmit={form.handleSubmit((data) => signIn(data))}
        className="block w-full gap-x-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>{t('email_field')}</FormLabel>
              <FormControl>
                <Input placeholder="joe@email.com" {...field} />
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
                <Input placeholder="••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-x-2">
          <Button variant="secondary" onClick={() => form.reset()}>
            {t('reset_button')}
          </Button>
          <Button type="submit">{t('submit_button')}</Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
