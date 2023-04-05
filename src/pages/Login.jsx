import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/attensam-logo.svg";
import { toastErrorNotify, toastWarnNotify } from "../helpers/ToastNotify";

const Login = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    email: "Attensam@atina.at",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputVal.password.length) {
      toastWarnNotify("Bitte Kennwort eingeben!");
    } else if (inputVal.password === "Attensam!111") {
      navigate("atina");
    } else {
      toastErrorNotify("Kennwort stimmt nicht !");
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#ddd",
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "25rem",
          backgroundColor: "#e10000",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
        }}
      >
        <img src={logo} alt="logo" />
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={inputVal.email || ""}
          onChange={(e) => setInputVal({ ...inputVal, email: e.target.value })}
          sx={{ backgroundColor: "#fff" }}
        />
        <TextField
          label="password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          value={inputVal.password || ""}
          onChange={(e) =>
            setInputVal({ ...inputVal, password: e.target.value })
          }
          sx={{ backgroundColor: "#fff" }}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
