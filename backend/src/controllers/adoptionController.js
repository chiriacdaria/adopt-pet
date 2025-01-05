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
  let { phoneNumber, animalName } = req.body;

  if (!phoneNumber || !animalName) {
    return res.status(400).json({ message: 'Phone number and animal name are required' });
  }

  // Ensure phone number has international format
  if (!phoneNumber.startsWith('+')) {
    phoneNumber = `+40${phoneNumber}`;
  }

  try {
    const message = await client.messages.create({
      body: `Hi there! Someone is interested in adopting ${animalName}. 🐾`,
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
