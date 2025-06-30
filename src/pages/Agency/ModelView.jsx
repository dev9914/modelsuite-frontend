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
} from "lucide-react"
import ChatWindow from "../../components/ChatWindow"
import CreateTask from "../../components/task/CreateTask"
import TaskList from '../../components/task/TaskList'

export default function CreatorInsightsDashboard() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem("auth"))?.user
  const token = JSON.parse(localStorage.getItem("auth"))?.token
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const [sidebarItems, setSidebarItems] = useState([
    { icon: MessageSquare, label: "Messenger", active: true },
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
    <div className="flex bg-gray-950 text-white ml-16 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 h-screen overflow-y-auto bg-gray-900 p-6 border-r border-gray-800 flex flex-col">
        <div
          onClick={() => {
            const reset = sidebarItems.map((item) => ({ ...item, active: false }))
            setSidebarItems(reset)
            setSelectedChat(null)
          }}
          className="mb-6 cursor-pointer"
        >
          <div className="bg-gray-800 rounded-xl p-4 shadow flex items-center gap-3">
            <img className="w-10 h-10 rounded-full object-cover border-2 border-blue-600" alt="AM" src={modeinfo.profilePhoto} />
            <div>
              <span className="font-semibold text-lg block">{modeinfo.fullName || "Loading..."}</span>
              <span className="text-xs text-gray-400">Model</span>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-800 mb-4"></div>
        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(item.label)}
              tabIndex={0}
              role="button"
              aria-selected={item.active}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-150 font-medium text-base items-center select-none outline-none focus:ring-2 focus:ring-blue-400 ${
                item.active ? "bg-blue-600 shadow text-white border-l-4 border-blue-300" : "hover:bg-gray-800 text-gray-300"
              } overflow-hidden`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate block max-w-[140px] overflow-hidden text-ellipsis">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-[87.2vh] overflow-y-auto scrollbar-none p-8 bg-gray-950">
        {activeMenu === "Messenger" ? (
          !selectedChat ? (
            <>
              {/* Group Creation */}
              <div className="flex items-center mb-8 gap-2">
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 shadow-md transition-all duration-150"
                />
                <button
                  onClick={handleCreateGroup}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-lg text-white flex items-center gap-2 shadow-md font-semibold transition-all duration-150"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              <div className="space-y-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Group Chats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupList.map((group) => (
                    <div key={group._id} className="bg-gray-900 rounded-2xl p-5 shadow-lg border border-gray-800 flex flex-col gap-2 transition-all duration-150 hover:border-blue-500">
                      <div className="flex items-center justify-between mb-1">
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
                          className="cursor-pointer text-lg font-semibold text-white hover:underline hover:text-blue-400 transition-colors"
                        >
                          {group.title}
                        </div>
                        <div className="flex gap-2">
                          {user.role === "agency" && (
                            <>
                              <button
                                onClick={() => {
                                  setActiveGroupForTopic(group._id)
                                }}
                                className="text-blue-400 text-xs underline hover:text-blue-300 font-semibold"
                              >
                                + Topic
                              </button>
                              <button onClick={() => handleDeleteGroup(group._id)} className="text-red-500 hover:text-red-400">
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {activeGroupForTopic === group._id && (
                        <div className="ml-2 mt-2 flex gap-2">
                          <input
                            type="text"
                            placeholder="Topic name"
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                            className="px-3 py-1 text-sm bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 shadow"
                          />
                          <button
                            onClick={() => handleCreateTopic(group._id)}
                            className="bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-1 rounded-lg text-sm text-white hover:from-blue-600 hover:to-blue-800 shadow font-semibold"
                          >
                            Create
                          </button>
                        </div>
                      )}

                      {group.hasTopics && (
                        <div className="ml-4 mt-2 space-y-1">
                          {topicsMap[group._id]?.map((topic) => (
                            <div key={topic._id} className="flex items-center justify-between">
                              <div
                                onClick={() =>
                                  setSelectedChat({ type: "group", groupId: group._id, topicId: topic._id })
                                }
                                className="cursor-pointer text-sm text-blue-400 hover:underline font-medium hover:text-blue-300 transition-colors"
                              >
                                {topic.title}
                              </div>
                              {user.role === "agency" && (
                                <button onClick={() => handleDeleteTopic(topic._id)} className="text-red-400 text-xs hover:text-red-300 font-semibold">
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

                <div
                  className="p-5 mt-8 bg-gray-900 rounded-2xl cursor-pointer hover:bg-gray-800 border border-gray-800 shadow-lg text-center font-semibold text-white transition-all duration-150 hover:border-blue-500"
                  onClick={() => setSelectedChat({ type: "dm", id })}
                >
                  Personal Chat
                </div>
              </div>
            </>
          ) : selectedChat.type === "dm" ? (
            <div className="flex flex-col h-full min-h-[500px] w-full">
              <div className="flex-1 flex items-center justify-center w-full h-full">
                <div className="w-full h-[80vh] flex flex-col justify-between bg-[#222e35] rounded-3xl overflow-hidden border border-[#232e3c] shadow-xl">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-8 py-5 bg-[#232e3c] border-b border-[#232e3c]" style={{ minHeight: 80 }}>
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg">{modeinfo.fullName ? modeinfo.fullName[0] : 'U'}</div>
                    <div>
                      <div className="font-semibold text-white text-lg">{modeinfo.fullName || 'User'}</div>
                      <div className="text-xs text-gray-400">Direct Message</div>
                    </div>
                  </div>
                  {/* ChatWindow area */}
                  <div className="flex-1 flex flex-col justify-end px-8 py-6 bg-[#222e35] overflow-y-auto custom-scrollbar" style={{ minHeight: 0 }}>
                    <ChatWindow type="dm" id={selectedChat.id} />
                  </div>
                  {/* Input area (handled by ChatWindow) */}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full min-h-[500px] w-full">
              <div className="flex-1 flex items-center justify-center w-full h-full">
                <div className="w-full h-[80vh] flex flex-col justify-between bg-[#222e35] rounded-3xl overflow-hidden border border-[#232e3c] shadow-xl">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-8 py-5 bg-[#232e3c] border-b border-[#232e3c]" style={{ minHeight: 80 }}>
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg">G</div>
                    <div>
                      <div className="font-semibold text-white text-lg">Group Chat</div>
                      <div className="text-xs text-gray-400">Group Conversation</div>
                    </div>
                  </div>
                  {/* ChatWindow area */}
                  <div className="flex-1 flex flex-col justify-end px-8 py-6 bg-[#222e35] overflow-y-auto custom-scrollbar" style={{ minHeight: 0 }}>
                    <ChatWindow type="group" id={selectedChat.groupId} topicId={selectedChat.topicId} />
                  </div>
                  {/* Input area is handled by ChatWindow for consistent logic and UI */}
                </div>
              </div>
            </div>
          )
        ) : activeMenu === "Tasks" ? (
          <div className="bg-gray-900 rounded-2xl p-10 shadow-xl border border-gray-800 w-full max-w-6xl mx-auto flex flex-col min-h-[80vh] relative">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-extrabold tracking-tight">Tasks for this Model</h2>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
                style={{ minWidth: 100 }}
              >
                Cancel
              </button>
            </div>
            <TaskList modelId={id} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-4 text-white">Creator Insights Dashboard</h1>
            <p className="text-gray-400 text-lg">Select a menu item to begin.</p>
          </div>
        )}
      </div>
    </div>
  )
}
