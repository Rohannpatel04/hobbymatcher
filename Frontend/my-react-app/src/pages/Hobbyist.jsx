import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Hobbyist() {
  const [hobbyistData, setHobbyistData] = useState({
    firstname: "",
    lastName: "",
    schooling: "",
    description: "",
    emailaddress: "",
    location: "",
    phonenumber: "",
  });
  const [deleteHobbyistData, setDeleteHobbyistData] = useState({
    firstName: "",
    lastName: "",
    phonenumber: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHobbyistData({
      ...hobbyistData,
      [name]: value,
    });
  };
  const handleDeleteHobbyistChange = (e) => {
    const { name, value } = e.target;
    setDeleteHobbyistData({
      ...deleteHobbyistData,
      [name]: value,
    });
  };
  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    if (formType === "hobbyist") {
      const bodyData = {
        firstName: hobbyistData.firstname || "",
        lastName: hobbyistData.lastName || "",
        schooling: hobbyistData.schooling || "",
        description: hobbyistData.description || "",
        emailAddress: hobbyistData.emailaddress || "",
        location: hobbyistData.location || "",
        phoneNumber: hobbyistData.phonenumber || "",
      };
      try {
        const response = await fetch(
          "http://localhost:3001/hobbyist/createhobbyist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const data = await response.json();
        alert("hobbyist created successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while creating hobbyist.");
      }
    } else if (formType === "deleteHobbyist") {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/deletehobbyist/${deleteHobbyistData.firstName}/${deleteHobbyistData.lastName}/${deleteHobbyistData.phonenumber}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const data = await response.json();
        alert("hobbyist deleted successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting hobbyist.");
      }
    }
  };
  return (
    <div>
      <div className="navigation-buttons">
        <Link to="/hobbyist/findmentor" className="nav-button">
          Find Mentor
        </Link>
      </div>
      <div>
        <h2>Create Hobbyist</h2>
        <form
          onSubmit={(e) => handleSubmit(e, "hobbyist")}
          className="hobbyist-form"
        >
          {Object.keys(hobbyistData).map((key) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="text"
                name={key}
                value={hobbyistData[key]}
                onChange={(e) => handleChange(e)}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
        <pre>{JSON.stringify(hobbyistData, null, 2)}</pre>
      </div>
      <h2>Delete Hobbyist</h2>
      <form
        onSubmit={(e) => handleSubmit(e, "deleteHobbyist")}
        className="delete-hobbyist-form"
      >
        {Object.keys(deleteHobbyistData).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={deleteHobbyistData[key]}
              onChange={(e) => handleDeleteHobbyistChange(e)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(deleteHobbyistData, null, 2)}</pre>
    </div>
    // <div>
    //   <h1>This is hobbyist page</h1>
    // </div>
  );
}
