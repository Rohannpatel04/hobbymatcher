import React, { useState, useEffect } from "react";
import "../css/HobbyistFindMentor.css";
import { use } from "react";
export default function HobbyistFindMentor() {
  const [skillName, setSkillName] = useState("");
  const [skillNameResult, setSkillNameResult] = useState(null);

  const [location, setLocation] = useState("");
  const [locationResult, setLocationResult] = useState(null);

  const [skillLocation, setSkillLocation] = useState({
    skillName: "",
    location: "",
  });
  const [skillLocationResult, setSkillLocationResult] = useState(null);

  const [schoolLocation, setSchoolLocation] = useState({
    location: "",
    school: "",
  });
  const [schoolLocationResult, setSchoolLocationResult] = useState(null);
  const handleSchoolLocationChange = (e) => {
    setSchoolLocation({
      ...schoolLocation,
      [e.target.name]: e.target.value,
    });
  };
  const handleSkillLocationChange = (e) => {
    setSkillLocation({
      ...skillLocation,
      [e.target.name]: e.target.value,
    });
  };
  const [skillSchool, setSkillSchool] = useState({
    skillName: "",
    school: "",
  });
  const [skillSchoolResult, setSkillSchoolResult] = useState(null);
  const handleSkillSchoolChange = (e) => {
    setSkillSchool({
      ...skillSchool,
      [e.target.name]: e.target.value,
    });
  };
  const handleSkillNameChange = (e) => {
    setSkillName(e.target.value);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/getmentorsbyskills/${skillName}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSkillNameResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [skillName]);
  const [mentorResult, setMentorResult] = useState(null);
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/getallmentors`
        );
        if (!response.ok) {
          throw new Error("mentor not found");
        }
        const data = await response.json();
        setMentorResult(data); // Set the result data when the fetch is successful
      } catch (error) {
        console.error("Error fetching mentors:", error.message);
      }
    };
    fetchMentors();
  }, []);

  const [
    toptenmentorsbasedonrequestResult,
    setToptenmentorsbasedonrequestResult,
  ] = useState(null);
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/toptenmentorsbasedonrequest`
        );
        if (!response.ok) {
          throw new Error("mentor not found");
        }
        const data = await response.json();
        setToptenmentorsbasedonrequestResult(data); // Set the result data when the fetch is successful
      } catch (error) {
        console.error("Error fetching mentors:", error.message);
      }
    };
    fetchMentors();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/getmentorsbylocation/${location}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLocationResult(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [location]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/getmentorsbyskillslocation/${skillLocation.skillName}/${skillLocation.location}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSkillLocationResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [skillLocation.location, skillLocation.skillName]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/getmentorsbyskillsschooling/${skillSchool.skillName}/${skillSchool.school}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSkillSchoolResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [skillSchool.skillName, skillSchool.school]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/getmentorsbylocationschooling/${schoolLocation.location}/${schoolLocation.school}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolLocationResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [schoolLocation.location, schoolLocation.school]);


  const [requestInputData, setRequestInputData] = useState({
    message: "",
    hobbyistFirstName: "",
    hobbyistLastName: "",
    hobbyistPhoneNumber: "",
    mentorFirstName: "",
    mentorLastName: "",
    mentorPhoneNumber: "",
  });
  const [RequestResultData, setRequestResultData] = useState(null);
  const handleRequestInputChange = (e) => {
    setRequestInputData({
      ...requestInputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRequestInputSubmit = async (e) => {
    e.preventDefault();
    console.log(requestInputData);
    try {
      const response = await fetch(
        "http://localhost:3001/hobbyist/createrequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: requestInputData.message,
            hobbyistFirstName: requestInputData.hobbyistFirstName,
            hobbyistLastName: requestInputData.hobbyistLastName,
            hobbyistPhoneNumber: requestInputData.hobbyistPhoneNumber,
            mentorFirstName: requestInputData.mentorFirstName,
            mentorLastName: requestInputData.mentorLastName,
            mentorPhoneNumber: requestInputData.mentorPhoneNumber,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Request created successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error creating request");
    }
  };

  const [endorsementInputData, setEndorsementInputData] = useState({
    skillsName: "",
    hobbyistFirstName: "",
    hobbyistLastName: "",
    hobbyistPhoneNumber: "",
    mentorFirstName: "",
    mentorLastName: "",
    mentorPhoneNumber: "",
    date: "",
    comment: "",
  });
  const [endorsementResultData, setEndorsementResultData] = useState(null);
  const handleEndorsementInputChange = (e) => {
    setEndorsementInputData({
      ...endorsementInputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleEndorsementInputSubmit = async (e) => {
    e.preventDefault();
    console.log(endorsementInputData);
    try {
      const response = await fetch(
        "http://localhost:3001/hobbyist/createendorsement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(endorsementInputData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Endorsement created successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error creating endorsement");
    }
  };

  const [
    inputAllRequestByHobbyistInfoResult,
    setinputAllRequestByHobbyistInfoResult,
  ] = useState({
    firstName: "",
    lastName: "",
    phonenumber: "",
  }); // getAllRequestByHobbyistInfo
  const handleinputAllRequestByHobbyistInfoResultChange = (e) => {
    setinputAllRequestByHobbyistInfoResult({
      ...inputAllRequestByHobbyistInfoResult,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/getallrequestbyhobbyistinfo/${inputAllRequestByHobbyistInfoResult.firstName}/${inputAllRequestByHobbyistInfoResult.lastName}/${inputAllRequestByHobbyistInfoResult.phonenumber}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setinputAllRequestByHobbyistInfoResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [
    inputAllRequestByHobbyistInfoResult.firstName,
    inputAllRequestByHobbyistInfoResult.lastName,
    inputAllRequestByHobbyistInfoResult.phonenumber,
  ]);
  return (
    <div>
      <div>
        <h2>Find a Mentor by Endorsements of a Skill</h2>
        <form>
          <label htmlFor="skillName">Skill Name:</label>
          <input
            type="text"
            id="skillName"
            value={skillName}
            onChange={handleSkillNameChange}
          />
          <button type="submit">Find Mentor</button>
        </form>
        <h2>Mentors</h2>
        {skillNameResult && (
          <table>
            <thead>
              <tr>
                {/* Mentor.mentorID,
            Mentor.firstName,
            Mentor.lastName,
            Mentor.schooling,
            Mentor.description,
            Mentor.emailAddress,
            Mentor.location,
            Mentor.phoneNumber,
            Endorsement.endorsementID,
            Endorsement.hobbyistID,
            Endorsement.skillsID,
            Endorsement.date,
            Endorsement.comment,
            Skills.skillsName */}
                <th>Mentor First Name</th>
                <th>Mentor Last Name</th>
                <th>Mentor School</th>
                <th>Mentor Description</th>
                <th>Mentor Email</th>
                <th>Mentor Location</th>
                <th>Mentor Phone Number</th>
                <th>Endorsement Date</th>
                <th>Endorsement Comment</th>
                <th>Skills SkillsName</th>
              </tr>
            </thead>
            <tbody>
              {skillNameResult.map((mentor) => (
                <tr key={mentor.id}>
                  <td>{mentor.firstName}</td>
                  <td>{mentor.lastName}</td>
                  <td>{mentor.schooling}</td>
                  <td>{mentor.description}</td>
                  <td>{mentor.emailAddress}</td>
                  <td>{mentor.location}</td>
                  <td>{mentor.phoneNumber}</td>
                  <td>{mentor.date}</td>
                  <td>{mentor.comment}</td>
                  <td>{mentor.skillsName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <pre>{JSON.stringify({ skillName }, null, 2)}</pre>
      </div>

      <div>
        <h2>Find a Mentor by Endorsements of a Location</h2>
        <form>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Find Mentor</button>
        </form>
        {locationResult && (
          <table>
            <thead>
              <tr>
                <th>Mentor First Name</th>
                <th>Mentor Last Name</th>
                <th>Mentor School</th>
                <th>Mentor Description</th>
                <th>Mentor Email</th>
                <th>Mentor Location</th>
                <th>Mentor Phone Number</th>
                <th>Endorsement Date</th>
                <th>Endorsement Comment</th>
              </tr>
            </thead>
            <tbody>
              {locationResult.map((mentor) => (
                <tr key={mentor.id}>
                  <td>{mentor.firstName}</td>
                  <td>{mentor.lastName}</td>
                  <td>{mentor.schooling}</td>
                  <td>{mentor.description}</td>
                  <td>{mentor.emailAddress}</td>
                  <td>{mentor.location}</td>
                  <td>{mentor.phoneNumber}</td>
                  <td>{mentor.date}</td>
                  <td>{mentor.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <pre>{JSON.stringify({ location }, null, 2)}</pre>
      </div>
      <div>
        <h2>Find a Mentor by Endorsements of a Skill Name and Location</h2>
        <form>
          <label htmlFor="skillName">Skill Name:</label>
          <input
            type="text"
            id="skillName"
            name="skillName"
            value={skillLocation.skillName}
            onChange={handleSkillLocationChange}
          />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={skillLocation.location}
            onChange={handleSkillLocationChange}
          />
          <button type="submit">Find Mentor</button>
        </form>
        <pre>
          {JSON.stringify(
            {
              skillName: skillLocation.skillName,
              location: skillLocation.location,
            },
            null,
            2
          )}
        </pre>
        {skillLocationResult && (
          <table>
            <thead>
              <tr>
                <th>Mentor First Name</th>
                <th>Mentor Last Name</th>
                <th>Mentor School</th>
                <th>Mentor Description</th>
                <th>Mentor Email</th>
                <th>Mentor Location</th>
                <th>Mentor Phone Number</th>
                <th>Endorsement Date</th>
                <th>Endorsement Comment</th>
              </tr>
            </thead>
            <tbody>
              {skillLocationResult.map((mentor) => (
                <tr key={mentor.id}>
                  <td>{mentor.firstName}</td>
                  <td>{mentor.lastName}</td>
                  <td>{mentor.schooling}</td>
                  <td>{mentor.description}</td>
                  <td>{mentor.emailAddress}</td>
                  <td>{mentor.location}</td>
                  <td>{mentor.phoneNumber}</td>
                  <td>{mentor.date}</td>
                  <td>{mentor.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <h2>Find a Mentor by Endorsements of a Skill Name and School</h2>
        <form>
          <label htmlFor="skillName">Skill Name:</label>
          <input
            type="text"
            id="skillName"
            name="skillName"
            value={skillSchool.skillName}
            onChange={handleSkillSchoolChange}
          />
          <label htmlFor="school">School:</label>
          <input
            type="text"
            id="school"
            name="school"
            value={skillSchool.school}
            onChange={handleSkillSchoolChange}
          />
          <button type="submit">Find Mentor</button>
        </form>
        <pre>
          {JSON.stringify(
            {
              skillName: skillSchool.skillName,
              school: skillSchool.school,
            },
            null,
            2
          )}
        </pre>
        {skillSchoolResult && (
          <table>
            <thead>
              <tr>
                <th>Mentor First Name</th>
                <th>Mentor Last Name</th>
                <th>Mentor School</th>
                <th>Mentor Description</th>
                <th>Mentor Email</th>
                <th>Mentor Location</th>
                <th>Mentor Phone Number</th>
                <th>Endorsement Date</th>
                <th>Endorsement Comment</th>
              </tr>
            </thead>
            <tbody>
              {skillSchoolResult.map((mentor) => (
                <tr key={mentor.id}>
                  <td>{mentor.firstName}</td>
                  <td>{mentor.lastName}</td>
                  <td>{mentor.schooling}</td>
                  <td>{mentor.description}</td>
                  <td>{mentor.emailAddress}</td>
                  <td>{mentor.location}</td>
                  <td>{mentor.phoneNumber}</td>
                  <td>{mentor.date}</td>
                  <td>{mentor.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <h2>Find a Mentor by Endorsements of a Schooling and Location</h2>
        <form>
          <label htmlFor="school">School:</label>
          <input
            type="text"
            id="school"
            name="school"
            value={schoolLocation.schooling}
            onChange={handleSchoolLocationChange}
          />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={schoolLocation.location}
            onChange={handleSchoolLocationChange}
          />
          <button type="submit">Find Mentor</button>
        </form>
        <pre>
          {JSON.stringify(
            {
              school: schoolLocation.school,
              location: schoolLocation.location,
            },
            null,
            2
          )}
        </pre>
        {schoolLocationResult && (
          <table>
            <thead>
              <tr>
                <th>Mentor First Name</th>
                <th>Mentor Last Name</th>
                <th>Mentor School</th>
                <th>Mentor Description</th>
                <th>Mentor Email</th>
                <th>Mentor Location</th>
                <th>Mentor Phone Number</th>
                <th>Endorsement Date</th>
                <th>Endorsement Comment</th>
              </tr>
            </thead>
            <tbody>
              {schoolLocationResult.map((mentor) => (
                <tr key={mentor.id}>
                  <td>{mentor.firstName}</td>
                  <td>{mentor.lastName}</td>
                  <td>{mentor.schooling}</td>
                  <td>{mentor.description}</td>
                  <td>{mentor.emailAddress}</td>
                  <td>{mentor.location}</td>
                  <td>{mentor.phoneNumber}</td>
                  <td>{mentor.date}</td>
                  <td>{mentor.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <h2>Create Request to Mentor</h2>
        <form onSubmit={handleRequestInputSubmit}>
          {/* message: "",
    hobbyistFirstName: "",
    hobbyistLastName: "",
    hobbyistPhoneNumber: "",
    mentorFirstName: "",
    mentorLastName: "",
    mentorPhoneNumber: "", */}
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            name="message"
            value={requestInputData.message}
            onChange={handleRequestInputChange}
          />
          <label htmlFor="hobbyistFirstName">Hobbyist First Name:</label>
          <input
            type="text"
            id="hobbyistFirstName"
            name="hobbyistFirstName"
            value={requestInputData.hobbyistFirstName}
            onChange={handleRequestInputChange}
          />
          <label htmlFor="hobbyistLastName">Hobbyist Last Name:</label>
          <input
            type="text"
            id="hobbyistLastName"
            name="hobbyistLastName"
            value={requestInputData.hobbyistLastName}
            onChange={handleRequestInputChange}
          />
          <label htmlFor="hobbyistPhoneNumber">Hobbyist Phone Number:</label>
          <input
            type="text"
            id="hobbyistPhoneNumber"
            name="hobbyistPhoneNumber"
            value={requestInputData.hobbyistPhoneNumber}
            onChange={handleRequestInputChange}
          />
          <label htmlFor="mentorFirstName">Mentor First Name:</label>
          <input
            type="text"
            id="mentorFirstName"
            name="mentorFirstName"
            value={requestInputData.mentorFirstName}
            onChange={handleRequestInputChange}
          />
          <label htmlFor="mentorLastName">Mentor Last Name:</label>
          <input
            type="text"
            id="mentorLastName"
            name="mentorLastName"
            value={requestInputData.mentorLastName}
            onChange={handleRequestInputChange}
          />
          <label htmlFor="mentorPhoneNumber">Mentor Phone Number:</label>
          <input
            type="text"
            id="mentorPhoneNumber"
            name="mentorPhoneNumber"
            value={requestInputData.mentorPhoneNumber}
            onChange={handleRequestInputChange}
          />
          <button type="submit">Create Request</button>
        </form>
        <pre>{JSON.stringify(requestInputData, null, 2)}</pre>
      </div>
      <div>
        <h2>Create Endorsement for Mentor</h2>
        <form onSubmit={handleEndorsementInputSubmit}>
          <label htmlFor="skillsName">Skill Name</label>
          <input
            type="text"
            id="skillsName"
            name="skillsName"
            value={endorsementInputData.skillName}
            onChange={handleEndorsementInputChange}
          />
          <label htmlFor="hobbyistFirstName">Hobbyist First Name</label>
          <input
            type="text"
            id="hobbyistFirstName"
            name="hobbyistFirstName"
            value={endorsementInputData.hobbyistFirstName}
            onChange={handleEndorsementInputChange}
          />
          <label htmlFor="hobbyistLastName">Hobbyist Last Name</label>
          <input
            type="text"
            id="hobbyistLastName"
            name="hobbyistLastName"
            value={endorsementInputData.hobbyistLastName}
            onChange={handleEndorsementInputChange}
          />
          <label htmlFor="hobbyistPhoneNumber">Hobbyist Phone Number"</label>
          <input
            type="text"
            id="hobbyistPhoneNumber"
            name="hobbyistPhoneNumber"
            value={endorsementInputData.hobbyistPhoneNumber}
            onChange={handleEndorsementInputChange}
          />
          <label htmlFor="mentorFirstName">Mentor First Name</label>
          <input
            type="text"
            id="mentorFirstName"
            name="mentorFirstName"
            value={endorsementInputData.mentorFirstName}
            onChange={handleEndorsementInputChange}
          />
          <label htmlFor="mentorLastName">Mentor Last Name</label>
          <input
            type="text"
            id="mentorLastName"
            name="mentorLastName"
            value={endorsementInputData.mentorLastName}
            onChange={handleEndorsementInputChange}
          />
          <label htmlFor="mentorPhoneNumber">Mentor Phone Number</label>
          <input
            type="text"
            id="mentorPhoneNumber"
            name="mentorPhoneNumber"
            value={endorsementInputData.mentorPhoneNumber}
            onChange={handleEndorsementInputChange}
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={endorsementInputData.date}
            onChange={handleEndorsementInputChange}
          />
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={endorsementInputData.comment}
            onChange={handleEndorsementInputChange}
          />
          <button type="submit">Create Endorsement</button>
        </form>
        <pre>{JSON.stringify(endorsementInputData, null, 2)}</pre>
      </div>
      <div>
        {/* your here you were abel to create form and set it to usestae, then you need to call endpoint */}
        <h2>View All Requests by Hobbyists</h2>

        <form>
          <label htmlFor="firstName">Hobbyist First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={inputAllRequestByHobbyistInfoResult.firstName}
            onChange={handleinputAllRequestByHobbyistInfoResultChange}
          />
          <label htmlFor="lastName">Hobbyist Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={inputAllRequestByHobbyistInfoResult.lastName}
            onChange={handleinputAllRequestByHobbyistInfoResultChange}
          />
          <label htmlFor="phonenumber">Hobbyist Phone Number</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={inputAllRequestByHobbyistInfoResult.phonenumber}
            onChange={handleinputAllRequestByHobbyistInfoResultChange}
          />
          <button type="submit">View Requests</button>
        </form>
        <pre>
          {JSON.stringify(inputAllRequestByHobbyistInfoResult, null, 2)}
        </pre>
      </div>
      <div>
        <h2>View All Mentors that have been assiged a skill</h2>
        {console.log(mentorResult)}{" "}
        {/* Log skillNameResult to check its structure */}
        {mentorResult &&
        Array.isArray(mentorResult.data) &&
        mentorResult.data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Mentors First Name</th>
                <th>Mentors Location</th>
                <th>Mentors phone Number</th>
                <th>Mentors Skill name</th>
                <th>Mentors experienceLevel</th>
              </tr>
            </thead>
            <tbody>
              {mentorResult.data.map((mentor, index) => (
                // CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorName,
                // Mentor.location AS MentorLocation,
                // Mentor.phoneNumber AS MentorPhoneNumber,
                // Skills.skillsName AS SkillName,
                // hasSkills.experienceLevel AS SkillLevel
                <tr key={index}>
                  <td>{mentor.MentorName}</td>
                  <td>{mentor.MentorLocation}</td>{" "}
                  <td>{mentor.MentorPhoneNumber}</td>{" "}
                  <td>{mentor.SkillName}</td>
                  <td>{mentor.SkillLevel}</td>{" "}
                  {/* Accessing skillsName from each object */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No mentors found.</p> // Fallback message if data is empty or not an array
        )}
      </div>
      <div>
        <h2>Top 10 Mentors based on requests</h2>
        {console.log(toptenmentorsbasedonrequestResult)}{" "}
        {/* Log skillNameResult to check its structure */}
        {toptenmentorsbasedonrequestResult &&
        Array.isArray(toptenmentorsbasedonrequestResult.data) &&
        mentorResult.data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Mentors First Name</th>
                <th>Mentors phone Number</th>
                <th>Total Requests</th>
              </tr>
            </thead>
            <tbody>
              {toptenmentorsbasedonrequestResult.data.map((mentor, index) => (
                // CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorName,
                // Mentor.location AS MentorLocation,
                // Mentor.phoneNumber AS MentorPhoneNumber,
                // Skills.skillsName AS SkillName,
                // hasSkills.experienceLevel AS SkillLevel
                <tr key={index}>
                  <td>{mentor.MentorName}</td>
                  <td>{mentor.phoneNumber}</td>
                  <td>{mentor.TotalRequests}</td>
                  {/* Accessing skillsName from each object */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No mentors found.</p> // Fallback message if data is empty or not an array
        )}
      </div>
    </div>
  );
}
