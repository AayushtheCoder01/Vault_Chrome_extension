
interface props {
    text: string
}
const TransParentBtn: React.FC<props>= ({text}) => {
  return (
    <a href="#_" className="inline-flex items-center justify-center h-10 px-3 py-0 text-md font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-lg cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline">
        {text}
</a>
  )
}

export default TransParentBtn