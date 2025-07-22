import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  const navitageto = useNavigate();

  const handleLogin =async ()=>{
    try {
     const response = await axios.post("http://localhost:5000/api/user/login",{
        email,
        password
      },
        {
          withCredentials: true, 
        })
      // console.log(data.data.message);
      // console.log(response.data.token)
      toast.success(response.data.message);
      localStorage.setItem("jwt",response.data.token)
      navitageto("/")
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);

    }
  }

   return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050e2d] to-[#030b1c] text-white px-4">
      <div className="bg-[#10192c] bg-opacity-40 backdrop-blur-md p-10 rounded-xl shadow-lg w-full max-w-md border border-white/10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center">
          Stellar Tasks
        </h1>
        <p className="text-center text-blue-300 mt-2 mb-6 text-sm">
          Welcome back, traveler
        </p>

        {/* Email Input */}
        <div className="mb-4">
         <label className="text-sm font-medium block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-md bg-[#1e293b] bg-opacity-60 border border-white/10 text-white focus:outline-none placeholder:text-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="text-sm font-medium block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-md bg-[#1e293b] bg-opacity-60 border border-white/10 text-white focus:outline-none placeholder:text-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 py-3 rounded-lg font-semibold transition"
        >
          Log In
        </button>

        {/* Redirect to Signup */}
        <p className="text-sm mt-4 text-center text-cyan-400">
          Don't have an account?{" "}
          <Link to="/signin" className="underline hover:text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login
