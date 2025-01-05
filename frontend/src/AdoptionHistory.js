import React, { useState, useEffect } from 'react';
import NavHeader from './NavHeader';
import SidebarNavigation from './SidebarNavigation';
import AddPet from './AddPet';
import axios from 'axios'; // Import axios

const AdoptionHistory = () => {
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [adoptedAnimals, setAdoptedAnimals] = useState([]);
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
	
 const fetchAdoptedAnimals = async () => {
    const token = localStorage.getItem('authToken'); // Get auth token from localStorage

    if (!token) {
      setError('You need to be logged in to see your adoption history.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5001/api/animals-adoption-history', {
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in Authorization header
        },
      });

      setAdoptedAnimals(response.data); // Set the adopted animals to state
      //setLoading(false);
    } catch (error) {
      //setError(error.response?.data?.message || 'Failed to fetch adoption history.');
			//setLoading(false);
			console.log(error)
    }
  };
	useEffect(() => {
				fetchCurrentUser();
    fetchAdoptedAnimals(); // Fetch adoption history when the component mounts
  }, []);

  const handleAddPet = (newPet) => {
    console.log('New pet added:', newPet); // Placeholder for logic to add the pet
    setIsAddingPet(false); // Close the form after adding the pet
  };

  const showAddPetForm = () => {
    setIsAddingPet(true); // Show the AddPet form
  };

  const goBack = () => {
    setIsAddingPet(false); // Hide the AddPet form
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Add Navbar */}
      <NavHeader />

      {/* Main Content with Sidebar */}
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        {/* Sidebar Navigation */}
        <SidebarNavigation
          userEmail={userEmail}
          isAddingPet={isAddingPet}
          showAddPetForm={showAddPetForm}
          goBack={goBack}
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
          {isAddingPet ? (
            // AddPet Form
            <AddPet onAddPet={handleAddPet} />
          ) : (
            // Adoption History
            <>
             <h2 style={{  textAlign: 'center', fontSize: '16px', color: '#2d3748', marginBottom: '8px', fontWeight: '600' }}>
           Adoption History 🏘❤️‍🩹 
          </h2> 
								<p style={{textAlign: 'center',color: '#555'}}>
                Here, you can see a list of all the pets you've adopted! 💞
              </p>

              {/* Adoption history items */}
              <div
                style={{
                  marginTop: '20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px',
                }}
              >
                {adoptedAnimals.length > 0 ? (
                  adoptedAnimals.map((animal) => (
                    <div
                      key={animal.id}
                      style={{
                        backgroundColor: '#ffffff',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <h3 style={{ color: '#213555' ,fontWeight: '600', fontSize: '16px'}}> 🏠 {animal.name}</h3>
<p style={{ color: '#555' }}>
                        Description: {animal.description ? animal.description : <span style={{ color: '#888' }}>No description available</span>}
                      </p>                      <p style={{ color: '#888' }}>
                        Adopted on: {animal.is_adopted ? new Date(animal.adopted_at).toLocaleDateString() : 'Not adopted yet'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', color: '#888' }}>
                    No adopted animals yet! Start your journey by adopting a friend.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptionHistory;
