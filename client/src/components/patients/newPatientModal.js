import React, { useState } from "react";

const NewPatientModal = ({
  isOpen,
  onClose,
  savePatient,
  newPatient,
  setNewPatient,
  deletePatient,
  isReadOnly,
}) => {
  // TODO - API for cities?
  const sitysList = ["Tel Aviv", "Jerusalem"];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const finalValue = value;
    setNewPatient((prev) => ({ ...prev, [name]: finalValue }));
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

  if (!isOpen) return null;

  return (
    <div>
      <div>
        <h2>{newPatient.name}</h2>
        <div>
          <label>ID</label>
          {isReadOnly ? (
            <label>{newPatient.id}</label>
          ) : (
            <input
              name="id"
              type="text"
              value={newPatient.id}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label>Name</label>
          {isReadOnly ? (
            <label>{newPatient.name}</label>
          ) : (
            <input
              name="name"
              type="text"
              value={newPatient.name}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          {isReadOnly ? (
            <label>{newPatient.city}</label>
          ) : (
            <label>
              <select
                name="city"
                value={newPatient.city}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select City
                </option>
                {sitysList.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div>
          <label>Address</label>
          {isReadOnly ? (
            <label>{newPatient.address}</label>
          ) : (
            <input
              name="address"
              type="text"
              value={newPatient.address}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label>Birth Date</label>
          {isReadOnly ? (
            <label>{formattedDate(newPatient.birth_date)}</label>
          ) : (
            <input
              name="birth_date"
              type="date"
              value={legalDate(newPatient.birth_date)}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label>Phone</label>
          {isReadOnly ? (
            <label>{newPatient.phone}</label>
          ) : (
            <input
              name="phone"
              type="text"
              value={newPatient.phone}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label>Mobile Phone</label>
          {isReadOnly ? (
            <label>{newPatient.mobile_phone}</label>
          ) : (
            <input
              name="mobile_phone"
              type="text"
              value={newPatient.mobile_phone}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label>Positive result date</label>
          {isReadOnly ? (
            <label>{formattedDate(newPatient.positive_result_date)}</label>
          ) : (
            <input
              name="positive_result_date"
              type="date"
              value={
                newPatient.positive_result_date
                  ? legalDate(newPatient.positive_result_date)
                  : ""
              }
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label>Recovery date</label>
          {isReadOnly ? (
            <label>{formattedDate(newPatient.recovery_date)}</label>
          ) : (
            <input
              name="recovery_date"
              type="date"
              value={legalDate(newPatient.recovery_date)}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <button
            onClick={() => {
              savePatient();
            }}
          >
            Save
          </button>
          {!isReadOnly && <button>Edit</button>}
          {!isReadOnly && (
            <button
              onClick={() => {
                deletePatient();
              }}
            >
              Delete
            </button>
          )}
          <button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewPatientModal;
