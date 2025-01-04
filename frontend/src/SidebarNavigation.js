import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarNavigation = ({ userEmail, isAddingPet, showAddPetForm, goBack }) => {
  const navigate = useNavigate();
  const location = useLocation();  // Get the current location (URL)
  const [isAdoptionHistoryActive, setIsAdoptionHistoryActive] = useState(false);
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);
  const [isHomelessAnimalsActive, setisHomelessAnimalsActive] = useState(false);  // New state for Unadopted Animals

  useEffect(() => {
    // Check if the current page is Adoption History
    if (location.pathname === '/adoption-history') {
      setIsAdoptionHistoryActive(true);
    } else {
      setIsAdoptionHistoryActive(false);
    }

    // Check if the current page is Favorites
    if (location.pathname === '/favorites') {
      setIsFavoritesActive(true);
    } else {
      setIsFavoritesActive(false);
    }

    // Check if the current page is Unadopted Animals
    if (location.pathname === '/homeless-animals') {
      setisHomelessAnimalsActive(true);
    } else {
      setisHomelessAnimalsActive(false);
    }
  }, [location.pathname]);

  return (
    <div style={{ flex: '0 0 30%', padding: '16px', backgroundColor: '#e0f7fa', display: 'flex', flexDirection: 'column' }}>
      <input
        type="text"
        placeholder="Search for a pet..."
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />

      <div style={{ marginTop: '10px' }}>
        <button
          onClick={showAddPetForm}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: isAddingPet ? '#3E5879' : '#213555',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
          Add a New Pet
        </button>

        <button
          onClick={() => navigate('/adoption-history')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: isAdoptionHistoryActive ? '#3E5879' : '#213555', // Active background for the current page
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
          View Adoption History
        </button>

        <button
          onClick={() => navigate('/favorites')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: isFavoritesActive ? '#3E5879' : '#213555', // Active background for the current page
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
          Favorites
        </button>

        {/* New Homeless Animals Button */}
        <button
          onClick={() => navigate('/homeless-animals')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: isHomelessAnimalsActive ? '#3E5879' : '#213555', // Active background for the current page
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
          Homeless Animals
        </button>

        {(isAddingPet || isAdoptionHistoryActive || isFavoritesActive || isHomelessAnimalsActive) && (
          <button
            onClick={() => navigate('/adopt-a-friend')} // Navigate back to Adopt a Friend
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              backgroundColor: '#6b7280',
              color: 'white',
              borderRadius: '8px',
              marginTop: '8px',
              cursor: 'pointer',
            }}
          >
            Back
          </button>
        )}
      </div>

      {userEmail && (
        <div
          style={{
            marginTop: 'auto',
            padding: '10px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            textAlign: 'left',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#213555',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '16px',
                marginRight: '10px',
              }}
            >
              {userEmail[0].toUpperCase()}
            </div>
            <p style={{ fontWeight: 'bold', margin: 0 }}>
              {userEmail}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarNavigation;
