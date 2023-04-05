import { Avatar, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import UserModal from "./modals/UserModal";

const CustomTableRow = ({ user, selectedColumns, tableStyle }) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenUserModal(true);
    }
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:hover": { backgroundColor: "#ddd" },
        cursor: "pointer",
      }}
      onClick={handleDblClick}
    >
      {/* <UserModal
        setOpenUserModal={setOpenUserModal}
        openUserModal={openUserModal}
        user={user}
      /> */}
      {/* <TableCell
        sx={{ ...tableStyle.tr.cell, paddingLeft: "10px" }}
        component="th"
        scope="row"
      >
        {user?.id}
      </TableCell> */}
      {selectedColumns.includes("vorname") && (
        <TableCell sx={tableStyle.tr.cell} align="left" scope="row">
          <UserModal
            setOpenUserModal={setOpenUserModal}
            openUserModal={openUserModal}
            user={user}
          />
          {user?.firstname}
        </TableCell>
      )}
      {selectedColumns.includes("nachname") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {user?.lastname}
        </TableCell>
      )}
      {selectedColumns.includes("benutzername") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {user?.username}
        </TableCell>
      )}
      {selectedColumns.includes("kennwort") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          ********
        </TableCell>
      )}
      {selectedColumns.includes("personalnummer") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {user?.personnelnumber}
        </TableCell>
      )}
      {selectedColumns.includes("bild") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          <Avatar
            sx={tableStyle.tr.image}
            src={`data:image/png;base64,${user?.image}`}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomTableRow;
