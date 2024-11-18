'use client'

import { useState, useTransition } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { PawPrint } from 'lucide-react'
import Link from 'next/link'
import useSubmitRegistrationRequest from '@/hooks/mutations/useSubmitRegistrationRequest'

type FormValues = {
  name: string
  email: string
  content_text?: string
}

export default function RegistrationRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null,
  )

  const { mutateAsync, isPending, isError, isSuccess } =
    useSubmitRegistrationRequest()

  const t = useTranslations('Registration')

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    void mutateAsync(formData)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold ">{t('title')}</CardTitle>
        <CardDescription className="text-sm font-thin text-card-foreground/50">
          {t('description')}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              type="text"
              className={errors.name ? 'border-destructive' : ''}
              placeholder={t('name_placeholder')}
              {...register('name', { required: t('name_error') })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              className={errors.email ? 'border-destructive' : ''}
              placeholder={t('email_placeholder')}
              {...register('email', {
                required: t('email_error'),
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: t('email_pattern_error'),
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="content_text">{t('content_text')}</Label>
            <Textarea
              id="content_text"
              placeholder={t('content_text_placeholder')}
              {...register('content_text')}
              rows={4} // Adjust the number of rows as needed
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" disabled={isPending} variant="default">
            {isPending ? t('submitting') : t('submit')}
          </Button>
          {isSuccess && (
            <p className="text-center text-sm text-green-600">
              {t('submit_success')}
            </p>
          )}
          {isError && (
            <p className="text-center text-sm text-destructive">
              {submitErrorMessage}
            </p>
          )}
          <Separator />

          <p className="text-sm font-thin">{t('to_login_description')}</p>
          <Link href={'/login'}>
            <Button variant="secondary" className="gap-x-1">
              <PawPrint size={16} />
              {t('to_login')}
            </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
