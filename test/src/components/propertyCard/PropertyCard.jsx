import React, { useState } from "react";
import { FaBed, FaBath, FaMapMarkerAlt, FaHeart, FaRegHeart, FaWifi, FaSnowflake, FaTshirt, FaCar, FaTree, FaShieldAlt, FaPaw, FaSwimmingPool, FaDumbbell, FaBook, FaArrowUp, FaWheelchair, FaFireExtinguisher, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Price formatter
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Amenity icon mapping
  const amenityIcons = {
    'WiFi': <FaWifi />,
    'Air Conditioning': <FaSnowflake />,
    'Laundry Service': <FaTshirt />,
    'Parking': <FaCar />,
    'Balcony': <FaTree />,
    'Security System': <FaShieldAlt />,
    'Pet Friendly': <FaPaw />,
    'Pool': <FaSwimmingPool />,
    'Gym Access': <FaDumbbell />,
    'Study Desk': <FaBook />,
    'Elevator': <FaArrowUp />,
    'Wheelchair Access': <FaWheelchair />,
    'Smoke Detectors': <FaFireExtinguisher />,
  };

  // Featured badge component
  const FeaturedBadge = () => (
    <div className="absolute top-2 left-2 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded">
      Featured
    </div>
  );

  return (
    <div className="overflow-hidden rounded-md border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link to={`/properties-details/${property._id}`} className="block no-underline">
        {/* Image Section */}
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={property.images[0]}
              alt={property.title}
              className="object-cover w-full h-full max-h-64 rounded-t-md"
            />
          </div>
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={20} />
            ) : (
              <FaRegHeart className="text-gray-600" size={20} />
            )}
          </button>
          {/* Featured Badge */}
          {property.featured && <FeaturedBadge />}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-4">
          {/* Address */}
          <div className="flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt size={14} className="mr-1 text-cyan-600" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 hover:text-cyan-600 transition-colors">
            {property.title}
          </h3>

          {/* Price */}
          <div className="text-lg font-bold text-cyan-600">
            {formatPrice(property.price)}/mo
          </div>

          {/* Beds & Baths */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <FaBed size={16} className="mr-1 text-cyan-600" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center">
              <FaBath size={16} className="mr-1 text-cyan-600" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 text-sm">
          {property.amenities[0].split(',').slice(0, 6).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-cyan-50 transition-colors duration-300"
            >
              <span className="mr-1 text-cyan-600">
                {amenityIcons[amenity] || <FaCheck />}
              </span>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
        </div>
      </Link>

      {/* Action Button */}
      <div className="flex justify-end p-4 pt-0">
        <Link to={`/property-details/${property._id}`}>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}