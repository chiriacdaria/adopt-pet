import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import AdoptAFriend from './AdoptAFriend';
import AdoptedAnimals from './AdoptedAnimals';
import AdoptionHistory from './AdoptionHistory';
import Favorites from './Favorites';
import AddPet from './AddPet';
import HomelessAnimals from './HomlessAnimals';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/adopt-a-friend" element={<AdoptAFriend />} />
          <Route path="/add-pet" element={<AddPet />} />  
          <Route path="/adopted-pets" element={<AdoptedAnimals />} />  
          <Route path="/profile" element={<Profile />} />
          <Route path="/adoption-history" element={<AdoptionHistory />} /> 
          <Route path="/favorites" element={<Favorites />} /> 
          <Route path="/homeless-animals" element={<HomelessAnimals />} /> 
        </Routes>
        </Router>
  );
};

export default App;
