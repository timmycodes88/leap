import SetTime from '@/components/forms/SetTime'
import Card from '@/components/layout/Card'
import User from '@/lib/models/user.model'
import Image from 'next/image'
import Intentions from './Intentions'
import { cn } from '@/lib/utils'
import ActionTooltip from '@/components/shared/ActionTooltip'
import Streak from '@/components/shared/Streak'
interface ProfileProps {
  user: User
  teamPage?: boolean
  last?: boolean
}

const icons = {
  good: '/svg/check-white.svg',
  bad: '/svg/no-touch-white.svg',
}

export default function Profile({ user, teamPage, last }: ProfileProps) {
  const checkins = user.checkins || []
  const blankFill = Array(5 - checkins.length).fill('blank')

  const checkinsArr = [...checkins, ...blankFill]

  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <div className='flex justify-between items-center gap-2'>
          <div className='flex flex-col'>
            <span className='text-xl'>{user.name}</span>
            <span className='text-gray-500 text-xs'>@{user.username}</span>
          </div>
          <div>
            {teamPage ? (
              <p>
                {(user.wakeUpTime &&
                  (Number(user.wakeUpTime.split(':')[0]) < 11
                    ? user.wakeUpTime.slice(1) + 'am'
                    : user.wakeUpTime + 'am')) ||
                  'Unset'}
              </p>
            ) : (
              <SetTime currTime={user.wakeUpTime} />
            )}
          </div>
        </div>
      </Card>

      <Card>
        <h3 className='text-2xl font-semibold text-center mb-5'>Stats</h3>
        <div className='flex justify-around items-center gap-4 w-full'>
          <div className='flex items-center justify-center gap-4'>
            {checkinsArr.map((status: 'blank' | boolean, i) => (
              <div key={i}>
                {status === 'blank' ? (
                  '_'
                ) : (
                  <Image
                    src={icons[status ? 'good' : 'bad']}
                    width={20}
                    height={20}
                    alt='Icon'
                  />
                )}
              </div>
            ))}
          </div>
          <Streak streak={user.streak || 0} />
        </div>
      </Card>

      {!last && (
        <div className='h-[0.1rem] w-full bg-gray-500/50 rounded-full' />
      )}
      {!teamPage && (
        <Card>
          <h3 className='text-2xl font-semibold text-center mb-5'>
            Intentions
          </h3>
          <Intentions />
        </Card>
      )}
    </div>
  )
}
