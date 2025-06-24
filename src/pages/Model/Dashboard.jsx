import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../../components/ChatWindow";
import { Calendar, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const userinfo = JSON.parse(localStorage.getItem("auth"))?.user;
  console.log(userinfo);
  
  const [sidebarItems, setSidebarItems] = useState([
    { icon: MessageSquare, label: 'Messenger',active: true },
    { icon: Calendar, label: 'Tasks' },
  ]);
  
  const activeMenu = sidebarItems.find((item) => item.active)?.label;
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/model/login");
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
            {activeMenu == 'Messenger' && (
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <ChatWindow id={userinfo.agencyId} />
        </div>
      )}
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
