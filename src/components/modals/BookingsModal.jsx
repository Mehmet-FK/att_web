import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField, Tooltip } from "@mui/material";
import placeholder from "../../assets/placeholder.jpg";
import { useState } from "react";

const style = {
  cardStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    overflow: "auto",
  },
  imgStyle: {
    backgroundImage: `url(${placeholder})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "15rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10rem",
    color: "#00000055",
    backgroundColor: "#ddd",
  },
  input: {
    border: "2px solid red",
    color: "red",
    height: "2rem",
    display: "none",
  },
  text: {
    padding: "10px 15px",
  },
  button: {
    backgroundColor: "#e10000",
  },
};

const BookingsModal = ({ setOpenBookingModal, openBookingModal, booking }) => {
  const handleClose = () => setOpenBookingModal(false);
  const [inputVal, setInputVal] = useState({
    ...booking,
  });

  return (
    <div>
      <Modal
        open={openBookingModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style.cardStyle}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                rowGap: "15px",
              }}
            >
              <TextField
                variant="outlined"
                label="Datum"
                size="small"
                name="date"
                sx={{ width: "100%" }}
                value={inputVal.date || ""}
                onChange={(e) =>
                  setInputVal({
                    ...inputVal,
                    date: e.target.value,
                  })
                }
              />{" "}
              <TextField
                variant="outlined"
                label="Uhrzeit"
                size="small"
                name="time"
                sx={{ width: "100%" }}
                value={
                  inputVal.time?.slice(0, inputVal.time.indexOf(".")) || ""
                }
                onChange={(e) =>
                  setInputVal({
                    ...inputVal,
                    time: e.target.value,
                  })
                }
              />{" "}
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
            >
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Buchungstyp"
                  size="small"
                  value={booking.bookingType || ""}
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                  InputProps={{ readOnly: true }}
                />
              </Tooltip>
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Straße"
                  size="small"
                  value={booking.street || ""}
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                  InputProps={{ readOnly: true }}
                />
              </Tooltip>
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Hausnummer"
                  size="small"
                  value={booking.streetnumber || ""}
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                  InputProps={{ readOnly: true }}
                />
              </Tooltip>
              <Box sx={{ display: "flex" }}>
                <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                  <TextField
                    variant="outlined"
                    label="PLZ"
                    size="small"
                    value={booking.zip || ""}
                    sx={{ input: { color: "#888", cursor: "auto" } }}
                    InputProps={{ readOnly: true }}
                  />
                </Tooltip>
                <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                  <TextField
                    variant="outlined"
                    label="Stadt"
                    size="small"
                    value={booking.city || ""}
                    sx={{ input: { color: "#888", cursor: "auto" } }}
                    InputProps={{ readOnly: true }}
                  />
                </Tooltip>
              </Box>
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Land"
                  size="small"
                  value={booking.country || ""}
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                  InputProps={{ readOnly: true }}
                />
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button sx={style.button} variant="contained">
                Speichern
              </Button>
              <Button
                sx={style.button}
                onClick={handleClose}
                variant="contained"
              >
                Schließen
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default BookingsModal;
