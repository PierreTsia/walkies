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
import UploadDogImage from '@/components/UploadDogImage'

const DogRegistrationStep = () => {
  const t = useTranslations('DogRegistrationStep')
  const { hasAlreadySavedDog, dogName } = useOnboardingContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {hasAlreadySavedDog ? <UploadDogImage /> : <DogRegistrationForm />}
      </CardContent>
    </Card>
  )
}

export default DogRegistrationStep
