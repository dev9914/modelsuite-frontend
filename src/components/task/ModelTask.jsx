
import { useEffect, useState } from "react";
import axios from "axios";
import TaskDetails from "./TaskDetails";


const ModelTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Defensive: parse user and token safely
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("auth"));
    } catch {
      return null;
    }
  })();
  const token = user?.token;

  const fetchTasks = async () => {
    if (!token || !user?.user?.agencyId) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/model/${user.user.agencyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching model tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto text-white p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">Tasks for this Model</h2>
      </div>

      {!selectedTaskId && tasks.length === 0 && (
        <div className="bg-gray-900 rounded-2xl p-10 shadow border border-gray-800 text-center">
          <p className="text-gray-400 text-lg">No tasks assigned to you yet.</p>
        </div>
      )}

      {!selectedTaskId && tasks.length > 0 && (
        <div className="overflow-x-auto bg-gray-900 rounded-2xl p-6 shadow border border-gray-800">
          <table className="min-w-full border-separate border-spacing-0 text-base">
            <thead className="bg-gray-800 text-gray-200">
              <tr>
                <th className="p-4 border-b border-gray-700 font-semibold text-left">Number</th>
                <th className="p-4 border-b border-gray-700 font-semibold text-left">Category</th>
                <th className="p-4 border-b border-gray-700 font-semibold text-left">Priority</th>
                <th className="p-4 border-b border-gray-700 font-semibold text-left">Status</th>
                <th className="p-4 border-b border-gray-700 font-semibold text-left">Short Description</th>
                <th className="p-4 border-b border-gray-700 font-semibold text-left">Opened</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  onClick={() => setSelectedTaskId(task._id)}
                  className="hover:bg-gray-800 cursor-pointer transition-colors group"
                >
                  <td className="p-4 border-b border-gray-700 text-blue-400 underline font-semibold group-hover:text-blue-300">
                    {task.number}
                  </td>
                  <td className="p-4 border-b border-gray-700">{task.category}</td>
                  <td className="p-4 border-b border-gray-700">
                    {{
                      1: "1 - Urgency",
                      2: "2 - High",
                      3: "3 - Medium",
                      4: "4 - Low",
                      5: "5 - Planning",
                    }[task.priority]}
                  </td>
                  <td className="p-4 border-b border-gray-700">
                    {{
                      "In Progress": <span className="text-yellow-400 font-semibold">🟡 In Progress</span>,
                      "On Hold": <span className="text-red-400 font-semibold">🔴 On Hold</span>,
                      "Resolved": <span className="text-green-400 font-semibold">🟢 Resolved</span>,
                    }[task.status] || task.status}
                  </td>
                  <td className="p-4 border-b border-gray-700">{task.shortDescription}</td>
                  <td className="p-4 border-b border-gray-700">
                    {new Date(task.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTaskId && (
        <div className="relative bg-gray-900 rounded-2xl p-10 shadow border border-gray-800 mt-8">
          <button
            onClick={() => setSelectedTaskId(null)}
            className="absolute top-3 right-3 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow"
          >
            Close
          </button>
          <TaskDetails taskId={selectedTaskId} />
        </div>
      )}
    </div>
  );
};

export default ModelTaskList;