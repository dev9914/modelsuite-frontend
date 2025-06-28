import { useEffect, useState } from "react";
import axios from "axios";

const TaskDetails = ({ taskId }) => {
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [onHoldReason, setOnHoldReason] = useState("");

  const user = JSON.parse(localStorage.getItem("auth"));
  const token = user?.token;
  const role = user.user?.role;

  const fetchTask = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask(res.data);
      setStatus(res.data.status);
      setOnHoldReason(res.data.onHoldReason || "");
      setAttachments(res.data.attachments || []);
    } catch (err) {
      console.error("❌ Failed to fetch task:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/comment/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch comments:", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/comment`,
        { commentText: newComment, taskId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("❌ Failed to add comment:", err);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/attachment/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Save attachment metadata to task
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/${taskId}/attachments`,
        res.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFile(null);
      fetchTask(); // refresh to get updated attachment list
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/update-status/${taskId}`,
        {
          status,
          onHoldReason: status === "On Hold" ? onHoldReason : "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTask();
    } catch (err) {
      console.error("❌ Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchTask();
    fetchComments();
  }, [taskId]);

  if (!task) return <p className="text-gray-400">Loading task details...</p>;

  return (
    <div className="bg-gray-900 p-6 rounded text-white">
      <h2 className="text-xl font-bold mb-3">Task #{task.number}</h2>
      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Category:</strong> {task.category}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Assigned To:</strong> {task.assignedTo?.fullName}</p>
        <p><strong>Requested By:</strong> {task.requestedBy?.fullName}</p>
        <p><strong>Service Location:</strong> {task.serviceLocation}</p>
        {task.status === "On Hold" && (
          <p><strong>Reason:</strong> {task.onHoldReason}</p>
        )}
      </div>

      <p className="mb-4"><strong>Description:</strong> {task.description}</p>

      {/* ✅ Model-only controls */}
      {role === "model" && (
        <>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-gray-700 p-2 rounded w-full"
            >
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Resolved">Resolved</option>
            </select>
            {status === "On Hold" && (
              <input
                value={onHoldReason}
                onChange={(e) => setOnHoldReason(e.target.value)}
                className="bg-gray-700 mt-2 p-2 rounded w-full"
                placeholder="Enter reason for hold"
              />
            )}
            <button
              onClick={handleStatusUpdate}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Save Status
            </button>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Attachment</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-gray-700 p-2 rounded w-full"
            />
            <button
              onClick={handleFileUpload}
              className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Upload
            </button>
          </div>
        </>
      )}

      {/* 📎 Attachments view for all roles */}
      {attachments.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Attachments</h3>
          <ul className="space-y-2">
            {attachments.map((file, idx) => (
              <li key={idx}>
                {file.type === "application/pdf" ? (
                  <iframe
                    src={file.url}
                    width="100%"
                    height="400"
                    title={`PDF-${idx}`}
                    className="rounded border border-gray-600"
                  />
                ) : file.type.startsWith("image/") ? (
                  <img
                    src={file.url}
                    alt="Attachment"
                    className="max-h-64 rounded border border-gray-600"
                  />
                ) : (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    📄 {file.originalName || "Download"}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 💬 Comments Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Comments</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {comments.map((cmt) => (
            <div
              key={cmt._id}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            >
              <p className="text-sm text-gray-300">{cmt.commentText}</p>
              <p className="text-xs text-gray-500 mt-1">
                {cmt.userId.fullName || cmt.userId.agencyName || "Unknown"} –{" "}
                {new Date(cmt.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <textarea
            className="bg-gray-800 p-2 rounded w-full"
            rows="3"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
