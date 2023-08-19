// @ts-nocheck
import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    navigate("/second-page");
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px",
          margin: "40px auto",
          padding: 10,
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <TextField
          sx={{ width: "100%", maxWidth: "450px", marginBottom: "10px" }}
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          sx={{ width: "100%", maxWidth: "450px", marginBottom: "10px" }}
          label="Phone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          sx={{ width: "100%", maxWidth: "450px", marginBottom: "10px" }}
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "16px", width: "100%", maxWidth: "450px" }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default FirstPage;
