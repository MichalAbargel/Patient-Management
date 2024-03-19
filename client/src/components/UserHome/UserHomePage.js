import React, { useState, useEffect } from "react";
import Menu from "../Menu/Menu";

const UserHomePage = () => {
  const [user, setUser] = useState(null);
  return (
    <div>
      <Menu></Menu>
    </div>
  );
};

export default UserHomePage;
