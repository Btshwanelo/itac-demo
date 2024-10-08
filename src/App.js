import React from "react";
import "./index.css";
import LoginScreen from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PermitApplicationForm from "./pages/PermitAplication";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/application" element={<PermitApplicationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
