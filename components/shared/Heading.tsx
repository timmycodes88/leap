interface HeadingProps {
  title: string
  children?: React.ReactNode
}

export default function Heading({ title, children }: HeadingProps) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <h2 className='text-3xl font-light '>{title}</h2>
      {children}
    </div>
  )
}
