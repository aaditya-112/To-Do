import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState(""); // ✅ new
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/signup", {
        username, // ✅ send to backend
        email,
        password,
      });

      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1023] flex items-center justify-center px-4">
      <div className="bg-[#1f2235] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Sign Up
        </h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 rounded bg-[#2a2d47] text-white focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded bg-[#2a2d47] text-white focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded bg-[#2a2d47] text-white focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 py-3 rounded-lg font-semibold transition"
        >
          Sign Up
        </button>

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

export default Signup;
