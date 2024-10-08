import React, { useEffect } from "react";
import "./index.css";
import LoginScreen from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PermitApplicationForm from "./pages/PermitAplication";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThankYouScreen from "./pages/ThankYouScreen";

function App() {
  useEffect(() => {
    // Force light mode by removing dark mode related class or setting a specific theme
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";

    // Disable dark mode preference detection
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) {
      mediaQuery.onchange = () => {
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#000000";
      };
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/application" element={<PermitApplicationForm />} />
          <Route path="/thank-you" element={<ThankYouScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
