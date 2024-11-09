import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import DogRegistrationForm from '@/components/DogRegistrationForm'
import { useTranslations } from 'next-intl'
import { DogWithOwner } from '@/types'
import { useOnboardingContext } from '@/providers/OnboardingProvider'

const DogRegistrationStep = () => {
  const t = useTranslations('DogRegistrationStep')
  const { dogs } = useOnboardingContext()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {dogs?.length ? (
          <span>We now want to upload a nice pic of {dogs[0].dog_name}</span>
        ) : (
          <DogRegistrationForm />
        )}
      </CardContent>
    </Card>
  )
}

export default DogRegistrationStep
