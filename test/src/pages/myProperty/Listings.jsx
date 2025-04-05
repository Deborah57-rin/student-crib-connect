import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOwnerProperties } from "../../APIs/userAPI";
import { PropertyGrid } from "../../components/propertyCard/PropertyGrid";
import { FaSpinner } from "react-icons/fa"; // Spinner icon
import { AiOutlineExclamationCircle } from "react-icons/ai"; // Warning icon
import { BsHouseFill } from "react-icons/bs"; // House icon

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const res = await getOwnerProperties(id);
        if (res.success) {
          setProperties(res.properties); // Directly set properties without spreading
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProperties();
  }, [id]);

  return (
    <section className="container mx-auto min-h-screen p-4">
      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen text-gray-700">
          <FaSpinner className="animate-spin text-4xl mb-4" />
          <h1 className="text-2xl font-bold text-center">Loading Properties...</h1>
        </div>
      ) : (
        <>
          {/* No Properties Found */}
          {properties.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-screen text-gray-700">
              <AiOutlineExclamationCircle className="text-6xl mb-4 text-yellow-500" />
              <h1 className="text-2xl font-bold text-center">No Properties Found</h1>
              <p className="text-center mt-2">
                It seems you haven't listed any properties yet.
              </p>
            </div>
          ) : (
            // Display Properties
            <div className="flex flex-col items-center">
              <h1 className="col-span-full text-2xl font-bold text-center mb-6 flex items-center justify-center">
                <BsHouseFill className="text-blue-500 mr-2" /> My Properties
              </h1>
              <PropertyGrid properties={properties} />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Listings;