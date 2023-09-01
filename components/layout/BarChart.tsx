//* With a "Perfect Days" chart, you get a point for when EVERYONE on your team checks in on time.
//* Leaderboard resets each week.

import { cn } from '@/lib/utils'
import Card from './Card'

export default function BarChart() {
  return (
    <Card>
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg'>Leaderboard</h3>
        <div className='flex flex-col gap-2'>
          <Bar
            myTeam
            teamName='The People'
            progress={2}
            color={'bg-gradient-to-r from-cyan-500/70 to-blue-500/70'}
          />
          <Bar
            teamName='Big Frawgs'
            progress={4}
            color={'bg-gradient-to-r from-red-500/70 to-orange-500/70'}
          />
          <Bar
            teamName='Error Masters'
            progress={3}
            color={'bg-gradient-to-r from-green-900/70 to-green-500/70'}
          />
          <Bar
            teamName='Vibe Riders'
            progress={5}
            color={'bg-gradient-to-r from-purple-500/70 to-violet-500/70'}
          />
        </div>
      </div>
    </Card>
  )
}

// TODO: Find a way to implement colors for the bars

interface BarProps {
  myTeam?: boolean
  teamName: string
  progress: 0 | 1 | 2 | 3 | 4 | 5
  color: string
}

const progresses = {
  0: 'w-0',
  1: 'w-1/5',
  2: 'w-2/5',
  3: 'w-3/5',
  4: 'w-4/5',
  5: 'w-full',
}

function Bar({ myTeam, teamName, progress, color }: BarProps) {
  return (
    <div className='flex flex-col gap-1'>
      <p
        className={cn(
          'text-white text-xs',
          myTeam && 'font-bold text-yellow-500'
        )}
      >
        {teamName}
      </p>
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
