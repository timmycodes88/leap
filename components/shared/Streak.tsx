import { cn } from '@/lib/utils'
import ActionTooltip from './ActionTooltip'

export default function Streak({
  streak,
  type = '',
}: {
  streak: number
  type?: 'team' | ''
}) {
  const times = {
    year: type === 'team' ? 52 : 240,
    month: type === 'team' ? 4 : 20,
  }

  return (
    <ActionTooltip
      label={
        streak > times.year
          ? `${type === 'team' ? streak / 52 : streak / 20 / 12} year streak!`
          : streak > times.month
          ? `${type === 'team' ? streak / 4 : streak / 20} month streak!`
          : !streak
          ? `No${type === 'team' ? ' Week' : ''} Streak 🥲`
          : `${streak} ${type === 'team' ? 'week' : 'day'} streak!`
      }
    >
      <button className='flex gap-1'>
        <span>{streak || 0}</span>
        <span
          className={cn(
            streak > 365
              ? 'hue-rotate-[246deg]'
              : streak > 30 && 'hue-rotate-[166deg]'
          )}
        >
          {!streak ? '🧊' : '🔥'}
        </span>
      </button>
    </ActionTooltip>
  )
}
