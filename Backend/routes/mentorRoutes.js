const express = require("express");
const router = express.Router(); // Creates an instance of the router
const mentorController = require("../controller/mentorController"); // Import the mentor controller

// Define the route to get a mentor by ID
// router.get("/:mentorId", mentorController.getMentorByID); // Using the controller's function for this endpoint

// /mentor
// router.post('/creatementor/', mentorController.createMentor);
// router.delete('/deletementor/:fname/:lname/:phonenumber', mentorController.deleteMentor);

// /mentor/findhobbyiest

// DONE
router.get(
  "/findhobbyiestbyname/:fname/:lname",
  mentorController.retrieveHobbyiestByName
);
router.get(
  "/findhobbyiestbylocation/:location",
  mentorController.retrieveHobbyiestByLocation
);

// DONE
router.get(
  "/findhobbyiestbyschool/:school",
  mentorController.retrieveHobbyiestBySchool
);
router.get(
  "/findhobbyiestbynamelocationschool/:fname/:lname/:location/:school",
  mentorController.retrieveHobbyiestByNameLocationSchool
);

// /mentor/request
// DONE
router.get(
  "/retriveallhobbyiestrequest/:fname/:lname/:phonenumber",
  mentorController.retrieveAllHobbyistRequests
);

// DONE
router.get(
  "/retrivehobbyiestrequestbystatus/:fname/:lname/:phonenumber/:status",
  mentorController.retrieveHobbyistRequestsByStatus
);
router.get(
  "/updatehobbyiestrequest/:status/:requestid",
  mentorController.updateHobbyistRequestStatus
);

// /mentor/post
// DONE
router.post("/createpost", mentorController.createPost);

// DONE
router.get(
  "/retrieveallpost/:fname/:lname/:phonenumber",
  mentorController.retrieveAllPosts
);

// /mentor/events
// DONE
router.post("/createevent", mentorController.createEvent);
// DONE
router.post("/createeventattendence", mentorController.createEventAttendance);

// DONE
router.get(
  "/retrieveeventinfobyid/:eventid",
  mentorController.retrieveEventInformationByID
);
// DONE
router.get(
  "/retrieveeventinfobyname/:eventname",
  mentorController.retrieveEventInformationByName
);

// DONE
router.get(
  "/retrieveallevents/:fname/:lname/:phonenumber",
  mentorController.retrieveAllEvents
);

module.exports = router; // Export the router for use in the server.js
