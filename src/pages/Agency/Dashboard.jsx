import { Search, Bell, Plus, Settings, X, Users, TrendingUp, Globe2, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

const Avatar = ({ src, alt, fallback, className = "" }) => (
  <div
    className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-700 border-2 border-gray-800 shadow-sm rounded-full ${className}`}
  >
    {src ? (
      <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span className="text-sm font-medium text-white">{fallback}</span>
    )}
  </div>
)

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background shadow-sm"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "hover:bg-gray-700 text-gray-300",
    outline: "border border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md text-sm",
    icon: "h-10 w-10",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 text-card-foreground shadow-lg ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 border-b border-gray-700 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-bold leading-tight tracking-tight flex items-center gap-2 ${className}`}>{children}</h3>
)

const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-4 ${className}`}>{children}</div>

const Badge = ({ children, className = "" }) => (
  <div
    className={`inline-flex items-center rounded-full border border-blue-600 bg-blue-900/40 px-2.5 py-0.5 text-xs font-semibold text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
  >
    {children}
  </div>
)

export default function AgencyDashboard() {

  const userInfo = JSON.parse(localStorage.getItem('auth'))?.user

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
  
    // Sample user data - replace with your actual data
    const users = [
      {
        id: 1,
        name: 'Victoria Adams',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      {
        id: 3,
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      }
    ];
  
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const openModal = () => {
      setIsOpen(true);
      setSearchQuery('');
      setSelectedUser(null);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    const handleUserSelect = (user) => {
      setSelectedUser(user);
      setSearchQuery(user.name);
    };
  
    const handleAddModel = () => {
      if (selectedUser) {
        alert(`Added ${selectedUser.name} as model!`);
        closeModal();
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-10 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-4">
            <Avatar src={userInfo?.avatar} alt={userInfo?.name} fallback={userInfo?.name?.[0] || 'A'} className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome, {userInfo?.name || 'Agency'}!</h1>
              <p className="text-gray-400 text-sm">Manage your models and performance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-blue-900/40">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-blue-900/40">
              <Settings size={20} />
            </Button>
            <Button variant="default" size="sm" onClick={openModal} className="ml-2">
              <Plus size={16} className="mr-1" /> Add Model
            </Button>
          </div>
        </header>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Dark overlay background */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-200"
              onClick={closeModal}
            ></div>
            {/* Modal content */}
            <div className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md mx-4 animate-fadeIn">
              {/* Header with close button */}
              <div className="flex justify-between items-center p-4 pb-2 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Users size={18} /> Add Model</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
                >
                  <X size={18} />
                </button>
              </div>
              {/* Content area */}
              <div className="px-6 pb-6 pt-4">
                {/* Search input */}
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for models..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                {/* Search results */}
                <div className="mb-6 max-h-48 overflow-y-auto divide-y divide-gray-800">
                  {searchQuery && filteredUsers.map(user => (
                    <div
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                      className={`flex items-center p-3 gap-3 rounded-lg cursor-pointer transition-colors ${
                        selectedUser?.id === user.id 
                          ? 'bg-blue-700/80' 
                          : 'hover:bg-gray-800'
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-700 shadow"
                      />
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  ))}
                  {searchQuery && filteredUsers.length === 0 && (
                    <div className="text-gray-400 text-center py-4">
                      No users found
                    </div>
                  )}
                </div>
                {/* Add Model button */}
                <Button
                  onClick={handleAddModel}
                  disabled={!selectedUser}
                  className="w-full py-3 mt-2"
                >
                  Add Model
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Dashboard Content */}
        <main>
          {/* Top Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Card>
              <CardContent className="p-8 flex flex-col gap-4 items-start justify-center h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-900/40 rounded-full p-3 flex items-center justify-center">
                    <Users size={28} className="text-blue-400" />
                  </span>
                  <h3 className="text-base font-medium text-gray-300">Total Models</h3>
                </div>
                <p className="text-4xl font-extrabold tracking-tight ml-1">135</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 flex flex-col gap-4 items-start justify-center h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-900/40 rounded-full p-3 flex items-center justify-center">
                    <TrendingUp size={28} className="text-green-400" />
                  </span>
                  <h3 className="text-base font-medium text-gray-300">Top Performing Model</h3>
                </div>
                <div className="flex items-center gap-4 mt-2 w-full">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      src={"https://randomuser.me/api/portraits/women/44.jpg"}
                      alt="Victoria Adams"
                      fallback="VA"
                      className="h-12 w-12"
                    />
                    <span className="font-medium truncate text-lg text-white">Victoria Adams</span>
                  </div>
                  <span className="ml-auto text-2xl font-extrabold text-green-400">7.2%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 flex flex-col gap-4 items-start justify-center h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-900/40 rounded-full p-3 flex items-center justify-center">
                    <Globe2 size={28} className="text-blue-300" />
                  </span>
                  <h3 className="text-base font-medium text-gray-300">Most active platform</h3>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">52%</span>
                  <span className="font-medium text-white text-lg">Instagram</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="border-b border-gray-800 mb-10"></div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <Card>
              <CardHeader>
                <CardTitle><TrendingUp size={20} className="text-green-400" /> Engagement Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-3xl font-bold">625.6K</p>
                    <p className="text-gray-400 text-sm">Total engagement</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">48</p>
                    <p className="text-gray-400 text-sm">Stories today</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">932</p>
                    <p className="text-gray-400 text-sm">Avg. likes per post</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">87</p>
                    <p className="text-gray-400 text-sm">Avg. comments pt</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle><Globe2 size={20} className="text-blue-300" /> Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th scope="col" className="text-left text-gray-400 font-medium py-2 px-2">Platform</th>
                        <th scope="col" className="text-left text-gray-400 font-medium py-2 px-2">Views</th>
                        <th scope="col" className="text-left text-gray-400 font-medium py-2 px-2">Followers</th>
                        <th scope="col" className="text-left text-gray-400 font-medium py-2 px-2">Posts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-800 last:border-0">
                        <td className="flex items-center gap-2 py-3 px-2 font-medium">
                          <span className="w-4 h-4 flex items-center justify-center rounded bg-blue-600">
                            {/* Facebook icon */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 2.1V5.1C17 5.59706 17.4029 6 17.9 6H20.9C21.3971 6 21.8 6.40294 21.8 6.9V20.1C21.8 20.5971 21.3971 21 20.9 21H3.1C2.60294 21 2.2 20.5971 2.2 20.1V6.9C2.2 6.40294 2.60294 6 3.1 6H6.1C6.59706 6 7 5.59706 7 5.1V2.1C7 1.60294 7.40294 1.2 7.9 1.2H16.1C16.5971 1.2 17 1.60294 17 2.1ZM12 8.4C10.2327 8.4 8.8 9.8327 8.8 11.6C8.8 13.3673 10.2327 14.8 12 14.8C13.7673 14.8 15.2 13.3673 15.2 11.6C15.2 9.8327 13.7673 8.4 12 8.4Z" fill="#fff"/></svg>
                          </span>
                          Facebook
                        </td>
                        <td className="py-3 px-2">3.5K</td>
                        <td className="py-3 px-2">900k</td>
                        <td className="py-3 px-2">2K</td>
                      </tr>
                      <tr className="border-b border-gray-800 last:border-0">
                        <td className="flex items-center gap-2 py-3 px-2 font-medium">
                          <span className="w-4 h-4 flex items-center justify-center rounded bg-pink-600">
                            {/* Instagram icon */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7.75 2C4.67893 2 2 4.67893 2 7.75V16.25C2 19.3211 4.67893 22 7.75 22H16.25C19.3211 22 22 19.3211 22 16.25V7.75C22 4.67893 19.3211 2 16.25 2H7.75ZM12 7.25C14.6234 7.25 16.75 9.37665 16.75 12C16.75 14.6234 14.6234 16.75 12 16.75C9.37665 16.75 7.25 14.6234 7.25 12C7.25 9.37665 9.37665 7.25 12 7.25ZM18.25 6.25C18.9404 6.25 19.5 6.80964 19.5 7.5C19.5 8.19036 18.9404 8.75 18.25 8.75C17.5596 8.75 17 8.19036 17 7.5C17 6.80964 17.5596 6.25 18.25 6.25Z" fill="#fff"/></svg>
                          </span>
                          Instagram
                        </td>
                        <td className="py-3 px-2">12.5K</td>
                        <td className="py-3 px-2">1180K</td>
                        <td className="py-3 px-2">3.8K</td>
                      </tr>
                      <tr>
                        <td className="flex items-center gap-2 py-3 px-2 font-medium">
                          <span className="w-4 h-4 flex items-center justify-center rounded bg-blue-400">
                            {/* Twitter icon */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22.46 6.011c-.793.352-1.645.59-2.54.697a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.485 0-4.5 2.015-4.5 4.5 0 .353.04.697.116 1.025C7.728 9.37 4.1 7.6 1.67 4.905c-.387.664-.61 1.437-.61 2.26 0 1.56.794 2.936 2.003 3.744-.737-.023-1.43-.226-2.037-.563v.057c0 2.18 1.55 4.002 3.604 4.418-.377.103-.775.158-1.185.158-.29 0-.567-.028-.84-.08.568 1.772 2.217 3.06 4.175 3.095A8.98 8.98 0 0 1 2 19.54a12.68 12.68 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.697z" fill="#fff"/></svg>
                          </span>
                          Twitter
                        </td>
                        <td className="py-3 px-2">9.4K</td>
                        <td className="py-3 px-2">513K</td>
                        <td className="py-3 px-2">1.3K</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="border-b border-gray-800 mb-10"></div>

          {/* World Map */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle><Globe2 size={20} className="text-blue-300" /> Model By Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                <p className="text-gray-400">World Map Visualization</p>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle><TrendingUp size={20} className="text-green-400" /> Story Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Button variant="outline" size="sm">All</Button>
                  <Button variant="ghost" size="sm">Instagram</Button>
                  <Button variant="ghost" size="sm">Facebook</Button>
                  <Button variant="ghost" size="sm">Twitter</Button>
                </div>
                <div className="space-y-4 divide-y divide-gray-800">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Total Models</span>
                    <div className="flex gap-8">
                      <span>1.2K</span>
                      <span>1.2M</span>
                      <span>6.4%</span>
                    </div>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Total Followers</span>
                    <div className="flex gap-8">
                      <span>932</span>
                      <span>3.5K</span>
                      <span>4.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Avg Engagement</span>
                    <div className="flex gap-8">
                      <span>82</span>
                      <span>1.3K</span>
                      <span>2.1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle><AlertCircle size={20} className="text-yellow-400" /> Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 divide-y divide-gray-800">
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">3 Models</p>
                      <p className="text-gray-400 text-sm">Signed up today</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Mia uploaded 3 stories</p>
                      <p className="text-gray-400 text-sm">on Instagram</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">{"Lena's post on X has"}</p>
                      <p className="text-gray-400 text-sm">2.4K likes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
