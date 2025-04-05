import React, { useState } from 'react';
import { FaHome, FaDollarSign, FaBed, FaBath, FaWifi, FaImage } from 'react-icons/fa';
import { ALL_AMENITIES } from '../../assets/data';
import { FaUpload } from "react-icons/fa6";
import { addProperty } from '../../APIs/userAPI';
import { notify } from '../../components/notify/Notify';
import {useAuth} from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const PropertyForm = () => {
    const {user} = useAuth();
  const [formData, setFormData] = useState({
    ownerId : user?._id || null,
    title: '',
    description: '',
    address: '',
    type: 'bedsitter',
    furnishing: 'furnished',
    amenities: [],
    price: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
  });

const navigate = useNavigate();
  const [amnities, setAmnities]= useState([])
  const [imagePreviews, setImagePreviews] = useState([]); // Array to store image preview URLs
  const [imageFiles, setImageFiles] = useState([]); // Array to store image
  const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const addAmenityField = (field) => {
    if(!amnities.includes(field)){
        setAmnities((prevData) => [...prevData, field]);
  };
}

const removeAmenityField = (field) => {
    setAmnities((prevData) => prevData.filter((item) => item !== field));
  }


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setImageFiles(files)

    // Generate image previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const removeImagePreview = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData((prevData) => ({ ...prevData, images: updatedFiles }));
    setImagePreviews(updatedPreviews);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Price must be a valid number';
    if (!formData.bedrooms || isNaN(formData.bedrooms)) newErrors.bedrooms = 'Bedrooms must be a valid number';
    if (!formData.bathrooms || isNaN(formData.bathrooms)) newErrors.bathrooms = 'Bathrooms must be a valid number';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    if(!user){
        navigate('/login', {replace: true});
    }
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    formData.amenities = amnities

    if(!formData.ownerId){
        formData.ownerId = user._id
    }
    setLoading(true)
    try {
        const res = await addProperty(formData, imageFiles);
        if (res.success) {
            notify("Property created successfully", "success")
           navigate('/', {replace: true});
        } else {
            notify("Property creation failed", "error")
        }
        
    } catch (error) {
      console.error('Error during form submission:', error);
      notify("Error during form submission", "error")
      return;
        
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl space-y-6 my-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create a New Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full h-auto p-4 rounded-lg shadow-md">
          {/* Title */}
          <div className="relative">
            <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none ${
                errors.title ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              name="description"
              placeholder="Property Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.description ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Address */}
          <div className="relative">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.address ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 mb-1">Property Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-cyan-500"
            >
              <option value="bedsitter">Bedsitter</option>
              <option value="1-bedroom">1-Bedroom</option>
              <option value="studio">Studio</option>
              <option value="shared-room">Shared Room</option>
            </select>
          </div>

          {/* Furnishing */}
          <div>
            <label className="block text-gray-700 mb-1">Furnishing</label>
            <select
              name="furnishing"
              value={formData.furnishing}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-cyan-500"
            >
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          </div>

         

          {/* Price */}
          <div className="relative">
            <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              name="price"
              placeholder="Price per Month"
              value={formData.price}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none ${
                errors.price ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
          </div>

          {/* Bedrooms */}
          <div className="relative">
            <FaBed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              name="bedrooms"
              placeholder="Number of Bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none ${
                errors.bedrooms ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.bedrooms && <p className="text-sm text-red-500 mt-1">{errors.bedrooms}</p>}
          </div>

          {/* Bathrooms */}
          <div className="relative">
            <FaBath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              name="bathrooms"
              placeholder="Number of Bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none ${
                errors.bathrooms ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.bathrooms && <p className="text-sm text-red-500 mt-1">{errors.bathrooms}</p>}
          </div>

          {/* Location */}
          <div className="relative">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.location ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
          </div>

          {/* Images */}
          <div>
            <label 
            htmlFor='image-upload'
            className="block text-gray-700 mb-1 w-full px-4 py-2 border-dashed border-[3px] rounded-md focus:outline-none focus:border-cyan-500 min-h-72 flex items-center justify-center cursor-pointer" ><FaUpload size={30}/></label>
            <input
            id='image-upload'
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className=" hidden"
            />
            

          


            <div className="mt-4 flex flex-wrap gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-32 h-32 object-cover rounded-md transition duration-300 transform hover:scale-105 cursor:pointer"
                  />
                  <button
                    type="button"
                    onClick={() => removeImagePreview(index)}
                    className="absolute top-1 w-6 h-6 flex items-center justify-center right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='w-full flex justify-between flex-wrap'>

            {
                ALL_AMENITIES.map((amenity, index) => (
                    <div key={index} className="w-fit flex items-center hover:bg-gray-100 cursor-pointer">
                        {/* <label className='cursor-pointer'>{amenity}</label> */}
                        {
                           amnities.includes(amenity) ? (
                            <div className='flex items-center justify-center gap-2 bg-blue-400 border rounded-md px-2 py-1 m-1'>
                                <label className='cursor-pointer text-white'>{amenity}</label>

                               <span
                               onClick={() => removeAmenityField(amenity)}
                                className="text-red-400 cursor-pointer">X</span>
                            </div>
                           ):(
                            <label
                            onClick={() => addAmenityField(amenity)}
                             className='cursor-pointer space-x-2 border rounded-md px-2 py-1 m-1'>{amenity}</label>
                           )
                        }
                    </div>
                ))
            }


          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition duration-300"
          >
            {
              loading? "creating property...":"Create Property"
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;