"use client"

import { useState, useEffect, useRef } from "react"
import socket from "../utils/socket"
import axios from "axios"
import { Send, Loader2 } from "lucide-react"

const ChatWindow = ({ id, type }) => {
  const user = JSON.parse(localStorage.getItem("auth"))?.user
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)
  const [isNearBottom, setIsNearBottom] = useState(true)

  // Load previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const token = JSON.parse(localStorage.getItem("auth"))?.token
        let url = ""

        if (type === "dm") {
          url = `/messages/agency-to-model?user1Id=${user._id}&user2Id=${id}`
        } else if (type === "group") {
          url = `/messages/group/messages/${id}`
        }

        const res = await axios.get(import.meta.env.VITE_API_BASE_URL + url, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setMessages(res.data)
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "instant" }), 100)
      } catch (err) {
        console.error("❌ Error fetching messages:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (id && type) fetchMessages()
  }, [id, type])

  // Scroll tracking
  const checkScrollPosition = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    const nearBottom = scrollHeight - scrollTop - clientHeight < 100
    setIsNearBottom(nearBottom)
  }

  // Socket Events
  useEffect(() => {
    if (type === "group") {
      socket.emit("join_room", { room: id })

      socket.on("new_group_message", (msg) => {
        if (msg.groupId === id || msg.topicId === id) {
          setMessages((prev) => [...prev, msg])
          if (isNearBottom) {
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
          }
        }
      })

      return () => {
        socket.emit("leave_room", { room: id })
        socket.off("new_group_message")
      }
    }

    if (type === "dm") {
      socket.on("receive_message_agency_model", (msg) => {
        if (
          (msg.senderId === user._id && msg.receiverId === id) ||
          (msg.senderId === id && msg.receiverId === user._id)
        ) {
          setMessages((prev) => [...prev, msg])
          if (isNearBottom) {
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
          }
        }
      })

      return () => socket.off("receive_message_agency_model")
    }
  }, [id, type, isNearBottom])

  const handleSendMessage = () => {
    if (!text.trim() || isSending) return
    setIsSending(true)

    const newMessage = {
      senderId: user._id,
      text: text.trim(),
      createdAt: new Date(),
    }

    if (type === "dm") {
      Object.assign(newMessage, {
        receiverId: id,
        senderModel: user.role === "agency" ? "Agency" : "ModelUser",
        receiverModel: user.role === "agency" ? "ModelUser" : "Agency",
      })
      socket.emit("send_message_agency_model", newMessage)
    } else if (type === "group") {
      Object.assign(newMessage, {
        groupId: id,
        senderModel: user.role === "agency" ? "Agency" : "ModelUser",
      })
      socket.emit("send_group_message", newMessage)
    }

    setMessages((prev) => [...prev, newMessage])
    setText("")
    setIsSending(false)

    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date) => {
    const messageDate = new Date(date)
    return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-gray-900 text-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading messages...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-none scroll-smooth" onScroll={checkScrollPosition}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isOwn = msg.senderId === user._id
              return (
                <div key={i} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                      isOwn
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-gray-700 text-gray-100 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 ${isOwn ? "text-blue-100" : "text-gray-400"}`}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-end gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!text.trim() || isSending}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
