const express = require("express");
const router = express.Router();
const mentorController = require("../controller/mentorController");

// /general
router.get("/getskills", mentorController.getSkills);

// /mentor
router.post("/creatementor/", mentorController.createMentor);
router.post("/addmentorskill/", mentorController.addmentorSkill);
router.delete(
  "/deletementor/:fname/:lname/:phonenumber",
  mentorController.deleteMentor
);

// /mentor/findhobbyiest
router.get("/getallhobbyists", mentorController.getHobbyists);
router.get(
  "/findhobbyiestbyname/:fname/:lname",
  mentorController.retrieveHobbyiestByName
);
router.get(
  "/findhobbyiestbylocation/:location",
  mentorController.retrieveHobbyiestByLocation
);
router.get(
  "/findhobbyiestbyschool/:school",
  mentorController.retrieveHobbyiestBySchool
);
router.get(
  "/findhobbyiestbynamelocationschool/:fname/:lname/:location/:school",
  mentorController.retrieveHobbyiestByNameLocationSchool
);

// /mentor/request
router.get(
  "/retriveallhobbyiestrequest/:fname/:lname/:phonenumber",
  mentorController.retrieveAllHobbyistRequests
);
router.get(
  "/retrivehobbyiestrequestbystatus/:fname/:lname/:phonenumber/:status",
  mentorController.retrieveHobbyistRequestsByStatus
);
router.put(
  "/updatehobbyiestrequest/:status/:requestid",
  mentorController.updateHobbyistRequestStatus
); // fix frontend

// /mentor/post
router.post("/createpost", mentorController.createPost);
router.get(
  "/retrieveallpost/:fname/:lname/:phonenumber",
  mentorController.retrieveAllPosts
);

// /mentor/events
router.post("/createevent", mentorController.createEvent);
router.post("/createeventattendence", mentorController.createEventAttendance);
router.get(
  "/retrivevementoreventAttendance/:firstname/:lastname/:phonenumber",
  mentorController.getMentorEventAttendance
); // Complex Query
router.get(
  "/retrieveeventinfobyid/:eventid",
  mentorController.retrieveEventInformationByID
);
router.get(
  "/retrieveeventinfobyname/:eventname",
  mentorController.retrieveEventInformationByName
);
router.get(
  "/retrieveallevents/:fname/:lname/:phonenumber",
  mentorController.retrieveAllEvents
);

module.exports = router;
