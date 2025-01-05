const { User } = require('../models'); // Sequelize model
const twilio = require('twilio');

// Load Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

/**
 * Handle notification for animal adoption.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const notifyAdoption = async (req, res) => {
  let { phoneNumber, animalName, userId } = req.body;

  if (!phoneNumber || !animalName || !userId) {
    return res.status(400).json({ message: 'Phone number, animal name, and user ID are required' });
  }

  // Ensure phone number has international format
  if (!phoneNumber.startsWith('+')) {
    phoneNumber = `+40${phoneNumber}`;
  }

  try {
    // Fetch user details (email) by userId using Sequelize's findOne
    const user = await User.findOne({ where: { id: userId } }); // Sequelize method for finding by id
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userEmail = user.email;

    // Send SMS notification with the user's email included
    const message = await client.messages.create({
      body: `Hi there! Someone is interested in adopting ${animalName}. Contact the user via their email: ${userEmail} 🐾`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return res.status(200).json({ message: 'Notification sent successfully', sid: message.sid });
  } catch (error) {
    console.error('Error sending notification:', error.message);
    return res.status(500).json({ message: 'Failed to send notification', error: error.message });
  }
};

module.exports = {
  notifyAdoption,
};
