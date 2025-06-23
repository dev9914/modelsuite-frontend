import React, { useEffect, useState } from 'react'
import { Search, Plus, Settings, HelpCircle, X } from "lucide-react"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

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

const Avatar = ({ src, alt, fallback, className = "" }) => (
  <div
    className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${className}`}
  >
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
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

const Sidebar = () => {
  // Sample existing models - replace with your actual data
  const [models, setModels] = useState([])
  const [isAddModalOpen, setIsAddModelOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchAgencyModels = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("auth"))?.token;

    const res = await axios.get(`${baseURL}/agency/agency-models`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data; // ✅ array of models
  } catch (err) {
    console.error("Failed to fetch agency models:", err);
    return [];
  }
};

useEffect(() => {
  const getModels = async () => {
    const data = await fetchAgencyModels();
    setModels(data);
  };
  getModels();
}, []);

const handleSearchAgencyModels = (query) => {
  setSearchQuery(query);

  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  const filtered = models.filter((model) => {
    const fullNameMatch = model.fullName.toLowerCase().includes(query.toLowerCase());
    const usernameMatch = model.username.toLowerCase().includes(query.toLowerCase());
    return fullNameMatch || usernameMatch;
  });

  setSearchResults(filtered);
};

useEffect(() => {
  handleSearchAgencyModels(searchQuery);
}, [searchQuery]);

const handleModelClick = (id) => {
  navigate(`/agency/model-view/${id}`);
  setIsSearchOpen(false);
};

const handleGlobalModelSearch = async (query) => {
  setSearchQuery(query);

  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  try {
    const token = JSON.parse(localStorage.getItem("auth"))?.token;

    const res = await axios.get(`${baseURL}/agency/models?search=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setSearchResults(res.data); // array of matching global models
  } catch (err) {
    console.error("Global model search failed:", err);
    setSearchResults([]);
  }
};

const handleAddModelToAgency = async () => {
  if (!selectedUser) return;

  try {
    const token = JSON.parse(localStorage.getItem("auth"))?.token;

    const res = await axios.post(`${baseURL}/agency/add-model`, {
      modelId: selectedUser._id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(`✅ ${selectedUser.fullName} has been added to your agency`);
    setSelectedUser(null);
    setSearchQuery('');
    setSearchResults([]);
    setIsAddModelOpen(false);

    // Refresh the models list
    const updatedModels = await fetchAgencyModels();
    setModels(updatedModels);
  } catch (err) {
    console.error("Add to agency failed:", err);
    alert("❌ Failed to add model to agency");
  }
};


  const openModal = () => {
    setIsAddModelOpen(true);
    setSearchQuery('');
    setSelectedUser(null);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setSearchQuery('');
    setSearchResults([]);
    setIsAddModelOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setSearchQuery('');
    setSearchResults([]);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };





  return (
    <>
      <div className="fixed left-0 top-0 h-full w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-white"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
        
        {/* Plus button that opens the modal */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-white"
          onClick={openModal}
        >
          <Plus className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 space-y-3 mt-8">
          {models.map((user, index) => (
            <div key={user._id} className="relative">
              <div className="cursor-pointer">
                <Link to={`/agency/model-view/${user._id}`}>
                <Avatar src={user.profilePhoto} alt={user.fullName} fallback={`U${index + 1}`} className="h-10 w-10" />
                </Link>
              </div>
              {index === 3 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs p-0 flex items-center justify-center">
                  4
                </Badge>
              )}
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark overlay background */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={closeSearch}
          ></div>
          
          {/* Search Modal content */}
          <div className="relative bg-gray-800 rounded-lg w-full max-w-md mx-4">
            {/* Header with close button */}
            <div className="flex justify-end p-4 pb-2">
              <button
                onClick={closeSearch}
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
                  placeholder="Search models and users..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              {/* Search results */}
              <div className="mb-4 max-h-64 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        onClick={() => handleModelClick(result._id)}
                        className="flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-700 group"
                      >
                        <img
                          src={result.profilePhoto}
                          alt={result.fullName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <span className="text-white font-medium block">
                            {result.fullName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="text-gray-400 text-center py-8">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No results found for "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-8">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Start typing to search models and users</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Model Modal Overlay */}
      {isAddModalOpen && (
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
                  onChange={(e) => handleGlobalModelSearch(e.target.value)}
                  placeholder="Search for models..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Search results */}
              <div className="mb-6 max-h-48 overflow-y-auto">
                {searchResults.map(user => (
                  <div
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedUser?._id === user._id 
                        ? 'bg-blue-600' 
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <img
                      src={user.profilePhoto}
                      alt={user.fullName}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="text-white font-medium">{user.fullName}</span>
                  </div>
                ))}
                
                {searchResults.length === 0 && (
                  <div className="text-gray-400 text-center py-4">
                    No users found
                  </div>
                )}
              </div>

              {/* Add Model button */}
              <button
                onClick={handleAddModelToAgency}
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
    </>
  )
}

export default Sidebar