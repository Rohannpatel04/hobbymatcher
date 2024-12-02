const express = require('express');
const app = express();
const mentorRoutes = require('./routes/mentorRoutes'); // Importing mentor routes

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Use the routes
app.use('/mentorData', mentorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
