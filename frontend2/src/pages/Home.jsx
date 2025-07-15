import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const getTodos =async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/todolist/getTask");
        console.log(response.data.list);
        setTodos(response.data.list);
        console.log(todos);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("error :failed to get todo list");
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

      setTodos([...todos,response.data]);
      setNewTodo("");
    } catch (error) {
      console.log(error);
      setError("failed to add task")
    }
  };

  const toggletask = async(id)=>{
    const todo= todos.find((t)=>t._id==id);
    try {
      const response = axios.post(`http://localhost:5000/api/todolist/deleteTask/${id}`,{
        ...todo,
        completed:!todo.completed
      })
      setTodos(todos.map((t)=>t._id===id?response.data:t));
    } catch (error) {
      console.log(error);
      setError("failed updatetion")
    }
  };

  const deleteTask = async (id)=>{
    try {
      await axios.delete(`http://localhost:5000/api/todolist/deleteTask/${id}`)
      setTodos(todos.filter((t)=>t._id!==id));
    } catch (error) {
      console.log(error);
      setError("failed to delete task")
    }
  };
  return <>
     <h1>home</h1>
  </>;
};

export default Home;
