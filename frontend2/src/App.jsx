import Home from "./pages/Home"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import {Toaster} from "react-hot-toast"

function App() {
  
  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signin' element={<Signin/>}/>
    </Routes> 
      
      <Toaster/>
    </>
  )
}

export default App
