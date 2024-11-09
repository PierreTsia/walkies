import { DogWithOwner, RegistrationRequest, UserType } from '@/types'
import { Button } from '@/components/ui/button'
import { Step, Stepper, useStepper } from '@/components/ui/stepper'
import ApprovalStep from '@/components/ApprovalStep'
import UserSignUpStep from '@/components/UserSignUpStep'
import DogRegistrationStep from '@/components/DogRegistrationStep'
import useOnboardingSteps from '@/hooks/useOnboardingSteps'
import { useEffect } from 'react'
import { useOnboardingContext } from '@/providers/OnboardingContextProvider'

const ActiveStep = () => {
  const steps = useOnboardingSteps()
  const { activeStep: stepIndex, setStep } = useStepper()
  const { user, request } = useOnboardingContext()

  const step = steps[stepIndex]

  useEffect(() => {
    if (user) {
      setStep(steps.length - 1)
    }
  }, [setStep, stepIndex, steps.length, user])

  if (!step) {
    return null
  }
  switch (step.id) {
    case 'waiting_for_approval':
      return <ApprovalStep request={request} />
    case 'user_registration':
      return <UserSignUpStep />
    case 'dog_registration':
      return <DogRegistrationStep />
  }
}

const OnboardingStepper = () => {
  const steps = useOnboardingSteps()

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.id} {...stepProps}>
              <div className="min-h-[90px] ">
                <div className="flex flex-col gap-4">
                  <ActiveStep />
                </div>
              </div>
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}

export default OnboardingStepper
