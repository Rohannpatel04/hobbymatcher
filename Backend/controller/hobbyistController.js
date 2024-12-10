const db = require("../db");

// /Hobbyist
const createHobbyist = async (req, res) => {
  const {
    schooling,
    description,
    emailAddress,
    location,
    phoneNumber,
    firstName,
    lastName,
  } = req.body;

  const query = `
      INSERT INTO Hobbyist (hobbyistID, schooling, description, emailAddress, location, phoneNumber, firstName, lastName) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const maxIdQuery = `SELECT MAX(hobbyistID) AS maxId FROM hobbyist;`;
  const [maxIdResult] = await db.query(maxIdQuery);

  const hobbyistID = (maxIdResult[0].maxId || 0) + 1;

  const values = [
    hobbyistID,
    schooling,
    description,
    emailAddress,
    location,
    phoneNumber,
    firstName,
    lastName,
  ];

  try {
    await db.query(query, values);

    res.status(200).send("Hobbyist created successfully.");
  } catch (error) {
    console.error("Error inserting hobbyist:", error);
    res.status(500).send("Failed to insert hobbyist.");
  }
};

const deleteHobbyist = async (req, res) => {
  const { fname, lname, phonenumber } = req.params;

  try {
    // SQL query to delete the hobbyist
    const deleteQuery = `
            DELETE FROM Hobbyist 
            WHERE firstName = ? AND lastName = ? AND phoneNumber = ?;
        `;

    const [result] = await db.query(deleteQuery, [fname, lname, phonenumber]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Hobbyist not found." });
    }

    res.status(200).json({
      message: "Hobbyist deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

// /Hobbyist/findmentor
const getMentors = async (req, res) => {
  try {
    const mentorQuery = `
            SELECT firstName, lastName, schooling 
            FROM Mentor;
        `;

    const [mentorResults] = await db.query(mentorQuery);

    if (mentorResults.length === 0) {
      return res.status(404).json({ message: "No mentors found." });
    }

    res.status(200).json({
      message: "Mentors retrieved successfully.",
      data: mentorResults,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

const getMentorsWithSkills = async (req, res) => {
  const { skill } = req.params;
  const query = `
        SELECT
            Mentor.mentorID,
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
            Endorsement.endorsementID,
            Endorsement.hobbyistID,
            Endorsement.skillsID,
            Endorsement.date,
            Endorsement.comment,
            Skills.skillsName
        FROM
            Mentor
            JOIN Endorsement ON Mentor.mentorID = Endorsement.mentorID
            JOIN Skills ON Endorsement.skillsID = Skills.skillsID
        WHERE
            Skills.skillsName = ?;
    `;
  try {
    const [rows] = await db.query(query, [skill]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Failed to retrieve mentors with ${skill} skills`);
  }
};

