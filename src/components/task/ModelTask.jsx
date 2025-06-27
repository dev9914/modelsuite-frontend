import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ModelTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [onHoldReasons, setOnHoldReasons] = useState({});
  const user = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/model/${user.user.agencyId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  const handleUpdate = async (taskId, status) => {
    try {
      const body = { status };
      if (status === "On Hold") {
        body.onHoldReason = onHoldReasons[taskId] || "";
      }

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/update-status/${taskId}`,
        body,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      toast.success("Task updated");
      fetchTasks();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assigned Tasks</h2>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-gray-800 rounded p-4 mb-4 shadow border border-gray-700"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">#{task.number}</h3>
            <span className="text-sm text-yellow-300">{task.status}</span>
          </div>
          <p className="mt-1 text-gray-300">{task.shortDescription}</p>

          {task.status === "In Progress" && (
            <div className="mt-3 space-x-2">
              <button
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                onClick={() => handleUpdate(task._id, "Resolved")}
              >
                Mark Resolved
              </button>
<button
  className={`px-3 py-1 rounded text-white ${onHoldReasons[task._id]?.trim()
    ? 'bg-yellow-500 hover:bg-yellow-600'
    : 'bg-yellow-300 cursor-not-allowed'}`}
  onClick={() => handleUpdate(task._id, "On Hold")}
  disabled={!onHoldReasons[task._id]?.trim()}
>
  On Hold
</button>
              <input
                type="text"
                placeholder="Reason for hold"
                className="mt-2 block w-full bg-gray-700 px-2 py-1 text-white rounded"
                onChange={(e) =>
                  setOnHoldReasons((prev) => ({
                    ...prev,
                    [task._id]: e.target.value,
                  }))
                }
              />
            </div>
          )}

          {task.status === "On Hold" && (
            <p className="text-red-400 mt-2 text-sm">
              Reason: {task.onHoldReason}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModelTaskList;
