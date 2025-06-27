import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatWindow from "../../components/ChatWindow";
import {
  LogOut,
  MessageSquare,
  Users,
  Calendar,
  Settings,
  Plus,
} from "lucide-react";
import ModelTaskList from "../../components/task/ModelTask";

export default function ModelDashboard() {
  const user = JSON.parse(localStorage.getItem("auth"))?.user;
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [activeTab, setActiveTab] = useState("Messenger");
  const [groupList, setGroupList] = useState([]);
  const [topicsMap, setTopicsMap] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/model/login");
  };

  const fetchGroupsAndTopics = async () => {
    try {
      const res = await axios.get(`${baseURL}/messages/group?modelId=${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroupList(res.data);

      const topicMap = {};
      for (const group of res.data) {
        const topicRes = await axios.get(`${baseURL}/topic/group/${group._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        topicMap[group._id] = topicRes.data;
      }
      setTopicsMap(topicMap);
    } catch (err) {
      console.error("❌ Failed to fetch groups/topics:", err);
    }
  };

  useEffect(() => {
    fetchGroupsAndTopics();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedChat(null);
  };

  return (
    <div className="flex h-screen text-white bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">Model Dashboard</h1>
          <nav className="space-y-2">
            <button
              onClick={() => handleTabChange("Messenger")}
              className={`w-full flex items-center px-3 py-2 rounded ${
                activeTab === "Messenger" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Messenger
            </button>
            <button
              onClick={() => handleTabChange("Calendar")}
              className={`w-full flex items-center px-3 py-2 rounded ${
                activeTab === "Calendar" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Calendar
            </button>
            <button
              onClick={() => handleTabChange("Tasks")}
              className={`w-full flex items-center px-3 py-2 rounded ${
                activeTab === "Tasks" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Tasks
            </button>
            <button
              onClick={() => handleTabChange("Team")}
              className={`w-full flex items-center px-3 py-2 rounded ${
                activeTab === "Team" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              Team
            </button>
            <button
              onClick={() => handleTabChange("Settings")}
              className={`w-full flex items-center px-3 py-2 rounded ${
                activeTab === "Settings" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </button>
          </nav>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center w-full px-3 py-2 mt-4 bg-red-600 hover:bg-red-700 rounded"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "Messenger" ? (
          selectedChat ? (
            <ChatWindow
              type={selectedChat.type}
              id={selectedChat.groupId || selectedChat.id}
              topicId={selectedChat.topicId || null}
            />
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Your Groups</h2>
              {groupList.length === 0 ? (
                <p className="text-gray-400">No groups available</p>
              ) : (
                groupList.map((group) => (
                  <div key={group._id} className="bg-gray-800 p-3 rounded-lg mb-4">
                    <div
                      className="text-lg font-medium cursor-pointer hover:underline"
                      onClick={() => {
                        if (!group.hasTopics) {
                          const general = topicsMap[group._id]?.find((t) => t.title.toLowerCase() === "#general");
                          setSelectedChat({
                            type: "group",
                            groupId: group._id,
                            topicId: general?._id || null,
                          });
                        }
                      }}
                    >
                      {group.title}
                    </div>

                    {group.hasTopics && (
                      <div className="mt-2 ml-3 space-y-1">
                        {topicsMap[group._id]?.map((topic) => (
                          <div
                            key={topic._id}
                            className="text-sm text-blue-400 cursor-pointer hover:underline"
                            onClick={() =>
                              setSelectedChat({
                                type: "group",
                                groupId: group._id,
                                topicId: topic._id,
                              })
                            }
                          >
                            {topic.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
              <div
                className="mt-6 text-blue-400 hover:underline cursor-pointer"
                onClick={() => setSelectedChat({ type: "dm", id: user.agencyId })}
              >
                💬 Personal Chat
              </div>
            </>
          )
        ): activeTab === "Tasks" ? (
          <ModelTaskList />
        ) : (
          <div className="text-gray-400">Coming Soon: {activeTab}</div>
        )}
      </div>
    </div>
  );
}
