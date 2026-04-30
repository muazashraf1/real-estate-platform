import React, { useContext, useEffect } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { useParams } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const PropertyDetail = () => {
  const {
    propertyDetail,
    fetchPropertyDetail,
    clearPropertyDetail,
    loading,
    error,
  } = useContext(PropertyContext);

  const { slug } = useParams();

  useEffect(() => {
    fetchPropertyDetail(slug);

    return () => {
      clearPropertyDetail(); // cleanup
    };
  }, [slug]);

  if (loading || !propertyDetail) {
    return <p className="text-center mt-10">Loading property...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* 🔥 IMAGE GALLERY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Main Image */}
        <div>
          <img
            src={BASE_URL + propertyDetail.images[0]?.image}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* Other Images */}
        <div className="grid grid-cols-2 gap-4">
          {propertyDetail.images.slice(1, 5).map((img, i) => (
            <img
              key={i}
              src={BASE_URL + img.image}
              className="w-full h-[190px] object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* 🔥 BASIC INFO */}
      <div className="mt-8 space-y-4">

        <h1 className="text-3xl font-semibold">
          {propertyDetail.title}
        </h1>

        <p className="text-gray-600">
          📍 {propertyDetail.address}, {propertyDetail.city}
        </p>

        <p className="text-2xl font-bold text-black">
          Rs. {propertyDetail.price}
        </p>
      </div>

      {/* 🔥 DESCRIPTION */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-600">
          {propertyDetail.description || "No description available"}
        </p>
      </div>

      {/* 🔥 FEATURES */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Features</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {propertyDetail.features?.length > 0 ? (
            propertyDetail.features.map((f, i) => (
              <div
                key={i}
                className="bg-gray-100 p-3 rounded-lg text-sm"
              >
                <strong>{f.key}</strong>: {f.value}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No features available</p>
          )}
        </div>
      </div>

      {/* 🔥 AGENT INFO */}
      <div className="mt-10 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Agent Information</h2>

        <p><strong>Name:</strong> {propertyDetail.agent?.username}</p>
        <p><strong>Email:</strong> {propertyDetail.agent?.email}</p>
      </div>

      {/* 🔥 VISIT REQUEST FORM */}
      <div className="mt-10 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Request a Visit</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Your Name"
            className="border px-3 py-2 rounded"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="border px-3 py-2 rounded"
          />

          <input
            type="date"
            className="border px-3 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border px-3 py-2 rounded"
          />

          <textarea
            placeholder="Message (optional)"
            className="border px-3 py-2 rounded md:col-span-2"
          />

          <button
            type="submit"
            className="bg-black text-white py-2 rounded md:col-span-2"
          >
            Submit Request
          </button>
        </form>
      </div>

    </div>
  );
};

export default PropertyDetail;