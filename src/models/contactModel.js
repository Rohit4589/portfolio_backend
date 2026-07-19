const db = require('../config/db');

const ContactModel = {
  /**
   * Insert a new contact message into the database
   */
  async createContact(name, email, message) {
    const result = await db.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    return result.rows[0];
  }
};

module.exports = ContactModel;
