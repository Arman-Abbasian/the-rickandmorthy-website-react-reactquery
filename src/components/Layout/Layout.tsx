import {Outlet,NavLink} from 'react-router-dom';
function Layout() {
  return (
    <div className="flex gap-8 p-4 bg-red-100">
        <Navbar />
        <div>
        <Outlet />
        </div>
    </div>
  )
}

export default Layout


function Navbar() {
  return (
        <aside className="w-15 fixed left-4 top-4 h-screen p-2 bg-slate-700 overflow-y-auto rounded-tl-md rounded-bl-md" >
            <ul className="bg-red-400">
                <li className='bg-green-700'>
                    <NavLink to={'episode'}>episode</NavLink>
                </li>
                <li>2</li>
                <li>3</li>
            </ul>
        </aside>
  )
}

