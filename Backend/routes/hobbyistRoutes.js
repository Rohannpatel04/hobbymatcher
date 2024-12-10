const express = require("express");
const router = express.Router();
const hobbyistController = require("../controller/hobbyistController");

// /Hobbyist
router.post("/createhobbyist", hobbyistController.createHobbyist);

// /Hobbyist/findmentor
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

//No id insert needed
router.post("/createendorsement", hobbyistController.createEndorsement);

module.exports = router;
