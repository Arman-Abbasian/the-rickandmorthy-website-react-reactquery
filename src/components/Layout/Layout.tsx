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


function Navbar() {
  return (
        <aside className="w-15 fixed left-4 top-4 h-screen p-2 bg-slate-700 overflow-y-auto rounded-tl-md rounded-bl-md" >
            <ul className="">
                <li className=''>
                    <NavLink to={''}>episode</NavLink>
                </li>
                <li>
                <NavLink to={'characters'}>characters</NavLink>
                </li>
                <li>3</li>
            </ul>
        </aside>
  )
}

