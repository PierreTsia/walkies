'use client'

import { useState, useTransition } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { submitRegistrationRequest } from '@/app/actions/submitRegistrationRequest'

type FormValues = {
  name: string
  email: string
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

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    startTransition(async () => {
      try {
        const result = await submitRegistrationRequest(formData)
        if (result.success) {
          setStatus('success')
          reset() // Clear form fields
        }
      } catch (error) {
        setStatus('error')
        console.error('Error submitting registration request:', error)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-4 rounded-md  p-4 shadow-md"
    >
      <h3 className="text-2xl font-semibold">Join the Network</h3>

      <label className="flex flex-col gap-1">
        Name
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="rounded border p-2"
          placeholder="Your name"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </label>

      <label className="flex flex-col gap-1">
        Email
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email format',
            },
          })}
          className="rounded border p-2"
          placeholder="Your email"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 rounded bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
      >
        {isPending ? 'Submitting...' : 'Submit Registration Request'}
      </button>

      {status === 'success' && (
        <p className="text-green-600">Request submitted successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600">
          Failed to submit request. Please try again.
        </p>
      )}
    </form>
  )
}
