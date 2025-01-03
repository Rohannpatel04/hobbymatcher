const db = require("../db");

// /general
const getSkills = async (req, res) => {
  try {
    const [results] = await db.execute("SELECT skillsName FROM SKILLS");

    res.status(200).json({
      message: "Skills fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

// / mentor
const createMentor = async (req, res) => {
  const {
    firstName,
    lastName,
    schooling,
    description,
    emailAddress,
    location,
    phoneNumber,
  } = req.body;

  const maxIdQuery = `SELECT MAX(mentorID) AS maxId FROM mentor;`;
  const [maxIdResult] = await db.query(maxIdQuery);
  const mentorID = (maxIdResult[0].maxId || 0) + 1;

  try {
    await db.execute(
      `INSERT INTO Mentor (mentorID, firstName, lastName, schooling, description, emailAddress, location, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        mentorID,
        firstName,
        lastName,
        schooling,
        description,
        emailAddress,
        location,
        phoneNumber,
      ]
    );

    res.status(201).json({
      message: "Mentor created successfully",
      data: req.body,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const addmentorSkill = async (req, res) => {
  const { fname, lname, phonenumber, skillname, experiencelevel } = req.body;

  try {
    // Get mentorID
    const [mentorRows] = await db.execute(
      `SELECT mentorID FROM Mentor WHERE firstName = ? AND lastName = ? AND phoneNumber = ?`,
      [fname, lname, phonenumber]
    );

    if (mentorRows.length === 0) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const mentorID = mentorRows[0].mentorID;

    // Get skillID
    const [skillRows] = await db.execute(
      `SELECT skillsID FROM Skills WHERE skillsName = ?`,
      [skillname]
    );

    if (skillRows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    const skillID = skillRows[0].skillsID;

    const [existingRows] = await db.execute(
      `SELECT * FROM hasSkills WHERE mentorID = ? AND skillID = ?`,
      [mentorID, skillID]
    );

    if (existingRows.length > 0) {
      return res
        .status(409)
        .json({ message: "This skill is already assigned to the mentor" });
    }

    await db.execute(
      `INSERT INTO hasSkills (mentorID, skillID, experienceLevel) VALUES (?, ?, ?)`,
      [mentorID, skillID, experiencelevel]
    );

    res.status(201).json({
      message: "Mentor Skill added successfully",
      data: req.body,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const deleteMentor = async (req, res) => {
  const { fname, lname, phonenumber } = req.params;

  try {
    const deleteQuery = `
            DELETE FROM Mentor 
            WHERE firstName = ? AND lastName = ? AND phoneNumber = ?;
        `;

    const result = await db.execute(deleteQuery, [fname, lname, phonenumber]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mentor not found." });
    }

    res.status(200).json({
      message: "Mentor deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

// /mentor/findhobbyiest
const getHobbyists = async (req, res) => {
  try {
    const hobbyistQuery = `
            SELECT
                firstName, 
                lastName, 
                schooling, 
                description, 
                emailAddress,
                location, 
                phoneNumber 
            FROM Hobbyist;
        `;

    const [hobbyistResults] = await db.query(hobbyistQuery);

    if (hobbyistResults.length === 0) {
      return res.status(404).json({ message: "No hobbyists found." });
    }

    res.status(200).json({
      message: "Hobbyists retrieved successfully.",
      data: hobbyistResults,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const retrieveHobbyiestByName = async (req, res) => {
  const { fname, lname } = req.params;

  try {
    const [rows, fields] = await db.execute(
      "SELECT firstName, lastName, phoneNumber, emailAddress, location, description, schooling FROM Hobbyist WHERE firstName = ? AND lastName = ?",
      [fname, lname]
    );

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send("Hobbyist not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const retrieveHobbyiestByLocation = async (req, res) => {
  const { location } = req.params;

  try {
    const [rows, fields] = await db.execute(
      "SELECT firstName, lastName, phoneNumber, emailAddress, location, description, schooling FROM Hobbyist WHERE location = ?",
      [location]
    );

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send("No hobbyists found with the specified location");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const retrieveHobbyiestBySchool = async (req, res) => {
  const { school } = req.params;

  try {
    const [rows, fields] = await db.execute(
      "SELECT firstName, lastName, phoneNumber, emailAddress, location, description, schooling FROM Hobbyist WHERE schooling = ?",
      [school]
    );

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send("No hobbyists found with the specified school");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const retrieveHobbyiestByNameLocationSchool = async (req, res) => {
  const { fname, lname, location, school } = req.params;

  try {
    const [rows, fields] = await db.execute(
      "SELECT firstName, lastName, phoneNumber, emailAddress, location, description, schooling FROM Hobbyist WHERE firstName = ? AND lastName = ? AND location = ? AND schooling = ?",
      [fname, lname, location, school]
    );

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res
        .status(404)
        .send(
          "No hobbyists found with the specified name, location, and schooling"
        ); // If no hobbyists are found
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
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
      res.json(rows);
    } else {
      res.status(404).send("No requests found for the given mentor.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};
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
      res.json(rows);
    } else {
      res.status(404).send("No requests found for the given criteria.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

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
  const { postContent, fname, lname, phonenumber } = req.body;

  const maxIdQuery = `SELECT MAX(postID) AS maxId FROM post;`;
  const [maxIdResult] = await db.query(maxIdQuery);
  const postID = (maxIdResult[0].maxId || 0) + 1;

  try {
    const mentorQuery = `SELECT mentorID FROM Mentor WHERE firstName = ? AND lastName = ? AND phoneNumber = ?`;
    const [mentorResult] = await db.query(mentorQuery, [
      fname,
      lname,
      phonenumber,
    ]);

    if (mentorResult.length === 0) {
      return res.status(404).json({ message: "Mentor not found." });
    }

    const mentorID = mentorResult[0].mentorID;

    const [result] = await db.execute(
      `INSERT INTO Post (postID, postContent, mentorID) VALUES (?, ?, ?)`,
      [postID, postContent, mentorID]
    );

    res.status(201).json({
      message: `Post created successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

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
      [fname, lname, phonenumber]
    );

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send("No posts found for the given mentor.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const createEvent = async (req, res) => {
  const {
    eventName,
    startTime,
    endTime,
    location,
    description,
    date,
    skillName,
  } = req.body;

  try {
    const maxIdQuery = `SELECT MAX(eventID) AS maxId FROM event;`;
    const [maxIdResult] = await db.query(maxIdQuery);
    const eventID = (maxIdResult[0].maxId || 0) + 1;

    const [rows] = await db.execute(
      `SELECT 
                skills.skillsID
             FROM 
                skills
             WHERE 
                skills.skillsName = ?`,
      [skillName]
    );

    if (rows.length === 0) {
      return res.status(404).send(`Skill '${skillName}' not found.`);
    }

    const skillID = rows[0].skillsID;

    await db.execute(
      `INSERT INTO Event (eventID, eventName, startTime, endTime, location, description, date, skillID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        eventID,
        eventName,
        startTime,
        endTime,
        location,
        description,
        date,
        skillID,
      ]
    );

    res.status(201).json({
      message: "Event created successfully",
      data: req.body,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const createEventAttendance = async (req, res) => {
  const {
    role,
    hobbyistFirstName,
    hobbyistLastName,
    hobbyistPhoneNumber,
    mentorFirstName,
    mentorLastName,
    mentorPhoneNumber,
    eventID,
  } = req.body;

  try {
    let hobbyistID = null;
    let mentorID = null;

    if (role === "Hobbyist") {
      const hobbyistQuery = `
                SELECT hobbyistID 
                FROM hobbyist 
                WHERE firstName = ? AND lastName = ? AND phoneNumber = ?;
            `;

      const [hobbyistResult] = await db.query(hobbyistQuery, [
        hobbyistFirstName,
        hobbyistLastName,
        hobbyistPhoneNumber,
      ]);

      if (hobbyistResult.length === 0) {
        return res.status(404).send("Hobbyist not found.");
      }

      hobbyistID = hobbyistResult[0].hobbyistID;
    } else {
      const mentorQuery = `
                SELECT mentorID 
                FROM mentor 
                WHERE firstName = ? AND lastName = ? AND phoneNumber = ?;
            `;
      const [mentorResult] = await db.query(mentorQuery, [
        mentorFirstName,
        mentorLastName,
        mentorPhoneNumber,
      ]);

      if (mentorResult.length === 0) {
        return res.status(404).send("Mentor not found.");
      }

      mentorID = mentorResult[0].mentorID;
    }

    const maxIdQuery = `SELECT MAX(attendanceID) AS maxId FROM attendance;`;
    const [maxIdResult] = await db.query(maxIdQuery);

    const attendanceID = (maxIdResult[0].maxId || 0) + 1;

    await db.execute(
      `INSERT INTO Attendance (attendanceID, role, hobbyistID, mentorID, eventID) VALUES (?, ?, ?, ?, ?)`,
      [attendanceID, role, hobbyistID, mentorID, eventID]
    );

    res.status(201).json({
      message: "Event attendance created successfully",
      data: req.body,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

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
      res.status(200).json(rows);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

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
      res.status(200).json(rows);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

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
      res.status(200).json(rows);
    } else {
      res.status(404).send("No events found for the given mentor.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const getMentorEventAttendance = async (req, res) => {
  const { firstname, lastname, phonenumber } = req.params;

  try {
    const query = `
                SELECT
                    CONCAT(Mentor.firstName, " ", Mentor.lastName) AS MentorName,
                    Event.eventName AS EventName,
                    COUNT(Attendance.attendanceID) AS TotalAttendees,
                    COUNT(CASE WHEN Attendance.role = 'Hobbyist' THEN 1 END) AS TotalHobbyists,
                    COUNT(CASE WHEN Attendance.role = 'Mentor' THEN 1 END) AS TotalMentors
                FROM Event
                JOIN Attendance ON Event.eventID = Attendance.eventID
                JOIN Mentor ON Attendance.mentorID = Mentor.mentorID
                WHERE Mentor.firstName = ? AND Mentor.lastName = ? AND Mentor.phoneNumber = ?
                GROUP BY Mentor.mentorID, Event.eventID
                ORDER BY TotalAttendees DESC;
            `;

    const [results] = await db.execute(query, [
      firstname,
      lastname,
      phonenumber,
    ]);

    if (results.length === 0) {
      return res.status(404).json({
        message: "No events found for this mentor",
      });
    }

    res.status(200).json({
      message: "Mentor event attendance fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

module.exports = {
  getMentorEventAttendance,
  getSkills,
  getHobbyists,
  deleteMentor,
  addmentorSkill,
  createMentor,
  createEvent,
  createEventAttendance,
  retrieveEventInformationByID,
  retrieveEventInformationByName,
  retrieveAllEvents,
  updateHobbyistRequestStatus,
  retrieveHobbyistRequestsByStatus,
  retrieveAllHobbyistRequests,
  createPost,
  retrieveAllPosts,
  createEvent,
  retrieveAllEvents,
  retrieveHobbyiestByName,
  retrieveHobbyiestByLocation,
  retrieveHobbyiestBySchool,
  retrieveHobbyiestByNameLocationSchool,
};
