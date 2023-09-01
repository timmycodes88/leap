import User from '@/lib/models/user.model'
import Profile from '../profile/Profile'
import Card from '@/components/layout/Card'

interface TeamProps {
  members: User[]
  teamId: string
  teamName: string
}

export default function Team({ members, teamId, teamName }: TeamProps) {
  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <div className='flex justify-between items-center'>
          <div className='text-lg font-semibold text-green-500'>{teamName}</div>
          <div className='flex flex-col text-center'>
            <span>Team ID</span>
            <span className='text-gray-500'>{teamId}</span>
          </div>
        </div>
      </Card>
      {members.map(member => (
        <Profile key={member.id} user={member} teamPage />
      ))}
    </div>
  )
}
