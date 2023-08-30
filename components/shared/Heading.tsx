interface HeadingProps {
  title: string
}

export default function Heading({ title }: HeadingProps) {
  return <h2 className='text-3xl font-light'>{title}</h2>
}
