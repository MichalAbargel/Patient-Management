import React, { useEffect, useState } from "react";
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
  addingMode,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [CitysList, setCityList] = useState(["Tel Aviv", "Jerusalem"]);
  const [editingMode, setEditingMode] = useState(!isReadOnly);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const validation = () => {
    for (var prop in newPatient) {
      switch (prop) {
        case "name":
          if (!/^[a-zA-Z \-]*$/.test(newPatient.name)) {
            return false;
          }
          break;
        case "id":
          if (!/^\d+$/.test(newPatient.id)) {
            return false;
          }
          break;
        case "phone":
          if (!/^\d+$/.test(newPatient.phone)) {
            return false;
          }
          break;
        case "mobile_phone":
          if (!/^\d+$/.test(newPatient.mobile_phone)) {
            return false;
          }
          break;
        case "address":
          if (!/^[a-zA-Z \-\d]*$/.test(newPatient.address)) {
            return false;
          }
          break;
        default:
          break;
      }
    }
    return true;
  };
  const handleDatesChange = (name, value) => {
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

  const getCitiesList = async () => {
    try {
      const response = await fetch(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=b7cf8f14-64a2-4b33-8d4b-edb286fdbd37",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const cityList = [];
        for (var i = 0; i < responseData.result.records.length; i++) {
          var d = responseData.result.records[i].שם_ישוב;
          cityList.push(d);
        }
        setCityList(cityList);
      } else {
      }
    } catch (error) {
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    getCitiesList();
  }, []);

  if (!isOpen) return null;

  return (
    <Box sx={style}>
      <Box sx={{ color: "text.primary", fontSize: 50, fontWeight: "medium" }}>
        {newPatient.name === "" ? "New Patient" : newPatient.name}
      </Box>
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
              error={!/^\d+$/.test(newPatient.id)}
              onError={() => {
                //TODO Error handling
              }}
              helperText={!/^\d+$/.test(newPatient.id) ? "Numbers only" : ""}
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
              error={!/^[a-zA-Z \-]*$/.test(newPatient.name)}
              helperText={
                !/^[a-zA-Z \-]*$/.test(newPatient.name) ? "Letters only" : ""
              }
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
              error={!/^[a-zA-Z \-\d]*$/.test(newPatient.address)}
              helperText={
                !/^[a-zA-Z \-\d]*$/.test(newPatient.address)
                  ? "Letters and numbers only"
                  : ""
              }
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
                <DemoItem>
                  <DatePicker
                    sx={{ m: 1, width: "20ch" }}
                    value={dayjs(legalDate(newPatient.birth_date))}
                    format="DD/MM/YYYY"
                    label="Birth Date"
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
              error={!/^\d+$/.test(newPatient.phone)}
              helperText={!/^\d+$/.test(newPatient.phone) ? "Numbers only" : ""}
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
              error={!/^\d+$/.test(newPatient.mobile_phone)}
              helperText={
                !/^\d+$/.test(newPatient.mobile_phone) ? "Numbers only" : ""
              }
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
                <DemoItem>
                  <DatePicker
                    sx={{ m: 1, width: "20ch" }}
                    format="DD/MM/YYYY"
                    value={dayjs(legalDate(newPatient.positive_result_date))}
                    label="Positive result date"
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
                <DemoItem>
                  <DatePicker
                    sx={{ m: 1, width: "20ch" }}
                    format="DD/MM/YYYY"
                    value={dayjs(legalDate(newPatient.recovery_date))}
                    label="Recovery date"
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
        {newPatient && (
          <Vaccinations
            patient={newPatient}
            legalDate={legalDate}
          ></Vaccinations>
        )}
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
            savePatient(validation);
          }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
};
export default NewPatientModal;
