import React, { useState } from "react";
import Vaccinations from "../vaccinations/vaccinations";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const NewPatientModal = ({
  isOpen,
  onClose,
  savePatient,
  newPatient,
  setNewPatient,
  deletePatient,
  isReadOnly,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 680,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // TODO - API for cities?
  const CitysList = ["Tel Aviv", "Jerusalem"];
  const [editingMode, setEditingMode] = useState(!isReadOnly);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const finalValue = value;
    setNewPatient((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleDatesChange = (name, value) => {
    console.log(name, value);
    setNewPatient((prev) => ({ ...prev, [name]: value }));
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

  function Label({ componentName, valueType, isProOnly }) {
    const content = <span>{componentName}</span>;

    return content;
  }

  if (!isOpen) return null;

  return (
    <Box sx={style}>
      <Box
        sx={
          editingMode
            ? { display: "flex", flexWrap: "wrap" }
            : {
                bgcolor: "background.paper",
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                minWidth: 300,
              }
        }
      >
        <Box sx={{ color: "text.primary", fontSize: 50, fontWeight: "medium" }}>
          {newPatient.name === "" ? "New Patient" : newPatient.name}
        </Box>
        <div>
          {!editingMode ? (
            <Box
              sx={{
                color: "text.secondary",
                fontSize: 20,
                display: "flex",
                flexWrap: "wrap",
                margin: "10px",
              }}
            >
              <label>ID: </label>
              <label>{newPatient.id}</label>
            </Box>
          ) : (
            <TextField
              name="id"
              id="id"
              label="ID"
              type="text"
              value={newPatient.id}
              variant="outlined"
              onChange={handleInputChange}
              sx={{ m: 1, width: "20ch" }}
            />
          )}
        </div>
        <div>
          {!editingMode ? (
            <Box
              sx={{
                color: "text.secondary",
                fontSize: 20,
                display: "flex",
                flexWrap: "wrap",
                margin: "10px",
              }}
            >
              <label>Name: </label>
              <label>{newPatient.name}</label>
            </Box>
          ) : (
            <TextField
              name="name"
              id="name"
              label="Name"
              type="text"
              value={newPatient.name}
              variant="outlined"
              onChange={handleInputChange}
              sx={{ m: 1, width: "20ch" }}
            />
          )}
        </div>
        <div>
          {!editingMode ? (
            <Box
              sx={{
                color: "text.secondary",
                fontSize: 20,
                display: "flex",
                flexWrap: "wrap",
                margin: "10px",
              }}
            >
              <label>City: </label>
              <label>{newPatient.city}</label>
            </Box>
          ) : (
            <TextField
              id="city"
              name="city"
              select
              label="city"
              value={newPatient.city}
              variant="outlined"
              onChange={handleInputChange}
              sx={{ m: 1, width: "20ch" }}
            >
              {CitysList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        </div>
        <div>
          {!editingMode ? (
            <Box
              sx={{
                color: "text.secondary",
                fontSize: 20,
                display: "flex",
                flexWrap: "wrap",
                margin: "10px",
              }}
            >
              <label>Address: </label>
              <label>{newPatient.address}</label>
            </Box>
          ) : (
            <TextField
              name="address"
              id="address"
              label="Address"
              type="text"
              value={newPatient.address}
              variant="outlined"
              onChange={handleInputChange}
              sx={{ m: 1, width: "20ch" }}
            />
          )}
        </div>
        <div>
          {!editingMode ? (
            <Box
              sx={{
                color: "text.secondary",
                fontSize: 20,
                display: "flex",
                flexWrap: "wrap",
                margin: "10px",
              }}
            >
              <label>Birth Date: </label>
              <label>{formattedDate(newPatient.birth_date)}</label>
            </Box>
          ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "TimePicker",
                  "DateTimePicker",
                  "DateRangePicker",
                ]}
              >
                <DemoItem
                  label={
                    <Label
                      id="birth_date"
                      label="Birth Date"
                      componentName="Birth Date"
                      valueType="date"
                    />
                  }
                >
                  <DatePicker
                    value={dayjs(legalDate(newPatient.birth_date))}
                    onChange={(newValue) => {
                      handleDatesChange("birth_date", newValue);
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          )}
        </div>
        <div>
          {!editingMode ? (
            <Box
              sx={{
                color: "text.secondary",
                fontSize: 20,
                display: "flex",
                flexWrap: "wrap",
                margin: "10px",
              }}
            >
              <label>Phone: </label>
              <label>{newPatient.phone}</label>
            </Box>
          ) : (
            <TextField
              name="phone"
              id="phone"
              label="Phone"
              type="text"
              value={newPatient.phone}
              variant="outlined"
              onChange={handleInputChange}
              sx={{ m: 1, width: "20ch" }}
            />
          )}
        </div>
        <div>
          {!editingMode ? (
            <Box
              sx={{
                color: "text.secondary",
                fontSize: 20,
                display: "flex",
                flexWrap: "wrap",
                margin: "10px",
              }}
            >
              <label>Mobile: </label>
              <label>{newPatient.mobile_phone}</label>
            </Box>
          ) : (
            <TextField
              name="mobile_phone"
              id="mobile phone"
              label="Mobile Phone"
              type="text"
              value={newPatient.mobile_phone}
              variant="outlined"
              onChange={handleInputChange}
              sx={{ m: 1, width: "20ch" }}
            />
          )}
        </div>
        <div>
          {!editingMode ? (
            <Box
              sx={{
                color: "text.secondary",
                fontSize: 20,
                display: "flex",
                flexWrap: "wrap",
                margin: "10px",
              }}
            >
              <label>Positive result date: </label>
              <label>{formattedDate(newPatient.positive_result_date)}</label>
            </Box>
          ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "TimePicker",
                  "DateTimePicker",
                  "DateRangePicker",
                ]}
              >
                <DemoItem
                  label={
                    <Label
                      id="positive_result_date"
                      label="Positive result date"
                      name="positive_result_date"
                      componentName="Positive result date:"
                      valueType="date"
                    />
                  }
                >
                  <DatePicker
                    value={dayjs(legalDate(newPatient.positive_result_date))}
                    onChange={(newValue) => {
                      handleDatesChange("positive_result_date", newValue);
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          )}
        </div>
        <div>
          {!editingMode ? (
            <Box
              sx={{
                color: "text.secondary",
                fontSize: 20,
                display: "flex",
                flexWrap: "wrap",
                margin: "10px",
              }}
            >
              <label>Recovery date: </label>
              <label>{formattedDate(newPatient.recovery_date)}</label>
            </Box>
          ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "TimePicker",
                  "DateTimePicker",
                  "DateRangePicker",
                ]}
              >
                <DemoItem
                  label={
                    <Label
                      id="recovery_date"
                      label="Recovery date"
                      name="recovery_date"
                      componentName="Recovery date:"
                      valueType="date"
                    />
                  }
                >
                  <DatePicker
                    value={dayjs(legalDate(newPatient.recovery_date))}
                    onChange={(newValue) => {
                      handleDatesChange("recovery_date", newValue);
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          )}
        </div>
      </Box>
      <div>
        {newPatient && <Vaccinations patient={newPatient}></Vaccinations>}
      </div>
      <div>
        {isReadOnly && (
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => {
              setEditingMode(true);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
        {isReadOnly && (
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => {
              deletePatient();
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          aria-label="cancel"
          color="primary"
          onClick={() => {
            onClose();
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
        <Button
          color="success"
          variant="outlined"
          onClick={() => {
            savePatient();
          }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
};
export default NewPatientModal;
