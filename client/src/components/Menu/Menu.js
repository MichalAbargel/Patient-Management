import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Patients from "../patients/patients";
import Statistics from "../statistics/Statistics";

const Menu = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  return (
    <div>
      {/* Tabs navigation */}
      <div>
        {<ResponsiveAppBar setActiveTab={setActiveTab}></ResponsiveAppBar>}
      </div>
      {/* Tab content */}
      <div>
        {activeTab === 0 && <Patients></Patients>}
        {activeTab === 1 && <Statistics></Statistics>}
        {activeTab === 2}
      </div>
    </div>
  );
};
export default Menu;
