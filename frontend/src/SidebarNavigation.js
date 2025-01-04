import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarNavigation = ({ userEmail }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

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

      <div style={{marginTop: '10px'}}>
          <button
          onClick={() => handleNavigation('/adopt-a-friend')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: activePath === '/adopt-a-friend' ? '#3E5879' : '#213555',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
         All Pets
        </button>
        <button
          onClick={() => handleNavigation('/add-pet')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: activePath === '/add-pet' ? '#3E5879' : '#213555',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
          Add a New Pet
        </button>

        <button
          onClick={() => handleNavigation('/adoption-history')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: activePath === '/adoption-history' ? '#3E5879' : '#213555',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
          View Adoption History
        </button>

        <button
          onClick={() => handleNavigation('/favorites')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: activePath === '/favorites' ? '#3E5879' : '#213555',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
          Favorites
        </button>

        <button
          onClick={() => handleNavigation('/homeless-animals')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: activePath === '/homeless-animals' ? '#3E5879' : '#213555',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
          Homeless Animals
        </button>
         <button
          onClick={() => handleNavigation('/home')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: '#1b2331 ',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            cursor: 'pointer',
          }}
        >
         ⬅️ Back to Start Page
        </button>
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
            <p style={{ fontWeight: 'bold', margin: 0 }}>{userEmail}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarNavigation;
