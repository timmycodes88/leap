import { cn } from '@/lib/utils'
import ActionTooltip from './ActionTooltip'

export default function Streak({
  streak,
  type = '',
}: {
  streak: number
  type?: 'team' | ''
}) {
  return (
    <ActionTooltip
      label={
        streak > 365
          ? `${type === 'team' ? streak / 52 : streak / 20 / 12} year streak!`
          : streak > 30
          ? `${type === 'team' ? streak / 4 : streak / 20} month streak!`
          : !streak
          ? 'No Streak 🥲'
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
