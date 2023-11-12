
function Characters() {
  return (
    <div className="flex flex-wrap justify-center gap-4 ">
      <Character />
      <Character />
      <Character />
      <Character />
    </div>
  )
}

export default Characters

import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";

function Character() {
  return (
    <div className='flex h-20 rounded-md overflow-hidden text-xs bg-color-secondary'>
      {/*! image section */}
      <div>
        <img className='w-full h-full object-cover' src='https://rickandmortyapi.com/api/character/avatar/2.jpeg' />
      </div>
      {/*! info section */}
      <div className='flex-1 flex justify-between items-center gap-16  px-3'>
        <div className='flex flex-col justify-between gap-5'>
        <div className='flex gap-1 items-center'>
        <FcBusinessman className="mobile-icon hover:cursor-pointer"/>
          <p> ali meira</p>
        </div>
        <div className='flex gap-1 items-center'>
          <span className="w-2 h-2 rounded-full bg-green-300"></span>
          <p>Alive-</p>
          <p>human</p>
        </div>
        </div>
        <AiOutlineEye className="mobile-icon hover:cursor-pointer"/>
      </div>
    </div>
  )
}
