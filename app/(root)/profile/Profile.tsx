import Card from '@/components/layout/Card'
import User from '@/lib/models/user.model'

interface ProfileProps {
  user: User
  teamPage?: boolean
}

export default function Profile({ user, teamPage }: ProfileProps) {
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
              <p>6:90am</p>
            ) : (
              <input
                className='bg-gray-700 outline-none p-2 rounded-xl [&::-webkit-calendar-picker-indicator]:invert'
                type='time'
              />
            )}
          </div>
        </div>
      </Card>
      <Card>
        <h3 className='text-2xl font-semibold text-center mb-5'>Stats</h3>
        <p className='text-center text-white/80'>5/5</p>
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
