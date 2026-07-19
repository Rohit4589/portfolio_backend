const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

// POST /api/contact
router.post('/', ContactController.submitContact);

module.exports = router;
