import Image from 'next/image'

interface AdaptiveButtonProps {
  type: 'good' | 'bad' | 'waiting' | 'profile' | 'team'
  disabled?: boolean
}

const icons = {
  good: '/svg/check.svg',
  bad: '/svg/no-touch.svg',
  waiting: '/svg/fingerprint.svg',
  profile: '/svg/pencil.svg',
}

export default function AdaptiveButton({
  type,
  disabled,
}: AdaptiveButtonProps) {
  if (type === 'team') return null
  return (
    <button
      className={`hover:bg-green-800 fixed z-20 right-4 bottom-[6.5rem] rounded-full p-6 bg-green-500 flex items-center justify-center ${
        disabled && 'bg-gray-400 hover:bg-gray-400'
      }`}
      disabled={disabled}
    >
      <Image src={icons[type]} width={24} height={24} alt='Icon' />
    </button>
  )
}
