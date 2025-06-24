"use client"

import { useState, useEffect, useRef } from "react"
import socket from "../utils/socket"
import axios from "axios"
import { Send, Loader2 } from "lucide-react"

const ChatWindow = ({ id }) => {
  const user = JSON.parse(localStorage.getItem("auth"))?.user
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)
  const [isNearBottom, setIsNearBottom] = useState(true)

  // Load old messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/messages/agency-to-model`, {
          params: {
            user1Id: user._id,
            user2Id: id,
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token}`,
          },
        })
        setMessages(res.data)
        // Scroll to bottom only after initial load
        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "instant" })
          }
        }, 100)
      } catch (err) {
        console.error("Error loading messages:", err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchMessages()
    }
  }, [id])

  const checkScrollPosition = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100 // Within 100px of bottom
    setIsNearBottom(isAtBottom)
  }

  // Socket event listeners
  useEffect(() => {
    socket.on("receive_message_agency_model", (message) => {
      setMessages((prev) => [...prev, message])

      // Auto-scroll only if user is near bottom (actively following conversation)
      if (isNearBottom) {
        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      }
    })

    return () => {
      socket.off("receive_message_agency_model")
    }
  }, [isNearBottom])

  const handleSendMessage = async () => {
    if (!text.trim() || isSending) return

    setIsSending(true)

    const newMessage = {
      senderId: user._id,
      receiverId: id,
      text: text.trim(),
      senderModel: user.role === "agency" ? "Agency" : "ModelUser",
      receiverModel: user.role === "agency" ? "ModelUser" : "Agency",
    }

    try {
      socket.emit("send_message_agency_model", newMessage)

      setMessages((prev) => [
        ...prev,
        {
          ...newMessage,
          createdAt: new Date(),
        },
      ])
      setText("")

      // Scroll to bottom when user sends a message
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date) => {
    const messageDate = new Date(date)
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
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
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-none scroll-smooth" onScroll={checkScrollPosition}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isOwnMessage = msg.senderId === user._id
              return (
                <div key={index} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                      isOwnMessage ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-700 text-gray-100 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 ${isOwnMessage ? "text-blue-100" : "text-gray-400"}`}>
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

      {/* Input Area */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSending}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            />
          </div>
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
