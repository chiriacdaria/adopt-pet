import React, { useState } from 'react';
import NavHeader from './NavHeader';
import { Card, Col, Row, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const animalCategories = [
  { 
    name: 'Dogs', 
    description: 'Loyal and loving companions, perfect for your home.',
    importance: 'Dogs are great for families and individuals alike. They provide companionship, emotional support, and security.',
    emoji:'🐕'
  },
  { 
    name: 'Cats', 
    description: 'Graceful and independent, the perfect cuddle buddies.',
    importance: 'Cats are low-maintenance and make wonderful pets for both young and older individuals. Their playful nature makes them great companions.',
      emoji: '🐈'
},
  { 
    name: 'Turtles', 
    description: 'Gentle and low-maintenance, great for quiet homes.',
    importance: 'Turtles are great for calm environments and require minimal care. They are perfect for individuals looking for a pet that doesn’t need constant attention.',
     emoji:'🐢'
 },
  { 
    name: 'Rabbits', 
    description: 'Adorable, loving and playful, perfect for small spaces.',
    importance: 'Rabbits are fun-loving, social animals. They can be litter trained and are great for people with small spaces.',
     emoji:'🐇'
 },
];

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null); // Track the selected animal for the modal
  const navigate = useNavigate();

  // Handle the modal visibility
  const showModal = (animal) => {
    setSelectedAnimal(animal);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Use the NavHeader component */}
      <NavHeader />

      {/* Welcome Section */}
      <div
        style={{
          backgroundColor: '#D8C4B6',
          color: 'white',
          textAlign: 'center',
          padding: '60px 20px',
          borderBottom: '5px solid #c2b0a3',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0 }}>Welcome to Adopt a Friend!</h1>
        <p style={{ fontSize: '18px', marginTop: '10px', maxWidth: '600px', margin: '10px auto' }}>
          Bring unconditional love and companionship into your life by adopting a pet today. 🐾
        </p>
        <Button
          type="primary"
          onClick={() => navigate('/adopt-a-friend')}
          size="large"
          style={{
            backgroundColor: '#ffffff',
            color: '#D8C4B6',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            padding: '10px 20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Start Your Adoption Journey
        </Button>
      </div>

      {/* Main Content Section */}
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
          Choose Your New Best Friend
        </h2>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#555', maxWidth: '600px', margin: '10px auto' }}>
          Explore a variety of adorable animals waiting to join your family. Whether you’re looking for a playful dog,
          a gentle rabbit, or a unique pet like a turtle, we have a friend for everyone!
        </p>

        {/* Animal Cards */}
        <Row gutter={[16, 16]} style={{ marginTop: '30px' }} justify="center">
          {animalCategories.map((animal) => (
            <Col xs={24} sm={12} md={8} lg={6} key={animal.name}>
              <Card
                title={animal.name}
                bordered={false}
                style={{
                  textAlign: 'center',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#ffffff',
                  padding: '20px',
                }}
                bodyStyle={{ padding: '10px' }}
              >
                <div
                  style={{
                    fontSize: '40px',
                    lineHeight: '50px',
                    marginBottom: '10px',
                    color: '#D8C4B6',
                  }}
                >
                  🐾
                </div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                  {animal.description}
                </p>
                <Button
                  type="primary"
                  onClick={() => showModal(animal)} // Show modal with the selected animal
                  style={{
                    backgroundColor: '#D8C4B6',
                    borderColor: '#D8C4B6',
                    borderRadius: '5px',
                    padding: '5px 20px',
                  }}
                >
                  View {animal.name}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '20px 10px',
          backgroundColor: '#333',
          color: 'white',
          fontSize: '14px',
        }}
      >
        © 2024 Adopt a Friend. All rights reserved.
      </footer>

      {/* Modal for animal information */}
      {selectedAnimal && (
       <Modal
  title={
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ fontSize: '24px', marginRight: '10px' }}>🐾</span>
      Why Adopt a {selectedAnimal.name}?
    </div>
  }
  visible={isModalVisible}
  onCancel={handleCancel}
  footer={null}
  width={600}
>
  <div style={{textAlign: 'center'}}>
    <span aria-label="animal" style={{fontSize:'30px'}}>{selectedAnimal.emoji}</span> 
    <p style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>
      {selectedAnimal.importance}
    </p>
  </div>
</Modal>

      )}
    </div>
  );
};

export default Home;
