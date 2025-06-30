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
  const [uploading, setUploading] = useState(false);

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
    setUploading(true);
    // Single POST request to upload + save metadata
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/tasks/${taskId}/attachments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setFile(null);
    fetchTask(); // Refresh to load new attachment list
  } catch (err) {
    console.error("❌ Upload failed:", err);
  } finally {
    setUploading(false);
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
    <div className="bg-gray-900 p-8 rounded-2xl text-white max-w-3xl mx-auto shadow border border-gray-800">
      <h2 className="text-2xl font-extrabold mb-6 tracking-tight">Task #{task.number}</h2>
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <p><span className="font-semibold text-gray-300">Status:</span> {task.status}</p>
        <p><span className="font-semibold text-gray-300">Category:</span> {task.category}</p>
        <p><span className="font-semibold text-gray-300">Priority:</span> {task.priority}</p>
        <p><span className="font-semibold text-gray-300">Assigned To:</span> {task.assignedTo?.fullName}</p>
        <p><span className="font-semibold text-gray-300">Requested By:</span> {task.requestedBy?.fullName}</p>
        <p><span className="font-semibold text-gray-300">Service Location:</span> {task.serviceLocation}</p>
        {task.status === "On Hold" && (
          <p><span className="font-semibold text-gray-300">Reason:</span> {task.onHoldReason}</p>
        )}
      </div>

      <p className="mb-8"><span className="font-semibold text-gray-300">Description:</span> {task.description}</p>

      {/* Model-only controls */}
      {role === "model" && (
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
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
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded w-full font-semibold"
            >
              Save Status
            </button>
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1">Upload Attachment</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-gray-700 p-2 rounded w-full"
            />
            <button
              onClick={handleFileUpload}
              disabled={uploading || !file}
              className={`mt-2 px-4 py-2 rounded w-full font-semibold ${
                uploading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}

      {/* Attachments view for all roles */}
      {attachments.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold mb-3 text-lg">Attachments</h3>
          <ul className="space-y-4">
            {attachments.map((file, idx) => {
              const isPDF = file.type === "application/pdf";
              const isImage = file.type.startsWith("image/");
              const isVideo = file.type.startsWith("video/");
              const previewUrl = isPDF
                ? file.url.replace("/upload/", "/upload/fl_attachment:false/")
                : file.url;
              return (
                <li key={idx} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                  <div className="mb-2">
                    {isPDF ? (
                      <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(file.url)}&embedded=true`}
                        width="100%"
                        height="300"
                        title={`PDF-${idx}`}
                        className="rounded"
                      />
                    ) : isImage ? (
                      <img
                        src={previewUrl}
                        alt={file.originalName || "Attachment"}
                        className="max-h-64 rounded"
                      />
                    ) : isVideo ? (
                      <video
                        src={previewUrl}
                        controls
                        className="w-full max-h-72 rounded"
                      />
                    ) : (
                      <p className="text-white">📄 {file.originalName || "Document"}</p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    {!isPDF ? (
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                      >
                        View
                      </a>
                    ) : (
                      <button
                        onClick={() =>
                          window.open(
                            `https://docs.google.com/gview?url=${encodeURIComponent(file.url)}&embedded=true`,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                      >
                        View
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-3">Comments</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {comments.map((cmt) => (
            <div
              key={cmt._id}
              className="bg-gray-800 p-3 rounded-lg border border-gray-700"
            >
              <p className="text-sm text-gray-300">{cmt.commentText}</p>
              <p className="text-xs text-gray-500 mt-1">
                {cmt.userId.fullName || cmt.userId.agencyName || "Unknown"} –{' '}
                {new Date(cmt.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <textarea
            className="bg-gray-800 p-2 rounded-lg w-full"
            rows="3"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
