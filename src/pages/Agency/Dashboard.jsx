import { Search, Bell, Plus, Settings, HelpCircle,X } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

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

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    icon: "h-10 w-10",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)

const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>

const Badge = ({ children, className = "" }) => (
  <div
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
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
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Main Content */}
      <div className="ml-16">
        {/* Header */}
              {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark overlay background */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={closeModal}
          ></div>
          
          {/* Modal content */}
          <div className="relative bg-gray-800 rounded-lg w-full max-w-md mx-4">
            {/* Header with close button */}
            <div className="flex justify-end p-4 pb-2">
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content area */}
            <div className="px-6 pb-6">
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
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Search results */}
            <div className="mb-6 max-h-48 overflow-y-auto">
              {searchQuery && filteredUsers.map(user => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.id === user.id 
                      ? 'bg-blue-600' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-3"
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
            <button
              onClick={handleAddModel}
              disabled={!selectedUser}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                selectedUser
                  ? 'bg-gray-600 hover:bg-gray-500 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add Model
            </button>
            </div>
          </div>
        </div>
      )}
        {/* Dashboard Content */}
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Agency Dashboard</h2>
            <p className="text-gray-400">Performance metrics for Olivia Thompson</p>
          </div>

          {/* Top Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Total Models</h3>
                <p className="text-4xl font-bold">135</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Top Performing Model</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src="/placeholder.svg?height=48&width=48"
                      alt="Victoria Adams"
                      fallback="VA"
                      className="h-12 w-12"
                    />
                    <span className="font-medium">Victoria Adams</span>
                  </div>
                  <span className="text-2xl font-bold">7.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Most active platform</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">52%</span>
                    </div>
                    <span className="font-medium">Instagram</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
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

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Platform</span>
                    <span className="text-gray-400">Views</span>
                    <span className="text-gray-400">followers</span>
                    <span className="text-gray-400">Posts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-600 rounded"></div>
                      <span>Facebook</span>
                    </div>
                    <span>3.5K</span>
                    <span>900k</span>
                    <span>2K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-pink-600 rounded"></div>
                      <span>Instagram</span>
                    </div>
                    <span>12.5K</span>
                    <span>1180K</span>
                    <span>3.8K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-400 rounded"></div>
                      <span>Twitter</span>
                    </div>
                    <span>9.4K</span>
                    <span>513K</span>
                    <span>1.3K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* World Map */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle>Model By Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">World Map Visualization</p>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Story Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600">
                    All
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    Instagram
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    Facebook
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    Twitter
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Models</span>
                    <div className="flex space-x-8">
                      <span>1.2K</span>
                      <span>1.2M</span>
                      <span>6.4%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Followers</span>
                    <div className="flex space-x-8">
                      <span>932</span>
                      <span>3.5K</span>
                      <span>4.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Engagement</span>
                    <div className="flex space-x-8">
                      <span>82</span>
                      <span>1.3K</span>
                      <span>2.1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">3 Models</p>
                      <p className="text-gray-400 text-sm">Signed up today</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Mia uploaded 3 stories</p>
                      <p className="text-gray-400 text-sm">on Instagram</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
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
