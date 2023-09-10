import AdaptiveButton from '@/components/shared/AdaptiveButton'
import BarChart from '@/components/layout/BarChart'
import QuoteBox from '@/components/layout/QuoteBox'
import Heading from '@/components/shared/Heading'
import { getUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { getTeams } from '@/lib/actions/team.actions'
import Refresher from '@/components/shared/Refresher'
import { quotes } from '@/constants/constants'
import { getQuote } from '@/lib/actions/quote.actions'
import { QuoteType } from '@/lib/models/quote.model'


export default async function page() {
  const user = await getUser()
  if (!user) redirect('/onboarding/1')
  if (!user?.teamId) redirect('/onboarding/2')

  const teams = await getTeams()

  const customQuote = await getQuote()

  const date = new Date()
  const quote =
    customQuote && customQuote.quote && customQuote.author
      ? customQuote
      : quotes[
          (date.getMonth() + date.getDay() + date.getFullYear()) % quotes.length
        ]

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
      <QuoteBox quote={quote.quote} author={quote.author} />
      <BarChart
        teams={teams.sort(t => (t.teamId === user.teamId ? -1 : 1))}
        userId={user.id}
      />
    </div>
  )
}
