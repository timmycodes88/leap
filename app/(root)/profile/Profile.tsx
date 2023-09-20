import SetTime from '@/components/forms/SetTime'
import Card from '@/components/modals/layout/Card'
import User from '@/lib/models/user.model'
import Image from 'next/image'
import Intentions from './Intentions'
import { cn } from '@/lib/utils'
import ActionTooltip from '@/components/shared/ActionTooltip'
import Streak from '@/components/shared/Streak'
import Button from '@/components/ui/Button'
import CompletePushups from '@/components/forms/CompletePushups'
interface ProfileProps {
  user: User
  teamPage?: boolean
  last?: boolean
  pushupCount?: number
}

const icons = {
  good: '/svg/check-white.svg',
  bad: '/svg/no-touch-white.svg',
}

export default function Profile({
  user,
  teamPage,
  last,
  pushupCount,
}: ProfileProps) {
  const checkins = user.checkins || []
  const blankFill = new Array(5 - Math.min(checkins.length, 5)).fill('blank')

  const checkinsArr = [...checkins, ...blankFill]

  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <div className='flex justify-between items-center gap-2'>
          <div className='flex flex-col'>
            <span className='text-xl'>{user.name}</span>
            <span className='text-gray-500 text-xs'>@{user.username}</span>
          </div>

          {!!pushupCount &&
            (user.activePushups ? (
              <div className='flex flex-col gap-1 text-center items-center justifiy-center'>
                <span className='text-sm text-gray-100'>Pushups</span>
                {teamPage ? (
                  <span className='text-xs text-gray-500'>Incomplete</span>
                ) : (
                  <CompletePushups />
                )}
              </div>
            ) : (
              <div className='flex flex-col gap-1 text-center items-center justifiy-center'>
                <span className='text-sm text-gray-100'>Pushups</span>
                <span className='text-xs text-gray-500'>Completed</span>
              </div>
            ))}
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
