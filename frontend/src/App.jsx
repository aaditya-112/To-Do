import Navbar from "./components/Navbar"
import Home from "./pages/home"
import Login from "./pages/Login";
import Signup from "./pages/Signin";
import { Routes, Route } from "react-router-dom";


function App() {
 

  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signin" element={<Signup />} />
        </Routes>

    </>
  )   
}

export default App
