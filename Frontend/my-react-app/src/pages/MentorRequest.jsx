import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/MentorRequest.css";

function MentorRequest() {
  // Mentor Form Data for Hobbyist
  const [mentorData, setMentorData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
  });
  const [mentorResultData, setMentorResultData] = useState(null);

  // Mentor with Status Form Data
  const [mentorStatusData, setMentorStatusData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    status: "",
  });
  const [mentorStatusResultData, setMentorStatusResultData] = useState(null);
  // const [mentorResultDataWithStatus, setmentorResultDataWithStatus] =
  //   useState(null);
  useEffect(() => {
    // Only fetch if mentorIDData.mentorID is not empty
    if (mentorData.firstname && mentorData.lastname && mentorData.phonenumber) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/retriveallhobbyiestrequest/${mentorData.firstname}/${mentorData.lastname}/${mentorData.phonenumber}`
          );
          if (!response.ok) {
            throw new Error("Hobbyists not found");
          }
          const data = await response.json();
          setMentorResultData(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching mentor data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [mentorData.firstname, mentorData.lastname, mentorData.phonenumber]); // Dependency on mentorIDData.mentorID

  useEffect(() => {
    // Only fetch if mentorIDData.mentorID is not empty
    if (
      mentorStatusData.firstname &&
      mentorStatusData.lastname &&
      mentorStatusData.phonenumber &&
      mentorStatusData.status
    ) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/retrivehobbyiestrequestbystatus/${mentorStatusData.firstname}/${mentorStatusData.lastname}/${mentorStatusData.phonenumber}/${mentorStatusData.status}`
            // http://localhost:3001/mentor/retrivehobbyiestrequestbystatus/Jichael/Mordan/0724392100/Declined
          );
          if (!response.ok) {
            throw new Error("Hobbyists not found with status");
          }
          const data = await response.json();
          setMentorStatusResultData(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching mentor data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [
    mentorStatusData.firstname,
    mentorStatusData.lastname,
    mentorStatusData.phonenumber,
    mentorStatusData.status,
  ]);
  // Request Form Data
  // NOT DONE
  const [requestData, setRequestData] = useState({
    requestID: "",
    status: "",
  });
  const [mentorRequesResultData, setMentorRequestResultData] = useState(null);
  useEffect(() => {
    // Only fetch if mentorStatusData fields are not empty
    if (requestData.status && requestData.requestID) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/updatehobbyiestrequest/${requestData.status}/${requestData.requestID}`
          );
          if (!response.ok) {
            throw new Error("Failed to update request status.");
          }

          const data = await response.json();

          // Check if the update was successful
          if (data.success) {
            setMentorRequestResultData({
              success: true,
              message: data.message,
            }); // Success response
          } else {
            setMentorRequestResultData({
              success: false,
              message: data.message,
            }); // Failure response
          }
        } catch (error) {
          console.error("Error fetching mentor data:", error.message);
          setMentorRequestResultData({
            success: false,
            message: "Error updating the status. Please try again.", // Generic error message
          });
        }
      };

      fetchMentorData();
    }
  }, [requestData.status, requestData.requestID]);

  // useEffect(() => {
  //   // Only fetch if mentorIDData.mentorID is not empty
  //   if (requestData.status && mentorStatusData.requestID) {
  //     const fetchMentorData = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:3001/mentor/updatehobbyiestrequest/${requestData.status}/${requestData.requestID}`
  //           // "/updatehobbyiestrequest/:status/:requestid",
  //         );
  //         if (!response.ok) {
  //           throw new Error("Hobbyists not found with status");
  //         }
  //         const data = await response.json();
  //         setMentorRequestResultData(data); // Set the result data when the fetch is successful
  //       } catch (error) {
  //         console.error("Error fetching mentor data:", error.message);
  //       }
  //     };
  //     fetchMentorData();
  //   }
  // }, [requestData.status, requestData.requestID]);

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
      <h2>Enter Mentor Information to view list of your Hobbyist Requests</h2>
      <form onSubmit={(e) => handleSubmit(e, "mentor")} className="mentor-form">
        <div className="form-field">
          <label htmlFor="firstname" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={mentorData.firstname}
            onChange={handleMentorChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="lastname" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={mentorData.lastname}
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
      <h3>Hobbyist Preview:</h3>
      {/* <pre className="preview-box">
        {JSON.stringify(mentorResultData, null, 2)}
      </pre> */}
      {mentorResultData ? (
        <table className="mentor-result-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>Message</th>
              <th>Hobbyist ID</th>
              <th>Mentor ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {mentorResultData.map((item) => (
              <tr key={item.requestID}>
                <td>{item.requestID}</td>
                <td>{item.status}</td>
                <td>{item.message}</td>
                <td>{item.hobbyistID}</td>
                <td>{item.mentorID}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available. Please enter mentor information above.</p>
      )}

      <hr />

      {/* Mentor with Status Form */}
      <h2>
        Enter Mentor Information plus status to view list of your Hobbyist
        Requests
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e, "mentorStatus")}
        className="mentor-status-form"
      >
        <div className="form-field">
          <label htmlFor="firstname" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={mentorStatusData.firstname}
            onChange={handleMentorStatusChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="lastname" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={mentorStatusData.lastname}
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
      <h3>Hobbyist with Status Preview:</h3>
      {/* <pre className="preview-box">
        {JSON.stringify(mentorStatusResultData, null, 2)}
      </pre> */}
      {mentorStatusResultData ? (
        <table className="mentor-result-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>Message</th>
              <th>Hobbyist ID</th>
              <th>Mentor ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {mentorStatusResultData.map((item) => (
              <tr key={item.requestID}>
                <td>{item.requestID}</td>
                <td>{item.status}</td>
                <td>{item.message}</td>
                <td>{item.hobbyistID}</td>
                <td>{item.mentorID}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available. Please enter mentor information above.</p>
      )}

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
      {mentorRequesResultData && (
        <div>
          <p>{mentorRequesResultData.message}</p>
        </div>
      )}
    </div>
  );
}

export default MentorRequest;
