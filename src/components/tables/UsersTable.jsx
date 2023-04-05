import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

import { useMediaQuery } from "@mui/material";
// import UsersFilter from "../UsersFilter";
import Pagination from "../Pagination";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import CustomTableRow from "../UsersTableRow";
import UsersFilter from "../filters/UsersFilter";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";

const tableStyle = {
  th: {
    cell: {
      textTransform: "capitalize",
      fontWeight: "600",
      paddingInline: "5px",
    },
  },
  tr: {
    cell: {
      fontSize: "0.8em",
      padding: "5px",
    },
    image: {
      transition: "0.2s all",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(2)",
        zIndex: "5",
      },
    },
  },
};
const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const tableColumns = [
  "vorname",
  "nachname",
  "benutzername",
  "kennwort",
  "personalnummer",
  "bild",
];

const UsersTable = () => {
  const { atinaUsers } = useSelector((state) => state.atina);
  const [contextMenu, setContextMenu] = useState(initalContextMenu);

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState([]);

  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = atinaUsers?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});
  const handleFilter = () => {
    const flag = Object.values(filterVal).some((x) => x !== "");
    const filteredData = atinaUsers.filter((item) =>
      flag
        ? item.id === parseInt(filterVal.id) ||
          (item?.firstname?.toLowerCase() ===
            filterVal?.firstname?.toLowerCase() &&
            filterVal.firstname !== "") ||
          (item?.lastname?.toLowerCase() ===
            filterVal?.lastname?.toLowerCase() &&
            filterVal.lastname !== "") ||
          (item?.username?.toLowerCase() ===
            filterVal?.username?.toLowerCase() &&
            filterVal.username !== "") ||
          item?.personnelnumber?.toLowerCase() ===
            filterVal?.personnelNumber?.toLowerCase()
        : true
    );
    setShownData(filteredData);
  };

  const handleReset = () => {
    setFilterVal({});
    handlePagination();
  };
  // ===Table Filter END===

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  // Context Menu START
  const contextMenuRef = useRef(null);

  //TODO: Set all functions in a custom hook

  /* const handleRightClick = (e) => {
    e.preventDefault();

    let X = e.pageX;
    let Y = e.pageY;
    let winWidth = window.innerWidth;
    // let cmWidth = contextMenuRef.current.offsetWidth;
    let cmWidth = 250;
    let winHeight = window.innerHeight;
    // let cmHeight = contextMenuRef.current.offsetHeight;
    let cmHeight = 300;
    X = X > winWidth - cmWidth ? winWidth - cmWidth : X;
    Y = Y > winHeight - cmHeight ? winHeight - cmHeight : Y;

    setContextMenu({ ...contextMenu, show: true, x: X, y: Y });
  };

  const closeContextMenu = (event) => {
    if (event.target.id !== "select") {
      setContextMenu(initalContextMenu);
    }
    console.log(event.target.id);
  }; */

  // Context Menu END

  const { getUsersData } = useAtinaCalls();
  useEffect(() => {
    getUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, atinaUsers]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {contextMenu.show && (
        <ContextMenu
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          ref={contextMenuRef}
          tableColumns={tableColumns}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
      )}
      <UsersFilter
        handleReset={handleReset}
        handleFilter={handleFilter}
        filterVal={filterVal}
        setFilterVal={setFilterVal}
      />
      <TableContainer
        component={Paper}
        onContextMenu={handleRightClick}
        sx={{
          maxWidth: xxl ? "90%" : { lg: "1250px" },
          margin: "auto",
          padding: "1rem 10px",
          // position: "relative",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Pagination
            data={atinaUsers}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Box>
        <Table
          sx={{ minWidth: 650, position: "relative" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {selectedColumns.includes("vorname") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  vorname
                </TableCell>
              )}
              {selectedColumns.includes("nachname") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  nachname
                </TableCell>
              )}
              {selectedColumns.includes("benutzername") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  benutzername
                </TableCell>
              )}
              {selectedColumns.includes("kennwort") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  kennwort
                </TableCell>
              )}
              {selectedColumns.includes("personalnummer") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  personalnummer
                </TableCell>
              )}
              {selectedColumns.includes("bild") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  bild
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {shownData?.map((user) => {
              return (
                <CustomTableRow
                  key={user.id}
                  user={user}
                  selectedColumns={selectedColumns}
                  tableStyle={tableStyle}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
