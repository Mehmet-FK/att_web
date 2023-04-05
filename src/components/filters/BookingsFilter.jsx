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

const BookingsFilter = ({
  filterVal,
  setFilterVal,
  handleFilter,
  handleReset,
}) => {
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    setFilterVal({
      ...filterVal,
      [e.target.name]: e.target.value,
    });
  };

  // const today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
  const today = new Date().toISOString().split("T")[0];

  const xxl = useMediaQuery("(min-width:1500px)");

  return (
    <Box
      component={Paper}
      sx={{
        width: "100%",
        maxWidth: "1250px",
        margin: xxl ? "0 0 0 5%" : "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        height: open ? "12.5rem" : "3rem",
        transition: "all 0.3s",
        positi: "sticky",
        top: "3rem",
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
      <Box
        sx={{
          transition: "all 0.3s",
          display: open ? "flex" : "none",
          flexDirection: "column",

          paddingInline: "2rem",
        }}
      >
        {/* //? == ROW 1 == */}
        <Grid
          container
          sx={{
            width: "100%",
            columnGap: "10px",
            rowGap: "5px",
            paddingLeft: "1rem",
          }}
        >
          {/* <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.id || ""}
              variant="outlined"
              type={"number"}
              size="small"
              label="ID"
              name="id"
            />
          </Grid> */}
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.dateFrom || ""}
              className={"date-input"}
              variant="outlined"
              type="date"
              size="small"
              label="Datum (von)"
              name="dateFrom"
              sx={{ width: "100%", cursor: "pointer" }}
              inputProps={{
                max: today,
                sx: {
                  "&::-webkit-datetime-edit-year-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },

                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                },
              }}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.dateTo || ""}
              className={"date-input"}
              variant="outlined"
              type="date"
              size="small"
              label="Datum (bis)"
              name="dateTo"
              max="1979-12-31"
              sx={{ width: "100%", cursor: "pointer" }}
              inputProps={{
                max: today,
                min: filterVal.dateFrom,
                sx: {
                  cursor: "pointer",
                  "&::-webkit-datetime-edit-year-field": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                },
              }}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              // onChange={handleChange}
              value={filterVal.timeFrom || ""}
              className={"date-input"}
              variant="outlined"
              type="datetime-local"
              size="small"
              label="Datum-Uhrzeit (von)"
              name="timeFrom"
              sx={{ width: "100%", cursor: "pointer" }}
              onChange={(e) => console.log(new Date(e.target.value).getTime())}
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
              label="Datum-Uhrzeit  (bis)"
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
              value={filterVal.bookingType || ""}
              variant="outlined"
              size="small"
              label="Buchungstyp"
              name="bookingType"
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
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.streetNumber || ""}
              variant="outlined"
              size="small"
              label="Hausnummer"
              name="streetNumber"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.zip || ""}
              variant="outlined"
              size="small"
              label="PLZ "
              name="zip"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.city || ""}
              variant="outlined"
              size="small"
              label="Stadt "
              name="city"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.country || ""}
              variant="outlined"
              size="small"
              label="Land "
              name="country"
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            columnGap: "5px",
            justifyContent: "end",
            paddingInline: "3rem",
            paddingTop: "0.5rem",
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
    </Box>
  );
};

export default BookingsFilter;
