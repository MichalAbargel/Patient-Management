import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../Menu/ResponsiveAppBar";
import { Typography } from "@mui/material";

const UserHomePage = () => {
  return (
    <div>
      {<ResponsiveAppBar></ResponsiveAppBar>}
      <Typography variant="h2" align="center">
        Patient Management System
      </Typography>
    </div>
  );
};

export default UserHomePage;
