interface props {
    text: string
}

const BlackBtn:React.FC<props> = ({text}) => {
  return (
    // <button>
    //     <a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
    //     <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
    //     <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
    //     <span className="relative text-white">Button Text</span>
    //     </span>
    //     </a>
    // </button>
    <button>
  <a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
    <span className="w-full h-full bg-gradient-to-br from-[#06baba] via-[hsl(146,97%,35%)] to-[#1e7e34] group-hover:from-[#08b99b] group-hover:via-[#05b250] group-hover:to-[#21a44f] absolute"></span>
    <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
      <span className="relative text-white">{text}</span>
    </span>
  </a>
</button>

  )
}

export default BlackBtn