//* With a "Perfect Days" chart, you get a point for when EVERYONE on your team checks in on time.
//* Leaderboard resets each week.

import { cn } from '@/lib/utils'
import Card from './Card'
import Streak from '../../shared/Streak'

interface BarChartProps {
  teams: any[]
  userId: string
}

const colors = [
  'bg-gradient-to-r from-cyan-500/70 to-blue-500/70',
  'bg-gradient-to-r from-red-500/70 to-orange-500/70',
  'bg-gradient-to-r from-green-900/70 to-green-500/70',
  'bg-gradient-to-r from-purple-500/70 to-violet-500/70',
]

export default function BarChart({ teams, userId }: BarChartProps) {
  return (
    <Card>
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg'>Leaderboard</h3>
        <div className='flex flex-col gap-2'>
          {teams.map((team: any, i) => {
            const color = colors[i % colors.length]
            let myTeam
            team.members.forEach((member: any) => {
              if (member.id === userId) myTeam = true
            })
            return (
              <Bar
                key={i}
                myTeam={myTeam}
                teamName={team.teamName}
                progress={team.weeklyPoints.length}
                color={color}
                streak={team.streak || 0}
              />
            )
          })}
        </div>
      </div>
    </Card>
  )
}

interface BarProps {
  myTeam?: boolean
  teamName: string
  progress: 0 | 1 | 2 | 3 | 4 | 5
  color: string
  streak: number
}

const progresses = {
  0: 'w-0',
  1: 'w-1/5',
  2: 'w-2/5',
  3: 'w-3/5',
  4: 'w-4/5',
  5: 'w-full',
}

function Bar({ myTeam, teamName, progress, color, streak }: BarProps) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex justify-between items-bottom'>
        <p
          className={cn(
            'text-white text-sm w-fit',
            myTeam && 'font-bold text-yellow-500'
          )}
        >
          {teamName}
        </p>
        <Streak streak={streak} type='team' />
      </div>
      <div className='relative rounded-full h-6 w-full bg-gray-600'>
        <div
          className={cn(
            'absolute top-0 bottom-0 left-0 rounded-full',
            color,
            progresses[progress]
          )}
        ></div>
      </div>
    </div>
  )
}
