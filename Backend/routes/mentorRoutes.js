const express = require("express");
const router = express.Router();
const mentorController = require("../controller/mentorController");

// Define the route to get a mentor by ID
// router.get("/:mentorId", mentorController.getMentorByID); // Using the controller's function for this endpoint

// /mentor
// DONE DONE
router.post("/creatementor/", mentorController.createMentor);

// DONE DONE
router.post("/addmentorskill/", mentorController.addmentorSkill);
// router.delete('/deletementor/:fname/:lname/:phonenumber', mentorController.deleteMentor);

// /mentor/findhobbyiest

// DONE DONE
router.get(
  "/findhobbyiestbyname/:fname/:lname",
  mentorController.retrieveHobbyiestByName
);

// DONE DONE
router.get(
  "/findhobbyiestbylocation/:location",
  mentorController.retrieveHobbyiestByLocation
);

// DONE DONE
router.get(
  "/findhobbyiestbyschool/:school",
  mentorController.retrieveHobbyiestBySchool
);

// DONE DONE
router.get(
  "/findhobbyiestbynamelocationschool/:fname/:lname/:location/:school",
  mentorController.retrieveHobbyiestByNameLocationSchool
);

// /mentor/request
// DONE DONE
router.get(
  "/retriveallhobbyiestrequest/:fname/:lname/:phonenumber",
  mentorController.retrieveAllHobbyistRequests
);

// DONE DONE
router.get(
  "/retrivehobbyiestrequestbystatus/:fname/:lname/:phonenumber/:status",
  mentorController.retrieveHobbyistRequestsByStatus
);

// DONE DONE
router.put(
  "/updatehobbyiestrequest/:status/:requestid",
  mentorController.updateHobbyistRequestStatus
);

// /mentor/post
// DONE DONE
router.post("/createpost", mentorController.createPost);

// DONE DONE
router.get(
  "/retrieveallpost/:fname/:lname/:phonenumber",
  mentorController.retrieveAllPosts
);

// /mentor/events
// DONE DONE
router.post("/createevent", mentorController.createEvent);
// DONE DONE
router.post("/createeventattendence", mentorController.createEventAttendance);

// DONE DONE
router.get(
  "/retrieveeventinfobyid/:eventid",
  mentorController.retrieveEventInformationByID
);
// DONE DONE
router.get(
  "/retrieveeventinfobyname/:eventname",
  mentorController.retrieveEventInformationByName
);

// DONE DONE
router.get(
  "/retrieveallevents/:fname/:lname/:phonenumber",
  mentorController.retrieveAllEvents
);

module.exports = router;
