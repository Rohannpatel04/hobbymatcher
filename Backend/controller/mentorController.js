const db = require('../db');  // Import the database connection

// / mentor
// const deleteMentor = async (req, res) => {
//     const { fname, lname, phonenumber } = req.params;

//     try {
//         // Delete mentor from the Mentor table based on first name, last name, and phone number
//         const result = await db.execute(
//             `DELETE FROM Mentor WHERE firstName = ? AND lastName = ? AND phoneNumber = ?`,
//             [fname, lname, phonenumber]
//         );

//         // Check if any rows were affected
//         if (result.affectedRows > 0) {
//             res.status(200).json({
//                 message: 'Mentor deleted successfully',
//                 firstName: fname,
//                 lastName: lname,
//                 phoneNumber: phonenumber
//             });
//         } else {
//             res.status(404).json({
//                 message: 'Mentor not found'
//             });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Database Error");
//     }
// };

// /mentor/findhobbyiest
const retrieveHobbyiestByName = async (req, res) => {
    const { fname, lname } = req.params; // Get firstName and lastName from request parameters

    try { 
        const [rows, fields] = await db.execute(
            "SELECT firstName, lastName, phoneNumber, emailAddress, location, description, schooling FROM Hobbyist WHERE firstName = ? AND lastName = ?",
            [fname, lname] // Use firstName and lastName parameters from the request
        );
      
        if (rows.length > 0) {
            res.json(rows); // Return the hobbyist data if found
        } else {
            res.status(404).send("Hobbyist not found"); // If no hobbyist is found
        }
    } catch (err) { 
        console.error(err); 
        res.status(500).send("Database Error"); // Handle database errors
    }
};



const retrieveHobbyiestByLocation = async (req, res) => {
    const { location } = req.params; // Get location from request parameters

    try { 
        const [rows, fields] = await db.execute(
            "SELECT firstName, lastName, phoneNumber, emailAddress, location, description, schooling FROM Hobbyist WHERE location = ?",
            [location] // Use the location parameter from the request
        );
      
        if (rows.length > 0) {
            res.json(rows); // Return the hobbyists data if found
        } else {
            res.status(404).send("No hobbyists found with the specified location"); // If no hobbyists are found
        }
    } catch (err) { 
        console.error(err); 
        res.status(500).send("Database Error"); // Handle database errors
    }
};

const retrieveHobbyiestBySchool = async (req, res) => {
    const { school } = req.params; // Get school from request parameters

    try { 
        const [rows, fields] = await db.execute(
            "SELECT firstName, lastName, phoneNumber, emailAddress, location, description, schooling FROM Hobbyist WHERE schooling = ?",
            [school] // Use the school parameter from the request
        );
      
        if (rows.length > 0) {
            res.json(rows); // Return the hobbyists data if found
        } else {
            res.status(404).send("No hobbyists found with the specified school"); // If no hobbyists are found
        }
    } catch (err) { 
        console.error(err); 
        res.status(500).send("Database Error"); // Handle database errors
    }
};


