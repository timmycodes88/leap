import { getIntentions } from '@/lib/actions/intention.actions'
import { IntentionType } from '@/lib/models/intention.model'
import Intention from './Intention'

export default async function Intentions() {
  const { intentions, error } = await getIntentions()

  if (error) console.log('[GET INTENTIONS ERROR]: ', error)

  const completed =
    intentions?.filter((intention: IntentionType) => intention.complete)
      .length || 0

  if (intentions?.length) {
    return (
      <div className='flex flex-col gap-6'>
        <span className=' absolute top-5 right-3 flex gap-1'>
          <span className='text-white/80'>
            {completed}/{intentions.length}
          </span>
          <span>✅</span>
        </span>
        {intentions.map((intention: IntentionType) => (
          <Intention
            key={JSON.stringify(intention._id)}
            _id={JSON.stringify(intention._id)}
            content={intention.content}
            complete={intention.complete}
            date={intention.date}
          />
        ))}
      </div>
    )
  } else
    return (
      <p className='text-center text-white/40'>No intentions created yet.</p>
    )
}
