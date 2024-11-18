'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import DogRegistrationForm from '@/components/DogRegistrationForm'
import { useTranslations } from 'next-intl'
import { useOnboardingContext } from '@/providers/OnboardingContextProvider'
import DogAvatarPicker from '@/components/DogAvatarPicker'

const DogRegistrationStep = () => {
  const t = useTranslations('DogRegistrationStep')

  const { dogs } = useOnboardingContext()
  const hasAlreadySavedDog = !!dogs?.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {hasAlreadySavedDog ? <DogAvatarPicker /> : <DogRegistrationForm />}
      </CardContent>
    </Card>
  )
}

export default DogRegistrationStep
