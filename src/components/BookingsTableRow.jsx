import { TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import BookingsModal from "./modals/BookingsModal";

const CustomTableRow = ({ booking, tableStyle, selectedColumns }) => {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenBookingModal(true);
    }
  };

  let date = new Date(booking?.date);
  let time = booking?.time;
  time = time.slice(0, time?.indexOf("."));
  return (
    <TableRow
      key={booking.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:hover": { backgroundColor: "#ddd" },
        cursor: "pointer",
      }}
      onClick={handleDblClick}
    >
      {/*   <TableCell
        sx={{ ...tableStyle.tr.cell, paddingLeft: "10px" }}
        component="th"
        scope="row"
      >
        <BookingsModal
          openBookingModal={openBookingModal}
          setOpenBookingModal={setOpenBookingModal}
          booking={booking}
        />
        {booking?.id}
      </TableCell> */}
      {selectedColumns.includes("datum") && (
        <TableCell sx={tableStyle.tr.cell} align="left" scope="row">
          <BookingsModal
            openBookingModal={openBookingModal}
            setOpenBookingModal={setOpenBookingModal}
            booking={booking}
          />
          {date.toLocaleDateString("de")}
        </TableCell>
      )}
      {selectedColumns.includes("uhrzeit") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {time}
        </TableCell>
      )}
      {selectedColumns.includes("buchungstyp") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {booking?.bookingType}
        </TableCell>
      )}
      {selectedColumns.includes("straße") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {booking?.street}
        </TableCell>
      )}
      {selectedColumns.includes("hausnummer") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {booking?.streetnumber}
        </TableCell>
      )}
      {selectedColumns.includes("plz") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {booking?.zip}
        </TableCell>
      )}
      {selectedColumns.includes("stadt") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {booking?.city}
        </TableCell>
      )}
      {selectedColumns.includes("land") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {booking?.country}
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomTableRow;
