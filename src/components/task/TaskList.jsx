import { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";
import TaskDetails from "./TaskDetails";


const TaskList = ({ modelId }) => {
  const [tasks, setTasks] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  const user = JSON.parse(localStorage.getItem("auth"));
  const token = user.token

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/tasks/my-tasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const modelTasks = res.data.filter((task) => task.assignedTo?._id === modelId);
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
    <div className="text-white">
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

      <div className="mt-4 space-y-3">
        {!selectedTaskId ? 
        tasks.length === 0 ? (
          <p className="text-gray-400">No tasks assigned yet.</p>
        ) : (
          tasks.map((task) => (
            <div  onClick={() => setSelectedTaskId(task._id)}
              key={task._id}
              className="bg-gray-800 p-4 rounded shadow-sm border border-gray-700"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-lg">#{task.number}</p>
                  <p className="text-sm text-gray-400">{task.shortDescription}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      task.status === "In Progress"
                        ? "text-yellow-400"
                        : task.status === "Resolved"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {task.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Priority:{" "}
                    {
                      {
                        1: "Urgency",
                        2: "High",
                        3: "Medium",
                        4: "Low",
                      }[task.priority]
                    }
                  </p>
                </div>
              </div>
            </div>
          ))
        ):(<>
  <div className="relative bg-gray-800 rounded p-6 shadow-md">
    {/* Close Button - Top Right */}
    <button
      onClick={() => setSelectedTaskId(null)}
      className="absolute top-3 right-3 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      Close
    </button>

    <TaskDetails taskId={selectedTaskId} />
  </div>
</>)
        }
        
      </div>

      <div className="w-1/2 p-4">
      </div>
    </div>
  );
};

export default TaskList;