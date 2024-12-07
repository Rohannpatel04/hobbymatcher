const express = require("express");
const cors = require("cors"); // Import CORS middleware
const app = express();
const mentorRoutes = require("./routes/mentorRoutes"); // Importing mentor routes

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Use the routes
app.use("/mentorData", mentorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
