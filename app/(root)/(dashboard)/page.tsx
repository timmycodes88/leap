import AdaptiveButton from '@/components/shared/AdaptiveButton'
import BarChart from '@/components/layout/BarChart'
import QuoteBox from '@/components/layout/QuoteBox'
import Heading from '@/components/shared/Heading'
import { getUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { getTeams } from '@/lib/actions/team.actions'
import Refresher from '@/components/shared/Refresher'
import Card from '@/components/layout/Card'
import Test from './Test'

export default async function page() {
  const user = await getUser()
  if (!user) redirect('/onboarding/1')
  if (!user?.teamId) redirect('/onboarding/2')

  const teams = await getTeams()

  return (
    <div className='flex flex-col gap-4 h-full'>
      <Refresher />
      <Heading title='Dashboard' />
      {user.buttonType && (
        <AdaptiveButton
          type={user.buttonType}
          disabled={['good', 'bad', 'disabled-waiting'].includes(
            user.buttonType
          )}
        />
      )}
      <QuoteBox
        quote={
          "They don't call em' lay in bed and snooze frogs, they are called LEAP Frogs!"
        }
        author={'Wes'}
      />
      <BarChart
        teams={teams.sort(t => (t.teamId === user.teamId ? -1 : 1))}
        userId={user.id}
      />
      <Card>
        <p>Text me @ 913-636-3773 if your time is not within a couple minutes of this time: </p>
<Test />
      </Card>
    </div>
  )
}
