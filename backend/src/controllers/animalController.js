const { Animal } = require('../models'); // Sequelize model

// Command handler to create a new animal
const createAnimalHandler = async (name, type, description, gender, age, userId, contactNumber) => {
  // Check if the name already exists in the database
  console.log('Create animal CONTACT NR', contactNumber)

  // Create a new animal in the database with the contact number
  const newAnimal = await Animal.create({
    name,
    gender,
    age,
    type,
    description,
    isAdopted: false,  // Default value for isAdopted
    registrationDate: new Date(),
    addedAt: new Date(),
    adoptedAt: null,
    userId,  // This should now properly associate the animal with the authenticated user
    //adopterId,
    contact_number: contactNumber,    // New field for the contact number
  });

  return newAnimal;
};


// Command handler to fetch an animal by ID
const getAnimalByIdHandler = async (id) => {
  const animal = await Animal.findOne({ where: { id } });
  if (!animal) {
    throw new Error('Animal not found');
  }

  return animal;
};

// Command handler to update an animal's details
const updateAnimalHandler = async (id, data) => {
  const animal = await Animal.findOne({ where: { id } });
  if (!animal) {
    throw new Error('Animal not found');
  }

  // Update the animal with the provided data
  const updatedAnimal = await animal.update(data);
  return updatedAnimal;
};

// Controller function to handle creating a new animal
const createAnimal = async (req, res) => {
    console.log('create animal called');
    console.log('req:', req.user);
    const { name, type, description, gender, age, adopterId, contactNumber } = req.body;
    const userId = req.user.userId;
    console.log('contact number:', contactNumber); // Log here

    if (!userId) {
      return res.status(400).json({ error: 'User not authenticated' });
    }

    try {
      const newAnimal = await createAnimalHandler(name, type, description, gender, age, userId, contactNumber);
      console.log('new animal created:', newAnimal);  // Log new animal object
      res.status(201).json({ message: 'Animal created successfully', animal: newAnimal });
    } catch (error) {
      console.log('Error in creating animal:', error);
      res.status(400).json({ error: error.message });
    }
};


// Controller function to get animal details by ID
const getAnimalById = async (req,res) => {
  console.log('cacacca')
  const { id } = req.params;  // Extracts the animal id from the URL parameters
  console.log('get animal by id');  // Logs a message to indicate the request

  try {
    // Assuming getAnimalByIdHandler is a function that fetches the animal from your database
    const animal = await getAnimalByIdHandler(id);

    console.log('animalu gasit:', animal);  // Logs the fetched animal

    // Sends the fetched animal in the response with a 200 status code
    res.status(200).json({ animal });
  } catch (error) {
    // If an error occurs, returns a 404 status with the error message
    res.status(404).json({ error: error.message });
  }
};

// Controller function to update an animal's details
const updateAnimal = async (req, res) => {
  console.log('update animal method');
  const { id } = req.params;
  const { adopted_at, adopter_id } = req.body; // Include adopter_id in the request body

  console.log('adopted at update: ', adopted_at);
  console.log('adopter_id: ', adopter_id);

  try {
    // Update the animal's adoptedAt, isAdopted, and adopter_id field directly using Sequelize
    const [updatedRowsCount, updatedAnimal] = await Animal.update(
      { 
        adopted_at, 
        is_adopted: true, 
        adopter_id  // Set the adopter_id
      }, 
      { where: { id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    const animal = updatedAnimal[0]; // Extract the updated animal

    res.status(200).json({ message: 'Animal adoption successful', animal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating animal', error });
  }
};

// Controller function to fetch all animals (for any user)
const getAllAnimals = async (req, res) => {
  try {
    // Fetch all animals from the database
    const animals = await Animal.findAll(); // No filtering by userId here
    
    if (!animals || animals.length === 0) {
      return res.status(404).json({ error: 'No animals found' });
    }

    res.status(200).json({ animals });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Failed to fetch animals' });
  }
};

const deleteAnimal = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  const userId = req.user.userId; // Get the authenticated user's ID

  try {
    // Find the animal by ID and ensure it belongs to the logged-in user
    const animal = await Animal.findOne({ where: { id, userId } });
    if (!animal) {
      return res.status(404).json({ error: 'Animal not found or not owned by the user' });
    }

    // Delete the animal
    await animal.destroy();
    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ error: 'Failed to delete animal' });
  }
};

// Fetch all adopted animals for the current user
const getAdoptedAnimalsByUser = async (req, res) => {
  try {
  const userId = req.user.userId; // Assuming user is authenticated and user ID is available in req.user
console.log("get adopted animals historyyy",userId)
    // Query the Animal model to find all animals where is_adopted is true and userId matches the logged-in user
    const adoptedAnimals = await Animal.findAll({
      where: {
        adopter_id: userId,
        is_adopted: true, // Only fetch adopted animals
      },
      attributes: ['name', 'description', 'adopted_at'], // You can adjust the fields as per your needs
    });

    console.log('adoipted animals:', adoptedAnimals)
    // Return the adopted animals
    if (adoptedAnimals.length === 0) {
      console.log('0 animals')
      return res.status(404).json({ message: 'No adopted animals found' });
    }

    return res.status(200).json(adoptedAnimals);
  } catch (error) {
    console.error('Error fetching adopted animals:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to fetch all homeless animals

const getHomelessAnimals = async (req, res) => {
  const loggedInUserId = req.user.userId; // Assuming user is authenticated and user ID is available in req.user
  console.log("Logged-in user:", loggedInUserId);

  try {
    // Fetch all homeless animals
    const homelessAnimals = await Animal.findAll({
      where: {
        adopter_id: null,         // Ensure adopter_id is null
        adopted_at: null,         // Ensure adopted_at is null
        is_adopted: false,        // Ensure is_adopted is false
      },
    });


    // Filter out animals created by the logged-in user
    const filteredAnimals = homelessAnimals.filter(
      (animal) => animal.userId !== loggedInUserId
    );


    if (filteredAnimals.length === 0) {
      return res.status(404).json({ message: 'No homeless animals found for other users' });
    }

    return res.status(200).json(filteredAnimals); // Send the filtered homeless animals in the response
  } catch (error) {
    console.error('Error fetching homeless animals:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createAnimal,
  getAnimalById,
  updateAnimal,
  getAllAnimals,
  deleteAnimal,
  getAdoptedAnimalsByUser,
  getHomelessAnimals
};