const retrieveHobbyiestByNameLocationSchool = async (req, res) => {
    const { fname, lname, location, school } = req.params; // Get firstName, lastName, location, and school from request parameters

    try {
        const [rows, fields] = await db.execute(
            "SELECT firstName, lastName, phoneNumber, emailAddress, location, description, schooling FROM Hobbyist WHERE firstName = ? AND lastName = ? AND location = ? AND schooling = ?",
            [fname, lname, location, school] // Use the parameters from the request
        );
        
        if (rows.length > 0) {
            res.json(rows); // Return the hobbyists data if found
        } else {
            res.status(404).send("No hobbyists found with the specified name, location, and schooling"); // If no hobbyists are found
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error"); // Handle database errors
    }
};



// Retrieve all hobbyist requests for a mentor
const retrieveAllHobbyistRequests = async (req, res) => {
    const { fname, lname, phonenumber } = req.params;

    try {
        const [rows] = await db.execute(
            `SELECT 
                Request.requestID, 
                Request.status, 
                Request.message, 
                Request.hobbyistID, 
                Request.mentorID, 
                Mentor.firstName, 
                Mentor.lastName
             FROM 
                Request
             JOIN 
                Mentor ON Request.mentorID = Mentor.mentorID
             WHERE 
                Mentor.firstName = ? 
                AND Mentor.lastName = ? 
                AND Mentor.phoneNumber = ?`,
            [fname, lname, phonenumber]
        );

        if (rows.length > 0) {
            res.json(rows); // Return all matching requests
        } else {
            res.status(404).send("No requests found for the given mentor.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};

// Retrieve hobbyist requests by status for a mentor
const retrieveHobbyistRequestsByStatus = async (req, res) => {
    const { fname, lname, phonenumber, status } = req.params;

    try {
        const [rows] = await db.execute(
            `SELECT 
                Request.requestID, 
                Request.status, 
                Request.message, 
                Request.hobbyistID, 
                Request.mentorID, 
                Mentor.firstName, 
                Mentor.lastName
             FROM 
                Request
             JOIN 
                Mentor ON Request.mentorID = Mentor.mentorID
             WHERE 
                Mentor.firstName = ? 
                AND Mentor.lastName = ? 
                AND Mentor.phoneNumber = ?
                AND Request.status = ?`,
            [fname, lname, phonenumber, status]
        );

        if (rows.length > 0) {
            res.json(rows); // Return requests matching the status
        } else {
            res.status(404).send("No requests found for the given criteria.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};

// Update the status of a hobbyist request
const updateHobbyistRequestStatus = async (req, res) => {
    const { status, requestid } = req.params;

    try {
        const [result] = await db.execute(
            `UPDATE Request
             SET status = ?
             WHERE requestID = ?`,
            [status, requestid]
        );

        if (result.affectedRows > 0) {
            res.json({ message: "Request status updated successfully." });
        } else {
            res.status(404).send("Request not found or no update made.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};

// /mentor/post
const createPost = async (req, res) => {
    const { postID, postContent, mentorID } = req.body; // Get data from request body

    try {
        const [result] = await db.execute(
            `INSERT INTO Post (postID, postContent, mentorID) VALUES (?, ?, ?)`,
            [postID, postContent, mentorID] // Insert the post data into the database
        );

        res.status(201).json({
            message: `Post created successfully with ID: ${result.insertId}`,
            postID: result.insertId
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};


// Retrieve all posts for a specific mentor based on their name and phone number
const retrieveAllPosts = async (req, res) => {
    const { fname, lname, phonenumber } = req.params;

    try {
        const [rows] = await db.execute(
            `SELECT 
                Post.postID, 
                Post.postContent, 
                Post.mentorID, 
                Mentor.firstName, 
                Mentor.lastName, 
                Mentor.phoneNumber AS mentorPhoneNumber
             FROM 
                Post
             JOIN 
                Mentor ON Post.mentorID = Mentor.mentorID
             WHERE 
                Mentor.firstName = ? 
                AND Mentor.lastName = ? 
                AND Mentor.phoneNumber = ?`,
            [fname,lname, phonenumber]
        );

        if (rows.length > 0) {
            res.json(rows); // Return posts if found
        } else {
            res.status(404).send("No posts found for the given mentor.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};


const createEvent = async (req, res) => {
    const { eventID, eventName, startTime, endTime, location, description, date, skillID } = req.body;

    try {
        // Insert event data into the database
        await db.execute(
            `INSERT INTO Event (eventID, eventName, startTime, endTime, location, description, date, skillID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [eventID, eventName, startTime, endTime, location, description, date, skillID]
        );
        console.log(`Event created with data: ${JSON.stringify(req.body)}`);
        res.status(201).json({
            message: "Event created successfully",
            data: req.body,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};

// Create Event Attendance
const createEventAttendance = async (req, res) => {
    const { attendanceID, role, hobbyistID, mentorID, eventID } = req.body;

    try {
        // Insert attendance data into the database
        await db.execute(
            `INSERT INTO Attendance (attendanceID, role, hobbyistID, mentorID, eventID) VALUES (?, ?, ?, ?, ?)`,
            [attendanceID, role, hobbyistID, mentorID, eventID]
        );
        console.log(`Event attendance created with data: ${JSON.stringify(req.body)}`);
        res.status(201).json({
            message: "Event attendance created successfully",
            data: req.body,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};

// Retrieve Event Information by Event ID
const retrieveEventInformationByID = async (req, res) => {
    const { eventid } = req.params;

    try {
        const [rows] = await db.execute(
            `SELECT 
                Event.eventID, 
                Event.eventName, 
                Event.startTime, 
                Event.endTime, 
                Event.location, 
                Event.description, 
                Event.date, 
                Attendance.attendanceID, 
                Attendance.role, 
                Attendance.hobbyistID, 
                Attendance.mentorID
             FROM 
                Event
             LEFT JOIN 
                Attendance ON Event.eventID = Attendance.eventID
             WHERE 
                Event.eventID = ?`,
            [eventid]
        );

        if (rows.length > 0) {
            res.status(200).json(rows); // Return event and attendance information if found
        } else {
            res.status(404).send("Event not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};


// Retrieve Event Information by Event Name
const retrieveEventInformationByName = async (req, res) => {
    const { eventname } = req.params;

    try {
        const [rows] = await db.execute(
            `SELECT 
                Event.eventID, 
                Event.eventName, 
                Event.startTime, 
                Event.endTime, 
                Event.location, 
                Event.description, 
                Event.date, 
                Attendance.attendanceID, 
                Attendance.role, 
                Attendance.hobbyistID, 
                Attendance.mentorID
             FROM 
                Event
             LEFT JOIN 
                Attendance ON Event.eventID = Attendance.eventID
             WHERE 
                Event.eventName = ?`,
            [eventname]
        );

        if (rows.length > 0) {
            res.status(200).json(rows); // Return event information if found
        } else {
            res.status(404).send("Event not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};

// Retrieve All Events for a Mentor based on First Name, Last Name, and Phone Number
const retrieveAllEvents = async (req, res) => {
    const { fname, lname, phonenumber } = req.params;

    try {
        const [rows] = await db.execute(
            `SELECT 
                Event.eventID,
                Event.eventName,
                Event.startTime,
                Event.endTime,
                Event.location,
                Event.description,
                Event.date,
                Mentor.firstName AS mentorFirstName,
                Mentor.lastName AS mentorLastName,
                Mentor.phoneNumber AS mentorPhoneNumber
             FROM 
                Event
             JOIN 
                Attendance ON Event.eventID = Attendance.eventID
             JOIN 
                Mentor ON Attendance.mentorID = Mentor.mentorID
             WHERE 
                Mentor.firstName = ? 
                AND Mentor.lastName = ? 
                AND Mentor.phoneNumber = ?`,
            [fname, lname, phonenumber]
        );

        if (rows.length > 0) {
            res.status(200).json(rows); // Return events if found
        } else {
            res.status(404).send("No events found for the given mentor.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};


module.exports = {createEvent,createEventAttendance,retrieveEventInformationByID,retrieveEventInformationByName,retrieveAllEvents,updateHobbyistRequestStatus, retrieveHobbyistRequestsByStatus, retrieveAllHobbyistRequests, createPost, retrieveAllPosts, createEvent, retrieveAllEvents, deleteMentor, retrieveHobbyiestByName, retrieveHobbyiestByLocation, retrieveHobbyiestBySchool, retrieveHobbyiestByNameLocationSchool};  
