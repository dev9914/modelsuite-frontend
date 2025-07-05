import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import {
  MessageSquare,
  UploadCloud,
  Flame,
  ShieldAlert,
  Users,
  Gift,
  Trophy,
  Film,
  Calendar,
  TrendingUp,
  Plus,
  Trash2,
  ArrowLeft,
  MoreHorizontal,
  Hash,
  User,
  Settings,
  EarthLock,
  ChartNoAxesColumn,
  CalendarCheck,
  UserPen,
  User,
  MessageCircleQuestion,
} from "lucide-react"
import ChatWindow from "../../components/ChatWindow"
import TaskList from '../../components/task/TaskList'
import InstagramDashboard from "../../components/socialMedia/InstagramInsights"
import BillingDashboard from "../../components/Billing/Billing"
import CalendarView from "../../components/Calender/CalenderView"
import { GiProtectionGlasses } from "react-icons/gi"

export default function CreatorInsightsDashboard() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem("auth"))?.user
  const token = JSON.parse(localStorage.getItem("auth"))?.token
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const [sidebarItems, setSidebarItems] = useState([
    { icon: MessageSquare, label: "Messenger", active: true },
    { icon: Calendar, label: "Calendar" },
    { icon: CalendarCheck, label: "Tasks" },
    { icon: TrendingUp, label: "Traffic & Analytics" },
    { icon: UploadCloud, label: "Postings & Content Upload" },
    { icon: ChartNoAxesColumn, label: "Viral Trends & Inspiration" },
    { icon: EarthLock, label: "Leak Protection" },
    { icon: User, label: "Team Members" },
    { icon: ShieldAlert, label: "Leak Protection" },
    { icon: Calendar, label: "Billing & Finance" },
    { icon: Gift, label: "Paid Platforms" },
    { icon: Trophy, label: "Rewards & Gamification" },
    { icon: Settings, label: "Settings" },
    { icon: UserPen, label: "My Profile" },
    { icon: MessageCircleQuestion, label: "Support & Help" },
  ])

  const [modeinfo, setModelInfo] = useState({})
  const [selectedChat, setSelectedChat] = useState(null)
  const [groupName, setGroupName] = useState("")
  const [groupList, setGroupList] = useState([])
  const [topicsMap, setTopicsMap] = useState({})
  const [newTopic, setNewTopic] = useState("")
  const [activeGroupForTopic, setActiveGroupForTopic] = useState(null)

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
        headers: { Authorization: `Bearer ${token}` },
      })
      setModelInfo(res.data)
    } catch (err) {
      console.error("Failed to fetch model:", err)
    }
  }

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${baseURL}/messages/group?modelId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setGroupList(res.data)

      const topicsObj = {}
      for (const group of res.data) {
        const topicRes = await axios.get(`${baseURL}/topic/group/${group._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        topicsObj[group._id] = topicRes.data
      }
      setTopicsMap(topicsObj)
    } catch (err) {
      console.error("Failed to fetch groups/topics:", err)
    }
  }

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return
    try {
      await axios.post(
        `${baseURL}/messages/group/create`,
        {
          title: groupName,
          modelId: id,
          creatorModel: "Agency",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setGroupName("")
      fetchGroups()
    } catch (err) {
      console.error("Failed to create group:", err)
    }
  }

  const handleCreateTopic = async (groupId) => {
    if (!newTopic.trim()) return
    try {
      await axios.post(
        `${baseURL}/topic/create`,
        {
          title: newTopic,
          groupId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewTopic("")
      setActiveGroupForTopic(null)
      fetchGroups()
    } catch (err) {
      console.error("Failed to create topic:", err)
    }
  }

  const handleDeleteTopic = async (topicId) => {
    if (!confirm("Are you sure you want to delete this topic?")) return
    try {
      await axios.delete(`${baseURL}/api/v1/topic/${topicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchGroups()
    } catch (err) {
      console.error("Failed to delete topic:", err)
    }
  }

  const handleDeleteGroup = async (groupId) => {
    if (!confirm("Are you sure you want to delete this group?")) return
    try {
      await axios.delete(`${baseURL}/messages/group/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchGroups()
      setSelectedChat(null)
    } catch (err) {
      console.error("Failed to delete group:", err)
    }
  }

  useEffect(() => {
    fetchModel()
    fetchGroups()
  }, [id])

  return (
    <div className="flex bg-slate-900 text-white ml-16 min-h-screen">
      {/* Sidebar */}
      <div className="w-72 h-screen overflow-y-auto bg-slate-800 border-r border-slate-700 flex flex-col shadow-lg">
        {/* Model Profile Section */}
        <div
          onClick={() => {
            const reset = sidebarItems.map((item) => ({ ...item, active: false }))
            setSidebarItems(reset)
            setSelectedChat(null)
          }}
          className="p-6 cursor-pointer border-b border-slate-700"
        >
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-4 border border-slate-600 hover:border-slate-500 transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-lg" 
                  alt="Model Avatar" 
                  src={modeinfo.profilePhoto || "/placeholder.svg"} 
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-white truncate">{modeinfo.fullName || "Loading..."}</h3>
                <p className="text-xs text-slate-400 font-medium">Model Profile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(item.label)}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 font-medium select-none ${
                item.active 
                  ? "bg-blue-600 text-white shadow-lg border border-blue-500" 
                  : "hover:bg-slate-700 text-slate-300 hover:text-white border border-transparent"
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto bg-slate-900">
        {activeMenu === "Messenger" ? (
          !selectedChat ? (
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Messenger</h1>
                <p className="text-slate-400">Manage group chats and direct messages</p>
              </div>

              {/* Group Creation */}
              <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-400" />
                  Create New Group
                </h3>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    onClick={handleCreateGroup}
                    disabled={!groupName.trim()}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all duration-200 flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Create Group
                  </button>
                </div>
              </div>

              {/* Group Chats */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-400" />
                    Group Chats
                  </h2>
                  <span className="text-slate-400 text-sm">{groupList.length} groups</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {groupList.map((group) => (
                    <div key={group._id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          onClick={() => {
                            if (!group.hasTopics) {
                              const general = topicsMap[group._id]?.find(t => t.title.toLowerCase() === "#general")
                              setSelectedChat({
                                type: "group",
                                groupId: group._id,
                                topicId: general?._id || null,
                              })
                            }
                          }}
                          className="cursor-pointer group flex-1"
                        >
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                            <Hash className="w-5 h-5 text-slate-400" />
                            {group.title}
                          </h3>
                        </div>
                        
                        {user.role === "agency" && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setActiveGroupForTopic(group._id)}
                              className="px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                            >
                              + Topic
                            </button>
                            <button 
                              onClick={() => handleDeleteGroup(group._id)} 
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>

                      {activeGroupForTopic === group._id && (
                        <div className="mb-4 p-4 bg-slate-700 rounded-lg border border-slate-600">
                          <div className="flex gap-3">
                            <input
                              type="text"
                              placeholder="Topic name (e.g., #general)"
                              value={newTopic}
                              onChange={(e) => setNewTopic(e.target.value)}
                              className="flex-1 px-3 py-2 text-sm bg-slate-600 rounded-lg border border-slate-500 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            />
                            <button
                              onClick={() => handleCreateTopic(group._id)}
                              disabled={!newTopic.trim()}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200"
                            >
                              Create
                            </button>
                          </div>
                        </div>
                      )}

                      {group.hasTopics && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-slate-400 mb-3">Topics</h4>
                          {topicsMap[group._id]?.map((topic) => (
                            <div key={topic._id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200">
                              <div
                                onClick={() =>
                                  setSelectedChat({ type: "group", groupId: group._id, topicId: topic._id })
                                }
                                className="cursor-pointer flex-1 group"
                              >
                                <span className="text-blue-400 hover:text-blue-300 font-medium group-hover:underline transition-all duration-200 flex items-center gap-2">
                                  <Hash className="w-4 h-4" />
                                  {topic.title}
                                </span>
                              </div>
                              {user.role === "agency" && (
                                <button 
                                  onClick={() => handleDeleteTopic(topic._id)} 
                                  className="px-2 py-1 text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-all duration-200"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Personal Chat Card */}
                <div className="mt-8">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl p-6 cursor-pointer transition-all duration-200 shadow-lg border border-blue-500"
                    onClick={() => setSelectedChat({ type: "dm", id })}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Personal Chat</h3>
                        <p className="text-blue-100 text-sm">Direct message with {modeinfo.fullName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedChat.type === "dm" ? (
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-6 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedChat(null)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={modeinfo.profilePhoto || "/placeholder.svg"}
                          alt={modeinfo.fullName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                      </div>
                      <div>
                        <h2 className="font-semibold text-white text-lg">{modeinfo.fullName || 'User'}</h2>
                        <p className="text-slate-400 text-sm">Direct Message</p>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 bg-slate-900 overflow-y-auto">
                  <ChatWindow type="dm" id={selectedChat.id} />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-6 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedChat(null)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <Hash className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-white text-lg">Group Chat</h2>
                        <p className="text-slate-400 text-sm">Group Conversation</p>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 bg-slate-900 overflow-y-auto">
                  <ChatWindow type="group" id={selectedChat.groupId} topicId={selectedChat.topicId} />
                </div>
              </div>
            </div>
          )
        ) : activeMenu === "Tasks" ? (
          <div className="p-8">
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
              {/* Header */}
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Calendar className="w-7 h-7 text-blue-400" />
                      Tasks Management
                    </h2>
                    <p className="text-slate-400 mt-1">Manage tasks for {modeinfo.fullName}</p>
                  </div>
                  <button
                    onClick={() => {
                      const reset = sidebarItems.map((item) => ({ ...item, active: false }))
                      setSidebarItems(reset)
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border border-slate-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>
              </div>
              
              {/* Task List Content */}
              <div className="p-6">
                <TaskList modelId={id} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 mx-auto">
                <TrendingUp className="w-10 h-10 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Creator Insights Dashboard</h1>
              <p className="text-slate-400 text-lg mb-8 max-w-md">
                Select a menu item from the sidebar to get started with managing your model's activities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleTabClick("Messenger")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Open Messenger
                </button>
                <button
                  onClick={() => handleTabClick("Tasks")}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  View Tasks
                </button>
              </div>
            </div>
        ): activeMenu === "Traffic & Analytics" ? (
          <InstagramDashboard Id={id} role={'agency'}/>
        ) : activeMenu === "Billing & Finance" ? (
          <BillingDashboard modelInfo={modeinfo} />
        ): activeMenu === "Calendar" ? (
          <CalendarView modelInfo={modeinfo} />
        ): (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-4 text-white">Creator Insights Dashboard</h1>
            <p className="text-gray-400 text-lg">Select a menu item to begin.</p>
          </div>
        )}
      </div>
    </div>
  )
}
