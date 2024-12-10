const express = require("express");
const router = express.Router();
const hobbyistController = require("../controller/hobbyistController");

// /Hobbyist
router.post("/createhobbyist", hobbyistController.createHobbyist);
router.delete(
  "/deletehobbyist/:fname/:lname/:phonenumber",
  hobbyistController.deleteHobbyist
); // need to implement frontend

// DONE DONE
router.delete(
  "/deletehobbyist/:fname/:lname/:phonenumber",
  hobbyistController.deleteHobbyist
);

// /Hobbyist/Findmentor
router.get("/getallmentors", hobbyistController.getMentors); // need to implement frontend
router.get(
  "/toptenmentorsbasedonrequest",
  hobbyistController.toptenmentorsbasedonrequest
); // Need to implement frontend
router.get(
  "/getmentorendorsementsbyskill/:firstname/:lastname/:phonenumber",
  hobbyistController.getMentorEndorsements
);
router.get(
  "/getmentorsbyskills/:skill",
  hobbyistController.getMentorsWithSkills
); // need to implement frontend
router.get(
  "/getmentorsbylocation/:location",
  hobbyistController.getMentorsFromLocation
); // need to implement frontend
router.get(
  "/getmentorsbyskillslocation/:skill/:location",
  hobbyistController.getMentorsWithSkillsAndLocation
); // need to implement frontend
router.get(
  "/getmentorsbyskillsschooling/:skill/:schooling",
  hobbyistController.getMentorsWithSkillsAndSchooling
); // need to implement frontend
router.get(
  "/getmentorsbylocationschooling/:location/:schooling",
  hobbyistController.getMentorsFromLocationAndSchooling
); // need to implement frontend
router.post("/createrequest", hobbyistController.createRequest); // Need to fix front end
router.post("/createendorsement", hobbyistController.createEndorsement); // need to implement frontend
router.get(
  "/getallrequestbyhobbyistinfo/:fname/:lname/:phonenumber",
  hobbyistController.getAllRequestByHobbyistInfo
); // Need to implement frontend

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
router.get("/getallevents", hobbyistController.getAllEvents); // need to implement frontend
router.get("/gettopevents", hobbyistController.getTopEventPosts); // need to implement in the frontend
router.get("/geteventsbyskill/:skillname", hobbyistController.getEventsBySkill); // need to implement in frontend
router.get(
  "/geteventsbylocation/:location",
  hobbyistController.getEventsByLocation
); // need to implement in frontend
router.get(
  "/geteventsbymentorschooling/:schooling",
  hobbyistController.getEventsByMentorSchooling
); // need to implement in frontend
router.get(
  "/geteventsbyskilllocationschooling/:skillname/:location/:schooling",
  hobbyistController.getEventsBySkillLocationSchooling
); // need to implement in frontend
router.get(
  "/geteventsbyhobbyist/:fname/:lname/:phonenumber",
  hobbyistController.getEventsByHobbyist
); // need to implement in frontend

module.exports = router;
