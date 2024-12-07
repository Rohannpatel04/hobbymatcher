import React, { useState } from "react";
import "../css/MentorPost.css";

function MentorPost() {
  // Post Form Data
  const [postData, setPostData] = useState({
    postID: "",
    content: "",
  });

  // Update Post Form Data (Now with phoneNumber and name)
  const [updatePostData, setUpdatePostData] = useState({
    phoneNumber: "",
    name: "",
  });

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
  const handleSubmit = (e, formType) => {
    e.preventDefault();
    if (formType === "post") {
      console.log("Post Data Saved:", postData);
    } else if (formType === "updatePost") {
      console.log("Updated Post Data Saved:", updatePostData);
    }
  };

  return (
    <div className="mentor-container">
      {/* Post Form */}
      <h2>Create a New Post</h2>
      <form onSubmit={(e) => handleSubmit(e, "post")} className="post-form">
        <div className="form-field">
          <label htmlFor="postID" className="form-label">
            Post ID:
          </label>
          <input
            type="text"
            id="postID"
            name="postID"
            value={postData.postID}
            onChange={handlePostChange}
            className="form-input"
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
          />
        </div>
        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
      <h3>Post Preview:</h3>
      <pre className="preview-box">{JSON.stringify(postData, null, 2)}</pre>

      <hr />

      {/* Update Post Form */}
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
      </pre>
    </div>
  );
}

export default MentorPost;
