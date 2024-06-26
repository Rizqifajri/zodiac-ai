import Link from "next/link"
import { Dropdown } from "./Dropdown"


export const DashbaordHeader: React.FC = () => {
  return (
    <>
      <div className="navbar fixed bg-base-100 z-50">
        <div className="flex-1 gap-5">
          <Link
            href='/'
          >
            <p className="btn btn-ghost text-xl">zodiacAI</p>
          </Link>
        </div>
        <div className="flex-none gap-6">
          <Dropdown />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}