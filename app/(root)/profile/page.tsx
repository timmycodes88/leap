import Heading from '@/components/shared/Heading'
import { getTeam } from '@/lib/actions/team.actions'
import { getUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import Profile from './Profile'
import AdaptiveButton from '@/components/shared/AdaptiveButton'

export default async function page() {
  const user = await getUser()
  if (!user) redirect('/onboarding/1')
  if (!user.teamId) redirect('/onboarding/2')

  const team = await getTeam(user.teamId)

  return (
    <div className='h-full'>
      <Heading title='Profile' />
      <Profile user={user} pushupCount={team.pushupCount} />
      <AdaptiveButton type='profile' />
      <div className='h-[150px]' />
    </div>
  )
}