const getMentorsFromLocation = async (req, res) => {
  const { location } = req.params;
  const query = `
        SELECT
            Mentor.mentorID,
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
            Endorsement.endorsementID,
            Endorsement.hobbyistID,
            Endorsement.skillsID,
            Endorsement.date,
            Endorsement.comment
        FROM
            Mentor
            JOIN Endorsement ON Mentor.mentorID = Endorsement.mentorID
        WHERE
            Mentor.location = ?;
    `;
  try {
    const [rows] = await db.query(query, [location]); // Parameterized query
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Failed to retrieve mentors from ${location}`);
  }
};

const getMentorsWithSkillsAndLocation = async (req, res) => {
  const { skill, location } = req.params; // Get skill and location from the URL parameters
  const query = `
        SELECT
            Mentor.mentorID,
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
            Endorsement.endorsementID,
            Endorsement.hobbyistID,
            Endorsement.skillsID,
            Endorsement.date,
            Endorsement.comment,
            Skills.skillsName
        FROM
            Mentor
            JOIN Endorsement ON Mentor.mentorID = Endorsement.mentorID
            JOIN Skills ON Endorsement.skillsID = Skills.skillsID
        WHERE
            Skills.skillsName = ? 
            AND Mentor.location = ?;
    `;
  try {
    const [rows] = await db.query(query, [skill, location]); // Parameterized query
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(`Failed to retrieve mentors with ${skill} skills in ${location}`);
  }
};

const getMentorsWithSkillsAndSchooling = async (req, res) => {
  const { skill, schooling } = req.params;
  const query = `
        SELECT
            Mentor.mentorID,
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
            Endorsement.endorsementID,
            Endorsement.hobbyistID,
            Endorsement.skillsID,
            Endorsement.date,
            Endorsement.comment,
            Skills.skillsName
        FROM
            Mentor
            JOIN Endorsement ON Mentor.mentorID = Endorsement.mentorID
            JOIN Skills ON Endorsement.skillsID = Skills.skillsID
        WHERE
            Skills.skillsName = ? 
            AND Mentor.schooling = ?;
    `;
  try {
    const [rows] = await db.query(query, [skill, schooling]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        `Failed to retrieve mentors with ${skill} skills and schooling from ${schooling}`
      );
  }
};

const getMentorsFromLocationAndSchooling = async (req, res) => {
  const { location, schooling } = req.params;
  const query = `
        SELECT
            Mentor.mentorID,
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
            Endorsement.endorsementID,
            Endorsement.hobbyistID,
            Endorsement.skillsID,
            Endorsement.date,
            Endorsement.comment
        FROM
            Mentor
            JOIN Endorsement ON Mentor.mentorID = Endorsement.mentorID
        WHERE
            Mentor.location = ? 
            AND Mentor.schooling = ?;
    `;
  try {
    const [rows] = await db.query(query, [location, schooling]); // Parameterized query
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        `Failed to retrieve mentors from ${location} with schooling ${schooling}`
      );
  }
};

const createRequest = async (req, res) => {
  const {
    message,
    hobbyistFirstName,
    hobbyistLastName,
    hobbyistPhoneNumber,
    mentorFirstName,
    mentorLastName,
    mentorPhoneNumber,
  } = req.body;

  try {
    const hobbyistQuery = `
      SELECT hobbyist.hobbyistID 
      FROM hobbyist 
      WHERE hobbyist.firstName = ? AND hobbyist.lastName = ? AND hobbyist.phoneNumber = ? LIMIT 1;
    `;
    const mentorQuery = `
      SELECT mentor.mentorID 
      FROM mentor 
      WHERE mentor.firstName = ? AND mentor.lastName = ? AND mentor.phoneNumber = ? LIMIT 1;
    `;

    const [hobbyrow] = await db.query(hobbyistQuery, [
      hobbyistFirstName,
      hobbyistLastName,
      hobbyistPhoneNumber,
    ]);
    const [mentorrow] = await db.query(mentorQuery, [
      mentorFirstName,
      mentorLastName,
      mentorPhoneNumber,
    ]);

    if (hobbyrow.length === 0 || mentorrow.length === 0) {
      return res.status(404).send("Hobbyist or Mentor not found.");
    }

    const maxIdQuery = `SELECT MAX(requestID) AS maxId FROM request;`;
    const [maxIdResult] = await db.query(maxIdQuery);

    const requestID = (maxIdResult[0].maxId || 0) + 1;

    const status = "Pending";
    const hobbyistID = hobbyrow[0].hobbyistID;
    const mentorID = mentorrow[0].mentorID;
    const insertQuery = `
      INSERT INTO Request (requestID, status, message, hobbyistID, mentorID) 
      VALUES (?, ?, ?, ?, ?);
    `;
    await db.query(insertQuery, [
      requestID,
      status,
      message,
      hobbyistID,
      mentorID,
    ]);

    res.status(200).send("Request created successfully.");
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).send("Failed to create request.");
  }
};

const createEndorsement = async (req, res) => {
  const {
    skillsName,
    hobbyistFirstName,
    hobbyistLastName,
    hobbyistPhoneNumber,
    mentorFirstName,
    mentorLastName,
    mentorPhoneNumber,
    date,
    comment,
  } = req.body;

  try {
    const hobbyistQuery = `
        SELECT hobbyistID 
        FROM hobbyist 
        WHERE firstName = ? AND lastName = ? AND phoneNumber = ?;
      `;
    const mentorQuery = `
        SELECT mentorID 
        FROM mentor 
        WHERE firstName = ? AND lastName = ? AND phoneNumber = ?;
      `;
    const skillsQuery = `
        SELECT skillsID 
        FROM skills 
        WHERE skillsName = ?;
      `;

    // Execute queries to fetch IDs
    const [hobbyistResult] = await db.query(hobbyistQuery, [
      hobbyistFirstName,
      hobbyistLastName,
      hobbyistPhoneNumber,
    ]);
    const [mentorResult] = await db.query(mentorQuery, [
      mentorFirstName,
      mentorLastName,
      mentorPhoneNumber,
    ]);
    const [skillsResult] = await db.query(skillsQuery, [skillsName]);

    // Validate that IDs were found
    if (hobbyistResult.length === 0)
      return res.status(404).send("Hobbyist not found.");
    if (mentorResult.length === 0)
      return res.status(404).send("Mentor not found.");
    if (skillsResult.length === 0)
      return res.status(404).send("Skill not found.");

    const maxIdQuery = `SELECT MAX(endorsementID) AS maxId FROM Endorsement;`;
    const [maxIdResult] = await db.query(maxIdQuery);

    const endorsementID = (maxIdResult[0].maxId || 0) + 1;

    const hobbyistID = hobbyistResult[0].hobbyistID;
    const mentorID = mentorResult[0].mentorID;
    const skillsID = skillsResult[0].skillsID;

    // Insert the endorsement
    const insertQuery = `
        INSERT INTO Endorsement (endorsementID, hobbyistID, mentorID, skillsID, date, comment)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
    await db.query(insertQuery, [
      endorsementID,
      hobbyistID,
      mentorID,
      skillsID,
      date,
      comment,
    ]);

    res.status(200).send("Endorsement created successfully.");
  } catch (error) {
    console.error("Error creating endorsement:", error);
    res.status(500).send("Failed to create endorsement.");
  }
};

