import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails, updateUserDetails } from "../../APIs/userAPI";
import { FaEdit } from "react-icons/fa"; // Edit icon
import { MdSave } from "react-icons/md"; // Save icon
import { AiOutlineClose } from "react-icons/ai"; // Close icon

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState(null); // Tracks which field is being edited
  const [updatedValue, setUpdatedValue] = useState(""); // Temporarily holds the updated value
  const [profileImage, setProfileImage] = useState(null); // Holds the new profile image file
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getUserDetails(id);
        if (res.success) {
          setUser(res.user);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleEdit = (field) => {
    setEditField(field);
    setUpdatedValue(user[field] || ""); // Pre-fill with current value
  };

  const handleSave = async (field) => {
    try {
      const updatedData = { [field]: updatedValue };
      const res = await updateUserDetails(id, updatedData);
      if (res.success) {
        setUser((prev) => ({ ...prev, [field]: updatedValue }));
        setEditField(null);
        setError(null);
      } else {
        setError(res.message || "Failed to update details.");
      }
    } catch (err) {
      console.error("Error updating user details:", err);
      setError("An error occurred while saving changes.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;

    const formData = new FormData();
    formData.append("profileUrl", profileImage);

    try {
      const res = await updateUserDetails(id, formData, true); // Pass `true` to indicate file upload
      if (res.success) {
        setUser((prev) => ({ ...prev, profileUrl: res.profileUrl }));
        setProfileImage(null);
        setError(null);
      } else {
        setError(res.message || "Failed to upload profile image.");
      }
    } catch (err) {
      console.error("Error uploading profile image:", err);
      setError("An error occurred while uploading the image.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaEdit className="animate-spin text-4xl text-gray-500" />
        <h1 className="text-xl font-bold ml-2">Loading Profile...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-700">
        <AiOutlineExclamationCircle className="text-6xl mb-4 text-yellow-500" />
        <h1 className="text-2xl font-bold">User Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.profileUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
          <button
            onClick={handleImageUpload}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Upload Image
          </button>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          {/* First Name */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold">First Name:</span>
            {editField === "firstName" ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <MdSave
                  onClick={() => handleSave("firstName")}
                  className="text-green-500 cursor-pointer"
                />
                <AiOutlineClose
                  onClick={() => setEditField(null)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{user.firstName}</span>
                <FaEdit
                  onClick={() => handleEdit("firstName")}
                  className="text-blue-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Last Name */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Last Name:</span>
            {editField === "lastName" ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <MdSave
                  onClick={() => handleSave("lastName")}
                  className="text-green-500 cursor-pointer"
                />
                <AiOutlineClose
                  onClick={() => setEditField(null)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{user.lastName}</span>
                <FaEdit
                  onClick={() => handleEdit("lastName")}
                  className="text-blue-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Username */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Username:</span>
            {editField === "username" ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <MdSave
                  onClick={() => handleSave("username")}
                  className="text-green-500 cursor-pointer"
                />
                <AiOutlineClose
                  onClick={() => setEditField(null)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{user.username || "Not set"}</span>
                <FaEdit
                  onClick={() => handleEdit("username")}
                  className="text-blue-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Phone Number:</span>
            {editField === "phoneNumber" ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <MdSave
                  onClick={() => handleSave("phoneNumber")}
                  className="text-green-500 cursor-pointer"
                />
                <AiOutlineClose
                  onClick={() => setEditField(null)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{user.phoneNumber || "Not set"}</span>
                <FaEdit
                  onClick={() => handleEdit("phoneNumber")}
                  className="text-blue-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;