import { createFileRoute } from '@tanstack/react-router'
import SignUpForm from '@/components/Form/SignUp'

export const Route = createFileRoute('/auth/sign-up')({
  component: () => <SignUpForm />,
})
