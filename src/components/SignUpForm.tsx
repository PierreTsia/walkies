'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast, useToast } from '@/hooks/use-toast'

const createSignUpSchema = (translate: (key: string) => string) =>
  z
    .object({
      email: z.string().email(translate('errors.invalid_email')),
      password: z.string().min(6, translate('errors.password_min_length')),
      confirmPassword: z
        .string()
        .min(6, translate('errors.password_confirm_min_length')),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: translate('errors.passwords_mismatch'),
          path: ['confirmPassword'],
        })
      }
    })

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>

const SignUpForm = ({ signUp }: { signUp: (data: any) => Promise<void> }) => {
  /* const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)*/
  const t = useTranslations('SignUp')

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(createSignUpSchema(t)),
  })

  const onSubmit = async (data: SignUpFormData) => {
    await signUp(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>{t('confirm_password_field')}</FormLabel>
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

export default SignUpForm
