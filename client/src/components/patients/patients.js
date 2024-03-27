import React, { useState, useEffect } from "react";
import NewPatientModal from "./newPatientModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Patients = () => {
  const URL = "http://localhost:3500/api/patients/";
  const [patients, setPatients] = useState([]);
  const defaultPatient = {
    name: "",
    city: "",
    address: "",
    birth_date: "",
    phone: "",
    mobile_phone: "",
    positive_result_date: "",
    recovery_date: "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newPatient, setNewPatient] = useState(defaultPatient);
  const [editingIndex, setEditingIndex] = useState(-1); // -1 means adding a new subject
  const [addingMode, setAddingMode] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingIndex(-1);
    setNewPatient(defaultPatient);
    setAddingMode(false);
    setIsModalOpen(false);
  };

  const getPatients = async () => {
    try {
      const response = await fetch(`${URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.length > 0) {
          setPatients([...responseData]);
        }
      } else {
        setPatients(null);
      }
    } catch (error) {
      alert("Error fetching data");
    }
  };

  const addPatient = async () => {
    try {
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      });

      if (response.ok) {
        setPatients((prevPatients) => [...prevPatients, newPatient]);
        closeModal();
      } else {
        // Handle duplicate entry error
        if (response.status === 409) {
          alert("Patient is already exists");
        } else if (response.status === 400) {
          // Handle other server-side errors
          alert("Required fields are missing");
        } else {
          alert(
            "An error occurred while adding the new patient. Please try again."
          );
        }
      }
    } catch (error) {
      alert(
        "A network error occurred. Please check your internet connection and try again."
      );
    }
  };

  const updatePatient = async () => {
    try {
      const response = await fetch(`${URL}/${newPatient.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      });
      if (response.ok) {
        //Update the patients's list locally
        const updatePatients = [...patients];
        updatePatients[editingIndex] = newPatient;
        setPatients(updatePatients);
        // Reset states after both successful and failed update
        setNewPatient(defaultPatient);
        closeModal();
      } else {
        alert(
          "An error occurred while updating the patient. Please try again."
        );
      }
    } catch (error) {
      alert(
        "A network error occurred. Please check your internet connection and try again."
      );
    }
  };

  const savePatient = () => {
    if (addingMode) {
      // Mode:add new patient
      addPatient();
    } else {
      if (newPatient.id) {
        // Send a request to the server to update the patient
        updatePatient();
      }
    }
  };

  const deletePatient = async () => {
    try {
      const response = await fetch(`${URL}/${newPatient.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove ability from local state as well
        const newPatients = [...patients];
        newPatients.splice(editingIndex, 1);
        setPatients(newPatients);
        setEditingIndex(-1);
        closeModal();
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

  const openModalToShowPatient = async (index) => {
    await new Promise(() => {
      setEditingIndex(index);
      setAddingMode(false);
      const showPatient = [...patients][index];
      setNewPatient(showPatient);
      openModal();
    });
  };

  const openModalToAddNewPatient = async () => {
    await new Promise(() => {
      setAddingMode(true);
      setNewPatient(defaultPatient);
      openModal();
    });
  };

  useEffect(() => {
    // Get patients from the server
    getPatients();
  }, []);

  return (
    <Container maxWidth="md">
      <Box>
        <h1>Patients In System</h1>
        <TableContainer sx={{ maxWidth: 850 }} component={Paper}>
          <Table sx={{ maxWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Birth Date</TableCell>
                <TableCell align="left">City</TableCell>
                <TableCell align="left">More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients &&
                Array.isArray(patients) &&
                patients.map((patient, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{patient.id}</TableCell>
                      <TableCell align="left">{patient.name}</TableCell>
                      <TableCell align="left">
                        {formattedDate(patient.birth_date)}
                      </TableCell>
                      <TableCell align="left">{patient.city}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          aria-label="more"
                          color="primary"
                          onClick={() => {
                            openModalToShowPatient(index);
                          }}
                        >
                          <MoreHoriz />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Button to open the modal */}
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            openModalToAddNewPatient();
          }}
        >
          Add New Patient
        </Button>
        {/* Open NewAbility Modal */}
        {isModalOpen && (
          <NewPatientModal
            isOpen={isModalOpen}
            onClose={closeModal}
            savePatient={savePatient}
            newPatient={newPatient}
            setNewPatient={setNewPatient}
            deletePatient={deletePatient}
            isReadOnly={!addingMode}
            addingMode={addingMode}
          ></NewPatientModal>
        )}
      </Box>
    </Container>
  );
};
export default Patients;
