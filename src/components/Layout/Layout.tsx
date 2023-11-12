import {Outlet,NavLink} from 'react-router-dom';
function Layout() {
  return (
    <div className="flex gap-8 p-4">
        <Navbar />
        <div className='flex-1 ml-[66px]  px-10'>
        <Outlet />
        </div>
    </div>
  )
}

export default Layout

import { HiOutlineFilm } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import React, { useState } from 'react';
function Navbar() {
  return (
        <aside className="w-16 flex justify-center fixed left-4 top-4 h-screen  bg-slate-700 overflow-y-auto rounded-tl-md rounded-bl-md" >
            <ul className="flex flex-col gap-6 justify w-full ">
                <SidebarItem text='episodes' to=''><HiOutlineFilm   /></SidebarItem>
                <SidebarItem text='characters' to='characters'><BsPerson /></SidebarItem>
            </ul>
        </aside>
  )
}



interface IProps{
  children:React.ReactNode;
  to:string;
  text:string

}

function SidebarItem({children,to,text}:IProps) {
  const [showText,setShowText]=useState(false)
  return (
    <li className="flex justify-center" onMouseOver={()=>setShowText(true)} onMouseOut={()=>setShowText(false)}>
                    <NavLink className='hover:bg-cyan-300 cursor-pointer w-full flex justify-center p-4' to={to}>{children} <p className={`${showText?'block':'hidden'} text-xs`}>{text}</p></NavLink>
                </li>
  )
}

