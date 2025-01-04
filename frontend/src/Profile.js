// frontend/src/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Profile</h1>
          <div>
            <button
              onClick={() => navigate('/home')}
              className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 mr-4"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="p-8">
        <h2 className="text-xl font-bold">User Profile</h2>
        <p>This is a placeholder for the user's profile information.</p>
      </div>
    </div>
  );
};

export default Profile;
