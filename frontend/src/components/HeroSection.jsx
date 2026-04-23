import React from "react";

function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] bg-gradient-to-r from-[#f8f5f2] to-[#f3ede7] flex items-center px-8 md:px-16 relative overflow-hidden">

      {/* Left Content */}
      <div className="w-full md:w-1/2 space-y-6 z-10">
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Find a perfect property <br />
          Where you'll love to live
        </h1>

        <p className="text-gray-600 text-lg max-w-md">
          We help businesses grow, organize and automate property
          management with smart solutions.
        </p>

        {/* Glass Search Box */}
        <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4">

          {/* Tabs */}
          <div className="flex gap-2 bg-white/40 p-1 rounded-xl">
            <button className="flex-1 py-2 rounded-lg bg-black text-white text-sm font-medium">
              Buy
            </button>
            <button className="flex-1 py-2 rounded-lg text-gray-700 hover:bg-white/50 transition">
              Sell
            </button>
            <button className="flex-1 py-2 rounded-lg text-gray-700 hover:bg-white/50 transition">
              Rent
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="City/Street"
              className="w-full px-4 py-3 rounded-lg bg-white/60 backdrop-blur-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="text"
              placeholder="Property Type"
              className="w-full px-4 py-3 rounded-lg bg-white/60 backdrop-blur-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="text"
              placeholder="Price Range"
              className="w-full px-4 py-3 rounded-lg bg-white/60 backdrop-blur-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Button */}
          <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
            Search
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:flex w-1/2 justify-end relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="house"
          className="w-[500px] rounded-2xl shadow-2xl"
        />

        {/* Glow Effect */}
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-400/20 blur-3xl rounded-full"></div>
      </div>

    </section>
  );
}

export default HeroSection;