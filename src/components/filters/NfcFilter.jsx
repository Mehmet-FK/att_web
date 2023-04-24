import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const NfcFilter = ({ filterVal, setFilterVal, handleFilter, handleReset }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFilterVal({
      ...filterVal,
      [e.target.name]: e.target.value,
    });
  };
  const xxl = useMediaQuery("(min-width:1500px)");

  return (
    <Box
      component={Paper}
      sx={{
        width: "100%",
        maxWidth: "1250px",
        margin: xxl ? "0 0 0 5%" : "auto",
        // paddingBottom: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: open ? "12.5rem" : "3rem",
        transition: "all 0.3s",
        position: "sticky",
        top: "4.1rem",
        zIndex: "3",
        border: "1px solid #ddd5",
        borderRadius: "0 1rem 0 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          transition: "all 1s",
        }}
      >
        <IconButton onClick={() => setOpen(!open)}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "900",
              paddingInline: "0.6rem",
              borderRadius: "50%",
            }}
          >
            {open ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </Typography>
        </IconButton>
        <Typography
          fontSize={12}
          sx={{ display: open && "none", width: open ? "0px" : "auto" }}
        >
          Öffnen Sie hier den Suchfenster
        </Typography>
      </Box>
      {open && (
        <Box
          sx={{
            transition: "all 0.3s",
            display: open ? "flex" : "none",
            flexDirection: "column",
            rowGap: "15px",
            paddingInline: "2rem",
            // backgroundColor: "red",
            // padddingBottom: "rem",
          }}
        >
          {/* //? == ROW 1 == */}
          <Grid
            container
            sx={{
              width: "95%",
              columnGap: "10px",
              rowGap: "10px",
            }}
          >
            <Grid item md={2}>
              <TextField
                // onChange={handleChange}
                value={filterVal.timeFrom || ""}
                className={"date-input"}
                variant="outlined"
                type="datetime-local"
                size="small"
                label="Erstellt (von)"
                name="timeFrom"
                sx={{ width: "100%", cursor: "pointer" }}
                onChange={(e) =>
                  console.log(new Date(e.target.value).getTime())
                }
                inputProps={{
                  sx: {
                    "&::-webkit-datetime-edit-year-field": {
                      color: filterVal.timeFrom ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-month-field": {
                      color: filterVal.timeFrom ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-day-field": {
                      color: filterVal.timeFrom ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-minute-field": {
                      color: filterVal.timeFrom ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-hour-field": {
                      color: filterVal.timeFrom ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-text": {
                      color: filterVal.timeFrom ? "inherit" : "#ddd5",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.timeTo || ""}
                className={"date-input"}
                variant="outlined"
                type="datetime-local"
                size="small"
                label="Erstellt (bis)"
                name="timeTo"
                sx={{ width: "100%", cursor: "pointer" }}
                inputProps={{
                  sx: {
                    cursor: "pointer",
                    "&::-webkit-datetime-edit-year-field": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-month-field": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-day-field": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-minute-field": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-hour-field": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-text": {
                      color: filterVal.timeTo ? "inherit" : "#ddd5",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemType || ""}
                variant="outlined"
                size="small"
                label="Artikeltyp"
                name="itemType"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemNumber || ""}
                variant="outlined"
                size="small"
                label="Artikelnummer"
                name="itemNumber"
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.street || ""}
                variant="outlined"
                size="small"
                label="Straße"
                name="street"
              />
            </Grid>
            <Grid item md={1}>
              <TextField
                onChange={handleChange}
                value={filterVal.streetnumber || ""}
                variant="outlined"
                size="small"
                label=" Hausnummer"
                name="streetnumber"
              />
            </Grid>
            <Grid item md={1}>
              <TextField
                onChange={handleChange}
                value={filterVal.zip || ""}
                variant="outlined"
                size="small"
                label=" PLZ"
                name="zip"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.city || ""}
                variant="outlined"
                size="small"
                label="Stadt"
                name="city"
              />
            </Grid>
            <Grid item md={1}>
              <TextField
                onChange={handleChange}
                value={filterVal.country || ""}
                variant="outlined"
                size="small"
                label="Land"
                name="country"
              />
            </Grid>
            <Grid item md={1}>
              <TextField
                onChange={handleChange}
                value={filterVal.data1 || ""}
                variant="outlined"
                size="small"
                label=" Daten 1"
                name="data1"
              />
            </Grid>
            <Grid item md={1}>
              <TextField
                onChange={handleChange}
                value={filterVal.data2 || ""}
                variant="outlined"
                size="small"
                label=" Daten 2"
                name="data2"
              />
            </Grid>
            <Grid item md={1}>
              <TextField
                onChange={handleChange}
                value={filterVal.data3 || ""}
                variant="outlined"
                size="small"
                label=" Daten 3"
                name="data3"
              />
            </Grid>
            <Grid item md={1}>
              <TextField
                onChange={handleChange}
                value={filterVal.data4 || ""}
                variant="outlined"
                size="small"
                label=" Daten 4"
                name="data4"
              />
            </Grid>
            <Grid item md={1}>
              <TextField
                onChange={handleChange}
                value={filterVal.data5 || ""}
                variant="outlined"
                size="small"
                label=" Daten 5"
                name="data5"
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              columnGap: "5px",
              justifyContent: "end",
            }}
          >
            <Button
              color={"error"}
              variant="contained"
              onClick={() => handleFilter()}
            >
              {" "}
              Suchen{" "}
            </Button>
            <Button
              color={"error"}
              variant="contained"
              onClick={() => handleReset()}
            >
              {" "}
              Löschen{" "}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NfcFilter;
