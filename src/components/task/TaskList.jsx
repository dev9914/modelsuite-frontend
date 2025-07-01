import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";
import TaskDetails from "./TaskDetails";

const TaskList = ({ modelId }) => {
  const [tasks, setTasks] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
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

  const fetchTasks = useCallback(async () => {
    if (!token || !modelId) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/my-tasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const modelTasks = res.data.filter(
        (task) => task.assignedTo?._id === modelId
      );
      // Only update if changed (shallow compare by id)
      setTasks((prev) => {
        if (
          prev.length === modelTasks.length &&
          prev.every((t, i) => t._id === modelTasks[i]._id)
        ) {
          return prev;
        }
        return modelTasks;
      });
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }, [token, modelId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskCreated = () => {
    setShowCreate(false);
    fetchTasks();
  };


  return (
    <div className="bg-gray-900 rounded-2xl p-10 shadow-xl border border-gray-800 w-full max-w-6xl mx-auto flex flex-col min-h-[80vh] relative">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-extrabold tracking-tight">Tasks for this Model</h2>
        {!selectedTaskId && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreate(true)}
              className={`px-6 py-2 rounded-lg font-semibold shadow border border-transparent transition-all duration-150 min-w-[100px] ${
                !showCreate 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                  : 'bg-[#21262D] text-gray-400 hover:bg-[#30363D] border-gray-700'
              }`}
            >
              Add Task
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className={`px-6 py-2 rounded-lg font-semibold shadow border border-transparent transition-all duration-150 min-w-[100px] ${
                showCreate 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                  : 'bg-[#21262D] text-gray-400 hover:bg-[#30363D] border-gray-700'
              }`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        {showCreate && (
          <div className="bg-[#0D1117] rounded-lg border border-gray-800/50 mb-6 p-6">
            <CreateTask modelId={modelId} onTaskCreated={handleTaskCreated} />
          </div>
        )}

        {!showCreate && !selectedTaskId && tasks.length === 0 && (
          <div className="flex items-center justify-center h-full text-center">
            <div className="rounded-lg border border-gray-800/50 px-8 py-6">
              <p className="text-gray-400 text-lg">No tasks assigned yet.</p>
            </div>
          </div>
        )}

        {!showCreate && !selectedTaskId && tasks.length > 0 && (
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th className="sticky top-0 py-3 px-4 first:rounded-tl last:rounded-tr font-medium text-left text-gray-400 bg-[#0D1117] border-b border-gray-800/50">Number</th>
                  <th className="sticky top-0 py-3 px-4 font-medium text-left text-gray-400 bg-[#0D1117] border-b border-gray-800/50">Category</th>
                  <th className="sticky top-0 py-3 px-4 font-medium text-left text-gray-400 bg-[#0D1117] border-b border-gray-800/50">Priority</th>
                  <th className="sticky top-0 py-3 px-4 font-medium text-left text-gray-400 bg-[#0D1117] border-b border-gray-800/50">Status</th>
                  <th className="sticky top-0 py-3 px-4 font-medium text-left text-gray-400 bg-[#0D1117] border-b border-gray-800/50">Short Description</th>
                  <th className="sticky top-0 py-3 px-4 font-medium text-left text-gray-400 bg-[#0D1117] border-b border-gray-800/50">Assigned To</th>
                  <th className="sticky top-0 py-3 px-4 font-medium text-left text-gray-400 bg-[#0D1117] border-b border-gray-800/50">Opened</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    onClick={() => setSelectedTaskId(task._id)}
                    className="group hover:bg-[#1C2128] cursor-pointer"
                  >
                    <td className="py-[10px] px-4 first:rounded-l last:rounded-r border-b border-gray-800">
                      <a href="#" className="text-blue-500 hover:text-blue-400 font-medium hover:underline">{task.number}</a>
                    </td>
                    <td className="py-[10px] px-4 border-b border-gray-800">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#21262D] text-gray-300">
                        {task.category}
                      </span>
                    </td>
                    <td className="py-[10px] px-4 border-b border-gray-800">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 1 ? 'bg-red-900/30 text-red-400' :
                        task.priority === 2 ? 'bg-orange-900/30 text-orange-400' :
                        task.priority === 3 ? 'bg-yellow-900/30 text-yellow-400' :
                        'bg-[#21262D] text-gray-400'
                      }`}>
                      {{
                        1: "1 - Urgency",
                        2: "2 - High",
                        3: "3 - Medium",
                        4: "4 - Low",
                        5: "5 - Planning",
                      }[task.priority]}
                      </span>
                    </td>
                    <td className="py-[10px] px-4 border-b border-gray-800">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.status === "In Progress" ? "bg-yellow-900/30 text-yellow-400" :
                        task.status === "On Hold" ? "bg-red-900/30 text-red-400" :
                        task.status === "Resolved" ? "bg-green-900/30 text-green-400" :
                        "bg-[#21262D] text-gray-400"
                      }`}>
                        <span className="h-2 w-2 rounded-full bg-current"></span>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-[10px] px-4 border-b border-gray-800 text-gray-200">{task.shortDescription}</td>
                    <td className="py-[10px] px-4 border-b border-gray-800">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#21262D] text-xs font-medium text-gray-300">
                          {task.assignedTo?.fullName?.charAt(0) || '?'}
                        </span>
                        <span className="text-gray-400">{task.assignedTo?.fullName || "(empty)"}</span>
                      </div>
                    </td>
                    <td className="py-[10px] px-4 border-b border-gray-800 text-gray-500">
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
          <div className="bg-[#0D1117] rounded-lg border border-gray-800/50 p-6">
            <div className="relative">
              <button
                onClick={() => setSelectedTaskId(null)}
                className="absolute top-0 right-0 px-4 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
              >
                Close
              </button>
              <TaskDetails taskId={selectedTaskId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
