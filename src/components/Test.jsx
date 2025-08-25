import React from "react";
import { Link } from "react-router-dom";

function Test() {
  return (
    <div>
      <h1>Welcome to the Quiz!</h1>
      <Link to="/option">Start Quiz</Link>
    </div>
  );
}

export default Test;
