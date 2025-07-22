import Home from "./pages/Home"
import Login from "./pages/Login"
import { Navigate, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import {Toaster} from "react-hot-toast"

function App() {
  const token = localStorage.getItem("jwt")
  return (
    <>
    
    <Routes>
      <Route path='/' element={token?<Home/> : <Navigate to={"/login"}/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signin' element={<Signin/>}/>
    </Routes> 
      
      <Toaster/>
    </>
  )
}

export default App
