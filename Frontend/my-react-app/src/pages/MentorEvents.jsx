import React, { useState, useEffect } from "react";
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
    hobbyistID: null,
    mentorID: null,
  });

  const [eventID, setEventID] = useState("");
  const [eventIDresult, setEventIDResult] = useState(null);
  useEffect(() => {
    // Only fetch if 'school' is not empty or whitespace
    if (eventID) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/retrieveeventinfobyid/${eventID}`
          );
          if (!response.ok) {
            throw new Error("events not found");
          }
          const data = await response.json();
          setEventIDResult(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching hobbyist data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [eventID]);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [eventAllresult, setEventAllResult] = useState(null);
  useEffect(() => {
    // Only fetch if 'school' is not empty or whitespace
    if (
      personalInfo.firstName &&
      personalInfo.lastName &&
      personalInfo.phoneNumber
    ) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/retrieveallevents/${personalInfo.firstName}/${personalInfo.lastName}/${personalInfo.phoneNumber}`
          );
          if (!response.ok) {
            throw new Error("events not found");
          }
          const data = await response.json();
          setEventAllResult(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching event data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [personalInfo.firstName, personalInfo.lastName, personalInfo.phoneNumber]);

  const [eventName, setEventName] = useState("");
  const [eventNameresult, setEventNameResult] = useState(null);
  useEffect(() => {
    // Only fetch if 'school' is not empty or whitespace
    if (eventName) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/retrieveeventinfobyname/${eventName}`
          );
          if (!response.ok) {
            throw new Error("events not found");
          }
          const data = await response.json();
          setEventNameResult(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching event data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [eventName]);

  const handleEventIDChange = (e) => setEventID(e.target.value);
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEventNameChange = (e) => setEventName(e.target.value);

  // Mentor Contact Form Data
  // const [mentorData, setMentorData] = useState({
  //   name: "",
  //   phonenumber: "",
  // });

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
  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    if (formType === "event") {
      e.preventDefault();
      try {
        const response = await fetch(
          "http://localhost:3001/mentor/createevent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventId: eventData.eventID,
              eventName: eventData.eventName,
              startTime: eventData.startTime,
              endTime: eventData.endTime,
              location: eventData.location,
              description: eventData.description,
              date: eventData.date,
              skillID: eventData.skillID,
              // eventId: 800000048,
              // eventName: eventData.role,
              // startTime: eventData.startTime,
              // endTime: eventData.endTime,
              // location: eventData.location,
              // description: eventData.description,
              // date: eventData.date,
              // skillID: eventData.skillID,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert("Event created successfully!");

        // Clear form after successful submission
      } catch (error) {
        console.error("Error creating event:", error);
        alert("Error creating event. Please try again.");
      }
    } else if (formType === "attendance") {
      e.preventDefault();
      try {
        const response = await fetch(
          "http://localhost:3001/mentor/createeventattendence",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              attendanceID: attendanceData.attendanceID,
              role: attendanceData.role,
              hobbyistID: attendanceData.hobbyistID,
              mentorID: attendanceData.mentorID,
              eventID: attendanceData.eventID,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert("Attendance created successfully!");

        // Clear form after successful submission
      } catch (error) {
        console.error("Error creating attendance:", error);
        alert("Error creating attendance. Please try again.");
      }
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

      {/* event information done by eventID */}
      <h2>Get event information by eventID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event ID:</label>
          <input type="text" value={eventID} onChange={handleEventIDChange} />
        </div>
        <button type="submit">Submit Event ID</button>
      </form>
      {eventIDresult ? (
        <table className="mentor-result-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Event name</th>
              <th>Event startime</th>
              <th>Event endtime</th>
              <th>Event location</th>
              <th>Event Description</th>
              <th>Attendance ID</th>
              <th>Attendance Role</th>
              <th>Attendance HobbyistID</th>
              <th>Attendance MentorID</th>
            </tr>
          </thead>
          <tbody>
            {eventIDresult.map((item, index) => (
              <tr key={index}>
                <td>{item.eventID}</td>
                <td>{item.eventName}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.location}</td>
                <td>{item.description}</td>
                <td>{item.attendanceID}</td>
                <td>{item.role}</td>
                <td>{item.hobbyistID}</td>
                <td>{item.mentorID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events found for this eventID.</p>
      )}
      <h2>
        Get event information by inputing firstName, lastName, and phoneNumber
        (FIX)
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handlePersonalInfoChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handlePersonalInfoChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={personalInfo.phoneNumber}
            onChange={handlePersonalInfoChange}
          />
        </div>
        <button type="submit">Submit Personal Info</button>
      </form>
      {eventAllresult ? (
        <table className="mentor-result-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Event name</th>
              <th>Event startime</th>
              <th>Event endtime</th>
              <th>Event location</th>
              <th>Event Description</th>
              <th>Attendance ID</th>
              <th>Attendance Role</th>
              <th>Attendance HobbyistID</th>
              <th>Attendance MentorID</th>
            </tr>
          </thead>
          <tbody>
            {eventAllresult.map((item, index) => (
              <tr key={index}>
                <td>{item.eventID}</td>
                <td>{item.eventName}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.location}</td>
                <td>{item.description}</td>
                <td>{item.attendanceID}</td>
                <td>{item.role}</td>
                <td>{item.hobbyistID}</td>
                <td>{item.mentorID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events found for this phoneNumber, firstname, lastname.</p>
      )}
      {/* eventAllresult */}
      <h2>Get event information by inputting event name</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={handleEventNameChange}
          />
        </div>
        <button type="submit">Submit Event Name</button>
      </form>
      {eventNameresult ? (
        <table className="mentor-result-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Event name</th>
              <th>Event startime</th>
              <th>Event endtime</th>
              <th>Event location</th>
              <th>Event Description</th>
              <th>Attendance ID</th>
              <th>Attendance Role</th>
              <th>Attendance HobbyistID</th>
              <th>Attendance MentorID</th>
            </tr>
          </thead>
          <tbody>
            {eventNameresult.map((item, index) => (
              <tr key={index}>
                <td>{item.eventID}</td>
                <td>{item.eventName}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.location}</td>
                <td>{item.description}</td>
                <td>{item.attendanceID}</td>
                <td>{item.role}</td>
                <td>{item.hobbyistID}</td>
                <td>{item.mentorID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events found for this eventName.</p>
      )}
    </div>
  );
}

export default MentorEvents;
