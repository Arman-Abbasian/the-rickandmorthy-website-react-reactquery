import {Outlet,NavLink} from 'react-router-dom';
function Layout() {
  return (
    <div className="flex gap-8 p-4">
        <Navbar />
        <div className='flex-1 ml-[70px] bg-red-100 px-10'>
        <Outlet />
        </div>
    </div>
  )
}

export default Layout

import { HiOutlineFilm } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
function Navbar() {
  return (
        <aside className="w-16 flex justify-center fixed left-4 top-4 h-screen  bg-slate-700 overflow-y-auto rounded-tl-md rounded-bl-md" >
            <ul className="flex flex-col gap-6 justify w-full ">
                <li className="flex justify-center">
                    <NavLink className='hover:bg-cyan-300 cursor-pointer w-full flex justify-center p-4' to={''}><HiOutlineFilm  /></NavLink>
                </li>
                <li className="flex justify-center">
                <NavLink className='hover:bg-cyan-300 cursor-pointer w-full flex justify-center p-4' to={'characters'}><BsPerson /></NavLink>
                </li>
                <li className="hover:bg-cyan-300 cursor-pointer flex justify-center p-4">3</li>
            </ul>
        </aside>
  )
}

