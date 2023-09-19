import { getTeam } from '@/lib/actions/team.actions'
import { getUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import Team from './Team'
import AdaptiveButton from '@/components/shared/AdaptiveButton'
import Heading from '@/components/shared/Heading'

export default async function page() {
  const user = await getUser()
  if (!user) redirect('/onboarding/1')
  if (!user.teamId) redirect('/onboarding/2')

  const team = await getTeam(user.teamId)
  return (
    <div className='h-full'>
      <Heading title='Team' />
      <Team
        teamId={user.teamId}
        teamName={team.teamName}
        members={team.members.filter(
          (u: { username: string }) => u.username !== user.username
        )}
        streak={team.streak || 0}
      />
      <AdaptiveButton type='team' />
    </div>
  )
}
