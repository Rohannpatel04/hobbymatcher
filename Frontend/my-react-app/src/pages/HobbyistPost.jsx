import React, { useState, useEffect } from "react";

export default function HobbyistPost() {
    const [getAllPosts, setGetAllPosts] = useState("");

    const [getpostsandcommentsbyhobbyist, setGetPostsAndCommentsByHobbyist] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
    });
    const [getpostsandcommentsbyhobbyistresult, setGetPostsAndCommentsByHobbyistResult] = useState("");

    const [getpostsbyskill, setGetPostsBySkill] = useState({
        skillname: "", // Consistent variable name with the input
    });
    const [getpostsbyskillresult, setGetPostsBySkillResult] = useState("");

    const [getpostsbylocation, setGetPostsByLocation] = useState({
        location: "",
    });
    const [getpostsbylocationresult, setGetPostsByLocationResult] = useState("");

    const [getpostsbymentorschooling, setGetPostsByMentorSchooling] = useState({
        schooling: "",
    });
    const [getpostsbymentorschoolingresult, setGetPostsByMentorSchoolingResult] = useState("");

    const [getpostsbyskilllocationschooling, setGetPostsBySkillLocationSchooling] = useState({
        skillname: "",
        location: "",
        schooling: "",
    });
    const [getpostsbyskilllocationschoolingresult, setGetPostsBySkillLocationSchoolingResult] = useState("");
    const [createcomment, setCreateComment] = useState({
        reviewContent: "",
        mentorFName: "",
        mentorLastName: "",
        mentorPhoneNumber: "",
        postContent: "",    
        hobbyistFName: "",    
        hobbyistLastName: "",    
        hobbyistPhoneNumber: "",
    })

  

    const handleSubmit = async (e, formType) => {
        e.preventDefault();
        const bodyData = {
            reviewContent: createcomment.reviewContent,
            mentorFName: createcomment.mentorFName,
            mentorLastName: createcomment.mentorLastName,
            mentorPhoneNumber: createcomment.mentorPhoneNumber,
            postContent: createcomment.postContent,
            hobbyistFName: createcomment.hobbyistFName,
            hobbyistLastName: createcomment.hobbyistLastName,
            hobbyistPhoneNumber: createcomment.hobbyistPhoneNumber,
          };
        if (formType === "post") {
            console.log(createcomment);
            try {

                const response = await fetch("http://localhost:3001/hobbyist/createcomment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({bodyData}),
                });
                if (!response.ok) {
                    throw new Error("Error creating comment");
                }
                const data = await response.json();
                alert("Comment created successfully!");
            } catch (error) {
                console.error("Error fetching hobbyist data:", error.message);
                alert("Error creating comment try again");
            }
        }
    };

    

    useEffect(() => {
        if (getpostsbyskilllocationschooling.skillname, getpostsbyskilllocationschooling.location, getpostsbyskilllocationschooling.schooling) {

            const fetchMentorData = async () => {
                try {  
                    const response = await fetch(`http://localhost:3001/hobbyist/getpostsbyskilllocationschooling/${getpostsbyskilllocationschooling.skillname}/${getpostsbyskilllocationschooling.location}/${getpostsbyskilllocationschooling.schooling}`);
                    if (!response.ok) {
                        throw new Error("Hobbyists not found");    
                    }
                    const data = await response.json(); 
                    setGetPostsBySkillLocationSchoolingResult(data); // Set the result data when the fetch is successful
            } catch (error) {
                    console.error("Error fetching hobbyist data:", error.message);
                }
            };
            fetchMentorData(); 
        }
    }, [getpostsbyskilllocationschooling.skillname, getpostsbyskilllocationschooling.location, getpostsbyskilllocationschooling.schooling]);

    useEffect(() => {
        if (getpostsbymentorschooling.schooling) {
            const fetchMentorData = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/hobbyist/getpostsandcommentsbymentorschooling/${getpostsbymentorschooling.schooling}`);
                    if (!response.ok) {
                        throw new Error("Hobbyists not found");
                    }
                    const data = await response.json();
                    setGetPostsByMentorSchoolingResult(data); // Set the result data when the fetch is successful
                } catch (error) {
                    console.error("Error fetching hobbyist data:", error.message);
                }
            };
            fetchMentorData();
        }
    }, [getpostsbymentorschooling.schooling]);

    useEffect(() => {
        if (getpostsbylocation.location) {
            const fetchMentorData = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/hobbyist/getpostsbymentorlocation/${getpostsbylocation.location}`);
                    if (!response.ok) {
                        throw new Error("Hobbyists not found");
                    }
                    const data = await response.json();
                    setGetPostsByLocationResult(data); // Set the result data when the fetch is successful
                } catch (error) {
                    console.error("Error fetching hobbyist data:", error.message);
                }
            };
            fetchMentorData();
        }
    }, [getpostsbylocation.location]);

    useEffect(() => {
        if (getpostsbyskill.skillname) {
            const fetchMentorData = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/hobbyist/getpostsbyskill/${getpostsbyskill.skillname}`);
                    if (!response.ok) {
                        throw new Error("Hobbyists not found");
                    }
                    const data = await response.json();
                    setGetPostsBySkillResult(data); // Set the result data when the fetch is successful
                } catch (error) {
                    console.error("Error fetching hobbyist data:", error.message);
                }
            };
            fetchMentorData();
        }
    }, [getpostsbyskill.skillname]);

    useEffect(() => {
        if (getpostsandcommentsbyhobbyist.firstname && getpostsandcommentsbyhobbyist.lastname && getpostsandcommentsbyhobbyist.phonenumber) {
            const fetchMentorData = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/hobbyist/getpostsandcommentsbyhobbyist/${getpostsandcommentsbyhobbyist.firstname}/${getpostsandcommentsbyhobbyist.lastname}/${getpostsandcommentsbyhobbyist.phonenumber}`);
                    if (!response.ok) {
                        throw new Error("Hobbyists not found");
                    }
                    const data = await response.json();
                    setGetPostsAndCommentsByHobbyistResult(data); // Set the result data when the fetch is successful
                } catch (error) {
                    console.error("Error fetching hobbyist data:", error.message);
                }
            };
            fetchMentorData();
        }
    }, [
        getpostsandcommentsbyhobbyist.firstname,
        getpostsandcommentsbyhobbyist.lastname,
        getpostsandcommentsbyhobbyist.phonenumber,
    ]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await fetch("http://localhost:3001/hobbyist/getAllPosts");
                if (!response.ok) {
                    throw new Error("Hobbyists not found");
                }
                const data = await response.json();
                setGetAllPosts(data); // Set the result data when the fetch is successful
            } catch (error) {
                console.error("Error fetching hobbyist data:", error.message);
            }
        };
        fetchAllPosts();
    }, []); // Add empty dependency array to avoid infinite re-fetching

    return (
        <div>
            <h1>Posts</h1>
            <div>
                <h1>View All Post</h1>
                {getAllPosts && getAllPosts.data.map((post, index) => (
                    <div key={index}>
                        <h2>{post.PostContent}</h2>
                        <p>{post.MentorFullName}</p>
                        <p>{post.MentorSchooling}</p>
                        <p>{post.ReviewContent}</p>
                        <p>{post.HobbyistFullName}</p>  
                    </div>
                ))}
            </div>
            <div>
                <h1>Get a post that a hobbyist commented on</h1>
                <form>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={getpostsandcommentsbyhobbyist.firstname}
                        onChange={(e) => setGetPostsAndCommentsByHobbyist({ ...getpostsandcommentsbyhobbyist, firstname: e.target.value })}
                    />
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={getpostsandcommentsbyhobbyist.lastname}
                        onChange={(e) => setGetPostsAndCommentsByHobbyist({ ...getpostsandcommentsbyhobbyist, lastname: e.target.value })}
                    />
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phonenumber"
                        value={getpostsandcommentsbyhobbyist.phonenumber}
                        onChange={(e) => setGetPostsAndCommentsByHobbyist({ ...getpostsandcommentsbyhobbyist, phonenumber: e.target.value })}
                    />
                </form>
                <pre>{JSON.stringify(getpostsandcommentsbyhobbyist, null, 2)}</pre>
                {getpostsandcommentsbyhobbyistresult && Array.isArray(getpostsandcommentsbyhobbyistresult.data) && getpostsandcommentsbyhobbyistresult.data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Post Content</th>
                                <th>Mentor Full Name</th>
                                <th>Mentor Schooling</th>
                                <th>Comment</th>
                                <th>Hobbyist Full Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getpostsandcommentsbyhobbyistresult.data.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.PostContent}</td>
                                    <td>{post.MentorFullName}</td>
                                    <td>{post.MentorSchooling}</td>
                                    <td>{post.ReviewContent}</td>
                                    <td>{post.HobbyistFullName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No posts and comments found.</p>
                )}
            </div>
            <div>
                <h1>Get Posts By Skills</h1>
                <form>
                    <label>Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={getpostsbyskill.skillname} // Use the correct state variable `skillname`
                        onChange={(e) => setGetPostsBySkill({ ...getpostsbyskill, skillname: e.target.value })}
                    />
                </form>
                {getpostsbyskillresult && Array.isArray(getpostsbyskillresult.data) && getpostsbyskillresult.data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Post Content</th>
                                <th>Mentor Full Name</th>
                                <th>Comment</th>
                                <th>Hobbyist Full Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getpostsbyskillresult.data.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.PostContent}</td>
                                    <td>{post.MentorFullName}</td>
                                    <td>{post.ReviewContent}</td>
                                    <td>{post.HobbyistFullName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No posts and comments found.</p>
                )}
            </div>
            <div>
                <h1>Get Posts By Location</h1>
                <form>
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={getpostsbylocation.location}
                        onChange={(e) => setGetPostsByLocation({ ...getpostsbylocation, location: e.target.value })}
                    />
                </form>
                {getpostsbylocationresult && Array.isArray(getpostsbylocationresult.data) && getpostsbylocationresult.data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Post Content</th>
                                <th>Mentor Full Name</th>
                                <th>Comment</th>
                                <th>Hobbyist Full Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getpostsbylocationresult.data.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.PostContent}</td>
                                    <td>{post.MentorLocation}</td>
                                    <td>{post.ReviewContent}</td>
                                    <td>{post.HobbyistFullName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No posts and comments found.</p>
                )}
            </div>
            <div>   
                <h1>Get Posts By School</h1>
                <form>
                    <label>School</label>
                    <input
                        type="text"
                        name="school"
                        value={getpostsbymentorschooling.schooling}
                        onChange={(e) => setGetPostsByMentorSchooling({ ...getpostsbymentorschooling, schooling: e.target.value })}
                    />
                </form>
                {getpostsbymentorschoolingresult && Array.isArray(getpostsbymentorschoolingresult.data) && getpostsbymentorschoolingresult.data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Post Content</th>
                                <th>Mentor Full Name</th>
                                <th>Comment</th>
                                <th>Hobbyist Full Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getpostsbymentorschoolingresult.data.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.PostContent}</td>
                                    <td>{post.MentorFullName}</td>
                                    <td>{post.ReviewContent}</td>
                                    <td>{post.HobbyistFullName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No posts and comments found.</p>
                )}
            
            </div>
            <div>
                <h1>Get Posts By Skill, Location, and School</h1>
                <form>
                    <label>Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={getpostsbyskilllocationschooling.skillname}
                        onChange={(e) => setGetPostsBySkillLocationSchooling({ ...getpostsbyskilllocationschooling, skillname: e.target.value })}
                    />
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={getpostsbyskilllocationschooling.location}
                        onChange={(e) => setGetPostsBySkillLocationSchooling({ ...getpostsbyskilllocationschooling, location: e.target.value })}
                    />
                    <label>School</label>
                    <input
                        type="text"
                        name="school"
                        value={getpostsbyskilllocationschooling.schooling}
                        onChange={(e) => setGetPostsBySkillLocationSchooling({ ...getpostsbyskilllocationschooling, schooling: e.target.value })}
                    />  
                </form>
                {getpostsbyskilllocationschoolingresult && Array.isArray(getpostsbyskilllocationschoolingresult.data) && getpostsbyskilllocationschoolingresult.data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Post Content</th>
                                <th>Mentor Full Name</th>
                                <th>Comment</th>
                                <th>Hobbyist Full Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getpostsbyskilllocationschoolingresult.data.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.PostContent}</td>
                                    <td>{post.MentorFullName}</td>
                                    <td>{post.ReviewContent}</td>
                                    <td>{post.HobbyistFullName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>                                
                ) : (
                    <p>No posts and comments found.</p>             
                )}
            </div>
            <div>
                <h1>Create a Comment on a Post</h1>
                <form onSubmit={(e) => handleSubmit(e, "post")}>
                        <label htmlFor="reviewContent" className="form-label">
                            Review Content
                        </label>
                        <input
                        type="text"
                        id="reviewContent"
                        name="reviewContent"
                        value={createcomment.reviewContent}
                        onChange={(e) => setCreateComment({ ...createcomment, reviewContent: e.target.value })}
                        className="form-control"
                        required
                        />
                        <label htmlFor="mentorFName" className="form-label">
                            Mentor First Name
                        </label>
                        <input
                        type="text"
                        id="mentorFName"
                        name="mentorFName"
                        value={createcomment.mentorFName}
                        onChange={(e) => setCreateComment({ ...createcomment, mentorFName: e.target.value })}
                        className="form-control"
                        required
                        />   
                        <label htmlFor="mentorLastName" className="form-label">
                            Mentor Last Name
                        </label>
                        <input
                        type="text"
                        id="mentorLastName"
                        name="mentorLastName"
                        value={createcomment.mentorLastName}
                        onChange={(e) => setCreateComment({ ...createcomment, mentorLastName: e.target.value })}
                        className="form-control"
                        required
                        /> 
                        <label htmlFor="mentorPhoneNumber" className="form-label">
                            Mentor Phone Number
                        </label>
                        <input
                        type="text"
                        id="mentorPhoneNumber"
                        name="mentorPhoneNumber"        
                        value={createcomment.mentorPhoneNumber} 
                        onChange={(e) => setCreateComment({ ...createcomment, mentorPhoneNumber: e.target.value })}
                        className="form-control"        
                        required        
                        />        
                        <label htmlFor="postContent" className="form-label">
                            Post Content
                        </label>
                        <input
                        type="text"
                        id="postContent"
                        name="postContent"
                        value={createcomment.postContent}
                        onChange={(e) => setCreateComment({ ...createcomment, postContent: e.target.value })}
                        className="form-control"
                        required
                        /> 
                        <label htmlFor="hobbyistFName" className="form-label">
                            Hobbyist First Name
                        </label>
                        <input
                        type="text"
                        id="hobbyistFName"
                        name="hobbyistFName"
                        value={createcomment.hobbyistFName}
                        onChange={(e) => setCreateComment({ ...createcomment, hobbyistFName: e.target.value })}
                        className="form-control"
                        required
                        /> 
                        <label htmlFor="hobbyistLastName" className="form-label">
                            Hobbyist Last Name
                        </label>
                        <input
                        type="text"
                        id="hobbyistLastName"
                        name="hobbyistLastName"
                        value={createcomment.hobbyistLastName}
                        onChange={(e) => setCreateComment({ ...createcomment, hobbyistLastName: e.target.value })}
                        className="form-control"
                        required
                        /> 
                        <label htmlFor="hobbyistPhoneNumber" className="form-label">
                            Hobbyist Phone Number
                        </label>
                        <input
                        type="text"
                        id="hobbyistPhoneNumber"
                        name="hobbyistPhoneNumber"
                        value={createcomment.hobbyistPhoneNumber}        
                        onChange={(e) => setCreateComment({ ...createcomment, hobbyistPhoneNumber: e.target.value })}
                        className="form-control"
                        required
                        /> 
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>   
                </form>

            </div>
        </div>
    );
}
