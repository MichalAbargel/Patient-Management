import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

const BasicLineChart = () => {
  const URL = "http://localhost:3500/api/statistics/activePatients";
  const [xVals, setXVals] = useState(null);
  const [yVals, setYVals] = useState(null);

  const getLegalDates = (datesList) => {
    const newList = [];
    datesList.forEach((element) => {
      const date = new Date(element);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      newList.push(`${day}/${month}`);
    });
    console.log(newList);
    return newList;
  };

  const getActivePatients = async () => {
    try {
      const response = await fetch(`${URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setXVals(getLegalDates(responseData.dates));
        setYVals(responseData.activePatientsCount);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    getActivePatients();
  }, []);
  return (
    <div>
      <Typography variant="h3" align="left">
        Active Patients
      </Typography>
      {xVals != null && yVals != null && (
        <LineChart
          xAxis={[{ scaleType: "point", data: xVals, label: "Day In Month" }]}
          series={[
            {
              data: yVals,
              label: "Active Patients",
            },
          ]}
          width={800}
          height={500}
        />
      )}
    </div>
  );
};
export default BasicLineChart;
