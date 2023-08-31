import { getUser } from '@/lib/actions/user.actions'
import Step1 from './StepOne'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await getUser()
  if (user?.teamId) redirect('/')
  if (user) redirect('/onboarding/2')

  return <Step1 />
}
