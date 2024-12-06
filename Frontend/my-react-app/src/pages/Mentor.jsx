import React, { useState } from "react";
import "../css/Mentor.css";

function Mentor() {
  // Mentor Form Data
  const [mentorData, setMentorData] = useState({
    MentorID: "",
    name: "",
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
    name: "",
    phonenumber: "",
  });

  // Handle Mentor Form Changes
  const handleMentorChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
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

  // Handle Form Submissions
  const handleSubmit = (e, formType) => {
    e.preventDefault();
    if (formType === "mentor") {
      console.log("Mentor Data Saved:", mentorData);
    } else if (formType === "hobbyist") {
      console.log("Hobbyist Data Saved:", hobbyistData);
    } else if (formType === "deleteMentor") {
      console.log("Delete Mentor Data:", deleteMentorData);
    }
  };

  return (
    <div className="mentor-container">
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

      <h2>Create New Endorsement</h2>
      {/* Hobbyist Form */}
      <form
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

      <hr />

      <h2>Delete Mentor</h2>
      {/* Delete Mentor Form */}
      <form
        onSubmit={(e) => handleSubmit(e, "deleteMentor")}
        className="mentor-form"
      >
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Mentor Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={deleteMentorData.name}
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
    </div>
  );
}

export default Mentor;
