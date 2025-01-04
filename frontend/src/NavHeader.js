// src/components/NavHeader.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavHeader = () => {
  const navigate = useNavigate();

  // State for hover effect for each button
  const [isHoveredAdoptFriend, setIsHoveredAdoptFriend] = useState(false);
  const [isHoveredAdoptedPets, setIsHoveredAdoptedPets] = useState(false);
  const [isHoveredLogout, setIsHoveredLogout] = useState(false);

	const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header
      style={{
        padding: '8px 16px', // Reduced padding for smaller header
        backgroundColor: '#213555', // Tailwind bg-blue-500
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {/* Left Side Welcome Text */}
      <div
        onClick={() => handleNavigate('/home')}
        style={{
          padding: '6px 16px',
          fontWeight: '700',
          color: 'white',
          backgroundColor: '#3E5879', // Different background for the welcome text
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px', // Adjust the font size if needed
        }}
      >
        Welcome to AdoptionHome
      </div>

      {/* Center Buttons */}
      <div style={{ display: 'flex', gap: '12px', flex: 1, justifyContent: 'center' }}>
        <button
          onClick={() => handleNavigate('/adopt-a-friend')}
          onMouseEnter={() => setIsHoveredAdoptFriend(true)}  
          onMouseLeave={() => setIsHoveredAdoptFriend(false)} 
          style={{
            padding: '6px 12px',
            fontWeight: '600',
            color: 'white',
            borderRadius: '8px',
            backgroundColor: isHoveredAdoptFriend ? '#3E5879' : '#213555', 
            cursor: 'pointer',
          }}
        >
          Adopt a Friend
        </button>
        <button
          onClick={() => handleNavigate('/adopted-pets')}
          onMouseEnter={() => setIsHoveredAdoptedPets(true)}  // Set hover state for Adopted Pets button
          onMouseLeave={() => setIsHoveredAdoptedPets(false)} // Reset hover state for Adopted Pets button
          style={{
            padding: '6px 12px',
            fontWeight: '600',
            color: 'white',
            borderRadius: '8px',
            backgroundColor: isHoveredAdoptedPets ? '#3E5879' : '#213555', // Change color on hover for this button
            cursor: 'pointer',
          }}
        >
          Adopted Pets
        </button>
      </div>

      {/* Right Side Logout Button */}
      <button
				onClick={() => {localStorage.removeItem('authToken');handleNavigate('/login')}}
        onMouseEnter={() => setIsHoveredLogout(true)}  // Set hover state for Logout button
        onMouseLeave={() => setIsHoveredLogout(false)} // Reset hover state for Logout button
        style={{
          padding: '6px 12px',
          fontWeight: '600',
          color: 'white',
          borderRadius: '8px',
          backgroundColor: isHoveredLogout ? '#3E5879' : '#213555', // Change color on hover for this button
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </header>
  );
};

export default NavHeader;
