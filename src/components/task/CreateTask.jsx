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
    <form onSubmit={handleSubmit} className="space-y-10 bg-gray-900 text-white p-10 rounded-2xl shadow-xl w-full max-w-4xl mx-auto border border-gray-800">
      <h2 className="text-3xl font-extrabold mb-10 text-center tracking-tight">Create New Task</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-base mb-1">Legacy Company <span className="text-red-500">*</span></label>
          <input type="text" name="legacyCompany" value={formData.legacyCompany} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 placeholder-gray-400" disabled />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-base mb-1">Service Location <span className="text-red-500">*</span></label>
          <input type="text" name="serviceLocation" value={formData.serviceLocation} onChange={handleChange} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 placeholder-gray-400" required />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-base mb-1">Timezone <span className="text-red-500">*</span></label>
          <input type="text" name="timezone" value={formData.timezone} onChange={handleChange} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 placeholder-gray-400" required />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-base mb-1">Preferred Language <span className="text-red-500">*</span></label>
          <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2" required>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="German">German</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-base mb-1">Preferred Contact Method</label>
          <select name="method" value={formData.preferredContactMethod.method} onChange={handleChange} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
            <option value="">Select</option>
            <option value="Mail">Mail</option>
            <option value="Phone Number">Phone Number</option>
          </select>
        </div>

        {formData.preferredContactMethod.method && (
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-base mb-1">{formData.preferredContactMethod.method} Value</label>
            <input
              type="text"
              name="contactValue"
              value={formData.preferredContactMethod.value}
              onChange={handleChange}
              className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 placeholder-gray-400"
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-base mb-1">Category <span className="text-red-500">*</span></label>
          <select name="category" value={formData.category} onChange={handleChange} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2" required>
            <option value="">Select Category</option>
            <option value="Fashion">Fashion</option>
            <option value="Photography">Photography</option>
            <option value="Marketing">Marketing</option>
            <option value="Management">Management</option>
            <option value="Technical">Technical</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-base mb-1">Priority <span className="text-red-500">*</span></label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2" required>
            <option value={1}>1 - Urgency</option>
            <option value={2}>2 - High</option>
            <option value={3}>3 - Medium</option>
            <option value={4}>4 - Low</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-base mb-1">Status <span className="text-red-500">*</span></label>
          <select name="status" value={formData.status} onChange={handleChange} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2" required>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {formData.status === "On Hold" && (
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-base mb-1">On Hold Reason <span className="text-red-500">*</span></label>
            <input type="text" name="onHoldReason" value={formData.onHoldReason} onChange={handleChange} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 placeholder-gray-400" required />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="font-semibold text-base mb-1">Short Description <span className="text-red-500">*</span></label>
        <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="input text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full placeholder-gray-400" required />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="font-semibold text-base mb-1">Description <span className="text-red-500">*</span></label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="input w-full h-32 text-white bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 resize-none placeholder-gray-400" required />
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-lg font-bold shadow text-lg tracking-wide transition-colors duration-150"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default CreateTask;
