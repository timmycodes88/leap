'use client'

import { usePathname } from 'next/navigation'
import {
  MutableRefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

export default function ActionTooltip({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const isLeft = usePathname() === '/'
  const [open, setOpen] = useState(false)
  const onClick = () => setOpen(prev => !prev)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const tooltip = tooltipRef.current
    const button = buttonRef.current

    if (open && tooltip && button) {
      const { top, left, width } = button.getBoundingClientRect()

      tooltip.style.top = `${top - 40}px`
      tooltip.style.left = `${
        isLeft ? left - 70 : left - (tooltip.offsetWidth - width) / 2
      }px`
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (tooltip && !tooltip.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open])
  return (
    <>
      {open &&
        createPortal(
          <Tooltip tooltipRef={tooltipRef} content={label} />,
          document.body
        )}
      <>
        <button ref={buttonRef} onClick={onClick}>
          {children}
        </button>
      </>
    </>
  )
}

const Tooltip = ({
  content,
  tooltipRef,
}: {
  content: string
  tooltipRef: React.RefObject<HTMLSpanElement>
}) => (
  <span
    ref={tooltipRef}
    className='fixed top-0 left-0 z-[1000] bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded-md shadow-md'
  >
    {content}
  </span>
)
