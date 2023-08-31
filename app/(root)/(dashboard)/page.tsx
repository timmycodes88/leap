import AdaptiveButton from '@/components/shared/AdaptiveButton'
import Heading from '@/components/shared/Heading'
import { getUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await getUser()
  if (!user) redirect('/onboarding/1')
  if (!user?.teamId) redirect('/onboarding/2')

  return (
    <div className='h-full'>
      <Heading title='Dashboard' />
      <AdaptiveButton type='waiting' disabled={false} />
    </div>
  )
}
