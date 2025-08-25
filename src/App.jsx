import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Question from "./components/Question";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route directly goes to quiz */}
        <Route path="/" element={<Question />} />
      </Routes>
    </Router>
  );
}

export default App;
