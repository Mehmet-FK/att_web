import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../redux/slices/settingsSlice";

const Settings = () => {
  const dispatch = useDispatch();

  const handleSwitch = () => {
    dispatch(setTheme("dark"));
  };

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Einstellungen</h1>
      <Button onClick={() => handleSwitch()} variant="contained">
        Thema Ändern
      </Button>
    </div>
  );
};

export default Settings;
