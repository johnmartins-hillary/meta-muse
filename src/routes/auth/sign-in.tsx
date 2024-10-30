import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '@/components/Form/LoginForm'

export const Route = createFileRoute('/auth/sign-in')({
  component: () => <LoginForm />,
})
