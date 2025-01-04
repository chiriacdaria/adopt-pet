import React, { useState, useEffect } from 'react';
import NavHeader from './NavHeader';
import SidebarNavigation from './SidebarNavigation';
import axios from 'axios'; // Assuming you're using axios for data fetching

const HomelessAnimals = () => {
  const [homelessAnimals, setHomelessAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
	const [userEmail, setUserEmail] = useState(null);

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
      } else {
        console.error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
	 };
	
  // Fetch homeless animals from your API
const fetchHomelessAnimals = async () => {
  const token = localStorage.getItem('authToken'); // Get auth token from localStorage

  if (!token) {
    setError('You need to be logged in to see homeless animals.');
    setLoading(false);
    return;
  }

  try {
    // Call the API to fetch homeless animals from other users
    const response = await axios.get('http://localhost:5001/api/animals/homeless', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    setHomelessAnimals(response.data); // Set the homeless animals to state
    setLoading(false);
  } catch (error) {
    setError('Failed to fetch homeless animals.');
    setLoading(false);
  }
};

	useEffect(() => {
		fetchCurrentUser();
    fetchHomelessAnimals(); // Fetch homeless animals when the component mounts
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Add Navbar */}
      <NavHeader />

      {/* Main Content with Sidebar */}
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        {/* Sidebar Navigation */}
        <SidebarNavigation
          userEmail={userEmail}
        />

        {/* Main Section */}
        <div
          style={{
            flex: '0 0 70%',
            padding: '20px',
            backgroundColor: '#ffffff',
            overflowY: 'auto', // Make the right side scrollable
          }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '16px', color: '#2d3748', marginBottom: '8px', fontWeight: '600' }}>
           Homeless Animals  🏚 💔
          </h2>
          <p style={{ textAlign: 'center', color: '#555' }}>
            Here are the animals that are currently waiting for a loving home. The animals you posted will not be available on this page.
          </p>

          {/* Handle loading, error, and display animals */}
          {loading ? (
            <p style={{ textAlign: 'center', color: '#888' }}>Loading homeless animals...</p>
          ) : error ? (
            <p style={{ textAlign: 'center', color: '#f44336' }}>{error}</p>
          ) : (
            <div
              style={{
                marginTop: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              {homelessAnimals.length > 0 ? (
                homelessAnimals.map((animal) => (
                  <div
                    key={animal.id}
                    style={{
                      backgroundColor: '#ffffff',
                      padding: '16px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <h3 style={{ color: '#213555', fontWeight: '600', fontSize: '16px' }}>
                      🐾 {animal.name}
                    </h3>
                    <p style={{ color: '#555' }}>
                      Description: {animal.description || <span style={{ color: '#888' }}>No description available</span>}
                    </p>
                    <p style={{ color: '#888' }}>Age: {animal.age} years</p>
                    <p style={{ color: '#888' }}>Location: {animal.location}</p>
                    <button
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#213555',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '10px',
                      }}
                      onClick={() => alert(`Interested in adopting ${animal.name}?`)}
                    >
                      Adopt Me
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#888' }}>
                  No homeless animals at the moment. Check back later!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomelessAnimals;
