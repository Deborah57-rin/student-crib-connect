import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchProperties } from "../../APIs/userAPI";

export function SearchBar({setProperties}) {
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedCount, setBedCount] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    // Construct the search query object
    const searchQuery = {
      location: query.trim(),
      priceRange,
      bedCount,
    };

    // Redirect to the search results page with query parameters
    const queryParams = new URLSearchParams();
    if (searchQuery.location) queryParams.append("location", searchQuery.location);
    if (searchQuery.priceRange) queryParams.append("priceRange", searchQuery.priceRange);
    if (searchQuery.bedCount) queryParams.append("bedCount", searchQuery.bedCount);

    //navigate(`/search?${queryParams.toString()}`);

    try {
      const response = await searchProperties(searchQuery);
      if (response.success) {
        setProperties(response.properties);
        // Optionally navigate to a different page or show results in the same page
        // navigate(`/search-results?${queryParams.toString()}`);
      } else {
        console.error("No properties found for the given search criteria.");
      }
      
    } catch (error) {
      console.error("Error fetching properties:", error);
      
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Location Input */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Location, property name, or address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Price Range Dropdown */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="relative">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">Price Range</option>
            <option value="any">Any Price</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000-1500">$1000 - $1500</option>
            <option value="1500+">$1500+</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Bed Count Dropdown */}
        <div className="relative">
          <select
            value={bedCount}
            onChange={(e) => setBedCount(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">Beds</option>
            <option value="any">Any</option>
            <option value="1">1+ Beds</option>
            <option value="2">2+ Beds</option>
            <option value="3">3+ Beds</option>
            <option value="4">4+ Beds</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="col-span-2 md:col-span-1 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </div>
  );
}