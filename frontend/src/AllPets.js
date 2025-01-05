import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Spin, Tooltip, Button, Modal, Input, Form, Select } from 'antd';
import { DeleteOutlined, HeartOutlined, HeartFilled, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import {animalOptions} from './animalOptions';
import AdoptAnimalModal from './AdoptAnimalModal'

const AllPets = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmAdopt, setIsConfirmAdopt] = useState(false); 
  const [isEditing,setIsEditing] = useState(false); 
  const [form] = Form.useForm();
  const sortedAnimalOptions = animalOptions.sort((a, b) => a.label.localeCompare(b.label));
  const [favoriteStatus, setFavoriteStatus] = useState({}); 

useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.userId); // Assuming userId is in the payload
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}, []); 

useEffect(() => {
  if (userId === null) {
    return;
  }

  axios.get('http://localhost:5001/api/animals', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  })
    .then((response) => {
      setAnimals(response.data.animals || []);
      console.log('cacacacca', response.data.animals)
      setLoading(false);
      response.data.animals.forEach(animal => {

        if (!userId) {
          console.error('User ID is not set');
          return;
        }

        console.log(animal.id, userId)
        // Check if this animal is a favorite for the user
        axios.post('http://localhost:5001/api/favorites/check-favorite', {
          userId,
          animalId: animal.id
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        })
          .then((res) => {
            console.log('request made');
            setFavoriteStatus(prevState => ({
              ...prevState,
              [animal.id]: res.data.isFavorite
            }));
          })
          .catch((error) => {
            console.error('Error checking favorite status:', error);
          });
      });
    })
    .catch((error) => {
      setLoading(false);
      console.error('Error fetching animals:', error.response || error.message);
    });
}, [userId]); 

  const handleDelete = (id) => {
    const token = localStorage.getItem('authToken');
    axios.delete(`http://localhost:5001/api/animals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setAnimals(animals.filter((animal) => animal.id !== id));
        alert('Pet deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting pet:', error.response || error.message);
        alert('Error deleting pet');
      });
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation(); 

    const token = localStorage.getItem('authToken');
    const userId = JSON.parse(atob(token.split('.')[1])).userId;

    if (favoriteStatus[id]) {
      // Animal is already a favorite, so we remove it
      axios.post('http://localhost:5001/api/favorites/remove-from-favorites', { userId, animalId: id }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setFavoriteStatus(prevState => ({
          ...prevState,
          [id]: false
        }));
      })
      .catch((error) => {
        console.error('Error removing from favorites:', error);
        alert('Error removing from favorites');
      });
    } else {
      console.log('adaug la fav')
      // Animal is not a favorite, so we add it
      axios.post('http://localhost:5001/api/favorites/add-to-favorites', { userId, animalId: id }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setFavoriteStatus(prevState => ({
          ...prevState,
          [id]: true
        }));
      })
      .catch((error) => {
        console.error('Error adding to favorites:', error);
        alert('Error adding to favorites');
      });
    }
  };

  const handleCardClick = (animal) => {
     console.log('Selected animal data:', animal);
    if (animal.userId !== userId) {
        setSelectedAnimal(animal);
        setIsModalVisible(true);
    }
  };

const handleAdopt = () => {
  const token = localStorage.getItem('authToken');
  const headers = { Authorization: `Bearer ${token}` };
  const adopted_at = new Date().toISOString();

  const userId = JSON.parse(atob(token.split('.')[1])).userId;

  console.log('adopter_id', userId);
  fetch(`http://localhost:5001/api/animals/${selectedAnimal.id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      adopted_at,
      adopter_id: userId,  // Pass the adopter_id
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert(`You have successfully adopted ${selectedAnimal.name}! 🎉`);

        // Update the animals state after successful adoption
        setAnimals((prevAnimals) =>
          prevAnimals.map((animal) =>
            animal.id === selectedAnimal.id
              ? { ...animal, is_adopted: true, adopted_at: adopted_at, adopter_id: userId }
              : animal
          )
        );
        setIsModalVisible(false);
      } else {
        throw new Error('Adoption failed');
      }
    })
    .catch((error) => {
      console.error('Error during adoption:', error);
      alert('An error occurred. Please try again.');
    });
};


  
  const handleCancelAdopt = () => {
    setIsConfirmAdopt(false); 
  };

  const handleEdit = (animal) => {
    setSelectedAnimal(animal);
    setIsEditing(true);
    form.setFieldsValue({
      name: animal.name,
      type: animal.type,
      age: animal.age,
    });
  };

  const handleSave = () => {
    const values = form.getFieldsValue();
    const token = localStorage.getItem('authToken');
    axios.put(`http://localhost:5001/api/animals/${selectedAnimal.id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAnimals(animals.map((animal) =>
          animal.id === selectedAnimal.id ? { ...animal, ...values } : animal
        ));
        setIsEditing(false);
        alert('Pet updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating pet:', error.response || error.message);
        alert('Error updating pet');
      });
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div >
      <h2 style={{  textAlign: 'center', fontSize: '16px', color: '#2d3748', marginBottom: '8px', fontWeight: '600' }}>
            All Pets 🐿
      </h2>
      <p style={{textAlign: 'center', color: '#555', marginBottom:'18px'}}>
        Here, you can view a list of all pets, both adopted and available for adoption. You can help them find a home!
      </p>

      <Row gutter={[16, 24]}>
        {animals.map((animal) => (
          <Col span={8} key={animal.id}>
          <Card
          hoverable
          style={{
            position: 'relative',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
          onClick={() => handleCardClick(animal)} // Open modal on card click
        >
          {/* Trash button only for animals added by the logged-in user */}
          {userId === animal.userId && (
            <Tooltip title="Delete this pet">
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '18px',
                  color: '#ff6f61',
                  border: 'none',
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the card from opening when clicking the trash button
                  handleDelete(animal.id); // Call the handleDelete function
                }}
              />
            </Tooltip>
          )}

          {/* Heart icon logic */}
          {userId !== animal.userId && (
            <Tooltip title={favoriteStatus[animal.id] ? 'Remove from Favorites' : 'Add to Favorites'}>
              {favoriteStatus[animal.id] ? (
                <HeartFilled
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    color: 'red',
                    zIndex: 1,
                  }}
                  onClick={(e) => toggleFavorite(e, animal.id)} // Prevent modal when clicking heart
                />
              ) : (
                <HeartOutlined
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    color: 'gray',
                    zIndex: 1,
                  }}
                  onClick={(e) => toggleFavorite(e, animal.id)} // Prevent modal when clicking heart
                />
              )}
            </Tooltip>
          )}

          <Card.Meta
            title={<div style={{ marginLeft: '10px', marginTop: '20px' }}><strong>{animal.name}</strong></div>}
            description={
              <div style={{ marginLeft: '10px', color: '#666' }}>
                {`${animal.type} - ${animal.age} years old`}
                <div style={{ marginTop: '10px', color: '#888' }}>
                  <strong>Added on:</strong> {new Date(animal.added_at).toLocaleDateString()}
                </div>
                  <div>
                 <strong>Adopted:</strong> {animal.is_adopted ? new Date(animal.adopted_at).toLocaleDateString() : 'Not adopted yet'}
                </div>
                <div>
                 <strong>Contact number:</strong> {animal.contact_number}
                </div>
                {userId === animal.userId ? (
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    style={{ padding: 0 }}
                    onClick={() => handleEdit(animal)} // Trigger edit
                  >
                    Edit animal info
                  </Button>
                ) : (
                  <div style={{ marginTop: '10px' }}>
                    <strong>Adopted:</strong>
                    {animal.is_adopted ? (
                      <span style={{ color: 'green' }}>
                        <> This pet got a 🏠 on {new Date(animal.adopted_at).toLocaleDateString()}! </>
                      </span>
                    ) : (
                      <span style={{ color: 'orange' }}>
                        <></> Not yet. Give it a home! ❤️
                      </span>
                    )}
                  </div>
                )}
              </div>
            }
          />
        </Card>

          </Col>
        ))}
      </Row>

        {/* Modal for showing animal details and adopt button */}
    <AdoptAnimalModal
        visible={isModalVisible}
        animal={selectedAnimal}
        onCancel={() => setIsModalVisible(false)}
        onAdopt={handleAdopt}
      />
      {/* Edit Form Modal */}
      <Modal
        title="Edit Animal Info"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {selectedAnimal && (
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the animal name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please select the type' }]}
            >
             <Select>
      {sortedAnimalOptions.map(option => (
        <Select.Option key={option.value} value={option.value} style={{padding: '4px '}}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: 'Please enter the age' }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AllPets;


