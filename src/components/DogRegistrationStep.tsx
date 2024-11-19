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
  const dogName = dogs?.[0]?.dog_name ?? 'your dog'
  const hasAlreadySavedDog = !!dogs?.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {hasAlreadySavedDog
            ? t('upload-dog-avatar-title')
            : t('save-dog-title')}
        </CardTitle>
        <CardDescription>
          {hasAlreadySavedDog
            ? t('upload-dog-avatar-description', {
                dogName,
              }) /*`Choose a default avtar or upload an image for ${dogName}`*/
            : t('save-dog-description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasAlreadySavedDog ? <DogAvatarPicker /> : <DogRegistrationForm />}
      </CardContent>
    </Card>
  )
}

export default DogRegistrationStep
