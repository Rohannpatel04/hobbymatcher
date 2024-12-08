import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mentor from "./pages/Mentor";
import FindHobbyist from "./pages/FindHobbyist";
import MentorRequest from "./pages/MentorRequest";
import MentorPost from "./pages/MentorPost";
import MentorEvents from "./pages/MentorEvents";
import Hobbyist from "./pages/Hobbyist";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/hobbyist" element={<Hobbyist />} />
        <Route path="/mentor/findhobbyist" element={<FindHobbyist />} />
        <Route path="/mentor/requests" element={<MentorRequest />} />
        <Route path="/mentor/post" element={<MentorPost />} />
        <Route path="/mentor/events" element={<MentorEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
