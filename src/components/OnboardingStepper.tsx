import { RegistrationRequest, UserType } from '@/types'
import { Button } from '@/components/ui/button'
import { Step, Stepper, useStepper } from '@/components/ui/stepper'
import ApprovalStep from '@/components/ApprovalStep'
import UserSignUpStep from '@/components/UserSignUpStep'
import DogRegistrationStep from '@/components/DogRegistrationStep'
import useOnboardingSteps from '@/hooks/useOnboardingSteps'
import { useEffect } from 'react'

const ActiveStep = ({
  request,
  user,
}: {
  request: RegistrationRequest | null
  user: UserType | null
}) => {
  const steps = useOnboardingSteps()
  const { activeStep: stepIndex, setStep } = useStepper()

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

const OnboardingStepper = ({
  request,
  user,
}: {
  request: RegistrationRequest | null
  user: UserType | null
}) => {
  const steps = useOnboardingSteps()

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.id} {...stepProps}>
              <div className="min-h-[90px] ">
                <div className="flex flex-col gap-4">
                  <ActiveStep request={request} user={user} />
                </div>
              </div>
            </Step>
          )
        })}
        <Footer />
      </Stepper>
    </div>
  )
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper()

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="my-2 flex h-40 items-center justify-center rounded-md border bg-secondary text-primary">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="flex w-full justify-center gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? 'Finish' : isOptionalStep ? 'Skip' : 'Next'}
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default OnboardingStepper
