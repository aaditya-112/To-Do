import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    // Optional: Add logout logic here (clear token, redirect, etc.)
    console.log("User logged out");
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
