import React, { useContext, useEffect } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

function Listings() {

  const {
    properties,
    loading,
    error,
    filters,
    updateFilters,
    fetchListingProperties,
    currentPage,
    totalCount,
    limit,
  } = useContext(PropertyContext);

  const navigate = useNavigate();

  // 🔹 INITIAL LOAD
  useEffect(() => {
    fetchListingProperties(1);
  }, []);

  // 🔹 HANDLE FILTER CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value });
  };

  // 🔹 SEARCH BUTTON
  const handleSearch = () => {
    fetchListingProperties(1, filters);
  };

  // 🔹 PAGINATION
  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (page) => {
    fetchListingProperties(page, filters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* 🔥 HEADER */}
      <h1 className="text-2xl font-semibold mb-6">Find Property</h1>

      {/* 🔍 FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-6 gap-4">

        <input
          type="text"
          name="search"
          placeholder="Search (title / city)"
          value={filters.search}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Type</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="industrial">Industrial</option>
          <option value="agricultural">Agricultural</option>
        </select>

        <input
          type="number"
          name="min_price"
          placeholder="Min Price"
          value={filters.min_price}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="max_price"
          placeholder="Max Price"
          value={filters.max_price}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-black text-white rounded px-4 py-2"
        >
          Search
        </button>
      </div>

      {/* 🔄 STATES */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* 🏠 PROPERTY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            {/* Image */}
            <div className="h-52">
              <img
                src={
                  property.primary_image
                    ? BASE_URL + property.primary_image
                    : "https://via.placeholder.com/400"
                }
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">

              {/* Location */}
              <p className="text-sm text-gray-600">
                📍 {property.city}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 text-sm">
                {property.features?.slice(0, 3).map((f, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded">
                    {f.key}: {f.value}
                  </span>
                ))}
              </div>

              {/* Bottom */}
              <div className="flex justify-between items-center">

                <button
                  onClick={() =>
                    navigate(`/property/${property.slug}`)
                  }
                  className="bg-black text-white px-3 py-2 rounded text-sm"
                >
                  View Details
                </button>

                <p className="font-bold">
                  Rs. {property.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔢 PAGINATION */}
      <div className="flex justify-center mt-10 gap-2">

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded border ${currentPage === page
                ? "bg-black text-white"
                : "bg-white"
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Listings