import React, { useState, useEffect } from "react";
import "../css/MentorPost.css";

function MentorPost() {
  // Post Form Data
  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    content: "",
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [postAllresult, setpostAllResult] = useState(null);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target; // Get the input name and value
    setPersonalInfo((prevState) => ({
      ...prevState, // Spread the previous state
      [name]: value, // Update the specific field
    }));
  };
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
            `http://localhost:3001/mentor/retrieveallpost/${personalInfo.firstName}/${personalInfo.lastName}/${personalInfo.phoneNumber}`
          );
          if (!response.ok) {
            throw new Error("posts not found");
          }
          const data = await response.json();
          setpostAllResult(data); // Set the result data when the fetch is successful
        } catch (error) {
          console.error("Error fetching post data:", error.message);
        }
      };
      fetchMentorData();
    }
  }, [personalInfo.firstName, personalInfo.lastName, personalInfo.phoneNumber]);

  // Update Post Form Data
  // const [updatePostData, setUpdatePostData] = useState({
  //   phoneNumber: "",
  //   name: "",
  // });

  // Handle Post Form Changes
  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  // Handle Update Post Form Changes
  const handleUpdatePostChange = (e) => {
    const { name, value } = e.target;
    setUpdatePostData({
      ...updatePostData,
      [name]: value,
    });
  };

  // Handle Form Submissions
  const handleSubmit = async (e, formType) => {
    e.preventDefault();

    if (formType === "post") {
      try {
        const response = await fetch(
          "http://localhost:3001/mentor/createpost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              postContent: postData.content,
              fname: postData.firstName,
              lname: postData.lastName,
              phonenumber: postData.phoneNumber,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert("Post created successfully!");

        // Clear form after successful submission
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Error creating post. Please try again.");
      }
    }
  };

  return (
    <div className="mentor-container">
      {/* Post Form */}
      <h2>Create a New Post</h2>
      <form onSubmit={(e) => handleSubmit(e, "post")} className="post-form">
        <div className="form-field">
          <div>
            <label htmlFor="postID" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={postData.firstName}
              onChange={handlePostChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={postData.lastName}
              onChange={handlePostChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={postData.phoneNumber}
              onChange={handlePostChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="content" className="form-label">
              Post Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={postData.content}
              onChange={handlePostChange}
              className="form-input"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Create Post
          </button>
        </div>
      </form>
      <h3>Post Preview:</h3>
      <pre className="preview-box">{JSON.stringify(postData, null, 2)}</pre>

      <hr />

      <h2>Views all Posts</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName" // Name for identifying the field
            value={personalInfo.firstName}
            onChange={handlePersonalInfoChange} // Handle change for first name
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="lastName" // Name for identifying the field
            value={personalInfo.lastName}
            onChange={handlePersonalInfoChange} // Handle change for last name
          />

          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber" // Name for identifying the field
            value={personalInfo.phoneNumber}
            onChange={handlePersonalInfoChange} // Handle change for phone number
          />
        </div>
        <button type="submit">Submit Information</button>
      </form>
      {/* <pre className="preview-box">{JSON.stringify(personalInfo, null, 2)}</pre> */}
      {postAllresult ? (
        <table className="mentor-result-table">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Post Content</th>
              <th>Mentor ID</th>
            </tr>
          </thead>
          <tbody>
            {postAllresult.map((item, index) => (
              <tr key={index}>
                <td>{item.postID}</td>
                <td>{item.postContent}</td>
                <td>{item.mentorID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No posts found for this information.</p>
      )}
      {/* Update Post Form
      <h2>Update Post Info</h2>
      <form
        onSubmit={(e) => handleSubmit(e, "updatePost")}
        className="update-post-form"
      >
        <div className="form-field">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={updatePostData.phoneNumber}
            onChange={handleUpdatePostChange}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatePostData.name}
            onChange={handleUpdatePostChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Update Info
        </button>
      </form>
      <h3>Updated Info Preview:</h3>
      <pre className="preview-box">
        {JSON.stringify(updatePostData, null, 2)}
      </pre> */}
    </div>
  );
}

export default MentorPost;
