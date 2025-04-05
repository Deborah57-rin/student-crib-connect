import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthProvider'; // Adjust the import path as necessary
import {notify } from "../../components/notify/Notify"
import { loginUser } from '../../APIs/userAPI';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { IoReload } from "react-icons/io5";



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a successful login (replace with API call later)
   const userData = {
    email,
    password,
   }
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        login(response.user);
        notify("Login successful", "success");
        // Redirect to home page or dashboard after successful login
        navigate('/', {replace: true}); // Redirect to home page

        //console.log('Login successful:', response);
        // Redirect or perform any other actions after successful login
      } else {
        //console.error('Login failed');
        //notify("Login failed", "error");
        if(response.emailError){
          setEmailError(response.message);
          notify("Email not found", "error");
        }

        if(response.passwordError){
          setPasswordError(response.message);
          notify("Invalid password", "error");
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }finally{
      setLoading(false);
    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h2>
        <p className="text-center text-gray-600">Log in to manage your campus apartment.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-cyan-500"
            />
            {
              emailError && <span className="text-red-500 text-sm">{emailError}</span>
            }
          </div>
          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-cyan-500"
            />
            {
              passwordError && <span className="text-red-500 text-sm">{passwordError}</span>
            }
          </div>
          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {
              loading ? (
                <div className="flex items-center justify-center">
                  <IoReload className="animate-spin mr-2" />
                  Logging...
                </div>
              ) : (
                'Login'
              )
            }
          </button>
        </form>

        <div className="flex w-full items-center justify-between mt-4 text-gray-600">
        <Link to="/forgot-password" className="hover:underline text-[14px] w-fit">
          Forgot Password?

          </Link>

          <p className="text-[14px] text-gray-600 w-fit"><span>Don't have an account? </span> 
            <Link to={'/register'} className="text-cyan-600 hover:underline w-fit"> Sign Up</Link></p>
        </div>
       
      </div>
    </div>
  );
};

export default LoginPage;