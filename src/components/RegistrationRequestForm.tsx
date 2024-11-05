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
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { submitRegistrationRequest } from '@/app/actions/submitRegistrationRequest'

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
  const [status, setStatus] = useState<null | 'success' | 'error'>(null)
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    startTransition(async () => {
      try {
        const result = await submitRegistrationRequest(formData)
        if (result.success) {
          setStatus('success')
          reset() // Clear form fields
        }
      } catch (error: any) {
        setStatus('error')
        setErrorMessage(error.message)
      }
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Join the Network
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="content_text">Additional Information</Label>
            <Textarea
              id="content_text"
              placeholder="Tell us more about yourself"
              {...register('content_text')}
              rows={4} // Adjust the number of rows as needed
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Registration Request'}
          </Button>
          {status === 'success' && (
            <p className="text-center text-sm text-green-600">
              Request submitted successfully!
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-red-600">{errorMessage}</p>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
