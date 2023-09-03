import AdaptiveButton from '@/components/shared/AdaptiveButton'
import BarChart from '@/components/layout/BarChart'
import QuoteBox from '@/components/layout/QuoteBox'
import Heading from '@/components/shared/Heading'
import { getUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { getTeams } from '@/lib/actions/team.actions'

export default async function page() {
  const user = await getUser()
  if (!user) redirect('/onboarding/1')
  if (!user?.teamId) redirect('/onboarding/2')

  const teams = await getTeams()

  return (
    <div className='flex flex-col gap-4 h-full'>
      <Heading title='Dashboard' />
      {user.buttonType && (
        <AdaptiveButton
          type={user.buttonType}
          disabled={['good', 'bad', 'disabled-waiting'].includes(
            user.buttonType
          )}
        />
      )}
      {/* {data?.quote && <QuoteBox quote={data.quote} author={data.author} />} */}
      <BarChart teams={teams} userId={user.id} />
    </div>
  )
}
