import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const BasicBars = ({ lable1, lable2 }) => {
  const URL = "http://localhost:3500/api/statistics/getVaccinatedNumbers";
  const [vaccinatedCount, setVaccinatedCount] = useState(null);
  const [nonVaccinatedCount, setNonVaccinatedCount] = useState(null);

  const getVaccinatedNumbers = async () => {
    console.log("getVaccinatedNumbers");
    try {
      const response = await fetch(`${URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setVaccinatedCount(responseData.vaccinatedCount);
        setNonVaccinatedCount(responseData.notVaccinatedCount);
      }
    } catch (error) {
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    getVaccinatedNumbers();
  }, []);

  return (
    <div>
      {console.log(vaccinatedCount, nonVaccinatedCount)}
      {vaccinatedCount != null && nonVaccinatedCount != null && (
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["Vaccinated Patients", "Unvaccinated Patients"],
            },
          ]}
          series={[{ data: [vaccinatedCount, nonVaccinatedCount] }]}
          width={500}
          height={300}
        />
      )}
    </div>
  );
};
export default BasicBars;
