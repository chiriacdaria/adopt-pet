import React, { useState } from 'react';
import NavHeader from './NavHeader'; // Navbar
import SidebarNavigation from './SidebarNavigation'; // Sidebar
import { Select } from 'antd';
import { animalOptions } from './animalOptions'; // Adjust path as necessary
import {useNavigate} from 'react-router-dom';

const { Option } = Select;

const AddPet = () => {
  const [petName, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [petType, setPetType] = useState('');
  const [petDescription, setPetDescription] = useState('');
  const sortedAnimalOptions = animalOptions.sort((a, b) => a.label.localeCompare(b.label));
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the user ID from the authentication token stored in localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    // Decode the JWT token to extract the userId
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the payload
    const userId = decodedToken.userId;

    const newPet = {
      name: petName,
      gender: gender,
      age: age,
      type: petType,
      description: petDescription,
      registrationDate: new Date(),
      addedAt: new Date(),
      adoptedAt: null,
      userId: userId, // Use the logged-in user's ID
    };

    try {
      const response = await fetch('http://localhost:5001/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPet),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Failed to add pet:', errorDetails);
        alert('Failed to add pet');
      } else {
        const addedPet = await response.json();
        alert('Pet added successfully!');
        navigate('/adopt-a-friend')
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding pet');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Add Navbar */}
      <NavHeader />

      {/* Main Content with Sidebar */}
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        {/* Sidebar Navigation */}
        <SidebarNavigation userEmail={userEmail} />

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
  Post a Pet for Adoption 📣
</h2>
<p style={{ textAlign: 'center', color: '#555', marginBottom: '18px' }}>
  Every pet deserves a loving home. Share your pet for adoption and help them find a cozy, welcoming family. 🐾🐕‍🦺🚶‍♀️
</p>

          <div style={{ padding: '16px', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label>Name</label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Pet's Name"
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Gender</label>
                <Select
                  value={gender}
                  onChange={(value) => setGender(value)}
                  placeholder="Select Gender"
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                  }}
                  dropdownStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="not_sure">Not Sure</Option>
                </Select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Pet's Age"
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Type</label>
                <Select
                  value={petType}
                  onChange={(value) => setPetType(value)}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                  }}
                  dropdownStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {sortedAnimalOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Description</label>
                <textarea
                  value={petDescription}
                  onChange={(e) => setPetDescription(e.target.value)}
                  placeholder="Pet's Description"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    fontSize: '16px',
                    height: '100px',
                    resize: 'vertical',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{ width: '100%', padding: '10px', backgroundColor: '#213555', color: 'white', borderRadius: '8px', cursor: 'pointer' }}
              >
                Add Pet
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPet;
