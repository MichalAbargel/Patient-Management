import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const Vaccinations = ({ patient }) => {
  const URL = "http://localhost:3500/api/vaccinations/";
  const [vaccinationAddingMode, setVaccinationAddingMode] = useState(false);
  const [newVaccination, setNewVaccination] = useState({
    vac_date: "",
    vac_manufacturer: "",
  });
  const [vaccinationList, setVaccinationList] = useState([]);

  const getVaccinations = async () => {
    if (patient.id != undefined) {
      try {
        const response = await fetch(`${URL}/${patient.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.length > 0) {
            setVaccinationList([...responseData]);
          }
        } else {
          setVaccinationList(null);
        }
      } catch (error) {
        alert(
          `Error fetching Vaccinations's list of patient with id: ${patient.id}`
        );
      }
    } else {
      setVaccinationList(null);
    }
  };

  useEffect(() => {
    // Get patients from the server
    getVaccinations();
  }, [patient]);

  const handleInputChangeVac = (event) => {
    const { name, value } = event.target;
    const finalValue = value;
    setNewVaccination((prev) => ({ ...prev, [name]: finalValue }));
  };

  const addVaccination = async () => {
    if (patient.id == undefined) {
      alert("Please fill the personal details first");
      return;
    }
    try {
      const response = await fetch(`${URL}/${patient.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVaccination),
      });

      if (response.ok) {
        setVaccinationList((prevVaccinationList) => [
          ...prevVaccinationList,
          newVaccination,
        ]);
        setVaccinationAddingMode(false);
      } else {
        // Handle duplicate entry error
        if (response.status === 409) {
          alert("Vaccination is already exists");
        } else {
          // Handle other server-side errors
          alert(
            "An error occurred while adding the new Vaccination. Please try again."
          );
        }
      }
    } catch (error) {
      alert(
        "A network error occurred. Please check your internet connection and try again."
      );
    }
  };

  const deleteVaccination = async (id, index) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove ability from local state as well
        const newVaccinationsList = [...vaccinationList];
        newVaccinationsList.splice(index, 1);
        setVaccinationList(newVaccinationsList);
      } else {
        alert(
          "An error occurred while deleting the patient. Please try again."
        );
      }
    } catch (error) {
      alert(
        "A network error occurred. Please check your internet connection and try again."
      );
    }
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const legalDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div>
        <h2>{"Vaccinations List"}</h2>
        <TableContainer sx={{ maxWidth: 850 }} component={Paper}>
          <Table sx={{ maxWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Received on</TableCell>
                <TableCell align="left">Manufacturer</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vaccinationList &&
                Array.isArray(vaccinationList) &&
                vaccinationList.map((vaccination, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        {formattedDate(vaccination.vac_date)}
                      </TableCell>
                      <TableCell align="left">
                        {vaccination.vac_manufacturer}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => {
                            deleteVaccination(vaccination.id, index);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          {vaccinationAddingMode && (
            <div>
              <div>
                <label>Received on:</label>
                <input
                  name="vac_date"
                  type="date"
                  value={newVaccination.vac_date}
                  onChange={handleInputChangeVac}
                />
              </div>
              <div>
                <label>Manufacturer:</label>
                <input
                  name="vac_manufacturer"
                  type="text"
                  value={newVaccination.vac_manufacturer}
                  onChange={handleInputChangeVac}
                />
              </div>
              <div>
                <button
                  onClick={() => {
                    addVaccination();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
          <IconButton
            aria-label="Add Vaccination"
            color="primary"
            disabled={vaccinationList && vaccinationList.length >= 4}
            onClick={() => {
              setVaccinationAddingMode(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default Vaccinations;
