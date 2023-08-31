import { getUser } from '@/lib/actions/user.actions'
import Step2 from './StepTwo'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await getUser()
  if (!user) redirect('/onboarding/1')
  if (user?.teamId) redirect('/')

  return <Step2 />
}
