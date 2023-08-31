export default function Button(props: any) {
  return (
    <button
      className='rounded-xl py-2 w-full bg-gray-700 hover:bg-gray-600'
      {...props}
    >
      {props.children}
    </button>
  )
}
