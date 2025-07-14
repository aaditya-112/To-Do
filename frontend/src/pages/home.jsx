import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/todolist/getTask"
        );

        if (response.status === 200) {
          const allTasks = response.data.list;

          // Convert backend format to frontend format
           const formatted = allTasks.map((t) => ({
          _id: t._id,              // ✅ Required for update/delete
          text: t.task,
          done: t.completed,
        }));

          setTasks(formatted);
        } else {
          console.error("Failed to load tasks:", response);
        }
      } catch (error) {
        console.error("API error while loading tasks:", error);
      }
    };

    fetchTasks();
  }, []);
  const addTask = async () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/todolist/addTask",
        {
          task: trimmedTask,
          completed: false,
        }
      );

      // Add to local state if backend adds successfully
      if (response.status === 200 || response.status === 201) {
        const savedTask = response.data.newtask; // contains _id, task, completed
        // console.log("Add response:", response.data)
        // Store _id and map completed → done
        setTasks([
        ...tasks,
        {
          _id: savedTask._id,         // ✅ MUST be here
          text: savedTask.task,
          done: savedTask.completed,
        },
        ]);
        setTask("");
      } else {
        console.error("Failed to add task:", response);
      }
    } catch (error) {
      console.error("API error while adding task:", error);
    }
  };

  const toggleTask = async (index) => {
    const selectedTask = tasks[index];
    const updatedCompleted = !selectedTask.done;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/todolist/updateTask/${selectedTask._id}`,
        {
          completed: updatedCompleted,
        }
      );

      if (response.status === 200) {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = updatedCompleted;
        setTasks(updatedTasks);
      } else {
        console.error("Failed to update task:", response);
      }
    } catch (error) {
      console.error("API error while updating task:", error);
    }
  };

  const deleteTask = async (index) => {
    const taskToDelete = tasks[index];

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todolist/deleteTask/${taskToDelete._id}`
      );

      if (response.status === 200) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
      } else {
        console.error("Failed to delete task:", response);
      }
    } catch (error) {
      console.error("API error while deleting task:", error);
    }
  };

  const completedCount = tasks.filter((task) => task.done).length;

  return (
    <div className="min-h-screen bg-[#0d1023] text-white flex flex-col items-center px-4 py-10 overflow-x-hidden">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Stellar Tasks
      </h1>
      <p className="text-blue-300 mt-2">
        Organize your universe one task at a time
      </p>

      {/* Input Field */}
      <div className="mt-8 w-full max-w-2xl flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a new cosmic task..."
          className="flex-grow bg-[#1f2235] text-cyan-200 placeholder-cyan-500 rounded-lg px-4 py-3 focus:outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          onClick={addTask}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-5 py-3 rounded-lg transition-all"
        >
          Add
        </button>
      </div>

      {/* Conditional Content */}
      {tasks.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <img
            src="ed2f006d-bcec-435d-950d-cc3035266b41.png"
            alt="astronaut"
            className="w-40 h-40 mb-4 rounded-full border-2 border-blue-600 p-2 bg-[#1b1e2e]"
          />
          <p className="text-cyan-300 text-lg">Your cosmic tasks are clear!</p>
        </div>
      ) : (
        <div className="mt-10 w-full max-w-2xl space-y-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 rounded-lg border border-blue-600 bg-gradient-to-r from-[#1a1c2e] to-[#16182c] text-cyan-200 hover:bg-[#1f2235] transition group"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleTask(index)}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    task.done
                      ? "border-blue-400 bg-blue-500"
                      : "border-cyan-400"
                  } flex items-center justify-center`}
                >
                  {task.done && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  )}
                </div>
                <span
                  className={`text-lg ${
                    task.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(index)}
                className="text-blue-400 hover:text-red-400 transition"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <p className="mt-10 text-cyan-400 text-sm">
        Tasks completed: {completedCount} | Total tasks: {tasks.length}
      </p>
    </div>
  );
};

export default Home;
