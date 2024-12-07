import React, { useState } from "react";
import "../css/FindHobbyist.css";

function FindHobbyist() {
  // Individual form states
  const [school, setSchool] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  // Combined form state
  const [allInputs, setAllInputs] = useState({
    school: "",
    location: "",
    name: "",
  });

  // Handlers for individual forms
  const handleSchoolChange = (e) => setSchool(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

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
        console.log("Submitted Name:", name);
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
        <h3>Preview:</h3>
        <pre>School: {school}</pre>
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
        <pre>Location: {location}</pre>
      </form>

      {/* Name Form */}
      <form onSubmit={(e) => handleSubmit(e, "name")}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">Submit Name</button>
        {/* Preview for Name Form */}
        <h3>Preview:</h3>
        <pre>Name: {name}</pre>
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
          Name:
          <input
            type="text"
            name="name"
            value={allInputs.name}
            onChange={handleAllInputsChange}
          />
        </label>
        <button type="submit">Submit All</button>
        {/* Preview for Combined Form */}
        <h3>Preview:</h3>
        <pre>All Inputs: {JSON.stringify(allInputs, null, 2)}</pre>
      </form>
    </div>
  );
}

export default FindHobbyist;
