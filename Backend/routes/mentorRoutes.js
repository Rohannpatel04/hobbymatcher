const express = require("express");
const router = express.Router();
const mentorController = require("../controller/mentorController");

// Define the route to get a mentor by ID

// /general
// router.get('/getskills', skillsController.getSkills); // Need to implement

// /mentor

// DONE DONE
router.post("/creatementor/", mentorController.createMentor);
// DONE DONE
router.post("/addmentorskill/", mentorController.addmentorSkill);

// DONE DONE
router.delete(
  "/deletementor/:fname/:lname/:phonenumber",
  mentorController.deleteMentor
);

// /mentor/findhobbyiest
// router.get("/getallhobbyists", hobbyistController.getHobbyists); // need to test

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

// DOES NOT WORK
router.post("/createeventattendence", mentorController.createEventAttendance); // Need to fix front end taking in mentor and hobbyist info and no id anymore
// router.get('/mentorEvents/:firstName/:lastName', mentorController.getMentorEventAttendance); // Need to implement

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
