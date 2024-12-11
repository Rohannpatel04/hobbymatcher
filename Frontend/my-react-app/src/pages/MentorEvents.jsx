import React, { useState, useEffect } from "react";
import "../css/MentorEvents.css";

function MentorEvents() {
  // Event Form Data

  const [eventData, setEventData] = useState({
    eventName: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    date: "",
    skillName: "",
  });

  // Attendance Form Data
  const [attendanceData, setAttendanceData] = useState({
    role: "",
    hobbyistFirstName: "",
    hobbyistLastName: "",
    hobbyistPhoneNumber: "",
    mentorFirstName: "",
    mentorLastName: "",
    mentorPhoneNumber: "",
    eventID: "",
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

  const [complexquery1, setComplexQuery1] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
  });
  const [complexquery1result, setComplexQuery1Result] = useState(null);
  const handleComplexQuery1Change = (e) => {
    const { name, value } = e.target;
    setComplexQuery1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (
      complexquery1.firstname &&
      complexquery1.lastname &&
      complexquery1.phonenumber
    ) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/retrivevementoreventAttendance/${complexquery1.firstname}/${complexquery1.lastname}/${complexquery1.phonenumber}`
          );
          if (!response.ok) {
            throw new Error("events not found");
          }
          const data = await response.json();
          setComplexQuery1Result(data);
        } catch (error) {
          console.error("Error fetching event data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [
    complexquery1.firstname,
    complexquery1.lastname,
    complexquery1.phonenumber,
  ]);

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
      // console.log("EventID Saved:", eventData.eventID);
      // console.log("Event Name Saved:", eventData.eventName);
      // console.log(
      //   "Start Time Saved:",
      //   eventData.date + " " + eventData.startTime + ":00"
      // );
      // console.log(
      //   "End Time Saved:",
      //   eventData.date + " " + eventData.endTime + ":00" || ""
      // );
      // console.log("Location Saved:", eventData.location);
      // console.log("Description Saved:", eventData.description);
      // console.log("Date Saved:", eventData.date);
      // console.log("Skill Name Saved:", eventData.skillName);

      try {
        const response = await fetch(
          "http://localhost:3001/mentor/createevent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // eventID: eventData.eventID,
              eventName: eventData.eventName,
              startTime: eventData.date + " " + eventData.startTime + ":00",
              endTime: eventData.date + " " + eventData.endTime + ":00",
              location: eventData.location,
              description: eventData.description,
              date: eventData.date,
              skillName: eventData.skillName,
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
      console.log("comes here to attendance");
      console.log(attendanceData);
      try {
        const response = await fetch(
          "http://localhost:3001/mentor/createeventattendence",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(attendanceData),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        alert("Attendance created successfully!");
      } catch (error) {
        console.error("Error creating attendance:", error);
        alert("Error creating attendance. Please try again.");
      }
      // try {
      //   const response = await fetch(
      //     "http://localhost:3001/mentor/createeventattendence",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         // attendanceID: attendanceData.attendanceID,
      //         // role: attendanceData.role,
      //         // hobbyistID: attendanceData.hobbyistID,
      //         // mentorID: attendanceData.mentorID,
      //         // eventID: attendanceData.eventID,
      //         // role: attendanceData.role,
      //         // hobbyistFirstName: attendanceData.hobbyistFirstName,
      //         // hobbyistLastName: attendanceData.hobbyistLastName,
      //         // hobbyistPhoneNumber: attendanceData.hobbyistPhoneNumber,
      //         // mentorFirstName: attendanceData.mentorFirstName,
      //         // mentorLastName: attendanceData.mentorLastName,
      //         // mentorPhoneNumber: attendanceData.mentorPhoneNumber,
      //         // eventID: attendanceData.eventID,
      //         role: "Mentor",
      //         hobbyistFirstName: attendanceData.hobbyistFirstName,
      //         hobbyistLastName: attendanceData.hobbyistLastName,
      //         hobbyistPhoneNumber: attendanceData.hobbyistPhoneNumber,
      //         mentorFirstName: "Steve",
      //         mentorLastName: "Wozzy",
      //         mentorPhoneNumber: "4259930293",
      //         eventID: "800000002",
      //       }),
      //     }
      //   );

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }

      //   const data = await response.json();
      //   alert("Attendance created successfully!");

      //   // Clear form after successful submission
      // } catch (error) {
      //   console.error("Error creating attendance:", error);
      //   alert("Error creating attendance. Please try again.");
      // }
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
          {/* <div>
            <label htmlFor="eventID" className="form-label">
              Event ID:
            </label>
            <input
              type="text"
              id="eventID"
              name="eventID"
              value={eventData.eventID || ""}
              onChange={handleEventChange}
              className="form-input"
            />
          </div> */}
          <div className="form-field">
            <label htmlFor="eventName" className="form-label">
              Event Name:
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventData.eventName || ""}
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
              onChange={handleEventChange || ""}
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
              onChange={handleEventChange || ""}
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
              onChange={handleEventChange || ""}
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
              onChange={handleEventChange || ""}
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
              onChange={handleEventChange || ""}
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="skillName" className="form-label">
              Skill Name:
            </label>
            <input
              type="text"
              id="skillName"
              name="skillName"
              value={eventData.skillName}
              onChange={handleEventChange || ""}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            Save Event Data
          </button>
        </div>
      </form>
      <h3>Event Preview:</h3>
      <pre className="preview-box">{JSON.stringify(eventData, null, 2)}</pre>

      <hr />

      {/* Attendance Form */}
      <h2>Create Event Attendance</h2>
      <form
        onSubmit={(e) => handleSubmit(e, "attendance")}
        className="attendance-form"
      >
        <div className="form-field">
          <div>
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
          <div>
            <label htmlFor="hobbyistFirstName" className="form-label">
              Hobbyist First Name:
            </label>
            <input
              type="text"
              id="hobbyistFirstName"
              name="hobbyistFirstName"
              value={attendanceData.hobbyistFirstName}
              onChange={handleAttendanceChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="hobbyistLastName" className="form-label">
              Hobbyist Last Name:
            </label>
            <input
              type="text"
              id="hobbyistLastName"
              name="hobbyistLastName"
              value={attendanceData.hobbyistLastName}
              onChange={handleAttendanceChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="hobbyistPhoneNumber" className="form-label">
              Hobbyist Phone Number:
            </label>
            <input
              type="text"
              id="hobbyistPhoneNumber"
              name="hobbyistPhoneNumber"
              value={attendanceData.hobbyistPhoneNumber}
              onChange={handleAttendanceChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="mentorFirstName" className="form-label">
              Mentor First Name:
            </label>
            <input
              type="text"
              id="mentorFirstName"
              name="mentorFirstName"
              value={attendanceData.mentorFirstName}
              onChange={handleAttendanceChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="mentorLastName" className="form-label">
              Mentor Last Name:
            </label>
            <input
              type="text"
              id="mentorLastName"
              name="mentorLastName"
              value={attendanceData.mentorLastName}
              onChange={handleAttendanceChange}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="mentorPhoneNumber" className="form-label">
              Mentor Phone Number:
            </label>
            <input
              type="text"
              id="mentorPhoneNumber"
              name="mentorPhoneNumber"
              value={attendanceData.mentorPhonenumber}
              onChange={handleAttendanceChange}
              className="form-input"
            />
          </div>
          <div>
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
        Get event information by inputing mentors firstName, lastName, and
        phoneNumber
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
              <th>Event Date</th>
              <th>Mentor First Name</th>
              <th>Mentor Last Name</th>
              <th>Mentor PhoneNumber</th>
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
                <td>{item.date}</td>
                <td>{item.mentorFirstName}</td>
                <td>{item.mentorLastName}</td>
                <td>{item.mentorPhoneNumber}</td>
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
      <div>
        <h2>
          Get Event Attendance information by inputting Mentor firstName,
          lastName, and phoneNumber
        </h2>
        <form>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={complexquery1.firstname}
            onChange={handleComplexQuery1Change}
          />
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={complexquery1.lastname}
            onChange={handleComplexQuery1Change}
          />
          <label htmlFor="phonenumber">Phone Number:</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={complexquery1.phonenumber}
            onChange={handleComplexQuery1Change}
          />
          <button type="submit">Submit</button>
        </form>
        <pre>{JSON.stringify(complexquery1, null, 2)}</pre>
        {complexquery1result &&
        complexquery1result.data &&
        Array.isArray(complexquery1result.data) &&
        complexquery1result.data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Mentor Name</th>
                <th>Event Name</th>
                <th>Total Attendees</th>
                <th>Total Hobbyists</th>
                <th>Total Mentors</th>
              </tr>
            </thead>
            <tbody>
              {complexquery1result.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.MentorName}</td>
                  <td>{item.EventName}</td>
                  <td>{item.TotalAttendees}</td>
                  <td>{item.TotalHobbyists}</td>
                  <td>{item.TotalMentors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events found for this phoneNumber, firstname, lastname.</p>
        )}
      </div>
    </div>
  );
}

export default MentorEvents;
