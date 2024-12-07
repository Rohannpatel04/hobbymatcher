import React, { useState } from "react";
import "../css/MentorEvents.css";

function MentorEvents() {
  // Event Form Data
  const [eventData, setEventData] = useState({
    eventID: "",
    eventName: "",
    startTime: "",
    location: "",
    description: "",
    date: "",
    skillID: "",
    endTime: "",
  });

  // Attendance Form Data
  const [attendanceData, setAttendanceData] = useState({
    attendanceID: "",
    role: "",
    eventID: "",
    hobbyistID: "",
    mentorID: "",
  });

  // Mentor Contact Form Data
  const [mentorData, setMentorData] = useState({
    name: "",
    phonenumber: "",
  });

  // Handle Event Form Changes
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  // Handle Attendance Form Changes
  const handleAttendanceChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData({
      ...attendanceData,
      [name]: value,
    });
  };

  // Handle Mentor Form Changes
  const handleMentorChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  // Handle Form Submissions
  const handleSubmit = (e, formType) => {
    e.preventDefault();
    if (formType === "event") {
      console.log("Event Data Saved:", eventData);
    } else if (formType === "attendance") {
      console.log("Attendance Data Saved:", attendanceData);
    } else if (formType === "mentor") {
      console.log("Mentor Data Saved:", mentorData);
    }
  };

  return (
    <div className="forms-container">
      {/* Event Form */}
      <h2>Create Event</h2>
      <form onSubmit={(e) => handleSubmit(e, "event")} className="event-form">
        <div className="form-field">
          <label htmlFor="eventID" className="form-label">
            Event ID:
          </label>
          <input
            type="text"
            id="eventID"
            name="eventID"
            value={eventData.eventID}
            onChange={handleEventChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="eventName" className="form-label">
            Event Name:
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventData.eventName}
            onChange={handleEventChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="startTime" className="form-label">
            Start Time:
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={eventData.startTime}
            onChange={handleEventChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleEventChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleEventChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleEventChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="skillID" className="form-label">
            Skill ID:
          </label>
          <input
            type="text"
            id="skillID"
            name="skillID"
            value={eventData.skillID}
            onChange={handleEventChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="endTime" className="form-label">
            End Time:
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={eventData.endTime}
            onChange={handleEventChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Save Event Data
        </button>
      </form>
      <h3>Event Preview:</h3>
      <pre className="preview-box">{JSON.stringify(eventData, null, 2)}</pre>

      <hr />

      {/* Attendance Form */}
      <h2>Attendance</h2>
      <form
        onSubmit={(e) => handleSubmit(e, "attendance")}
        className="attendance-form"
      >
        <div className="form-field">
          <label htmlFor="attendanceID" className="form-label">
            Attendance ID:
          </label>
          <input
            type="text"
            id="attendanceID"
            name="attendanceID"
            value={attendanceData.attendanceID}
            onChange={handleAttendanceChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="role" className="form-label">
            Role:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={attendanceData.role}
            onChange={handleAttendanceChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="eventID" className="form-label">
            Event ID:
          </label>
          <input
            type="text"
            id="eventID"
            name="eventID"
            value={attendanceData.eventID}
            onChange={handleAttendanceChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="hobbyistID" className="form-label">
            Hobbyist ID:
          </label>
          <input
            type="text"
            id="hobbyistID"
            name="hobbyistID"
            value={attendanceData.hobbyistID}
            onChange={handleAttendanceChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="mentorID" className="form-label">
            Mentor ID:
          </label>
          <input
            type="text"
            id="mentorID"
            name="mentorID"
            value={attendanceData.mentorID}
            onChange={handleAttendanceChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Save Attendance Data
        </button>
      </form>
      <h3>Attendance Preview:</h3>
      <pre className="preview-box">
        {JSON.stringify(attendanceData, null, 2)}
      </pre>

      <hr />

      {/* Mentor Contact Form */}
      <h2>Mentor Contact</h2>
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
    </div>
  );
}

export default MentorEvents;
