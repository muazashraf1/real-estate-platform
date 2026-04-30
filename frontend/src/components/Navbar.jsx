import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-500">
          Relasto
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <li className="hover:text-orange-500 cursor-pointer transition">Home</li>
          <li className="hover:text-orange-500 cursor-pointer transition">Listing</li>
          <li className="hover:text-orange-500 cursor-pointer transition">Agents</li>
          <li className="hover:text-orange-500 cursor-pointer transition">Property</li>
          <li className="hover:text-orange-500 cursor-pointer transition">Blog</li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {/* Search */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Search size={18} />
          </button>

          {/* Login */}
          <button onClick={() => navigate('/login-page')} className="px-5 py-2 bg-black text-white rounded-lg hover:bg-orange-500 transition duration-300">
            Login
          </button>

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <p className="hover:text-orange-500 cursor-pointer">Home</p>
          <p className="hover:text-orange-500 cursor-pointer">Listing</p>
          <p className="hover:text-orange-500 cursor-pointer">Agents</p>
          <p className="hover:text-orange-500 cursor-pointer">Property</p>
          <p className="hover:text-orange-500 cursor-pointer">Blog</p>


          <button onClick={() => navigate('/login-page')} className="w-full bg-black text-white py-2 rounded-lg">
            Login
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;