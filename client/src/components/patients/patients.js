import React, { useState, useEffect } from "react";
import NewPatientModal from "./newPatientModal";
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
      // console.log("Error fetching data:", error);
    }
  };

  const addPatient = async () => {
    try {
      const response = await fetch(`${URL}}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      });

      if (response.ok) {
        setPatients((prevPatients) => [...prevPatients, newPatient]);
      } else {
        // Handle duplicate entry error
        if (response.status === 409) {
          alert("Patient is already exists");
        } else {
          // Handle other server-side errors
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

  const updatePatient = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        //Update the patients's list locally
        const updatePatients = [...patients];
        updatePatients[editingIndex] = newPatient;
        setPatients(updatePatients);
        // Reset states after both successful and failed update
        setNewPatient(defaultPatient);
        setEditingIndex(-1);
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
    if (editingIndex === -1) {
      // Mode:add new patient
      addPatient();
    } else {
      if (newPatient.id) {
        // Send a request to the server to update the patient
        updatePatient(newPatient.id);
      }
    }
  };

  const deletePatient = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
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

  useEffect(() => {
    // Get patients from the server
    getPatients();
  }, []);

  return (
    <div>
      <h1>Patients In System</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Birth Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients &&
            Array.isArray(patients) &&
            patients.map((patient, index) => {
              return (
                <tr key={index}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{formattedDate(patient.birth_date)}</td>
                  <td>{patient.city}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditingIndex(index);
                        setAddingMode(false);
                        const showPatient = [...patients][index];
                        setNewPatient(showPatient);
                        openModal();
                      }}
                    >
                      Show More
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* Button to open the modal */}
      <button
        onClick={() => {
          setAddingMode(true);
          openModal();
        }}
      >
        Add New Patient
      </button>
      {/* Open NewAbility Modal */}
      {isModalOpen && (
        <NewPatientModal
          isOpen={isModalOpen}
          onClose={closeModal}
          savePatient={savePatient}
          newPatient={newPatient}
          setNewPatient={setNewPatient}
          deletePatient={deletePatient}
          addingMode={addingMode}
        ></NewPatientModal>
      )}
    </div>
  );
};
export default Patients;
