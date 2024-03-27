import React, { useState, useEffect } from "react";
import BasicLineChart from "./BasicLineChart";
import BasicBars from "./BasicBars";
import { Typography, Box } from "@mui/material";

const Statistics = () => {
  return (
    <div>
      <Typography variant="h3" align="center">
        Statistics
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <BasicLineChart></BasicLineChart>
        <BasicBars></BasicBars>
      </Box>
    </div>
  );
};

export default Statistics;
