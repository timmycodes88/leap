import User from '@/lib/models/user.model'
import Profile from '../profile/Profile'
import Card from '@/components/layout/Card'

interface TeamProps {
  members: User[]
  teamId: string
}

export default function Team({ members, teamId }: TeamProps) {
  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <h2 className='font-semibold text-3xl text-center'>{teamId}</h2>
      </Card>
      {members.map(member => (
        <Profile key={member.id} user={member} teamPage />
      ))}
    </div>
  )
}
