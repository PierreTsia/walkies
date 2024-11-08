import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import DogRegistrationForm from '@/components/DogRegistrationForm'

const DogRegistrationStep = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dog registration</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <DogRegistrationForm />
      </CardContent>
    </Card>
  )
}

export default DogRegistrationStep
