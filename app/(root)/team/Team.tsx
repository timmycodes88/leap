import User from '@/lib/models/user.model'
import Profile from '../profile/Profile'
import Card from '@/components/layout/Card'
import Streak from '@/components/shared/Streak'

interface TeamProps {
  members: User[]
  teamId: string
  teamName: string
  streak: number
}

export default function Team({ members, teamId, teamName, streak }: TeamProps) {
  return (
    <div className='flex flex-col gap-4 mb-20'>
      <Card>
        <div className='flex justify-between items-center'>
          <div className='text-lg font-semibold text-green-500'>{teamName}</div>
          <Streak streak={streak} type='team' />
          <div className='flex flex-col text-center'>
            <span>Team ID</span>
            <span className='text-gray-500'>{teamId}</span>
          </div>
        </div>
      </Card>
      <div className='h-[0.1rem] w-full bg-gray-500/50 rounded-full' />
      {members.map((member, i) => {
        return (
          <Profile
            last={i === members.length - 1}
            key={member.id}
            user={member}
            teamPage
          />
        )
      })}
    </div>
  )
}
