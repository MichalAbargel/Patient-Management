import React, { useState, useEffect } from "react";
import BasicLineChart from "./BasicLineChart";
import BasicBars from "./BasicBars";
import { Typography, Box } from "@mui/material";
import ResponsiveAppBar from "../Menu/ResponsiveAppBar";

const Statistics = () => {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Typography variant="h3" align="center">
        Statistics
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            margin: "10px",
          }}
        >
          <BasicLineChart></BasicLineChart>
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            margin: "10px",
          }}
        >
          <BasicBars></BasicBars>
        </Box>
      </Box>
    </div>
  );
};

export default Statistics;
