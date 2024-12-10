const express = require('express');
const router = express.Router(); 
const mentorController = require('../controller/mentorController'); 

// Define the route to get a mentor by ID

// /general 
// router.get('/getskills', skillsController.getSkills); // Need to implement 


// /mentor
router.post('/creatementor/', mentorController.createMentor); // Need to fix front end no mode id needed 
router.post('/addmentorskill/', mentorController.addmentorSkill); 
router.delete('/deletementor/:fname/:lname/:phonenumber', mentorController.deleteMentor); // Need to implement in the frontend 

// /mentor/findhobbyiest 
router.get('/getallhobbyists', hobbyistController.getHobbyists); // need to test 
router.get('/findhobbyiestbyname/:fname/:lname', mentorController.retrieveHobbyiestByName); 
router.get('/findhobbyiestbylocation/:location', mentorController.retrieveHobbyiestByLocation); 
router.get('/findhobbyiestbyschool/:school', mentorController.retrieveHobbyiestBySchool); 
router.get('/findhobbyiestbynamelocationschool/:fname/:lname/:location/:school', mentorController.retrieveHobbyiestByNameLocationSchool);

// /mentor/request
router.get('/retriveallhobbyiestrequest/:fname/:lname/:phonenumber', mentorController.retrieveAllHobbyistRequests); 
router.get('/retrivehobbyiestrequestbystatus/:fname/:lname/:phonenumber/:status', mentorController.retrieveHobbyistRequestsByStatus); 
router.put('/updatehobbyiestrequest/:status/:requestid', mentorController.updateHobbyistRequestStatus); 

// /mentor/post
router.post('/createpost', mentorController.createPost); // Need to fix front end  taking mentor info instead of mentor id now 
router.get('/retrieveallpost/:fname/:lname/:phonenumber', mentorController.retrieveAllPosts); 

// /mentor/events 
router.post('/createevent',mentorController.createEvent); // Need to fix front end no more id needed 
router.post('/createeventattendence', mentorController.createEventAttendance); // Need to fix front end taking in mentor and hobbyist info and no id anymore 
// router.get('/mentorEvents/:firstName/:lastName', mentorController.getMentorEventAttendance); // Need to implement 
router.get('/retrieveeventinfobyid/:eventid', mentorController.retrieveEventInformationByID);
router.get('/retrieveeventinfobyname/:eventname', mentorController.retrieveEventInformationByName);
router.get('/retrieveallevents/:fname/:lname/:phonenumber', mentorController.retrieveAllEvents); 

module.exports = router;
