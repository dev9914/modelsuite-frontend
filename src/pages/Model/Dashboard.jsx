import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../../components/ChatWindow";
import { Calendar, MessageSquare } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const userinfo = JSON.parse(localStorage.getItem("auth"))?.user;

  const [sidebarItems, setSidebarItems] = useState([
    { icon: MessageSquare, label: 'Messenger', active: true },
    { icon: Calendar, label: 'Tasks' },
  ]);
  const [groups, setGroups] = useState([]);
  const [selectedChat, setSelectedChat] = useState({
    type: "dm",
    id: userinfo.agencyId,
  });

  const activeMenu = sidebarItems.find((item) => item.active)?.label;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/messages/group`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token}`,
          },
        });
        setGroups(res.data);
      } catch (err) {
        console.error("Failed to fetch groups", err.message);
      }
    };

    fetchGroups();
  }, [userinfo._id]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/model/login");
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 h-[87.2vh] bg-gray-800 p-4 overflow-y-auto scrollbar-none">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>

        <div>
          <h3 className="text-sm text-gray-400 mb-2">Direct Message</h3>
          <div
            className={`p-2 rounded cursor-pointer ${selectedChat.type === "dm" ? "bg-blue-600" : "hover:bg-gray-700"}`}
            onClick={() => setSelectedChat({ type: "dm", id: userinfo.agencyId })}
          >
            Chat with Agency
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm text-gray-400 mb-2">Groups</h3>
          {groups.length === 0 ? (
            <p className="text-gray-500 text-sm">No groups yet</p>
          ) : (
            groups.map((group) => (
              <div
                key={group._id}
                className={`p-2 rounded cursor-pointer ${selectedChat.id === group._id && selectedChat.type === "group" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                onClick={() => setSelectedChat({ type: "group", id: group._id })}
              >
                {group.title}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 h-screen overflow-y-auto scrollbar-none">
        <ChatWindow type={selectedChat.type} id={selectedChat.id} />
      </div>

      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
