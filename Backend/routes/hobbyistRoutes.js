const express = require("express");
const router = express.Router();
const hobbyistController = require("../controller/hobbyistController");

// /Hobbyist
router.post("/createhobbyist", hobbyistController.createHobbyist);

router.delete(
  "/deletehobbyist/:fname/:lname/:phonenumber",
  hobbyistController.deleteHobbyist
);

// /Hobbyist/Findmentor
router.get("/getallmentors", hobbyistController.getMentors);
router.get(
  "/toptenmentorsbasedonrequest",
  hobbyistController.toptenmentorsbasedonrequest
);

router.get(
  "/getmentorendorsementsbyskill/:firstname/:lastname/:phonenumber",
  hobbyistController.getMentorEndorsements
);
router.get(
  "/getmentorsbyskills/:skill",
  hobbyistController.getMentorsWithSkills
);
router.get(
  "/getmentorsbylocation/:location",
  hobbyistController.getMentorsFromLocation
);
router.get(
  "/getmentorsbyskillslocation/:skill/:location",
  hobbyistController.getMentorsWithSkillsAndLocation
);
router.get(
  "/getmentorsbyskillsschooling/:skill/:schooling",
  hobbyistController.getMentorsWithSkillsAndSchooling
);
router.get(
  "/getmentorsbylocationschooling/:location/:schooling",
  hobbyistController.getMentorsFromLocationAndSchooling
);
router.post("/createrequest", hobbyistController.createRequest);
router.post("/createendorsement", hobbyistController.createEndorsement);
router.get(
  "/getallrequestbyhobbyistinfo/:fname/:lname/:phonenumber",
  hobbyistController.getAllRequestByHobbyistInfo
);

// /Hobbyist/Post
router.get("/getAllPosts", hobbyistController.getAllPosts); // need to implement frontend
router.get(
  "/getpostsandcommentsbyhobbyist/:firstname/:lastname/:phonenumber",
  hobbyistController.getAllPostsAndCommentsByHobbyist
); // need to implement in frontend. (Get all posts where the hobbyist commented)
router.get("/getpostsbyskill/:skillname", hobbyistController.getPostsBySkill); // need to implement frontend
router.get(
  "/getpostsbymentorlocation/:location",
  hobbyistController.getPostsByMentorLocation
); // need to implement in frontend
router.get(
  "/getpostsandcommentsbymentorschooling/:schooling",
  hobbyistController.getPostsAndCommentsByMentorSchooling
); // need to implement in frontend
router.get(
  "/getpostsbyskilllocationschooling/:skillname/:location/:schooling",
  hobbyistController.getPostsBySkillLocationSchooling
); // need to implement in frontend
router.post("/createcomment", hobbyistController.createComment); // need to implement frontend

// /Hobbyist/Event
router.get("/getallevents", hobbyistController.getAllEvents);
router.get("/gettopevents", hobbyistController.getTopEventPosts);
router.get("/geteventsbyskill/:skillname", hobbyistController.getEventsBySkill);
router.get(
  "/geteventsbylocation/:location",
  hobbyistController.getEventsByLocation
);
router.get(
  "/geteventsbymentorschooling/:schooling",
  hobbyistController.getEventsByMentorSchooling
);
router.get(
  "/geteventsbyskilllocationschooling/:skillname/:location/:schooling",
  hobbyistController.getEventsBySkillLocationSchooling
);
router.get(
  "/geteventsbyhobbyist/:fname/:lname/:phonenumber",
  hobbyistController.getEventsByHobbyist
);

module.exports = router;
