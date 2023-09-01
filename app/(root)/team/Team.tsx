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
        <h2 className='font-semibold text-3xl text-center'>
          {teamName} - <span className='font-normal'>{teamId}</span>
        </h2>
      </Card>
      {members.map(member => (
        <Profile key={member.id} user={member} teamPage />
      ))}
    </div>
  )
}
