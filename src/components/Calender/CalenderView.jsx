"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, X } from "lucide-react"

const CalendarView = ({modelInfo}) => {
  const user = JSON.parse(localStorage.getItem("auth"))
  const token = user?.token
  const userId = user?.user._id
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [viewMode, setViewMode] = useState("month")
  const [form, setForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    location: "",
    assignedTo: "",
    assignedToModel: "ModelUser",
    isAllDay: false,
  })

  const headers = { headers: { Authorization: `Bearer ${token}` } }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${baseUrl}/calendar/agency/${userId}/model/${modelInfo._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setEvents(data.events)
      }
    } catch (err) {
      console.error("Error fetching events", err)
    }
  }

  const handleSaveEvent = async () => {
    try {
      const eventData = {
        ...form,
        start: new Date(form.start).toISOString(),
        end: new Date(form.end).toISOString(),
      }
      if(form.title === '') {
        alert("Title is Required")
        return
      }

      let response
      if (selectedEvent) {
        response = await fetch(`${baseUrl}/calendar/update/${selectedEvent._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        })
      } else {
        response = await fetch(`${baseUrl}/calendar/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        })
      }

      if (response.ok) {
        fetchEvents()
        closeModal()
      }
    } catch (err) {
      console.error("Error saving event", err)
    }
  }

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return

    try {
      const response = await fetch(`${baseUrl}/calendar/delete/${selectedEvent._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        fetchEvents()
        closeModal()
      }
    } catch (err) {
      console.error("Error deleting event", err)
    }
  }

  const openModal = (event = null, date = null) => {
    if (event) {
      setSelectedEvent(event)
      setForm({
        title: event.title || "",
        description: event.description || "",
        start: new Date(event.start).toISOString().slice(0, 16),
        end: new Date(event.end).toISOString().slice(0, 16),
        location: event.location || "",
        assignedTo: event.assignedTo || "",
        assignedToModel: event.assignedToModel || "ModelUser",
        isAllDay: event.isAllDay || false,
      })
    } else {
      setSelectedEvent(null)
      const startDate = date || new Date()
      const endDate = new Date(startDate)
      endDate.setHours(startDate.getHours() + 1)

      setForm({
        title: "",
        description: "",
        start: startDate.toISOString().slice(0, 16),
        end: endDate.toISOString().slice(0, 16),
        location: "",
        assignedTo: modelInfo._id,
        assignedToModel: "ModelUser",
        isAllDay: false,
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedEvent(null)
    setForm({
      title: "",
      description: "",
      start: "",
      end: "",
      location: "",
      assignedTo: "",
      assignedToModel: "ModelUser",
      isAllDay: false,
    })
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getEventsForDate = (date) => {
    if (!date) return []
    return events.filter((event) => {
      const eventDate = new Date(event.start)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const formatEventTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isStartDateInPast = new Date(form.start) < new Date();
  useEffect(() => {
    if (token && userId) {
      fetchEvents()
    }
  }, [token, userId])

  const days = getDaysInMonth()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Agency Calendar</h1>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add Event
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold min-w-[200px] text-center">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("month")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "month" ? "bg-slate-700 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "week" ? "bg-slate-700 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                }`}
              >
                Week
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 bg-slate-700">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-4 text-center font-semibold text-slate-300">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days.map((date, index) => {
              const dayEvents = date ? getEventsForDate(date) : []
              const isToday = date && date.toDateString() === new Date().toDateString()

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-r border-b border-slate-700 ${
                    date ? "hover:bg-slate-750 cursor-pointer" : ""
                  } ${isToday ? "bg-slate-700" : ""}`}
                  onClick={() => date && openModal(null, date)}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${isToday ? "text-blue-400" : "text-slate-300"}`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event, eventIndex) => (
                          <div
                            key={event._id}
                            onClick={(e) => {
                              e.stopPropagation()
                              openModal(event)
                            }}
                            className="bg-blue-600 text-white text-xs p-1 rounded cursor-pointer hover:bg-blue-700 transition-colors"
                          >
                            <div className="font-medium truncate">{event.title}</div>
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-slate-400">+{dayEvents.length - 3} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Event Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{selectedEvent ? "Edit Event" : "Create Event"}</h3>
                <button onClick={closeModal} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Event description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="datetime-local"
                      value={form.start}
                      onChange={(e) => setForm({ ...form, start: e.target.value })}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <input
                      type="datetime-local"
                      value={form.end}
                      onChange={(e) => setForm({ ...form, end: e.target.value })}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Event location"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium mb-2">Assigned To</label>
                  <input
                    type="text"
                    value={form.assignedTo}
                    onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="User ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Assigned To Model</label>
                  <select
                    value={form.assignedToModel}
                    onChange={(e) => setForm({ ...form, assignedToModel: e.target.value })}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="ModelUser">Model</option>
                    <option value="Agency">Agency</option>
                  </select>
                </div> */}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="allDay"
                    checked={form.isAllDay}
                    onChange={(e) => setForm({ ...form, isAllDay: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="allDay" className="text-sm font-medium">
                    All Day Event
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                {selectedEvent && (
                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )}
                <button
  onClick={handleSaveEvent}
  disabled={isStartDateInPast}
  className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2
    ${isStartDateInPast 
      ? "bg-gray-500 text-gray-300 cursor-not-allowed opacity-70"
      : "bg-blue-600 hover:bg-blue-700 text-white"}
  `}
>
                  {selectedEvent ? <Edit size={16} /> : <Plus size={16} />}
                  {selectedEvent ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarView
