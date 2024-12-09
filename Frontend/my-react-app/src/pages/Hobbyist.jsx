import React from "react";

export default function Hobbyist() {
  const [hobbyistData, setHobbyistData] = useState({
    hobbyistID: "",
    firstName: "",
    lastName: "",
    emailaddress: "",
    phonenumber: "",
    schooling: "",
    description: "",
    location: "",
  });
  return (
    // hobbyistID, schooling, description, emailAddress, location, phoneNumber, firstName, lastName
    <div>
      <h1>This is hobbyist page</h1>
    </div>
  );
}
