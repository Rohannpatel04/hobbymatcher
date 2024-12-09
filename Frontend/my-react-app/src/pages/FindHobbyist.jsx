import React, { useState, useEffect } from "react";
import "../css/FindHobbyist.css";
import { all } from "axios";

function FindHobbyist() {
  // Individual form states
  const [school, setSchool] = useState("");
  const [mentorSchoolResultData, setMentorSchoolResultData] = useState(null);

  useEffect(() => {
    // Only fetch if 'school' is not empty or whitespace
    if (school.trim()) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/findhobbyiestbyschool/${school}`
          );
          if (!response.ok) {
            throw new Error("Hobbyists not found");
          }
          const data = await response.json();
          setMentorSchoolResultData(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching hobbyist data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [school]); // Dependency on school

  const [location, setLocation] = useState("");
  const [mentorLocationResultData, setLocationResultData] = useState(null);
  // not working
  useEffect(() => {
    // Only fetch if 'location' is not empty or whitespace
    if (location.trim()) {
      const fetchMentorData = async () => {
        try {
          // Encode the location to handle spaces and special characters
          const encodedLocation = encodeURIComponent(location);

          const response = await fetch(
            `http://localhost:3001/mentor/findhobbyiestbylocation/${encodedLocation}`
          );

          if (!response.ok) {
            throw new Error("Hobbyists not found");
          }

          const data = await response.json();
          setLocationResultData(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching hobbyist data:", error.message);
        }
      };

      fetchMentorData();
    }
  }, [location]); // Dependency on location

  // Separate states for first and last name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mentorNameResultData, setNameResultData] = useState(null);
  useEffect(() => {
    // Only fetch if 'school' is not empty or whitespace
    if (firstName && lastName) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/findhobbyiestbyname/${firstName}/${lastName}`
          );
          if (!response.ok) {
            throw new Error("Hobbyists not found");
          }
          const data = await response.json();
          setNameResultData(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching hobbyist data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [firstName, lastName]); // Dependency on school
  // Combined form state

  // not working
  const [allInputs, setAllInputs] = useState({
    school: "",
    location: "",
    firstName: "",
    lastName: "",
  });
  const [AllResultData, setAllResultData] = useState(null);
  useEffect(() => {
    // Only fetch if 'school' is not empty or whitespace
    if (
      allInputs.firstName &&
      allInputs.lastName &&
      allInputs.location &&
      allInputs.school
    ) {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/mentor/findhobbyiestbynamelocationschool/${allInputs.firstName}/${allInputs.lastName}/${allInputs.location}/${allInputs.school}`
          );
          if (!response.ok) {
            throw new Error("Hobbyists not found");
          }
          const data = await response.json();
          setAllResultData(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching hobbyist data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [
    allInputs.firstName,
    allInputs.lastName,
    allInputs.location,
    allInputs.school,
  ]); // Dependency on school

  // Handlers for individual forms
  const handleSchoolChange = (e) => setSchool(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  // Handler for combined form
  const handleAllInputsChange = (e) => {
    const { name, value } = e.target;
    setAllInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handlers for form submission
  const handleSubmit = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "school":
        console.log("Submitted School:", school);
        break;
      case "location":
        console.log("Submitted Location:", location);
        break;
      case "name":
        console.log("Submitted Name:", { firstName, lastName });
        break;
      case "all":
        console.log("Submitted All Inputs:", allInputs);
        break;
      default:
        break;
    }
  };

  return (
    <div className="hobbyist-container">
      {/* School Form */}
      <form onSubmit={(e) => handleSubmit(e, "school")}>
        <label>
          School:
          <input type="text" value={school} onChange={handleSchoolChange} />
        </label>
        <button type="submit">Submit School</button>
        {/* Preview for School Form */}
        <h3>Schools that hobbyist go to:</h3>
        {mentorSchoolResultData ? (
          <table className="mentor-result-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Location</th>
                <th>Description</th>
                <th>Schooling</th>
              </tr>
            </thead>
            <tbody>
              {mentorSchoolResultData.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.emailAddress}</td>
                  <td>{item.location}</td>
                  <td>{item.description}</td>
                  <td>{item.schooling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hobbyists found for this school.</p>
        )}
      </form>

      {/* Location Form */}
      <form onSubmit={(e) => handleSubmit(e, "location")}>
        <label>
          Location:
          <input type="text" value={location} onChange={handleLocationChange} />
        </label>
        <button type="submit">Submit Location</button>
        {/* Preview for Location Form */}
        <h3>Preview:</h3>
        {mentorLocationResultData ? (
          <table className="mentor-result-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Location</th>
                <th>Description</th>
                <th>Schooling</th>
              </tr>
            </thead>
            <tbody>
              {mentorLocationResultData.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.emailAddress}</td>
                  <td>{item.location}</td>
                  <td>{item.description}</td>
                  <td>{item.schooling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hobbyists found for this location.</p>
        )}
      </form>

      {/* Name Form */}
      <form onSubmit={(e) => handleSubmit(e, "name")}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <button type="submit">Submit Name</button>
        {/* Preview for Name Form */}
        <h3>Preview hobbyists by first and last names:</h3>
        {mentorNameResultData ? (
          <table className="mentor-result-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Location</th>
                <th>Description</th>
                <th>Schooling</th>
              </tr>
            </thead>
            <tbody>
              {mentorNameResultData.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.emailAddress}</td>
                  <td>{item.location}</td>
                  <td>{item.description}</td>
                  <td>{item.schooling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hobbyists found for this name.</p>
        )}
      </form>

      {/* Combined Form */}
      <form onSubmit={(e) => handleSubmit(e, "all")}>
        <label>
          School:
          <input
            type="text"
            name="school"
            value={allInputs.school}
            onChange={handleAllInputsChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={allInputs.location}
            onChange={handleAllInputsChange}
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={allInputs.firstName}
            onChange={handleAllInputsChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={allInputs.lastName}
            onChange={handleAllInputsChange}
          />
        </label>
        <button type="submit">Submit All</button>
        {/* Preview for Combined Form */}
        <h3>Preview:</h3>
        {AllResultData ? (
          <table className="mentor-result-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Location</th>
                <th>Description</th>
                <th>Schooling</th>
              </tr>
            </thead>
            <tbody>
              {AllResultData.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.emailAddress}</td>
                  <td>{item.location}</td>
                  <td>{item.description}</td>
                  <td>{item.schooling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hobbyists found for this inputs.</p>
        )}
      </form>
    </div>
  );
}

export default FindHobbyist;
