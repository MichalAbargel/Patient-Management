import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserHomePage from "./components/UserHome/UserHomePage";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<UserHomePage></UserHomePage>} />
      <Route path="/patients/:id" />
      <Route path="/statistics" />
    </Routes>
  );
}
export default App;
