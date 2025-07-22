import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateto = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true, 
        }
      );
      // console.log(res.data.token);
      toast.success("Signup successful!");
      localStorage.setItem("jwt",res.data.token)
      navigateto("/login");
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message);
    }
  };
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050e2d] to-[#030b1c] text-white px-4">
      <div className="bg-[#10192c] bg-opacity-40 backdrop-blur-md p-10 rounded-xl shadow-lg w-full max-w-md border border-white/10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center">
          Stellar Tasks
        </h1>
        <p className="text-center text-blue-300 mt-2 mb-6 text-sm">
          Join our cosmic community
        </p>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm font-medium block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="CosmicExplorer"
            className="w-full px-4 py-3 rounded-md bg-[#1e293b] bg-opacity-60 border border-white/10 text-white focus:outline-none placeholder:text-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Sign Up Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 py-3 rounded-lg font-semibold transition"
        >
          Create Account
        </button>

        {/* Login Redirect */}
        <p className="text-sm mt-4 text-center text-cyan-400">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-blue-400">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
