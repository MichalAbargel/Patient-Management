import React, { useState, useEffect } from "react";

const Vaccinations = ({ patient }) => {
  const URL = "http://localhost:3500/api/vaccinations/";
  const [vaccinationAddingMode, setVaccinationAddingMode] = useState(false);
  const [newVaccination, setNewVaccination] = useState({
    vac_date: "",
    vac_manufacturer: "",
  });
  const [vaccinationList, setVaccinationList] = useState([]);

  const getVaccinations = async () => {
    console.log(patient.id);
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
    console.log(finalValue);
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
        <div>
          <table>
            <thead>
              <tr>
                <th>Received on:</th>
                <th>Manufacturer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vaccinationList &&
                Array.isArray(vaccinationList) &&
                vaccinationList.map((vaccination, index) => {
                  return (
                    <tr key={index}>
                      <td>{formattedDate(vaccination.vac_date)}</td>
                      <td>{vaccination.vac_manufacturer}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteVaccination(vaccination.id, index);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
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
                  +
                </button>
              </div>
            </div>
          )}
          <button
            disabled={vaccinationList && vaccinationList.length >= 4}
            onClick={() => {
              setVaccinationAddingMode(true);
            }}
          >
            Add vaccination
          </button>
        </div>
      </div>
    </div>
  );
};
export default Vaccinations;
