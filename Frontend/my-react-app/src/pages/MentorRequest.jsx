import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/MentorRequest.css";

function MentorRequest() {
  // Mentor Form Data
  const [mentorData, setMentorData] = useState({
    name: "",
    phonenumber: "",
  });

  // Mentor with Status Form Data
  const [mentorStatusData, setMentorStatusData] = useState({
    name: "",
    phonenumber: "",
    status: "",
  });

  // Request Form Data
  const [requestData, setRequestData] = useState({
    requestID: "",
    status: "",
  });

  // Handle Mentor Form Changes
  const handleMentorChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  // Handle Mentor with Status Form Changes
  const handleMentorStatusChange = (e) => {
    const { name, value } = e.target;
    setMentorStatusData({
      ...mentorStatusData,
      [name]: value,
    });
  };

  // Handle Request Form Changes
  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequestData({
      ...requestData,
      [name]: value,
    });
  };

  // Handle Form Submissions
  const handleSubmit = (e, formType) => {
    e.preventDefault();
    if (formType === "mentor") {
      console.log("Mentor Data Saved:", mentorData);
    } else if (formType === "mentorStatus") {
      console.log("Mentor with Status Data Saved:", mentorStatusData);
    } else if (formType === "request") {
      console.log("Request Data Saved:", requestData);
    }
  };

  return (
    <div className="mentor-container">
      {/* Mentor Form */}
      <h2>Mentor Information</h2>
      <form onSubmit={(e) => handleSubmit(e, "mentor")} className="mentor-form">
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Mentor Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={mentorData.name}
            onChange={handleMentorChange}
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
            value={mentorData.phonenumber}
            onChange={handleMentorChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Save Mentor Data
        </button>
      </form>
      <h3>Mentor Preview:</h3>
      <pre className="preview-box">{JSON.stringify(mentorData, null, 2)}</pre>

      <hr />

      {/* Mentor with Status Form */}
      <h2>Mentor with Status</h2>
      <form
        onSubmit={(e) => handleSubmit(e, "mentorStatus")}
        className="mentor-status-form"
      >
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Mentor Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={mentorStatusData.name}
            onChange={handleMentorStatusChange}
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
            value={mentorStatusData.phonenumber}
            onChange={handleMentorStatusChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="status" className="form-label">
            Mentor Status:
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={mentorStatusData.status}
            onChange={handleMentorStatusChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Save Mentor with Status Data
        </button>
      </form>
      <h3>Mentor with Status Preview:</h3>
      <pre className="preview-box">
        {JSON.stringify(mentorStatusData, null, 2)}
      </pre>

      <hr />

      {/* Request Form */}
      <h2>Update Request</h2>
      <form
        onSubmit={(e) => handleSubmit(e, "request")}
        className="request-form"
      >
        <div className="form-field">
          <label htmlFor="requestID" className="form-label">
            Request ID:
          </label>
          <input
            type="text"
            id="requestID"
            name="requestID"
            value={requestData.requestID}
            onChange={handleRequestChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="status" className="form-label">
            Status:
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={requestData.status}
            onChange={handleRequestChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Save Request Data
        </button>
      </form>
      <h3>Request Preview:</h3>
      <pre className="preview-box">{JSON.stringify(requestData, null, 2)}</pre>
    </div>
  );
}

export default MentorRequest;
