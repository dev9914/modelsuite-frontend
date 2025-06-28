import { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";
import TaskDetails from "./TaskDetails";

const TaskList = ({ modelId }) => {
  const [tasks, setTasks] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const user = JSON.parse(localStorage.getItem("auth"));
  const token = user.token;

  const fetchTasks = async () => {
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
      setTasks(modelTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [modelId]);

  const handleTaskCreated = () => {
    setShowCreate(false);
    fetchTasks();
  };

  return (
    <div className="text-white w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Tasks for this Model</h2>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {showCreate ? "Cancel" : "Add Task"}
        </button>
      </div>

      {showCreate && <CreateTask modelId={modelId} onTaskCreated={handleTaskCreated} />}

      {!showCreate && !selectedTaskId && (
        <>
          {tasks.length === 0 ? (
            <p className="text-gray-400">No tasks assigned yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-700 text-sm">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="p-2 border border-gray-700">Number</th>
                    <th className="p-2 border border-gray-700">Category</th>
                    <th className="p-2 border border-gray-700">Priority</th>
                    <th className="p-2 border border-gray-700">Status</th>
                    <th className="p-2 border border-gray-700">Short Description</th>
                    <th className="p-2 border border-gray-700">Assigned To</th>
                    <th className="p-2 border border-gray-700">Opened</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task._id}
                      onClick={() => setSelectedTaskId(task._id)}
                      className="hover:bg-gray-700 cursor-pointer"
                    >
                      <td className="p-2 border border-gray-700 text-blue-400 underline">
                        {task.number}
                      </td>
                      <td className="p-2 border border-gray-700">{task.category}</td>
                      <td className="p-2 border border-gray-700">
                        {{
                          1: "1 - Urgency",
                          2: "2 - High",
                          3: "3 - Medium",
                          4: "4 - Low",
                          5: "5 - Planning",
                        }[task.priority]}
                      </td>
                      <td className="p-2 border border-gray-700">
                        {{
                          "In Progress": "🟡 In Progress",
                          "On Hold": "🔴 On Hold",
                          "Resolved": "🟢 Resolved",
                        }[task.status] || task.status}
                      </td>
                      <td className="p-2 border border-gray-700">{task.shortDescription}</td>
                      <td className="p-2 border border-gray-700">{task.assignedTo?.fullName || "(empty)"}</td>
                      <td className="p-2 border border-gray-700">
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
        </>
      )}

      {selectedTaskId && (
        <div className="relative bg-gray-800 rounded p-6 shadow-md mt-6">
          <button
            onClick={() => setSelectedTaskId(null)}
            className="absolute top-3 right-3 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Close
          </button>
          <TaskDetails taskId={selectedTaskId} />
        </div>
      )}
    </div>
  );
};

export default TaskList;
