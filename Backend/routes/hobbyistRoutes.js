const express = require("express");
const router = express.Router();
const hobbyistController = require("../controller/hobbyistController");

// /Hobbyist
router.post("/createhobbyist", hobbyistController.createHobbyist); // Need to fix front end
router.delete(
  "/deletehobbyist/:fname/:lname/:phonenumber",
  hobbyistController.deleteHobbyist
); // need to implement frontend

// /Hobbyist/Findmentor
// router.get('/getallmentors', mentorController.getMentors); // need to test
// router.get('/getallmentorskills', mentorController.getAllMentorSkills); need to implement
// router.get('/toptenmentorsbasedonrequest', mentorController.toptenmentorsbasedonrequest); // Need to implement
// router.get(
//   "/getmentorEndorsements/:firstName/:lastName/:phonenumber",
//   mentorController.getMentorEndorsements
// );
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
); // Need to implement

// /Hobbyist/Post
// router.get('/getAllPosts', postController.getAllPosts); // need to implement
router.get(
  "/getPostsAndCommentsByHobbyist/:firstName/:lastName",
  hobbyistController.getAllPostsAndCommentsByHobbyist
); // need to implement
router.get("/getPostsBySkill/:skillsName", hobbyistController.getPostsBySkill); // need to implement
router.get(
  "/getPostsByMentorLocation/:location",
  hobbyistController.getPostsByMentorLocation
); // need to implement
router.get(
  "/getPostsAndCommentsByMentorSchooling/:schooling",
  hobbyistController.getPostsAndCommentsByMentorSchooling
); // need to implement
router.get(
  "/getPostsBySkillLocationSchooling/:skillName/:location/:schooling",
  hobbyistController.getPostsBySkillLocationSchooling
); // need to implement
router.post("/createcomment", hobbyistController.createComment); // need to implement frontend
// router.get('/hobbyistComments', mentorController.getHobbyistComments); // need to implement

// /Hobbyist/Event
// router.get('/getallevents', mentorController.getAllEvents); // need to implement
// router.get('/topEventPosts', mentorController.getTopEventPosts); // need to implement
router.get("/geteventsbyskill/:skillname", hobbyistController.getEventsBySkill); // need to implement
router.get(
  "/geteventsbylocation/:location",
  hobbyistController.getEventsByLocation
); // need to implement
router.get(
  "/geteventsbymentorschooling/:schooling",
  hobbyistController.getEventsByMentorSchooling
); // need to implement
router.get(
  "/geteventsbyskilllocationschooling/:skillname/:location/:schooling",
  hobbyistController.getEventsBySkillLocationSchooling
); // need to be implement
router.get("/geteventsbyhobbyist", hobbyistController.getEventsByHobbyist); // need to implement

module.exports = router;
