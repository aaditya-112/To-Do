import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navitageto = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/user/logout", {
        withCredentials: true,
      });
      toast.success("logout successfully");
      localStorage.removeItem("jwt");
      navitageto("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <nav className="w-full bg-[#0b0e1c] text-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Stellar Tasks
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
