import { useEffect, useState } from "react"
import axios from "axios"

const CreateTask = ({ modelId,onTaskCreated }) => {
  const [formData, setFormData] = useState({
    requestedBy: "",
    requestedFor: "",
    legacyCompany: "",
    serviceLocation: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
    preferredLanguage: "English",
    preferredContactMethod: { method: "", value: "" },
    status: "In Progress",
    onHoldReason: "",
    category: "",
    priority: 4,
    assignedTo: modelId,
    escalation: false,
    shortDescription: "",
    description: "",
  })

  const token = JSON.parse(localStorage.getItem("auth"))?.token
  const agency = JSON.parse(localStorage.getItem("auth"))?.user
  const baseURL = import.meta.env.VITE_API_BASE_URL

useEffect(() => {
  if (agency?.role === "agency" && !formData.requestedBy) {
    setFormData((prev) => ({
      ...prev,
      requestedBy: agency._id,
      requestedFor: agency._id,
      legacyCompany: agency.agencyName || "",
      serviceLocation: agency.location || "",
    }));
  }
}, [agency, formData.requestedBy]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === "escalation") {
      setFormData((prev) => ({ ...prev, escalation: checked }))
    } else if (name === "method") {
      setFormData((prev) => ({
        ...prev,
        preferredContactMethod: { ...prev.preferredContactMethod, method: value, value: "" },
      }))
    } else if (name === "contactValue") {
      setFormData((prev) => ({
        ...prev,
        preferredContactMethod: { ...prev.preferredContactMethod, value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${baseURL}/tasks/create`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      alert("✅ Task created successfully")
      setFormData((prev) => ({
        ...prev,
        preferredContactMethod: { method: "", value: "" },
        onHoldReason: "",
        category: "",
        priority: 4,
        escalation: false,
        shortDescription: "",
        description: "",
      }))
      onTaskCreated()
    } catch (err) {
      console.error("Failed to create task", err)
      alert("❌ Failed to create task")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 text-white p-4 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Legacy Company</label>
          <input type="text" name="legacyCompany" value={formData.legacyCompany} onChange={handleChange} className="input text-black" disabled />
        </div>
        <div>
          <label>Service Location</label>
          <input type="text" name="serviceLocation" value={formData.serviceLocation} onChange={handleChange} className="input text-black" />
        </div>
        <div>
          <label>Timezone</label>
          <input type="text" name="timezone" value={formData.timezone} onChange={handleChange} className="input text-black" />
        </div>
        <div>
          <label>Preferred Language</label>
          <input type="text" name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} className="input text-black" />
        </div>
        <div>
          <label>Preferred Contact Method</label>
          <select name="method" value={formData.preferredContactMethod.method} onChange={handleChange} className="input text-black">
            <option value="">Select</option>
            <option value="Mail">Mail</option>
            <option value="Phone Number">Phone Number</option>
          </select>
        </div>
        {formData.preferredContactMethod.method && (
          <div>
            <label>{formData.preferredContactMethod.method} Value</label>
            <input
              type="text"
              name="contactValue"
              value={formData.preferredContactMethod.value}
              onChange={handleChange}
              className="input text-black"
            />
          </div>
        )}
        <div>
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="input text-black" />
        </div>
        <div>
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="input text-black">
            <option value={1}>1 - Urgency</option>
            <option value={2}>2 - High</option>
            <option value={3}>3 - Medium</option>
            <option value={4}>4 - Low</option>
          </select>
        </div>
        <div>
          <label>Escalation</label>
          <input type="checkbox" name="escalation" checked={formData.escalation} onChange={handleChange} />
        </div>
        <div>
          <label>Status</label>
          <input type="text" name="status" value="In Progress" disabled className="input text-black" />
        </div>
        <div>
          <label>On Hold Reason</label>
          <input type="text" name="onHoldReason" value={formData.onHoldReason} onChange={handleChange} className="input text-black" />
        </div>
      </div>

      <div>
        <label>Short Description</label>
        <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="input text-black w-full" />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="input w-full h-24 text-black resize-none" />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
      >
        Create Task
      </button>
    </form>
  )
}

export default CreateTask
