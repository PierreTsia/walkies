import { RegistrationRequest } from '@/types'
import { Button } from '@/components/ui/button'
import { Step, Stepper, useStepper } from '@/components/ui/stepper'
import { Card, CardContent } from '@/components/ui/card'
import WaitingForApproval from '@/components/WaitingForApproval'
import UserSignUpForm from '@/components/UserSignUpForm'
import DogRegistrationForm from '@/components/DogRegistrationForm'
import useOnboardingSteps from '@/hooks/useOnboardingSteps'

const ActiveStep = ({ request }: { request: RegistrationRequest }) => {
  const steps = useOnboardingSteps()
  const { activeStep: stepIndex } = useStepper()

  const step = steps[stepIndex]

  if (!step) {
    return null
  }
  switch (step.id) {
    case 'waiting_for_approval':
      return <WaitingForApproval request={request} />
    case 'user_registration':
      return <UserSignUpForm />
    case 'dog_registration':
      return <DogRegistrationForm />
  }
}

const OnboardingStepper = ({ request }: { request: RegistrationRequest }) => {
  const steps = useOnboardingSteps()

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.id} {...stepProps}>
              <Card className="boder min-h-[90px] border-primary bg-primary/20">
                <CardContent className="flex flex-col gap-4">
                  <ActiveStep request={request} />
                </CardContent>
              </Card>
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
