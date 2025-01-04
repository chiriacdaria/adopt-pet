import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavHeader from './NavHeader';
import AddPet from './AddPet';
import AvailablePets from './AvailablePets';
import SidebarNavigation from './SidebarNavigation'; // Import SidebarNavigation

const AdoptAFriend = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [pets, setPets] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if 'addPet' query param exists in the URL
  const isAddingPet = new URLSearchParams(location.search).has('addPet');

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('User not logged in');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in Authorization header
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Logged in user:', userData);
        setUserEmail(userData.email); // Set the user email in the state
      } else {
        console.error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleAddPet = (newPet) => {
    setPets([...pets, newPet]); // Add new pet to the pets list
    navigate('?'); // Reset query params after adding a pet
  };

  useEffect(() => {
    fetchCurrentUser(); // Fetch user data when the component mounts
  }, []);

  const showAddPetForm = () => {
    navigate('?addPet=true'); // Add query param to show AddPet form
  };

  const goBack = () => {
    navigate('?'); // Reset query params to go back to the pets list
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Integrate Navbar */}
      <NavHeader />

      {/* Main Content Container with 30%/70% Split */}
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        
        {/* Left Section (SidebarNavigation Component) */}
        <SidebarNavigation
          userEmail={userEmail}
          isAddingPet={isAddingPet}
          showAddPetForm={showAddPetForm}
          goBack={goBack}
        />

        {/* Right Section (70%) */}
        <div style={{
        flex: '0 0 70%',
        padding: '16px',
        backgroundColor: '#ffffff',
        overflowY: 'auto', // Make this section scrollable
        height: '100%', // Full height for proper scrolling
      }}>
          {/* Show AddPet component if query param is present */}
          {isAddingPet ? (
            <AddPet onAddPet={handleAddPet} />
          ) : (
            <AvailablePets pets={pets} /> // Show available pets when AddPet form is hidden
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptAFriend;
