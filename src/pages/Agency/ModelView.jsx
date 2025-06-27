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
      <div className="flex-1 h-[87.2vh] overflow-y-auto scrollbar-none p-6">
        {activeMenu === "Messenger" ? (
          !selectedChat ? (
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

              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-2">Group Chats</h2>
                {groupList.map((group) => (
                  <div key={group._id} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between">
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
                        className="cursor-pointer text-lg font-medium"
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
                              className="text-blue-400 text-xs underline"
                            >
                              + Topic
                            </button>
                            <button onClick={() => handleDeleteGroup(group._id)} className="text-red-500">
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
                          className="px-2 py-1 text-sm bg-gray-700 rounded border border-gray-600"
                        />
                        <button
                          onClick={() => handleCreateTopic(group._id)}
                          className="bg-blue-600 px-2 py-1 rounded text-sm"
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
                              className="cursor-pointer text-sm text-blue-400 hover:underline"
                            >
                              {topic.title}
                            </div>
                            {user.role === "agency" && (
                              <button onClick={() => handleDeleteTopic(topic._id)} className="text-red-400 text-xs">
                                Delete
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
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
          ) : selectedChat.type === "dm" ? (
            <ChatWindow type="dm" id={selectedChat.id} />
          ) : (
            <ChatWindow type="group" id={selectedChat.groupId} topicId={selectedChat.topicId} />
          )
        ) : activeMenu === "Tasks" ? (
    <TaskList modelId={id} />
  ): (
          <>
            <h1 className="text-2xl font-bold mb-4">Creator Insights Dashboard</h1>
            <p className="text-gray-400">Select a menu item to begin.</p>
          </>
        )}
      </div>
    </div>
  )
}
