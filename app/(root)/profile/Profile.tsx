import SetTime from '@/components/forms/SetTime'
import Card from '@/components/layout/Card'
import User from '@/lib/models/user.model'
import Image from 'next/image'

interface ProfileProps {
  user: User
  teamPage?: boolean
}

const icons = {
  good: '/svg/check.svg',
  bad: '/svg/no-touch.svg',
}

export default function Profile({ user, teamPage }: ProfileProps) {
  const checkins = user.checkins || []
  const blankFill = Array(5 - checkins.length).fill('blank')

  const checkinsArr = [...checkins, ...blankFill]

  return (
    <div className='flex flex-col gap-4 mb-20'>
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
                    ? user.wakeUpTime.slice(1)
                    : user.wakeUpTime)) ||
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
        <div className='flex items-center justify-center gap-2'>
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
      </Card>

      {!teamPage && (
        <Card>
          <h3 className='text-2xl font-semibold text-center mb-5'>
            Intentions
          </h3>
          <p className='text-center text-white/40'>
            No intentions created yet.
          </p>
        </Card>
      )}
    </div>
  )
}
