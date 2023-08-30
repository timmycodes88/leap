export default function Input(props: any) {
  return (
    <input
      className={`bg-gray-700 rounded-md outline-none px-2 py-1.5 text-white ${props.customStyles}`}
      {...props}
    />
  )
}
