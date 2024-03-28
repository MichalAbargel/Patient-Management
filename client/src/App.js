import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserHomePage from "./components/UserHome/UserHomePage";
import Patients from "./components/patients/patients";
import Statistics from "./components/statistics/Statistics";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<UserHomePage></UserHomePage>} />
      <Route path="/patients" element={<Patients></Patients>} />
      <Route path="/statistics" element={<Statistics></Statistics>} />
    </Routes>
  );
}
export default App;
