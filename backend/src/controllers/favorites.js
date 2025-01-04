const { User, Animal, UserFavorites , Op} = require('../models');

// Add animal to favorites
const addToFavorites = async (req, res) => {
  const { userId, animalId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const animal = await Animal.findByPk(animalId);

    if (!user || !animal) {
      return res.status(404).json({ error: 'User or Animal not found' });
    }

    // Manually add to the user_favorites table
UserFavorites.create({
  favorite_user_id: user.id,
  animal_id: animal.id,
  created_at: new Date(),
  updated_at: new Date(),
})
.then(() => {
  console.log('Favorite added manually');
})
.catch((error) => {
  console.error('Error manually adding favorite:', error);
});


    return res.json({ isFavorite: true });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Remove animal from favorites
const removeFromFavorites = async (req, res) => {
  const { userId, animalId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const animal = await Animal.findByPk(animalId);

    if (!user || !animal) {
      return res.status(404).json({ error: 'User or Animal not found' });
    }

    // Remove from the user_favorites table
    await UserFavorites.destroy({
      where: {
        favorite_user_id: user.id,
        animal_id: animal.id,
      },
    });

    return res.json({ isFavorite: false });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Check if animal is a favorite of the logged-in user
const checkFavorite = async (req, res) => {
  const { userId, animalId } = req.body;

  console.log('This is the request body:', req.body); // Log the request body for debugging
  console.log('user id:', userId, ' animal id:', animalId); // Log the individual params

  if (!userId || !animalId) {
    return res.status(400).json({ error: 'User ID or Animal ID is missing' });
  }

  try {
    // Check if there's a relationship between the user and the animal in the UserFavorites table
    const favorite = await UserFavorites.findOne({
      where: {
        favorite_user_id: userId,
        animal_id: animalId,
      },
    });

    if (favorite) {
      return res.json({ isFavorite: true });
    } else {
      return res.json({ isFavorite: false });
    }
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// controllers/favorites.js

const getUserFavorites = async (req, res) => {
  const userId = req.params.userId;
  
  try {
    // Query your database for the user's favorites
  const favorites = await UserFavorites.findAll({
      where: {
        favorite_user_id: userId,  // Filter by the logged-in user's ID
      },
      attributes: ['animal_id'],  // Fetch only the animal_id field
    });
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found' });
    }

    res.status(200).json(favorites); // Respond with the user's favorites
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = { addToFavorites, removeFromFavorites, checkFavorite, getUserFavorites };


