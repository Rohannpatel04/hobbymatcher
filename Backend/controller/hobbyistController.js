const db = require('../db');  

// /Hobbyist
const createHobbyist = async (req, res) => {

    const {schooling, description, emailAddress, location, phoneNumber, firstName, lastName } = req.body;
  
    const query = `
      INSERT INTO Hobbyist (hobbyistID, schooling, description, emailAddress, location, phoneNumber, firstName, lastName) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const maxIdQuery = `SELECT MAX(hobbyistID) AS maxId FROM hobbyist;`;
    const [maxIdResult] = await db.query(maxIdQuery);

    const hobbyistID = (maxIdResult[0].maxId || 0) + 1;

    const values = [hobbyistID, schooling, description, emailAddress, location, phoneNumber, firstName, lastName];

  
    try {
   
      await db.query(query, values);

      res.status(200).send('Hobbyist created successfully.');

    } catch (error) {
     
      console.error('Error inserting hobbyist:', error);
      res.status(500).send('Failed to insert hobbyist.');
    }
  };

  const deleteHobbyist = async (req, res) => {
    const { fname, lname, phonenumber } = req.params;

    try {
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
        const mentorSkillsQuery = `
            SELECT 
                CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorName,
                Mentor.location AS MentorLocation,
                Mentor.phoneNumber AS MentorPhoneNumber,
                Skills.skillsName AS SkillName,
                hasSkills.experienceLevel AS SkillLevel
            FROM 
                Mentor
            JOIN 
                hasSkills ON Mentor.mentorID = hasSkills.mentorID
            JOIN 
                Skills ON hasSkills.skillID = Skills.skillsID
            ORDER BY 
                MentorName, SkillName;
        `;

        const [results] = await db.query(mentorSkillsQuery);

        if (results.length === 0) {
            return res.status(404).json({ message: "No mentor details found." });
        }

        res.status(200).json({
            message: "Mentor details retrieved successfully.",
            data: results,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};


const toptenmentorsbasedonrequest = async (req, res) => {
  try {
      const topMentorsQuery = `
          SELECT 
              CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorName,
              Mentor.phoneNumber,
              COUNT(Request.requestID) AS TotalRequests
          FROM 
              Mentor
          JOIN 
              Request ON Mentor.mentorID = Request.mentorID
          GROUP BY 
              Mentor.mentorID
          ORDER BY 
              TotalRequests DESC
          LIMIT 10;
      `;

      const [results] = await db.query(topMentorsQuery);

      if (results.length === 0) {
          return res.status(404).json({ message: "No mentors found with requests." });
      }

      res.status(200).json({
          message: "Top 10 mentors retrieved successfully.",
          data: results,
      });
  } catch (err) {
      console.error(err);
      res.status(500).send("Database Error");
  }
};


const getMentorEndorsements = async (req, res) => {
  const { firstName, lastName, phonenumber } = req.params;

  try {
      const mentorEndorsementsQuery = `
          SELECT
              CONCAT(mentor.firstName, " ", mentor.lastName) AS MentorName,
              mentor.phoneNumber AS MentorPhoneNumber,
              skills.skillsName AS SkillName,
              COUNT(endorsement.endorsementID) AS TotalEndorsements
          FROM mentor
          JOIN hasSkills ON mentor.mentorID = hasSkills.mentorID
          JOIN skills ON hasSkills.skillID = skills.skillsID
          JOIN endorsement ON endorsement.mentorID = mentor.mentorID
          WHERE 
              mentor.firstName = ? 
              AND mentor.lastName = ?
              AND mentor.phoneNumber = ?
          GROUP BY mentor.firstName, mentor.lastName, mentor.phoneNumber, skills.skillsName;
      `;

      const [results] = await db.query(mentorEndorsementsQuery, [firstName, lastName, phonenumber]);

      if (results.length === 0) {
          return res.status(404).json({ message: "No endorsements found for the specified mentor." });
      }

      res.status(200).json({
          message: "Mentor endorsements retrieved successfully.",
          data: results,
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
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
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
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
            Endorsement.date,
            Endorsement.comment,
            Skills.skillsName
        FROM
            Mentor
            JOIN Endorsement ON Mentor.mentorID = Endorsement.mentorID
            JOIN Skills ON Endorsement.skillsID = Skills.skillsID
        WHERE
            Mentor.location = ?;
    `;
    try {
        const [rows] = await db.query(query, [location]); 
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to retrieve mentors from ${location}`);
    }
};


const getMentorsWithSkillsAndLocation = async (req, res) => {
    const { skill, location } = req.params; 
    const query = `
        SELECT
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
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
        const [rows] = await db.query(query, [skill, location]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to retrieve mentors with ${skill} skills in ${location}`);
    }
};


const getMentorsWithSkillsAndSchooling = async (req, res) => {
    const { skill, schooling } = req.params; 
    const query = `
        SELECT
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
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
        res.status(500).send(`Failed to retrieve mentors with ${skill} skills and schooling from ${schooling}`);
    }
};


const getMentorsFromLocationAndSchooling = async (req, res) => {
    const { location, schooling } = req.params; 
    const query = `
        SELECT
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
            Endorsement.date,
            Endorsement.comment, 
            Skills.skillsName
        FROM
            Mentor
            JOIN Endorsement ON Mentor.mentorID = Endorsement.mentorID
            JOIN Skills ON Endorsement.skillsID = Skills.skillsID
        WHERE
            Mentor.location = ? 
            AND Mentor.schooling = ?;
    `;
    try {
        const [rows] = await db.query(query, [location, schooling]); 
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to retrieve mentors from ${location} with schooling ${schooling}`);
    }
};


const createRequest = async (req, res) => {
  const {message, hobbyistFirstName, hobbyistLastName, hobbyistPhoneNumber, mentorFirstName, mentorLastName, mentorPhoneNumber } = req.body;

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

   
    const [hobbyrow] = await db.query(hobbyistQuery, [hobbyistFirstName, hobbyistLastName, hobbyistPhoneNumber]);
    const [mentorrow] = await db.query(mentorQuery, [mentorFirstName, mentorLastName, mentorPhoneNumber]);

    if (hobbyrow.length === 0 || mentorrow.length === 0) {
      return res.status(404).send('Hobbyist or Mentor not found.');
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
    await db.query(insertQuery, [requestID, status, message, hobbyistID, mentorID]);

   
    res.status(200).send('Request created successfully.');
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).send('Failed to create request.');
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
      
      const [hobbyistResult] = await db.query(hobbyistQuery, [hobbyistFirstName, hobbyistLastName, hobbyistPhoneNumber]);
      const [mentorResult] = await db.query(mentorQuery, [mentorFirstName, mentorLastName, mentorPhoneNumber]);
      const [skillsResult] = await db.query(skillsQuery, [skillsName]);

      if (hobbyistResult.length === 0) return res.status(404).send('Hobbyist not found.');
      if (mentorResult.length === 0) return res.status(404).send('Mentor not found.');
      if (skillsResult.length === 0) return res.status(404).send('Skill not found.');

      const maxIdQuery = `SELECT MAX(endorsementID) AS maxId FROM Endorsement;`;
      const [maxIdResult] = await db.query(maxIdQuery);

      const endorsementID = (maxIdResult[0].maxId || 0) + 1;

      const hobbyistID = hobbyistResult[0].hobbyistID;
      const mentorID = mentorResult[0].mentorID;
      const skillsID = skillsResult[0].skillsID;

      const insertQuery = `
        INSERT INTO Endorsement (endorsementID, hobbyistID, mentorID, skillsID, date, comment)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      await db.query(insertQuery, [endorsementID, hobbyistID, mentorID, skillsID, date, comment]);

      res.status(200).send('Endorsement created successfully.');
    } catch (error) {
      console.error('Error creating endorsement:', error);
      res.status(500).send('Failed to create endorsement.');
    }
};


const getAllRequestByHobbyistInfo = async (req, res) => {
  const { fname, lname, phonenumber } = req.params;

  try {
    const hobbyistRequestsQuery = `
    SELECT
        Request.status,
        Request.message,
        CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorFullName,
        Mentor.schooling AS MentorSchooling,
        Mentor.description AS MentorDescription,
        Mentor.emailAddress AS MentorEmailAddress,
        Mentor.location AS MentorLocation,
        Mentor.phoneNumber AS MentorPhoneNumber
    FROM
        Request
        JOIN Mentor ON Request.mentorID = Mentor.mentorID
        JOIN Hobbyist ON Request.hobbyistID = Hobbyist.hobbyistID
    WHERE
        Hobbyist.phoneNumber = ?
        AND Hobbyist.firstName = ?
        AND Hobbyist.lastName = ?;
    `;

    const [results] = await db.query(hobbyistRequestsQuery, [phonenumber, fname, lname]);

    if (results.length === 0) {
        return res.status(404).json({ message: "No requests found for the specified hobbyist." });
    }

    res.status(200).json({
        message: "Requests fetched successfully.",
        data: results,
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching requests." });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const postsAndCommentsQuery = `
      SELECT
          Post.postContent AS PostContent,
          CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorFullName,
          Mentor.schooling AS MentorSchooling,
          Comment.reviewContent AS ReviewContent,
          CONCAT(Hobbyist.firstName, ' ', Hobbyist.lastName) AS HobbyistFullName
      FROM
          Post
          JOIN Mentor ON Post.mentorID = Mentor.mentorID
          JOIN Comment ON Post.postID = Comment.postID
          JOIN Hobbyist ON Comment.hobbyistID = Hobbyist.hobbyistID;
    `;

    const [results] = await db.query(postsAndCommentsQuery);

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts or comments found." });
    }

    res.status(200).json({
      message: "Posts and comments fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching posts and comments." });
  }
};

const getAllPostsAndCommentsByHobbyist = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber } = req.params;

    const postsAndCommentsQuery = `
      SELECT
          Post.postContent AS PostContent,
          CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorFullName,
          Mentor.schooling AS MentorSchooling,
          Comment.reviewContent AS ReviewContent,
          CONCAT(Hobbyist.firstName, ' ', Hobbyist.lastName) AS HobbyistFullName
      FROM
          Post
          JOIN Mentor ON Post.mentorID = Mentor.mentorID
          JOIN Comment ON Post.postID = Comment.postID
          JOIN Hobbyist ON Comment.hobbyistID = Hobbyist.hobbyistID
      WHERE
          Hobbyist.firstName = ? 
          AND Hobbyist.lastName = ? 
          AND Hobbyist.phoneNumber = ?;
    `;

    const [results] = await db.query(postsAndCommentsQuery, [firstname, lastname, phonenumber]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts or comments found for the specified hobbyist." });
    }

    res.status(200).json({
      message: "Posts and comments fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching posts and comments." });
  }
};

const getPostsBySkill = async (req, res) => {
  try {
    const { skillname } = req.params;

    const postsBySkillQuery = `
      SELECT
          Post.postContent AS PostContent,
          CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorFullName,
          Comment.reviewContent AS ReviewContent,
          CONCAT(Hobbyist.firstName, ' ', Hobbyist.lastName) AS HobbyistFullName,
          Skills.skillsName AS SkillName
      FROM
          Post
          JOIN Mentor ON Post.mentorID = Mentor.mentorID
          JOIN Endorsement ON Mentor.mentorID = Endorsement.mentorID
          JOIN Skills ON Endorsement.skillsID = Skills.skillsID
          JOIN Comment ON Post.postID = Comment.postID
          JOIN Hobbyist ON Comment.hobbyistID = Hobbyist.hobbyistID
      WHERE
          Skills.skillsName = ?;
    `;

    const [results] = await db.query(postsBySkillQuery, [skillname]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts or comments found for the specified skill." });
    }

    res.status(200).json({
      message: "Posts by skill fetched successfully.",
      data: results
    });

  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching posts by skill." });
  }
};


const getPostsByMentorLocation = async (req, res) => {
  try {
    const { location } = req.params;

    const postsByLocationQuery = `
      SELECT
          Post.postContent AS PostContent,
          CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorFullName,
          Mentor.location AS MentorLocation,
          Comment.reviewContent AS ReviewContent,
          CONCAT(Hobbyist.firstName, ' ', Hobbyist.lastName) AS HobbyistFullName
      FROM
          Post
          JOIN Mentor ON Post.mentorID = Mentor.mentorID
          JOIN Comment ON Post.postID = Comment.postID
          JOIN Hobbyist ON Comment.hobbyistID = Hobbyist.hobbyistID
      WHERE
          Mentor.location = ?;
    `;

    const [results] = await db.query(postsByLocationQuery, [location]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts or comments found for the specified location." });
    }

    res.status(200).json({
      message: "Posts by mentor location fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching posts by mentor location." });
  }
};

const getPostsAndCommentsByMentorSchooling = async (req, res) => {
  try {
    const { schooling } = req.params;

    const postsBySchoolingQuery = `
      SELECT
          Post.postContent AS PostContent,
          CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorFullName,
          Mentor.schooling AS MentorSchooling,
          Comment.reviewContent AS ReviewContent,
          CONCAT(Hobbyist.firstName, ' ', Hobbyist.lastName) AS HobbyistFullName
      FROM
          Post
          JOIN Mentor ON Post.mentorID = Mentor.mentorID
          JOIN Comment ON Post.postID = Comment.postID
          JOIN Hobbyist ON Comment.hobbyistID = Hobbyist.hobbyistID
      WHERE
          Mentor.schooling = ?;
    `;

    const [results] = await db.query(postsBySchoolingQuery, [schooling]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts or comments found for the specified schooling." });
    }

    res.status(200).json({
      message: "Posts and comments by mentor schooling fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching posts and comments by mentor schooling." });
  }
};

const getPostsBySkillLocationSchooling = async (req, res) => {
  try {
    const { skillname, location, schooling } = req.params;

    const postsBySkillLocationSchoolingQuery = `
      SELECT
          Post.postContent AS PostContent,
          CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorFullName,
          Mentor.location AS MentorLocation,
          Mentor.schooling AS MentorSchooling,
          Skills.skillsName AS SkillName,
          Comment.reviewContent AS ReviewContent,
          CONCAT(Hobbyist.firstName, ' ', Hobbyist.lastName) AS HobbyistFullName
      FROM
          Post
          JOIN Mentor ON Post.mentorID = Mentor.mentorID
          JOIN Comment ON Post.postID = Comment.postID
          JOIN Hobbyist ON Comment.hobbyistID = Hobbyist.hobbyistID
          JOIN Endorsement ON Mentor.mentorID = Endorsement.mentorID
          JOIN Skills ON Endorsement.skillsID = Skills.skillsID
      WHERE
          Skills.skillsName = ?
          AND Mentor.location = ?
          AND Mentor.schooling = ?;
    `;

    const [results] = await db.query(postsBySkillLocationSchoolingQuery, [skillname, location, schooling]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No posts or comments found for the specified criteria." });
    }

    res.status(200).json({
      message: "Posts by skill, location, and schooling fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching posts by skill, location, and schooling." });
  }
};


const createComment = async (req, res) => {
  const { reviewContent, postID, hobbyistFName, hobbyistLastName, hobbyistPhoneNumber } = req.body;

  const queryHobbyistID = `
  SELECT hobbyistID 
  FROM Hobbyist 
  WHERE firstName = ? AND lastName = ? AND phoneNumber = ?;
`;

  const [result] = await db.query(queryHobbyistID, [hobbyistFName, hobbyistLastName, hobbyistPhoneNumber]);

        if (result.length === 0) {
            return res.status(404).send('Hobbyist not found.');
        }
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
      res.status(201).send('Comment added successfully.');
  } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Failed to add comment.');
  }
};

const getHobbyistComments = async (req, res) => {
  try {
    const hobbyistCommentsQuery = `
      SELECT
          Comment.reviewContent AS ReviewContent,
          CONCAT(Hobbyist.firstName, ' ', Hobbyist.lastName) AS HobbyistFullName,
          Post.postContent AS PostContent
      FROM
          Comment
          JOIN Hobbyist ON Comment.hobbyistID = Hobbyist.hobbyistID
          JOIN Post ON Comment.postID = Post.postID
    `;

    const [results] = await db.query(hobbyistCommentsQuery);

    if (results.length === 0) {
      return res.status(404).json({ message: "No comments found for any hobbyist." });
    }

    res.status(200).json({
      message: "Hobbyist comments fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching hobbyist comments." });
  }
};

// Hobbyist/Event 
const getAllEvents = async (req, res) => {
  try {
  
    const eventsQuery = `
      SELECT
          Event.eventName,
          Event.startTime,
          Event.endTime,
          Event.location,
          Event.description,
          Event.date,
          Skills.skillsName
      FROM
          Event
      JOIN
          Skills ON Event.skillID = Skills.skillsID;
    `;

    const [results] = await db.query(eventsQuery);

    if (results.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }

    res.status(200).json({
      message: "Events fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching events." });
  }
};


const getTopEventPosts = async (req, res) => {
  try {
    const topEventsQuery = `
      SELECT
          Event.eventName AS EventName,
          Event.startTime AS StartTime,
          Event.endTime AS EndTime, 
          Event.location,
          Event.description, 
          Event.date, 
          COUNT(Post.postID) AS TotalPosts
      FROM Event
      JOIN Mentor ON Event.skillID IN (
          SELECT skillID
          FROM hasSkills
          WHERE hasSkills.mentorID = Mentor.mentorID
      )
      JOIN Post ON Mentor.mentorID = Post.mentorID
      GROUP BY
      Event.eventName,
      Event.startTime,
      Event.endTime,
      Event.location,
      Event.description,
      Event.date
      ORDER BY TotalPosts DESC
      LIMIT 10;
    `;

    const [results] = await db.query(topEventsQuery);

    if (results.length === 0) {
      return res.status(404).json({ message: "No events found with posts." });
    }

    res.status(200).json({
      message: "Top events fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching top events." });
  }
};

const getEventsBySkill = async (req, res) => {
  try {
    const { skillname } = req.params;
    
    const query = `
      SELECT
        Event.eventName AS EventName,
        Event.startTime AS StartTime,
        Event.endTime AS EndTime,
        Event.location AS Location,
        Event.description AS Description,
        Event.date AS EventDate,
        Skills.skillsName AS SkillName
      FROM
        Event
        JOIN Skills ON Event.skillID = Skills.skillsID
      WHERE
        Skills.skillsName = ?;
    `;
    
    const [results] = await db.query(query, [skillname]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No events found for the specified skill." });
    }

    res.status(200).json({
      message: "Events fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching events by skill." });
  }
};


const getEventsByLocation = async (req, res) => {
  try {
    const { location } = req.params;

    const query = `
      SELECT
        Event.eventName AS EventName,
        Event.startTime AS StartTime,
        Event.endTime AS EndTime,
        Event.location AS Location,
        Event.description AS Description,
        Event.date AS EventDate,
        Skills.skillsName AS SkillName
      FROM
        Event
        JOIN Skills ON Event.skillID = Skills.skillsID
      WHERE
        Event.location = ?;
    `;
    
    const [results] = await db.query(query, [location]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No events found for the specified location." });
    }

    res.status(200).json({
      message: "Events fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching events by location." });
  }
};

const getEventsByMentorSchooling = async (req, res) => {
  try {
    const { schooling } = req.params;

    const query = `
      SELECT
        Event.eventName AS EventName,
        Event.startTime AS StartTime,
        Event.endTime AS EndTime, 
        Event.location AS Location,
        Event.description AS Description, 
        Event.date AS EventDate,
        Mentor.schooling AS MentorSchooling,
        CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorName
      FROM
        Event
        JOIN Attendance ON Event.eventID = Attendance.eventID
        JOIN Mentor ON Attendance.mentorID = Mentor.mentorID
      WHERE
        Mentor.schooling = ?;
    `;
    
    const [results] = await db.query(query, [schooling]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No events found for the specified mentor schooling." });
    }

    res.status(200).json({
      message: "Events fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching events by mentor schooling." });
  }
};

const getEventsBySkillLocationSchooling = async (req, res) => {
  try {
    const { skillname, location, schooling } = req.params;

    const query = `
      SELECT
        Event.eventName AS EventName,
        Event.startTime AS StartTime,
        Event.endTime AS EndTime,
        Event.location AS Location,
        Event.description AS Description,
        Event.date AS EventDate,
        Skills.skillsName AS SkillName,
        CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorName,
        Mentor.schooling AS MentorSchooling
      FROM
        Event
        JOIN Skills ON Event.skillID = Skills.skillsID
        JOIN Attendance ON Event.eventID = Attendance.eventID
        JOIN Mentor ON Attendance.mentorID = Mentor.mentorID
      WHERE
        Skills.skillsName = ?
        AND Event.location = ?
        AND Mentor.schooling = ?;
    `;
    
    const [results] = await db.query(query, [skillname, location, schooling]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No events found for the specified skill, location, and mentor schooling." });
    }

    res.status(200).json({
      message: "Events fetched successfully.",
      data: results
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching events by skill, location, and mentor schooling." });
  }
};

const getEventsByHobbyist = async (req, res) => {
  try {
    const { fname, lname, phonenumber } = req.params;

    const hobbyistQuery = `
      SELECT hobbyistID
      FROM Hobbyist
      WHERE firstName = ? AND lastName = ? AND phoneNumber = ?;
    `;

    const [hobbyistResults] = await db.query(hobbyistQuery, [fname, lname, phonenumber]);

    if (hobbyistResults.length === 0) {
      return res.status(404).json({ message: "Hobbyist not found with the provided details." });
    }

    const hobbyistId = hobbyistResults[0].hobbyistID;

    const eventsQuery = `
      SELECT
        Event.eventName AS EventName,
        Event.startTime AS StartTime,
        Event.endTime AS EndTime,
        Event.location AS Location,
        Event.description AS Description,
        Event.date AS EventDate,
        CONCAT(Hobbyist.firstName, ' ', Hobbyist.lastName) AS HobbyistName
      FROM
        Attendance
        JOIN Event ON Attendance.eventID = Event.eventID
        JOIN Hobbyist ON Attendance.hobbyistID = Hobbyist.hobbyistID
      WHERE
        Attendance.hobbyistID = ?;
    `;

    const [eventsResults] = await db.query(eventsQuery, [hobbyistId]);

    if (eventsResults.length === 0) {
      return res.status(404).json({ message: "No events found for the specified hobbyist." });
    }

    res.status(200).json({
      message: "Events fetched successfully.",
      data: eventsResults
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching events by hobbyist." });
  }
};



module.exports = { getTopEventPosts, getAllEvents, getHobbyistComments, getAllPostsAndCommentsByHobbyist, getMentorEndorsements, toptenmentorsbasedonrequest, getMentors, deleteHobbyist,getAllRequestByHobbyistInfo, getAllPosts, getPostsBySkill, getPostsByMentorLocation,createComment, createEndorsement, createHobbyist, getMentorsWithSkills,
    getMentorsFromLocation,
    getMentorsWithSkillsAndLocation,
    getMentorsWithSkillsAndSchooling,
    getMentorsFromLocationAndSchooling, createRequest, getPostsAndCommentsByMentorSchooling,
    getPostsBySkillLocationSchooling,getEventsBySkill, getEventsByLocation, getEventsByMentorSchooling, getEventsBySkillLocationSchooling, getEventsByHobbyist
  } 