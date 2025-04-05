import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock, FaPhone, FaImage } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { registerUser } from '../../APIs/userAPI';
import {notify} from "../../components/notify/Notify"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; // Adjust the import path as necessary
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student', // Default role
  });
  const {login} = useAuth(); // Assuming you have a login function in your Auth context
  const navigate = useNavigate(); // Hook to programmatically navigate


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
        const res = await registerUser(formData);
        if (res.success) {
            notify("Registration successful", "success");
            login(res.user)
            navigate('/', {replace: true}); // Redirect to home page after successful registration
        } else {
            notify("Registration failed", "error");
        }
        
    } catch (error) {
      console.error('Error during registration:', error);
      notify("Registration failed", "error");
      return;
        
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none ${
                errors.firstName ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none ${
                errors.lastName ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none ${
                errors.email ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none ${
                errors.password ? 'border-red-500' : 'focus:border-cyan-500'
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>


          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-cyan-500"
            >
                {
                    ['student', 'owner'].map((role, idx) => (
                        <option key={role} value={role} id={idx}>{role}</option>
                    ))
                }
            </select>
          </div>

    
         

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;