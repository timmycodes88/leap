import { cn } from '@/lib/utils'

export default function Button(props: any) {
  return (
    <button
      className={cn(
        'rounded-xl py-2 w-full bg-gray-700 hover:bg-gray-600',
        props.className
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}
