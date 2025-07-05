import { Outlet } from "react-router-dom"
import Sidebar from "../pages/Sidebar/Sidebar"
import Navbar from "../components/Navbar"
import socket from "../utils/socket"
import { useEffect } from "react"

const Layout = () => {

    const user = JSON.parse(localStorage.getItem('auth'))?.user

  useEffect(() => {
    if (user?._id) {
      socket.emit('register', { userId: user._id });
    }
  }, [user]);
  return (
    <div className="flex h-screen bg-gray-950">
  {/* Sidebar */}
  <Sidebar />

  {/* Right section (main content with navbar on top) */}
  <div className="flex flex-col flex-grow">
    {/* Navbar only inside main area */}
    <div className="">
      <Navbar />
    </div>

    {/* Page content below navbar */}
    <main className="flex-grow overflow-y-auto scrollbar-thin bg-gradient-to-br from-gray-950 to-gray-900">
      <Outlet />
    </main>
  </div>
</div>
  )
}

export default Layout
