import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const AdoptAnimalModal = ({ 
  visible, 
  animal, 
  onCancel, 
  onAdopt 
}) => {
  const [isConfirmAdopt, setIsConfirmAdopt] = useState(false);

  if (!animal) return null;

  const handleAdoptClick = () => {
    if (!isConfirmAdopt) {
      setIsConfirmAdopt(true);
    } else {
      onAdopt();
    }
  };

  return (
    <Modal
      title={animal.is_adopted ? "Adopted Animal Details" : "Adopt this Animal"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        !animal.is_adopted && !isConfirmAdopt && (
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>
        ),
        !animal.is_adopted && !isConfirmAdopt && (
          <Button key="adopt" type="primary" onClick={() => setIsConfirmAdopt(true)}>
            Adopt
          </Button>
        ),
        isConfirmAdopt&& !animal.is_adopted && (
          <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
            <Button
              key="confirm-adopt"
              type="primary"
              style={{
                backgroundColor: '#ff6f61',
                borderColor: '#ff6f61',
                color: 'white',
                marginRight: '10px',
              }}
              onClick={handleAdoptClick}
            >
              Yes, I want to adopt! 🎉
            </Button>
            <Button
              key="cancel-adopt"
              type="default"
              style={{
                color: '#ff6f61',
                borderColor: '#ff6f61',
              }}
              onClick={() => setIsConfirmAdopt(false)}
            >
              Cancel
            </Button>
          </div>
        ),
      ]}
    >
      {animal.is_adopted ? (
        <div style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{animal.name}</h3>
          <p style={{ fontSize: '16px', color: '#555' }}>
            <strong>Type:</strong> {animal.type}
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            <strong>Age:</strong> {animal.age} years old
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            <strong>Adopted on:</strong> {new Date(animal.adopted_at).toLocaleDateString()}
          </p>
          <p style={{ fontSize: '14px', color: '#555' }}>
            This pet already has a home. 🏠❤️
          </p>
        </div>
      ) : isConfirmAdopt ? (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff6f61', marginBottom: '15px' }}>
            Are you sure you want to adopt {animal.name}? 🏠❤️
          </h2>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
            This will change {animal.name}'s status to adopted. Are you ready to give this cutie a forever home?
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            Your decision will make a huge difference! 🐾
          </p>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{animal.name}</h3>
          <p style={{ fontSize: '16px', color: '#555' }}>
            <strong>Type:</strong> {animal.type}
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            <strong>Age:</strong> {animal.age} years old
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            <strong>Added on:</strong> {new Date(animal.added_at).toLocaleDateString()}
          </p>
          <p style={{ fontSize: '16px', color: '#FF6F61' }}>
            Not adopted yet. Consider adopting <strong>{animal.name}</strong>! ❤️
          </p>
        </div>
      )}
    </Modal>
  );
};

export default AdoptAnimalModal;
