import { Bell } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Avatar = ({ src, alt, fallback, className = "" }) => (
  <div
    className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${className}`}
  >
    {src ? (
      <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span className="text-sm font-medium text-white">{fallback}</span>
    )}
  </div>
)

const Badge = ({ children, className = "" }) => (
  <div
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
  >
    {children}
  </div>
)

const Navbar = () => {
    const userInfo = JSON.parse(localStorage.getItem('auth'))?.user
    console.log(userInfo)
  return (
    <div className='ml-16'>
            <header className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900 text-white">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">MS</span>
        </div>
        <div>
            <Link to={'/agency/dashboard'}>
          <h1 className="text-xl font-semibold">Model Suite.ai</h1>
            </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-400" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs p-0 flex items-center justify-center">
            2
          </Badge>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium">{userInfo.agencyName}</p>
            <p className="text-xs text-gray-400">Agency Manager</p>
          </div>
          <Avatar
            src={userInfo.profilePhoto}
            alt={userInfo.agencyName}
            fallback="AM"
            className="h-10 w-10"
          />
        </div>
      </div>
    </header>
    </div>
  )
}

export default Navbar