import { Outlet } from "react-router-dom"
import Sidebar from "../pages/Sidebar/Sidebar"
import Navbar from "./Navbar"

const Layout = () => {
  return (
    <div className="flex h-screen">
  {/* Sidebar */}
  <Sidebar />

  {/* Right section (main content with navbar on top) */}
  <div className="flex flex-col flex-grow">
    {/* Navbar only inside main area */}
    <div className=" ">
      <Navbar />
    </div>

    {/* Page content below navbar */}
    <main className="flex-grow overflow-y-auto scrollbar-none bg-gray-100">
      <Outlet />
    </main>
  </div>
</div>
  )
}

export default Layout
