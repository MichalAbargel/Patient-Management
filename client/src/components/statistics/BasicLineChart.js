import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const BasicLineChart = () => {
  const URL =
    "https://patientsmanagement.azurewebsites.net/api/statistics/activePatients";
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
      //TODO Error handling
    }
  };

  useEffect(() => {
    getActivePatients();
  }, []);
  return (
    <div>
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
          height={400}
        />
      )}
    </div>
  );
};
export default BasicLineChart;
