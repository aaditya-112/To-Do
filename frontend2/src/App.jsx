import Home from "./pages/Home"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
function App() {
  
  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signin' element={<Signin/>}/>
    </Routes> 
      
    </>
  )
}

export default App
