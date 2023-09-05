interface QuoteBoxProps {
  quote: string
  author: string
}

export default function QuoteBox({ quote, author }: QuoteBoxProps) {
  return (
    <div className='flex flex-col overflow-x-hidden bg-gray-800 p-4 justify-around items-center rounded-3xl'>
      <span className='text-sm font-semibold text-center'>{quote}</span>
      <span className='italic text-sm font-light'>-{author}</span>
    </div>
  )
}
