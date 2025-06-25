import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { MessageSquare, UploadCloud, Flame, ShieldAlert, Users, Gift, Trophy, Film, Calendar, TrendingUp, Plus } from "lucide-react"
import ChatWindow from "../../components/ChatWindow"

export default function CreatorInsightsDashboard() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem("auth"))?.user
  const [sidebarItems, setSidebarItems] = useState([
    { icon: MessageSquare, label: "Messenger", active: false },
    { icon: Calendar, label: "Billing" },
    { icon: Calendar, label: "Calendar" },
    { icon: Calendar, label: "Tasks" },
    { icon: TrendingUp, label: "Traffic" },
    { icon: Calendar, label: "Postings" },
    { icon: UploadCloud, label: "Content Upload" },
    { icon: Flame, label: "Viral Trends" },
    { icon: ShieldAlert, label: "Leak Protection" },
    { icon: Users, label: "Team Members" },
    { icon: Gift, label: "Paid Platforms" },
    { icon: Trophy, label: "Rewards" },
    { icon: Film, label: "Reel Examples" },
  ])

  const [modeinfo, setModelInfo] = useState({})
  const [selectedChat, setSelectedChat] = useState(null)
  const [groupName, setGroupName] = useState("")
  const [groupList, setGroupList] = useState([])

  const baseURL = import.meta.env.VITE_API_BASE_URL
  const token = JSON.parse(localStorage.getItem("auth"))?.token

  const activeMenu = sidebarItems.find((item) => item.active)?.label

  const handleTabClick = (label) => {
    const updatedItems = sidebarItems.map((item) => ({
      ...item,
      active: item.label === label,
    }))
    setSidebarItems(updatedItems)
    setSelectedChat(null)
  }

  const fetchModel = async () => {
    try {
      const res = await axios.get(`${baseURL}/model/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setModelInfo(res.data)
    } catch (err) {
      console.error("Failed to fetch model:", err)
    }
  }

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${baseURL}/messages/group`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setGroupList(res.data)
    } catch (err) {
      console.error("Failed to fetch groups:", err)
    }
  }

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return
    try {
      const res = await axios.post(
        `${baseURL}/messages/group/create`,
        {
          title: groupName,
          modelId: id,
          // employeeId: null // (optional for future)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setGroupName("")
      setGroupList([...groupList, res.data])
      setSelectedChat({ type: "group", id: res.data._id })
    } catch (err) {
      console.error("Failed to create group:", err)
    }
  }

  useEffect(() => {
    fetchModel()
    fetchGroups()
  }, [id])

  return (
    <div className="flex bg-gray-900 text-white ml-16">
      {/* Sidebar */}
      <div className="w-64 overflow-y-auto h-[87.2vh] scrollbar-none bg-gray-900 p-4">
        <div
          onClick={() => {
            const reset = sidebarItems.map((item) => ({ ...item, active: false }))
            setSidebarItems(reset)
            setSelectedChat(null)
          }}
          className="mb-4 cursor-pointer"
        >
          <div className="bg-gray-700 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full object-cover mr-3" alt="AM" src={modeinfo.profilePhoto} />
              <span className="font-medium">{modeinfo.fullName || "Loading..."}</span>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(item.label)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                item.active ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      {!activeMenu && (
        <div className="flex-1 h-[87.2vh] overflow-y-auto scrollbar-none p-6">
          <h1 className="text-2xl font-bold mb-4">Creator Insights Dashboard</h1>
          <p className="text-gray-400">Select a menu item to begin.</p>
        </div>
      )}

      {/* Messenger Section */}
      {activeMenu === "Messenger" && (
        <div className="flex-1 h-[87.2vh] overflow-y-auto scrollbar-none p-6">
          {!selectedChat && (
            <>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCreateGroup}
                  className="ml-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold mb-2">Group Chats</h2>
                {groupList.map((group) => (
                  <div
                    key={group._id}
                    className="p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
                    onClick={() => setSelectedChat({ type: "group", id: group._id })}
                  >
                    {group.title}
                  </div>
                ))}

                <div
                  className="p-3 mt-4 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
                  onClick={() => setSelectedChat({ type: "dm", id })}
                >
                  Personal Chat
                </div>
              </div>
            </>
          )}

          {selectedChat && (
            <ChatWindow type={selectedChat.type} id={selectedChat.id} />
          )}
        </div>
      )}
    </div>
  )
}
