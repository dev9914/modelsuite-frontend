import { Bell, Search, ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Badge, Button } from './ui/index.jsx'

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('auth'))?.user
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <div className='ml-20'>
      <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl backdrop-blur-sm">
        {/* Left Section - Brand */}
        <div className="flex items-center space-x-4">
          <div>
            <Link to={'/agency/dashboard'} className="group">
              <h1 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                Model Suite.ai
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">Agency Management Platform</p>
            </Link>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search models, tasks, analytics..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden relative group"
            title="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <div className="relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <Badge 
                variant="danger"
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                2
              </Badge>
            </Button>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-700/50 transition-all duration-200 group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {userInfo?.agencyName}
                </p>
                <p className="text-xs text-gray-400">Agency Manager</p>
              </div>
              <Avatar
                src={userInfo?.profilePhoto}
                alt={userInfo?.agencyName}
                fallback="AM"
                className="h-10 w-10"
                isOnline={true}
              />
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 shadow-2xl rounded-xl overflow-hidden min-w-56 z-50">
                <div className="p-1">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-semibold text-white">{userInfo?.agencyName}</p>
                    <p className="text-xs text-gray-400">{userInfo?.email}</p>
                  </div>
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 rounded-lg mt-1"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 rounded-lg"
                  >
                    Agency Settings
                  </button>
                  <div className="h-px bg-gray-700 my-1"></div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Add logout logic here
                    }}
                    className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar