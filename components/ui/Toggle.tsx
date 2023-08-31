'use client'

interface ToggleProps {
  toggle: string
  setToggle: React.Dispatch<React.SetStateAction<string>>
  toggles: string[]
}

export default function Toggle({ toggle, setToggle, toggles }: ToggleProps) {
  return (
    <div className='flex gap-2'>
      {toggles.map(t => (
        <div
          key={t}
          className={`flex items-center justify-center rounded-xl py-2 px-4 cursor-pointer ${
            toggle === t ? 'bg-gray-700' : 'bg-gray-900'
          }`}
          onClick={() => setToggle(t)}
        >
          <p className='text-sm font-semibold'>{t}</p>
        </div>
      ))}
    </div>
  )
}
