import React, { useState, useEffect } from "react";
import BasicLineChart from "./BasicLineChart";
import { Typography } from "@mui/material";

const Statistics = () => {
  return (
    <div>
      <Typography variant="h3" align="center">
        Statistics
      </Typography>
      <BasicLineChart></BasicLineChart>
    </div>
  );
};

export default Statistics;
