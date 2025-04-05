import React, { useState } from 'react';
import { NavLinks } from '../../assets/constants';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; // Importing the useAuth hook to access authentication
import { Building } from 'lucide-react';

const Navbar = () => {
  const { user, isLoggedIn , logout} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  return (
    <div className="w-full flex justify-between items-center px-4 py-2 bg-white shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
              <Building size={24} />
              <span>Campus Crib Connect</span>
            </Link>

      {/* Hamburger Menu Button (Visible on Small Screens) */}
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Navigation Links (Hidden on Small Screens) */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:space-x-4 absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-10`}
      >
        {NavLinks.map((link, index) => {
          // Hide "Login" and "Register" links if the user is logged in
          if (( link.label === 'Register' || link.label === 'Login') && isLoggedIn) {
            return null;
          }

          if(link.label === 'create property') {
            if(user?.role === 'owner'){
              return (
                <Link
                  to={`/${link.path}`}
                  key={index}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition duration-300 md:inline-block"
                  onClick={() => setIsMenuOpen(false)} // Close menu after clicking a link
                >
                  {link.label}
                </Link>
              );
            }else{
              return null;
            }
          }



          return (
            <Link
              to={`/${link.path}`}
              key={index}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition duration-300 md:inline-block"
              onClick={() => setIsMenuOpen(false)} // Close menu after clicking a link
            >
              {link.label}
            </Link>
          );
        })}

        {/* Profile Section for Logged-In Users */}
        {isLoggedIn && (
          <div className="relative group">
            {/* Profile Image or Initials */}
            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold cursor-pointer">
              {user?.profileUrl ? (
                <img
                  src={user.profileUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                user?.firstName?.charAt(0).toUpperCase() // Display first letter of email as fallback
              )}
            </div>

            {/* Hover Dropdown Menu */}
            <div className="absolute w-fit top-full right-0 mt-0 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-700">Logged in as:</p>
                <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
                <button
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => {
                    // Add logout functionality here
                   // console.log('Logout clicked');
                   logout();
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;