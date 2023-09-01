//* With a "Perfect Days" chart, you get a point for when EVERYONE on your team checks in on time.
//* Leaderboard resets each week.

export default function BarChart() {
  return (
    <div className='w-full rounded-3xl p-4 bg-gray-800'>
      <div className='flex flex-col'>
        Leaderboard
        <div className='flex flex-col gap-2'>
          <Bar teamName='The People' progress={2} />
          <Bar teamName='Big Frawgs' progress={3} />
          <Bar teamName='Error Masters' progress={2} />
          <Bar teamName='Vibe Riders' progress={4} />
        </div>
      </div>
      <div className='w-full bg-gray-900 h-4'></div>
    </div>
  )
}

// TODO: Find a way to implement colors for the bars

interface BarProps {
  teamName: string
  progress: 0 | 1 | 2 | 3 | 4 | 5
}

function Bar({ teamName }: BarProps) {
  return (
    <div className='relative rounded-full h-6 w-full bg-gray-600'>
      <div className='text-xs absolute top-1/5 left-0 rounded-lg p-1 bg-black opacity-60'>
        <span className='text-white'>{teamName}</span>
      </div>
    </div>
  )
}
