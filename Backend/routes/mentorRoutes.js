const express = require('express');
const router = express.Router();  // Creates an instance of the router
const mentorController = require('../controller/mentorController'); // Import the mentor controller

// Define the route to get a mentor by ID
router.get('/:mentorId', mentorController.getMentorByID);  // Using the controller's function for this endpoint

module.exports = router;  // Export the router for use in the server.js
