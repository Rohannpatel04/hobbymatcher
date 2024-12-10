import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../css/Mentor.css";

function Mentor() {
  // const baseUrl = "http://localhost:3000";
  // MentorID Form Data
  // const [mentorIDData, setMentorIDData] = useState({
  //   mentorID: "",
  // });
  // const [mentorResultData, setMentorResultData] = useState(null);
  const [mentorData, setMentorData] = useState({
    firstName: "",
    lastName: "",
    emailaddress: "",
    phonenumber: "",
    schooling: "",
    description: "",
    location: "",
  });

  // Hobbyist Form Data
  const [hobbyistData, setHobbyistData] = useState({
    HobbyiestID: "",
    MentorID: "",
    Date: "",
    comment: "",
    SkillsID: "",
    endorsementID: "",
  });

  // Delete Mentor Form Data
  const [deleteMentorData, setDeleteMentorData] = useState({
    firstName: "",
    lastName: "",
    phonenumber: "",
  });
  // useEffect(() => {
  //   // Only fetch if mentorIDData.mentorID is not empty
  //   if (mentorIDData.mentorID) {
  //     const fetchMentorData = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:3000/mentorData/${mentorIDData.mentorID}`
  //         );
  //         if (!response.ok) {
  //           throw new Error("Mentor not found");
  //         }
  //         const data = await response.json();
  //         setMentorResultData(data); // Set the result data when the fetch is successful
  //       } catch (error) {
  //         console.error("Error fetching mentor data:", error.message);
  //       }
  //     };

  //     fetchMentorData();
  //   }
  // }, [mentorIDData.mentorID]); // Dependency on mentorIDData.mentorID

  // Handle Mentor Form Changes
  const handleMentorChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  const [mentorSkillData, setMentorSkillData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    skillname: "",
    experiencelevel: "",
  });
  const handleMentorSkillsChange = (e) => {
    const { name, value } = e.target;
    setMentorSkillData({
      ...mentorSkillData,
      [name]: value,
    });
    console.log(mentorSkillData); // Check if mentorSkillData is updated here
  };

  // Handle Hobbyist Form Changes
  const handleHobbyistChange = (e) => {
    const { name, value } = e.target;
    setHobbyistData({
      ...hobbyistData,
      [name]: value,
    });
  };

  // Handle Delete Mentor Form Changes
  const handleDeleteMentorChange = (e) => {
    const { name, value } = e.target;
    setDeleteMentorData({
      ...deleteMentorData,
      [name]: value,
    });
  };

  // Handle MentorID Form Changes
  // const handleMentorIDChange = (e) => {
  //   const { name, value } = e.target;
  //   setMentorIDData({
  //     ...mentorIDData,
  //     [name]: value,
  //   });
  // };

  // Handle Form Submissions
  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    if (formType === "mentor") {
      try {
        const response = await fetch(
          "http://localhost:3001/mentor/creatementor",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: mentorData.firstName,
              lastName: mentorData.lastName,
              schooling: mentorData.schooling,
              description: mentorData.description,
              emailAddress: mentorData.emailaddress,
              location: mentorData.location,
              phoneNumber: mentorData.phonenumber,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert("mentor created successfully!");

        // Clear form after successful submission
      } catch (error) {
        console.error("Error creating mentor:", error);
        alert("Error creating mentor. Please try again.");
      }
    } else if (formType === "deleteMentor") {
      try {
        const response = await fetch(
          `http://localhost:3001/mentor/deletementor/${deleteMentorData.firstName}/${deleteMentorData.lastName}/${deleteMentorData.phonenumber}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //   // fname: deleteMentorData.firstName,
            //   // lname: deleteMentorData.lastName,
            //   // phonenumber: deleteMentorData.phonenumber,
            //   fname: "Russell",
            //   lname: "Wilson",
            //   phonenumber: "1234567890",
            // }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert("mentor deleted successfully!");

        // Clear form after successful submission
      } catch (error) {
        console.error("Error deleting mentor:", error.message);
        alert("Error deleting mentor. Please try again.");
      }
    } else if (formType === "mentorSkills") {
      // This is still in progress.
      const bodyData = {
        fname: mentorSkillData.firstName || null,
        lname: mentorSkillData.lastName || null,
        phonenumber: mentorSkillData.phoneNumber,
        skillname: mentorSkillData.skillname || null,
        experiencelevel: mentorSkillData.experiencelevel,
      };
      try {
        console.log(bodyData);
        const response = await fetch(
          "http://localhost:3001/mentor/addmentorskill",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //   fname: mentorSkillData.firstName,
            //   lname: mentorSkillData.lastName,
            //   phonenumber: mentorSkillData.phonenumber,
            //   skillname: mentorSkillData.skillname,
            //   experiencelevel: mentorSkillData.experiencelevel,

            //   // fname: "John",
            //   // lname: "Jackson",
            //   // phonenumber: "3423662345",
            //   // skillname: "Swimming",
            //   // experiencelevel: "10",
            // }),

            body: JSON.stringify(bodyData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert("mentor skills created successfully!");

        // Clear form after successful submission
      } catch (error) {
        console.error("Error creating mentor skills:", error);
        alert("Error creating mentor skills. Please try again.");
      }
    }
  };

  return (
    <div className="mentor-container">
      <div className="navigation-buttons">
        <Link to="/mentor/findhobbyist" className="nav-button">
          Find Hobbyist
        </Link>
        <Link to="/mentor/requests" className="nav-button">
          Mentor Requests
        </Link>
        <Link to="/mentor/post" className="nav-button">
          Create Mentor Post
        </Link>
        <Link to="/mentor/events" className="nav-button">
          Mentor Events
        </Link>
      </div>
      <h2>Create New Mentor</h2>
      {/* Mentor Form */}
      <form onSubmit={(e) => handleSubmit(e, "mentor")} className="mentor-form">
        {Object.keys(mentorData).map((field) => (
          <div key={field} className="form-field">
            <label htmlFor={field} className="form-label">
              {field}:
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={mentorData[field]}
              onChange={handleMentorChange}
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Save Mentor Data
        </button>
      </form>
      <h3>Mentor Preview:</h3>
      <pre className="preview-box">{JSON.stringify(mentorData, null, 2)}</pre>
      <hr />
      <h2>Add a new skill to Mentor</h2>
      {/* Mentor Form */}
      <form
        onSubmit={(e) => handleSubmit(e, "mentorSkills")}
        className="mentor-form"
      >
        {Object.keys(mentorSkillData).map((field) => (
          <div key={field} className="form-field">
            <label htmlFor={field} className="form-label">
              {field}:
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={mentorSkillData[field]}
              onChange={handleMentorSkillsChange}
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Save Mentor Data
        </button>
      </form>
      <h3>Mentor Data Preview:</h3>
      <pre>{JSON.stringify(mentorSkillData, null, 2)}</pre>{" "}
      {/* For better visualization */}
      <hr />
      {/* <h2>Create New Endorsement</h2> */}
      {/* Hobbyist Form */}
      {/* <form
        onSubmit={(e) => handleSubmit(e, "hobbyist")}
        className="hobbyist-form"
      >
        {Object.keys(hobbyistData).map((field) => (
          <div key={field} className="form-field">
            <label htmlFor={field} className="form-label">
              {field}:
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={hobbyistData[field]}
              onChange={handleHobbyistChange}
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Save Hobbyist Data
        </button>
      </form>
      <h3>Hobbyist Preview:</h3>
      <pre className="preview-box">{JSON.stringify(hobbyistData, null, 2)}</pre>

      <hr /> */}
      <h2>Delete Mentor</h2>
      {/* Delete Mentor Form */}
      <form
        onSubmit={(e) => handleSubmit(e, "deleteMentor")}
        className="mentor-form"
      >
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Mentor First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={deleteMentorData.firstName}
            onChange={handleDeleteMentorChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Mentor Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={deleteMentorData.lastName}
            onChange={handleDeleteMentorChange}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="phonenumber" className="form-label">
            Mentor Phone Number:
          </label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={deleteMentorData.phonenumber}
            onChange={handleDeleteMentorChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Delete Mentor Data
        </button>
      </form>
      <h3>Delete Mentor Preview:</h3>
      <pre className="preview-box">
        {JSON.stringify(deleteMentorData, null, 2)}
      </pre>
      <hr />
      {/* <h2>GET information with Mentor ID</h2> */}
      {/* Mentor ID Form */}
      {/* <form
        onSubmit={(e) => handleSubmit(e, "mentorID")}
        className="mentor-id-form"
      >
        <div className="form-field">
          <label htmlFor="mentorID" className="form-label">
            Mentor ID:
          </label>
          <input
            type="text"
            id="mentorID"
            name="mentorID"
            value={mentorIDData.mentorID}
            onChange={handleMentorIDChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Save Mentor ID
        </button>
      </form> */}
      {/* {mentorResultData && (
        <div className="mentor-result">
          <h3>Mentor Details:</h3>
          <pre>{JSON.stringify(mentorResultData, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default Mentor;
