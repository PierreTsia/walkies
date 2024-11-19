import { StepItem } from '@/components/ui/stepper'
import { useTranslations } from 'next-intl'

const STEPS_ID = [
  { id: 'waiting_for_approval' },
  { id: 'user_registration' },
  { id: 'dog_registration' },
] satisfies Pick<StepItem, 'id'>[]

const useOnboardingSteps = () => {
  const t = useTranslations('Onboarding.Steps')
  const steps: StepItem[] = STEPS_ID.map((step) => ({
    ...step,
    label: t(step.id),
    description: t(`${step.id}_description`),
  }))

  return steps
}

export default useOnboardingSteps
