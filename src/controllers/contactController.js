const ContactModel = require('../models/contactModel');
const EmailService = require('../services/emailService');

const ContactController = {
  /**
   * Handle incoming contact form submissions
   */
  async submitContact(req, res) {
    try {
      const { name, email, message } = req.body;
      
      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
      }

      // Save to database
      const contact = await ContactModel.createContact(name, email, message);

      // Send email notification (non-blocking)
      EmailService.sendContactNotification(name, email, message);

      // Send success response
      res.status(201).json({ success: true, data: contact });
    } catch (err) {
      console.error('Error in submitContact:', err);
      res.status(500).json({ error: 'Server error while saving contact' });
    }
  }
};

module.exports = ContactController;
