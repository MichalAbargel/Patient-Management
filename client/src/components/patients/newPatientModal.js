import React, { useState } from "react";

const NewPatientModal = ({
  isOpen,
  onClose,
  savePatient,
  newPatient,
  setNewPatient,
  deletePatient,
  addingMode,
}) => {
  // TODO - API for cities?
  const sitysList = [];
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const finalValue = name === "units" ? Number(value) : value;
    setNewPatient((prev) => ({ ...prev, [name]: finalValue }));
  };

  if (!isOpen) return null;

  return (
    <div>
      <div>
        <h2>{newPatient.name}</h2>
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
                  Select Sity
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
            <label>{newPatient.birth_date}</label>
          ) : (
            <input
              name="birth date"
              type="date"
              value={newPatient.birth_date}
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
              name="mobile phone"
              type="text"
              value={newPatient.mobile_phone}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label>Positive result date</label>
          {isReadOnly ? (
            <label>{newPatient.positive_result_date}</label>
          ) : (
            <input
              name="Positive result date"
              type="date"
              value={newPatient.positive_result_date}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <label>Recovery date</label>
          {isReadOnly ? (
            <label>{newPatient.recovery_date}</label>
          ) : (
            <input
              name="Recovery date"
              type="date"
              value={newPatient.recovery_date}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div>
          <button onClick={savePatient}>Save</button>
          {!addingMode && (
            <button
              onClick={() => {
                setIsReadOnly(false);
              }}
            >
              Edit
            </button>
          )}
          {!addingMode && (
            <button
              onClick={() => {
                deletePatient(newPatient.id);
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
