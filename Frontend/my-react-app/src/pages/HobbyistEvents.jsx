import React, { useState, useEffect } from "react";

export default function HobbyistEvents() {
  const [getAllEventsResult, setgetAllEventsResult] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/getallevents`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setgetAllEventsResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const [getTopEventsResult, setgetTopEventsResult] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/gettopevents`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setgetTopEventsResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const [skillNameInput, setSkillNameInput] = useState("");
  const [skillNameResult, setSkillNameResult] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/geteventsbyskill/${skillNameInput}`
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
  }, [skillNameInput]);

  const handleSkillNameChange = (e) => {
    setSkillNameInput(e.target.value);
  };

  const [locationInput, setLocationInput] = useState("");
  const [locationResult, setLocationResult] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/geteventsbylocation/${locationInput}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLocationResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [locationInput]);

  const handleLocationChange = (e) => {
    setLocationInput(e.target.value);
  };

  const [schoolingInput, setSchoolingInput] = useState("");
  const [schoolingResult, setSchoolingResult] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/geteventsbymentorschooling/${schoolingInput}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolingResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [schoolingInput]);

  const handleSchoolingChange = (e) => {
    setSchoolingInput(e.target.value);
  };

  const [searchAllThree, setsearchAllThree] = useState({
    skillName: "",
    location: "",
    schooling: "",
  });

  const [searchAllThreeResult, setSearchAllThreeResult] = useState("");

  const handleSearchAllThreeChange = (e) => {
    setsearchAllThree({
      ...searchAllThree,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/geteventsbyskilllocationschooling/${searchAllThree.skillName}/${searchAllThree.location}/${searchAllThree.schooling}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchAllThreeResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [
    searchAllThree.skillName,
    searchAllThree.location,
    searchAllThree.schooling,
  ]);

  const [firstNameLastNamePhone, setFirstNameLastNamePhone] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [firstNameLastNamePhoneResult, setfirstNameLastNamePhoneResult] =
    useState("");
  const handlelastChange = (e) => {
    setFirstNameLastNamePhone({
      ...firstNameLastNamePhone,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/hobbyist/geteventsbyhobbyist/${firstNameLastNamePhone.firstName}/${firstNameLastNamePhone.lastName}/${firstNameLastNamePhone.phoneNumber}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setfirstNameLastNamePhoneResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [
    firstNameLastNamePhone.firstName,
    firstNameLastNamePhone.lastName,
    firstNameLastNamePhone.phoneNumber,
  ]);

  return (
    <div>
      <div>
        <h2>
          Get event you attended by inputting you first name, last name, and
          phone number
        </h2>
        <form>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstNameLastNamePhone.firstName}
            onChange={handlelastChange}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={firstNameLastNamePhone.lastName}
            onChange={handlelastChange}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={firstNameLastNamePhone.phoneNumber}
            onChange={handlelastChange}
          />
        </form>

        {firstNameLastNamePhoneResult.data &&
        firstNameLastNamePhoneResult.data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Description</th>
                <th>Date</th>
                <th>Hobbyist Name</th>
              </tr>
            </thead>
            <tbody>
              {firstNameLastNamePhoneResult.data.map((event, index) => (
                <tr key={index}>
                  <td>{event.EventName}</td>
                  <td>{event.StartTime}</td>
                  <td>{event.EndTime}</td>
                  <td>{event.Location}</td>
                  <td>{event.Description}</td>
                  <td>{event.EventDate}</td>
                  <td>{event.HobbyistName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events found</p>
        )}
      </div>

      <div>
        <h2>Get Event Information by Skill Name</h2>
        <form>
          <label htmlFor="skillName">Skill Name:</label>
          <input
            type="text"
            id="skillName"
            value={skillNameInput}
            onChange={handleSkillNameChange}
          />
        </form>
        {skillNameResult.data && skillNameResult.data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Description</th>
                <th>Date</th>
                <th>Skill Name</th>
              </tr>
            </thead>
            <tbody>
              {skillNameResult.data.map((event, index) => (
                <tr key={index}>
                  <td>{event.EventName}</td>
                  <td>{event.StartTime}</td>
                  <td>{event.EndTime}</td>
                  <td>{event.Location}</td>
                  <td>{event.Description}</td>
                  <td>{event.EventDate}</td>
                  <td>{event.SkillName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events found.</p>
        )}
      </div>
      <div>
        <h2>Get Event Information by Location</h2>
        <form>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={locationInput}
            onChange={handleLocationChange}
          />
        </form>
        {locationResult.data && locationResult.data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Description</th>
                <th>Date</th>
                <th>Skill Name</th>
              </tr>
            </thead>
            <tbody>
              {locationResult.data.map((event, index) => (
                <tr key={index}>
                  <td>{event.EventName}</td>
                  <td>{event.StartTime}</td>
                  <td>{event.EndTime}</td>
                  <td>{event.Location}</td>
                  <td>{event.Description}</td>
                  <td>{event.EventDate}</td>
                  <td>{event.SkillName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events found.</p>
        )}
      </div>
      <div>
        <h2>Get Event Information by Schooling</h2>
        <form>
          <label htmlFor="schooling">Schooling:</label>
          <input
            type="text"
            id="schooling"
            value={schoolingInput}
            onChange={handleSchoolingChange}
          />
        </form>
        {schoolingResult.data && schoolingResult.data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Description</th>
                <th>Date</th>
                <th>Skill Name</th>
              </tr>
            </thead>
            <tbody>
              {schoolingResult.data.map((event, index) => (
                <tr key={index}>
                  <td>{event.EventName}</td>
                  <td>{event.StartTime}</td>
                  <td>{event.EndTime}</td>
                  <td>{event.Location}</td>
                  <td>{event.Description}</td>
                  <td>{event.EventDate}</td>
                  <td>{event.SkillName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events found.</p>
        )}
      </div>
      <div>
        <h2>Search events by Skill Name, Location and Schooling</h2>
        <form>
          <label htmlFor="skillname">Skill Name:</label>
          <input
            type="text"
            id="skillname"
            name="skillName"
            value={searchAllThree.skillName}
            onChange={handleSearchAllThreeChange}
          />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={searchAllThree.location}
            onChange={handleSearchAllThreeChange}
          />
          <label htmlFor="schooling">Schooling:</label>
          <input
            type="text"
            id="schooling"
            name="schooling"
            value={searchAllThree.schooling}
            onChange={handleSearchAllThreeChange}
          />
        </form>
        <pre>{JSON.stringify(searchAllThree, null, 2)}</pre>
        {searchAllThreeResult.data &&
          Array.isArray(searchAllThreeResult.data) &&
          searchAllThreeResult.data.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Skill Name</th>
                  <th>Mentor Name</th>
                  <th>Mentor Schooling</th>
                </tr>
              </thead>
              <tbody>
                {searchAllThreeResult.data.map((event, index) => (
                  <tr key={index}>
                    <td>{event.EventName}</td>
                    <td>{event.StartTime}</td>
                    <td>{event.EndTime}</td>
                    <td>{event.Location}</td>
                    <td>{event.Description}</td>
                    <td>{event.EventDate}</td>
                    <td>{event.SkillName}</td>
                    <td>{event.MentorName}</td>
                    <td>{event.MentorSchooling}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        {/* Event.eventName AS EventName, Event.startTime AS StartTime,
        Event.endTime AS EndTime, Event.location AS Location, Event.description
        AS Description, Event.date AS EventDate, Skills.skillsName AS SkillName,
        CONCAT(Mentor.firstName, ' ', Mentor.lastName) AS MentorName,
        Mentor.schooling AS MentorSchooling */}
      </div>
      <div>
        <h1>All events</h1>
        {getAllEventsResult.data &&
          Array.isArray(getAllEventsResult.data) &&
          getAllEventsResult.data.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Skill Name</th>
                </tr>
              </thead>
              <tbody>
                {getAllEventsResult.data.map((event, index) => (
                  <tr key={index}>
                    <td>{event.eventName}</td>
                    <td>{event.startTime}</td>
                    <td>{event.endTime}</td>
                    <td>{event.location}</td>
                    <td>{event.description}</td>
                    <td>{event.date}</td>
                    <td>{event.skillName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
      <div>
        <h1>All top events</h1>
        {getTopEventsResult.data &&
          Array.isArray(getTopEventsResult.data) &&
          getTopEventsResult.data.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Total Posts</th>
                </tr>
              </thead>
              <tbody>
                {getTopEventsResult.data.map((event, index) => (
                  <tr key={index}>
                    <td>{event.EventName}</td>
                    <td>{event.StartTime}</td>
                    <td>{event.EndTime}</td>
                    <td>{event.location}</td>
                    <td>{event.description}</td>
                    <td>{event.date}</td>
                    <td>{event.TotalPosts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}
