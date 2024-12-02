const db = require('../db');  // Import the database connection

// Function to get mentor by ID
const getMentorByID = async (req, res) => {
    const mentorId = req.params.mentorId;  // Get mentorId from the URL parameters

    try {
        // Query to fetch mentor by ID
        const [rows, fields] = await db.execute('SELECT * FROM Mentor WHERE mentorID = ?', [mentorId]);

        if (rows.length > 0) {
            res.json(rows[0]);  // Return the mentor data if found
        } else {
            res.status(404).send('Mentor not found');  // If no mentor is found
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Database Error');  // If there's an error with the database query
    }
};

module.exports = { getMentorByID };  // Export the function