const getAllRequestByHobbyistInfo = async (req, res) => {
  try {
    // Extract parameters from the request
    const { fname, lname, phonenumber } = req.params;

    // Logic to fetch data from the database or any other source
    // For example, using a database query to retrieve requests by hobbyist info:
    // const requests = await Request.find({ firstName: fname, lastName: lname, phoneNumber: phonenumber });

    // Send the response back with the fetched data
    res.status(200).json({
      message: "Requests fetched successfully",
      // data: requests,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching requests" });
  }
};

// /Hobbyist/Post
// Temporary function for getPostsAndCommentsByHobbyist
const getAllPostsAndCommentsByHobbyist = async (req, res) => {
  // Placeholder function - implement logic later
  res
    .status(200)
    .send("This is a placeholder for getAllPostsAndCommentsByHobbyist.");
};

// Temporary function for getPostsBySkill
const getPostsBySkill = async (req, res) => {
  // Placeholder function - implement logic later
  res.status(200).send("This is a placeholder for getPostsBySkill.");
};

// Temporary function for getPostsByMentorLocation
const getPostsByMentorLocation = async (req, res) => {
  // Placeholder function - implement logic later
  res.status(200).send("This is a placeholder for getPostsByMentorLocation.");
};

// Temporary function for getPostsAndCommentsByMentorSchooling
const getPostsAndCommentsByMentorSchooling = async (req, res) => {
  // Placeholder function - implement logic later
  res
    .status(200)
    .send("This is a placeholder for getPostsAndCommentsByMentorSchooling.");
};

// Temporary function for getPostsBySkillLocationSchooling
const getPostsBySkillLocationSchooling = async (req, res) => {
  // Placeholder function - implement logic later
  res
    .status(200)
    .send("This is a placeholder for getPostsBySkillLocationSchooling.");
};

const createComment = async (req, res) => {
  const {
    reviewContent,
    postID,
    hobbyistFName,
    hobbyistLastName,
    hobbyistPhoneNumber,
  } = req.body;

  const queryHobbyistID = `
  SELECT hobbyistID 
  FROM Hobbyist 
  WHERE firstName = ? AND lastName = ? AND phoneNumber = ?;
`;

  const [result] = await db.query(queryHobbyistID, [
    hobbyistFName,
    hobbyistLastName,
    hobbyistPhoneNumber,
  ]);

  if (result.length === 0) {
    return res.status(404).send("Hobbyist not found.");
  }
  // Return the hobbyistID
  const hobbyistID = result[0].hobbyistID;

  const query = `
      INSERT INTO Comment (commentID, reviewContent, postID, hobbyistID) 
      VALUES (?, ?, ?, ?);
  `;

  const maxIdQuery = `SELECT MAX(commentID) AS maxId FROM comment;`;
  const [maxIdResult] = await db.query(maxIdQuery);
  const commentID = (maxIdResult[0].maxId || 0) + 1;

  try {
    await db.query(query, [commentID, reviewContent, postID, hobbyistID]);
    res.status(201).send("Comment added successfully.");
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send("Failed to add comment.");
  }
};

// Hobbyist/Event
const getEventsBySkill = async (req, res) => {
  // Implementation goes here
};

const getEventsByLocation = async (req, res) => {
  // Implementation goes here
};

const getEventsByMentorSchooling = async (req, res) => {
  // Implementation goes here
};

const getEventsBySkillLocationSchooling = async (req, res) => {
  // Implementation goes here
};

const getEventsByMentor = async (req, res) => {
  // Implementation goes here
};

const getEventsByHobbyist = async (req, res) => {
  // Implementation goes here
};

module.exports = {
  getMentors,
  deleteHobbyist,
  getAllRequestByHobbyistInfo,
  getAllPostsAndCommentsByHobbyist,
  getPostsBySkill,
  getPostsByMentorLocation,
  createComment,
  createEndorsement,
  createHobbyist,
  getMentorsWithSkills,
  getMentorsFromLocation,
  getMentorsWithSkillsAndLocation,
  getMentorsWithSkillsAndSchooling,
  getMentorsFromLocationAndSchooling,
  createRequest,
  getPostsAndCommentsByMentorSchooling,
  getPostsBySkillLocationSchooling,
  getEventsBySkill,
  getEventsByLocation,
  getEventsByMentorSchooling,
  getEventsBySkillLocationSchooling,
  getEventsByMentor,
  getEventsByHobbyist,
};
