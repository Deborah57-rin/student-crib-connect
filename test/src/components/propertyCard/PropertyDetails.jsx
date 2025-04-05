import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaBed, FaBath, FaMapMarkerAlt, FaHeart, FaShare, FaStar, FaCalendarAlt, FaUser, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {getPropertyDetials} from "../../APIs/userAPI"

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openedWindow, setOpenedWindow] = useState('details');

  useEffect(() => {
    // Fetch property details using the id from the URL
    const fetchPropertyDetails = async () => {
      try {
        const response = await getPropertyDetials(id);
        if (response.success) {
          setProperty(response.property);
        } else {
          console.error("No property details found");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Property Details...</h1>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-white rounded-full p-2 focus:outline-none"
              >
                <FaArrowLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-white rounded-full p-2 focus:outline-none"
              >
                <FaArrowRight size={20} className="text-gray-600" />
              </button>
            </>
          )}
          {/* Image indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-blue-600" : "bg-white"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Title and Address */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center text-gray-500 mt-2">
                  <FaMapMarkerAlt size={16} className="mr-1 text-cyan-600" />
                  <span>{property.address}</span>
                </div>
              </div>

              {/* Beds, Baths, and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-700">
                    <FaBed size={18} className="mr-1 text-cyan-600" />
                    <span>{property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaBath size={18} className="mr-1 text-cyan-600" />
                    <span>{property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-cyan-600">
                  ${property.price}/mo
                </div>
              </div>

              {/* Tabs for Details, Amenities, and Reviews */}
              <div className="pb-2">
                <div className="flex border-b border-gray-200">
                  <button 
                    onClick={() => setOpenedWindow('details')}
                  className={`py-2 px-4 font-medium  hover:opacity-80 focus:outline-none ${openedWindow === 'details' ? 'bg-cyan-600 text-white' : 'text-gray-700'}`}>
                    Details
                  </button>
                  <button 
                    onClick={() => setOpenedWindow('amenities')}
                    className={`py-2 px-4 font-medium  hover:opacity-80 focus:outline-none ${openedWindow === 'amenities' ? 'bg-cyan-600 text-white' : 'text-gray-700'}`}>
                    Amenities
                  </button>
                  <button 
                    onClick={() => setOpenedWindow('reviews')}
                    className={`py-2 px-4 font-medium  hover:opacity-80 focus:outline-none ${openedWindow === 'reviews' ? 'bg-cyan-600 text-white' : 'text-gray-700'}`}>
                    Reviews
                  </button>
                </div>
                {/* Details Tab */}
               {
                    openedWindow === 'details' && (
                         <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-900">About this Property</h2>
                  {
                    property.description.split('\n').map((line, index) => (
                      <p key={index} className="text-gray-700 mt-2">{line}</p>
                    ))
                  }
                </div>
                    )
               }

               {
                    openedWindow === 'amenities' && (
                            <div className="mt-4 w-full flex flex-wrap gap-2">
                                {
                                     property.amenities[0].split(',').map((amenity, index) => (
                                        <span key={index} className="m-2 px-2 py-1 border-[1px] rounded-md text-gray-600">{amenity}</span>
                                     ))
                                }

                            </div>
                    )
               }

               {
                    openedWindow === 'reviews' && (<div>No review yet</div>)
               }
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Book a Viewing */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Book a Viewing</h2>
              <div className="mb-4">
                <input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition">
                Reserve for Viewing
              </button>
            </div>

            {/* Property Owner */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Owner</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold">
                  {property?.ownerId?.firstName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  
                  <h3 className="font-semibold text-gray-900">{property?.ownerId?.firstName + "  "+property?.ownerId?.lastName}</h3>
                  <p className="text-sm text-gray-500">Property Owner</p>
                </div>
              </div>
              <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition">
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;