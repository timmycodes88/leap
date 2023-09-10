import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString(undefined, options)

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })

  const now = new Date()
  // is it today?
  if (date.getDate() === now.getDate()) {
    return time
  }
  // is it yesterday?
  if (date.getDate() === now.getDate() - 1) {
    return 'Yesterday'
  }
  // was it longer than a week ago?
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(now.getDate() - 7)
  if (!(date >= oneWeekAgo && date <= now)) {
    return formattedDate
  }

  // was it this week?
  if (date.getDate() > now.getDate() - 7) {
    return `${date.toLocaleDateString(undefined, { weekday: 'short' })}`
  }

  return formattedDate
}
