import { useEffect, useState } from "react"
import axios from "axios"

const TaskDetails = ({ taskId }) => {
  const [task, setTask] = useState(null)
  const token = JSON.parse(localStorage.getItem("auth"))?.token

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setTask(res.data)
      } catch (err) {
        console.error("Failed to fetch task:", err)
      }
    }

    fetchTask()
  }, [taskId])

  if (!task) return <p className="text-gray-400">Loading task details...</p>

  return (
    <div className="bg-gray-800 rounded p-4">
      <h2 className="text-xl font-bold mb-2">Task #{task.number}</h2>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Requested By:</strong> {task.requestedBy?.fullName || "N/A"}</p>
      <p><strong>Assigned To:</strong> {task.assignedTo?.fullName || "N/A"}</p>
      <p><strong>Legacy Company:</strong> {task.legacyCompany}</p>
      <p><strong>Location:</strong> {task.serviceLocation}</p>
      <p><strong>Category:</strong> {task.category}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Escalation:</strong> {task.escalation ? "Yes" : "No"}</p>
      <p><strong>Description:</strong></p>
      <p className="text-sm text-gray-300">{task.description}</p>
    </div>
  )
}

export default TaskDetails
