import React, { useEffect, useState } from 'react'
import { Search, Plus, Settings, HelpCircle, X, LogOut, User } from "lucide-react"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Badge, Button, Modal, SearchInput, Tooltip } from '../../components/ui/index.jsx'



const Sidebar = () => {
  // Sample existing models - replace with your actual data
  const [models, setModels] = useState([])
  const [isAddModalOpen, setIsAddModelOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/agency/login');
  };

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
      {/* Main Sidebar */}
      <div className="fixed left-0 top-0 h-full w-20 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center py-6 shadow-2xl z-40 backdrop-blur-sm">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">M</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <Tooltip content="Search Models">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative group"
              onClick={openSearch}
              title="Search Models"
            >
              <Search className="h-5 w-5" />
            </Button>
          </Tooltip>
          
          <Tooltip content="Add Model">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative group"
              onClick={openModal}
              title="Add Model"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </Tooltip>
        </div>
        
        {/* Models List */}
        <div className="flex-1 space-y-4 w-full px-2 overflow-y-auto">
          {models.map((user, index) => (
            <Tooltip key={user._id} content={user.fullName}>
              <div className="relative group">
                <Link to={`/agency/model-view/${user._id}`} className="block">
                  <div className="relative mx-auto w-12 h-12 transition-transform duration-200 hover:scale-110">
                    <Avatar 
                      src={user.profilePhoto} 
                      alt={user.fullName} 
                      fallback={user.fullName?.charAt(0) || `M${index + 1}`}
                      className="w-full h-full"
                      isOnline={Math.random() > 0.5} // Replace with actual online status
                    />
                    {index === 3 && (
                      <Badge 
                        variant="danger"
                        className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                      >
                        4
                      </Badge>
                    )}
                  </div>
                </Link>
              </div>
            </Tooltip>
          ))}
        </div>
        
        {/* Bottom Actions */}
        <div className="space-y-4 relative">
          <Tooltip content="Help & Support">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative group"
              title="Help"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </Tooltip>
          
          <Tooltip content="Settings">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative group"
              onClick={() => setShowMenu(!showMenu)}
              title="Settings"
            >
              <Settings className={`h-5 w-5 transition-transform duration-200 ${showMenu ? 'rotate-90' : ''}`} />
            </Button>
          </Tooltip>
          
          {/* Settings Menu */}
          {showMenu && (
            <div className="absolute bottom-full mb-2 left-full ml-3 bg-gray-800 border border-gray-700 shadow-2xl rounded-xl overflow-hidden min-w-48 z-50">
              <div className="p-1">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    // Add settings navigation here
                  }}
                  className="flex items-center w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 rounded-lg"
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile Settings
                </button>
                <div className="h-px bg-gray-700 my-1"></div>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleLogout();
                  }}
                  className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 rounded-lg"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Modal */}
      <Modal isOpen={isSearchOpen} onClose={closeSearch} className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="text-lg font-semibold text-white">Search Models</h3>
          <button
            onClick={closeSearch}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-6 pb-4">
          <SearchInput
            placeholder="Search models and users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            SearchIcon={Search}
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="px-6 pb-6">
          <div className="max-h-80 overflow-y-auto rounded-xl bg-gray-900/50">
            {searchResults.length > 0 ? (
              <div className="p-2 space-y-1">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleModelClick(result._id)}
                    className="flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-700 group"
                  >
                    <Avatar
                      src={result.profilePhoto}
                      alt={result.fullName}
                      fallback={result.fullName?.charAt(0)}
                      className="w-12 h-12 mr-4"
                    />
                    <div className="flex-1">
                      <span className="text-white font-medium block group-hover:text-blue-300 transition-colors">
                        {result.fullName}
                      </span>
                      <span className="text-gray-400 text-sm">@{result.username || 'username'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-gray-400 text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No results found</p>
                <p className="text-sm">Try searching for a different term</p>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">Search Models</p>
                <p className="text-sm">Start typing to find models and users</p>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Add Model Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeModal} className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="text-lg font-semibold text-white">Add New Model</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-6 pb-4">
          <SearchInput
            placeholder="Search for models to add..."
            value={searchQuery}
            onChange={(e) => handleGlobalModelSearch(e.target.value)}
            SearchIcon={Search}
          />
        </div>

        {/* Results */}
        <div className="px-6 pb-4">
          <div className="max-h-64 overflow-y-auto rounded-xl bg-gray-900/50">
            {searchResults.length > 0 ? (
              <div className="p-2 space-y-1">
                {searchResults.map(user => (
                  <div
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedUser?._id === user._id 
                        ? 'bg-blue-600 ring-2 ring-blue-400' 
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <Avatar
                      src={user.profilePhoto}
                      alt={user.fullName}
                      fallback={user.fullName?.charAt(0)}
                      className="w-12 h-12 mr-4"
                    />
                    <div className="flex-1">
                      <span className="text-white font-medium block">{user.fullName}</span>
                      <span className="text-gray-400 text-sm">@{user.username || 'username'}</span>
                    </div>
                    {selectedUser?._id === user._id && (
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-gray-400 text-center py-8">
                <User className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No models found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                <Plus className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">Find Models</p>
                <p className="text-sm">Search for models to add to your agency</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 pt-4">
          <Button
            onClick={handleAddModelToAgency}
            disabled={!selectedUser}
            className={`w-full py-3 font-semibold transition-all duration-200 ${
              selectedUser
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedUser ? `Add ${selectedUser.fullName}` : 'Select a model to add'}
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default Sidebar