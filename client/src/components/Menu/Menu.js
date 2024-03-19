import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";

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
        {activeTab === 0}
        {activeTab === 1}
        {activeTab === 2}
        {activeTab === 3}
      </div>
    </div>
  );
};
export default Menu;
