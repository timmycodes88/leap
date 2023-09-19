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
          ? `${streak / 365} year streak!`
          : streak > 30
          ? `${streak / 30} month streak!`
          : !streak
          ? 'No Streak 🥲'
          : `${streak} day ${type} streak!`
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
