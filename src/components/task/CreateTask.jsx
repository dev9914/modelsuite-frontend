import { useEffect, useState } from "react";
import axios from "axios";

const CreateTask = ({ modelId, onTaskCreated }) => {
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
    shortDescription: "",
    description: "",
    assignedTo: modelId,
  });

  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const agency = JSON.parse(localStorage.getItem("auth"))?.user;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (agency?.role === "agency" && !formData.requestedBy) {
      setFormData((prev) => ({
        ...prev,
        requestedBy: agency._id,
        requestedFor: agency._id,
        legacyCompany: agency.agencyName || "",
        serviceLocation: agency.city || "",
      }));
    }
  }, [agency, formData.requestedBy]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "method") {
      setFormData((prev) => ({
        ...prev,
        preferredContactMethod: { ...prev.preferredContactMethod, method: value, value: "" },
      }));
    } else if (name === "contactValue") {
      setFormData((prev) => ({
        ...prev,
        preferredContactMethod: { ...prev.preferredContactMethod, value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      await axios.post(`${baseURL}/tasks/create`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Task created successfully");
      setFormData((prev) => ({
        ...prev,
        preferredContactMethod: { method: "", value: "" },
        onHoldReason: "",
        category: "",
        priority: 4,
        status: "In Progress",
        shortDescription: "",
        description: "",
      }));
      onTaskCreated();
    } catch (err) {
      console.error("❌ Failed to create task", err);
      alert("❌ Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Legacy Company <span className="text-red-500">*</span></label>
          <input type="text" name="legacyCompany" value={formData.legacyCompany} className="input text-black" disabled />
        </div>

        <div>
          <label>Service Location <span className="text-red-500">*</span></label>
          <input type="text" name="serviceLocation" value={formData.serviceLocation} onChange={handleChange} className="input text-black" required />
        </div>

        <div>
          <label>Timezone <span className="text-red-500">*</span></label>
          <input type="text" name="timezone" value={formData.timezone} onChange={handleChange} className="input text-black" required />
        </div>

        <div>
          <label>Preferred Language <span className="text-red-500">*</span></label>
          <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} className="input text-black" required>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="German">German</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
          </select>
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
          <label>Category <span className="text-red-500">*</span></label>
          <select name="category" value={formData.category} onChange={handleChange} className="input text-black" required>
            <option value="">Select Category</option>
            <option value="Fashion">Fashion</option>
            <option value="Photography">Photography</option>
            <option value="Marketing">Marketing</option>
            <option value="Management">Management</option>
            <option value="Technical">Technical</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Priority <span className="text-red-500">*</span></label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="input text-black" required>
            <option value={1}>1 - Urgency</option>
            <option value={2}>2 - High</option>
            <option value={3}>3 - Medium</option>
            <option value={4}>4 - Low</option>
          </select>
        </div>

        <div>
          <label>Status <span className="text-red-500">*</span></label>
          <select name="status" value={formData.status} onChange={handleChange} className="input text-black" required>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {formData.status === "On Hold" && (
          <div>
            <label>On Hold Reason <span className="text-red-500">*</span></label>
            <input type="text" name="onHoldReason" value={formData.onHoldReason} onChange={handleChange} className="input text-black" required />
          </div>
        )}
      </div>

      <div>
        <label>Short Description <span className="text-red-500">*</span></label>
        <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="input text-black w-full" required />
      </div>

      <div>
        <label>Description <span className="text-red-500">*</span></label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="input w-full h-24 text-black resize-none" required />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
