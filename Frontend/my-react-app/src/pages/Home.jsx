import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
function Home() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <Link to="/mentor">
        <button>Mentor</button>
      </Link>
      <Link to="/hobbyist">
        <button>Hobbyist</button>
      </Link>
    </div>
  );
}

export default Home;
