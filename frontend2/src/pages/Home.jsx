import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const getTodos =async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/todolist/getTask");
        // console.log(response.data.list);
        setTodos(response.data.list);
        // console.log(todos);
        if(todos!==0){
          toast.success("task list");
        }
        
      } catch (error) {
        toast.error("error :failed to get todo list");
        console.log(error);
        // setError("error :failed to get todo list");
      }
    };
    getTodos();
  },[]);

  const addtask =async()=>{
    if (!newTodo) return;
    try {
      const response = await axios.post("http://localhost:5000/api/todolist/addTask",{
        task:newTodo,
        completed: false,
      });

      setTodos([...todos,response.data.newtask]);
      setNewTodo("");
      toast.success("task added successfully");
    } catch (error) {
      console.log(error);
      toast.error("failed to add task");
      
    }
  };

  const toggletask = async(id)=>{
    const todo= todos.find((t)=>t._id==id);
    try {
      const response =await axios.put(`http://localhost:5000/api/todolist/updateTask/${id}`,{
        ...todo,
        completed:!todo.completed
      })
      // console.log(response.data.update);
      setTodos(todos.map((t)=>t._id===id?response.data.update:t));
      toast.success("Status updated");
    } catch (error) {
      console.log(error);
      toast.error("failed to updated the task");
      
    }
  };

  const deleteTask = async (id)=>{
    try {
      await axios.delete(`http://localhost:5000/api/todolist/deleteTask/${id}`)
      setTodos(todos.filter((t)=>t._id!==id));
      toast.success("Task deleted");
    } catch (error) {
      console.log(error);
      toast.error("failed to delete the task");
      
    }
  };

  const completedCount = todos.filter((todo)=>todo.completed).length;
  // console.log(completedCount);
  return <>
      
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
               value={newTodo}
               onChange={(e) => setNewTodo(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && addtask()}
             />
             <button
               onClick={addtask}
               className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-5 py-3 rounded-lg transition-all"
             >
               Add
             </button>
           </div>
     
           {/* Conditional Content */}
           {todos.length === 0 ? (
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
               {todos.map((todo, index) => (
                 <div
                   key={todo._id || index}
                   className="flex items-center justify-between px-4 py-3 rounded-lg border border-blue-600 bg-gradient-to-r from-[#1a1c2e] to-[#16182c] text-cyan-200 hover:bg-[#1f2235] transition group"
                 >
                   <div
                     className="flex items-center gap-3 cursor-pointer"
                     onClick={() =>toggletask(todo._id)}
                   >
                     <div
                       className={`w-5 h-5 rounded-full border-2 ${
                         todo.completed
                           ? "border-blue-400 bg-blue-500"
                           : "border-cyan-400"
                       } flex items-center justify-center`}
                     >
                       {todo.completed && (
                         <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                       )}
                     </div>
                     <span
                       className={`text-lg ${
                         todo.completed ? "line-through text-gray-400" : ""
                       }`}
                     >
                       {todo.task}
                     </span>
                   </div>
                   <button
                     onClick={() => deleteTask(todo._id)}
                     className="text-blue-400 hover:text-red-400 transition"
                   >
                     delete
                      {/* <FaTrash /> */}
                   </button>
                 </div>
               ))}
             </div>
           )}
     
           {/* Footer */}
           <p className="mt-10 text-cyan-400 text-sm">
             Tasks completed: {completedCount} | Total tasks: {todos.length}
           </p>
         </div>
  </>;
};

export default Home;
