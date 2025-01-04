import React from 'react';
import NavHeader from './NavHeader';

const AdoptedAnimals = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Integrate Navbar */}
      <NavHeader />
      
      {/* Main Content */}
      <div style={{ padding: '24px' }}>
        <h1>Adopted Animals</h1>
        <p>Here are the animals that have already found their forever homes!</p>

        {/* Example: List of adopted pets */}
        <div style={{ marginTop: '16px' }}>
          <h3>Adopted Pets</h3>
          <ul>
            <li>Fluffy - Adopted on 12/01/2024</li>
            <li>Max - Adopted on 12/05/2024</li>
            <li>Bella - Adopted on 12/10/2024</li>
            {/* Add more adopted pets */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdoptedAnimals;
