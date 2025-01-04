import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavHeader from './NavHeader'; // Assuming you already have this
import SidebarNavigation from './SidebarNavigation'; // Sidebar Navigation component
import AdoptAnimalModal from './AdoptAnimalModal'; // Modal component

const Favorites = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [favorites, setFavorites] = useState([]); // This will store animal details
  const [selectedAnimal, setSelectedAnimal] = useState(null); // Selected animal for modal
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const navigate = useNavigate();

  // Fetch user data
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
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserEmail(userData.email); // Set the user email in the state
        fetchUserFavorites(userData.id); // Fetch the user's favorites
      } else {
        console.error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Fetch user's favorite pets and animal details
  const fetchUserFavorites = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/favorites/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const favoritePetsDetails = await Promise.all(
          data.map(async (favorite) => {
            const animalResponse = await fetch(`http://localhost:5001/api/animals/${favorite.animal_id}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              },
            });
            if (animalResponse.ok) {
              const animal = await animalResponse.json();
              return animal; // Return full animal details
            } else {
              console.error('Failed to fetch animal details');
            }
          })
        );
        setFavorites(favoritePetsDetails); // Set full favorite animals in the state
      } else {
        console.error('Failed to fetch favorites');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // Handle card click to open modal
  const handleCardClick = (animal) => {
    setSelectedAnimal(animal.animal);
    setIsModalVisible(true);
  };

  // Handle adoption logic
  const handleAdopt = () => {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    const adopted_at = new Date().toISOString();
    const userId = JSON.parse(atob(token.split('.')[1])).userId;

    fetch(`http://localhost:5001/api/animals/${selectedAnimal.id}`, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ adopted_at , adopter_id: userId, }),
    })
      .then((response) => {
        if (response.ok) {
          alert(`You have successfully adopted ${selectedAnimal.name}! 🎉`);
          setIsModalVisible(false);
          fetchCurrentUser(); // Refresh favorites
        } else {
          throw new Error('Adoption failed');
        }
      })
      .catch((error) => {
        console.error('Error during adoption:', error);
        alert('An error occurred. Please try again.');
      });
  };

  useEffect(() => {
    fetchCurrentUser(); // Fetch user data when the component mounts
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc', fontFamily: 'Arial, sans-serif' }}>
      {/* Integrate Navbar */}
      <NavHeader />

      {/* Main Content Container with 30%/70% Split */}
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        {/* Left Section (SidebarNavigation Component) */}
        <SidebarNavigation
          userEmail={userEmail}
          isAddingPet={false} // No pet form in Favorites
          showAddPetForm={() => navigate('?addPet=true')} // Adjust as needed
          goBack={() => navigate('/adopt-a-friend')} // Navigate back to AdoptAFriend page
        />

        {/* Right Section (70%) */}
        <div style={{ flex: '0 0 70%', padding: '32px', backgroundColor: '#ffffff', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '16px', color: '#2d3748', marginBottom: '12px', fontWeight: '600' }}>
            ❤️ Your Favorite Pets
          </h2>
          {/* Display the list of favorite animals */}
          {favorites.length === 0 ? (
            <p style={{ color: '#718096', fontSize: '1.2rem', fontStyle: 'italic' }}>No favorite pets found. 🐕🐈</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {favorites.map((animal) => (
                <div
                  key={animal.id}
                  onClick={() => handleCardClick(animal)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <h3 style={{ fontWeight: '600', fontSize: '18px', color: '#2d3748', marginBottom: '12px' }}>
                    🐾 {animal.animal.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#4a5568' }}>
                    <strong>Type:</strong> {animal.animal.type} ✨
                  </p>
                  <p style={{ fontSize: '14px', color: '#4a5568' }}>
                    <strong>Age:</strong> {animal.animal.age} years old 🎂
                  </p>
                  <p style={{ fontSize: '14px', color: '#4a5568' }}>
                    <strong>Adopted:</strong> {animal.animal.is_adopted ? 'Yes' : 'No'} 📝
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for animal details/adoption */}
      <AdoptAnimalModal
        visible={isModalVisible}
        animal={selectedAnimal}
        onCancel={() => setIsModalVisible(false)}
        onAdopt={handleAdopt}
      />
    </div>
  );
};

export default Favorites;
