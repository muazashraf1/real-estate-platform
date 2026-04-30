import React, { useEffect, useState } from "react";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  // Mock API fetch
  useEffect(() => {
    const fetchData = async () => {
      // simulate API delay
      await new Promise((res) => setTimeout(res, 1000));

      const data = [
        {
          id: 1,
          title: "Modern Family House",
          address: "2861 62nd Ave, Oakland, CA 94605",
          price: 649900,
          beds: 3,
          baths: 1,
          sqft: 1032,
          type: "Family",
          image:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        },
        {
          id: 2,
          title: "Luxury Villa",
          address: "14 Beverly Hills, CA",
          price: 1250000,
          beds: 5,
          baths: 4,
          sqft: 4200,
          type: "Villa",
          image:
            "https://images.unsplash.com/photo-1613977257363-707ba9348227",
        },
        {
          id: 3,
          title: "City Apartment",
          address: "Downtown LA, CA",
          price: 450000,
          beds: 2,
          baths: 2,
          sqft: 900,
          type: "Apartment",
          image:
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        },
        {
          id: 4,
          title: "Beach House",
          address: "Miami Beach, FL",
          price: 980000,
          beds: 4,
          baths: 3,
          sqft: 2100,
          type: "Beach",
          image:
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
        },
        {
          id: 5,
          title: "Minimal Modern House",
          address: "Austin, TX",
          price: 720000,
          beds: 3,
          baths: 2,
          sqft: 1500,
          type: "Modern",
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        },
        {
          id: 6,
          title: "Glass House",
          address: "San Jose, CA",
          price: 870000,
          beds: 3,
          baths: 2,
          sqft: 1800,
          type: "Luxury",
          image:
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
        },
      ];

      setProperties(data);
    };

    fetchData();
  }, []);

  return (
    <div className="px-6 md:px-16 py-12 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Featured Properties</h2>
          <div className="flex gap-6 mt-3 text-gray-500 text-sm">
            <span className="text-black font-medium border-b-2 border-black">
              Resident Property
            </span>
            <span>Commercial Property</span>
            <span>Industrial Property</span>
            <span>Agriculture Property</span>
          </div>
        </div>
        <button className="text-orange-500 font-medium">
          Explore All →
        </button>
      </div>

      {/* Cards */}
      {properties.length === 0 ? (
        <p>Loading properties...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={`${item.image}?auto=format&fit=crop&w=800&q=60`}
                alt={item.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-4">
                <p className="text-gray-500 text-sm mb-2">
                  📍 {item.address}
                </p>

                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>🛏 {item.beds} Bed</span>
                  <span>🛁 {item.baths} Bath</span>
                  <span>📐 {item.sqft} sqft</span>
                </div>

                <div className="flex justify-between items-center">
                  <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
                    View Details
                  </button>
                  <span className="font-bold text-lg">
                    ${item.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;