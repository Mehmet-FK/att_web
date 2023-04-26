import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import NfcFilter from "../filters/NfcFilter";
import { useMediaQuery } from "@mui/material";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
const tableStyle = {
  th: {
    cell: {
      textTransform: "capitalize",
      fontWeight: "600",
      paddingInline: "5px",
      minWidth: "4rem",
    },
  },
  tr: {
    cell: {
      fontSize: "0.8em",
      padding: " 10px",
    },
    image: {
      transition: "0.3s all",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(2.5)",
        zIndex: "4",
      },
    },
  },
};

const tableColumns = [
  "typ",
  "artikelnummer",
  "straße",
  "hausnummer",
  "plz",
  "stadt",
  "land",
  "daten 1",
  "daten 2",
  "daten 3",
  "daten 4",
  "daten 5",
  "daten 6",
  "daten 7",
  "daten 8",
  "daten 9",
  "daten 10",
  "erstellt am",
];
const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const ItemsTable = () => {
  const { atinaItems } = useSelector((state) => state.atina);
  const { getAtinaItemsData } = useAtinaCalls();

  const [contextMenu, setContextMenu] = useState(initalContextMenu);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState(atinaItems);
  const [restart, setRestart] = useState(false);
  const [itemType, setItemType] = useState(1);
  const [newest, setNewest] = useState(true);

  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = atinaItems?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});

  const handleFilter = () => {};
  const handleReset = () => {
    setFilterVal({});
    handlePagination();
  };

  const handleSort = () => {
    const arr = shownData.map((item) => ({
      ...item,
      CreatedDate: new Date(item.CreatedDate),
    }));

    if (newest) {
      let temp = arr.sort((a, b) => b.CreatedDate - a.CreatedDate);
      setNewest(!newest);
      setShownData(temp);
    } else {
      let temp = arr.sort((a, b) => a.CreatedDate - b.CreatedDate);
      setNewest(!newest);
      setShownData(temp);
    }
  };

  // ===Table Filter END===

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1500px)");

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  useEffect(() => {
    getAtinaItemsData(itemType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart, itemType]);

  useEffect(() => {
    handlePagination();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, atinaItems]);
  return (
    <>
      {contextMenu.show && (
        <ContextMenu
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          tableColumns={tableColumns}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
      )}
      <TableContainer
        component={Paper}
        onContextMenu={handleRightClick}
        sx={{
          maxWidth: xxl ? "90%" : { lg: "1250px" },
          margin: "auto",
          padding: "0.5rem 10px",
          position: "relative",
        }}
      >
        <NfcFilter
          handleReset={handleReset}
          handleFilter={handleFilter}
          filterVal={filterVal}
          setFilterVal={setFilterVal}
        />
        <Box
          sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
        >
          <span
            style={{
              padding: "10px",
              backgroundColor: "#ddd",
              cursor: "pointer",
              borderRadius: "1rem",
            }}
            onClick={() => setItemType(1)}
          >
            Auftrag
          </span>{" "}
          {"--"}
          <span
            style={{
              padding: "10px",
              backgroundColor: "#ddd",
              cursor: "pointer",
              borderRadius: "1rem",
            }}
            onClick={() => setItemType(2)}
          >
            Zähler
          </span>
          {"--"}
          <span
            style={{
              padding: "10px",
              backgroundColor: "#ddd",
              cursor: "pointer",
              borderRadius: "1rem",
            }}
            onClick={() => setItemType(3)}
          >
            KFZ
          </span>
          <Pagination
            data={atinaItems}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handlePagination={handlePagination}
            setRestart={setRestart}
          />
          <DownloadCSV rawData={shownData} />
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {selectedColumns.includes("typ") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  Typ
                </TableCell>
              )}
              {selectedColumns.includes("artikelnummer") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  artikelnummer
                </TableCell>
              )}
              {selectedColumns.includes("straße") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  straße
                </TableCell>
              )}
              {selectedColumns.includes("hausnummer") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  hausnummer
                </TableCell>
              )}
              {selectedColumns.includes("plz") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  plz
                </TableCell>
              )}
              {selectedColumns.includes("stadt") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  stadt
                </TableCell>
              )}
              {selectedColumns.includes("land") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  land
                </TableCell>
              )}
              {selectedColumns.includes("daten 1") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 1
                </TableCell>
              )}
              {selectedColumns.includes("daten 2") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 2
                </TableCell>
              )}
              {selectedColumns.includes("daten 3") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 3
                </TableCell>
              )}
              {selectedColumns.includes("daten 4") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 4
                </TableCell>
              )}
              {selectedColumns.includes("daten 5") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 5
                </TableCell>
              )}
              {selectedColumns.includes("daten 6") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 6
                </TableCell>
              )}
              {selectedColumns.includes("daten 7") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 7
                </TableCell>
              )}
              {selectedColumns.includes("daten 8") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 8
                </TableCell>
              )}
              {selectedColumns.includes("daten 9") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 9
                </TableCell>
              )}
              {selectedColumns.includes("daten 10") && (
                <TableCell sx={tableStyle.th.cell} align="left">
                  daten 10
                </TableCell>
              )}
              {selectedColumns.includes("erstellt am") && (
                <TableCell
                  onClick={handleSort}
                  sx={{
                    ...tableStyle.th.cell,
                    display: "flex",
                    alignItems: "center",
                    columnGap: "5px",
                    cursor: "pointer",
                  }}
                  align="left"
                >
                  <Box>erstellt am</Box>
                  {newest && <VerticalAlignBottomIcon />}
                  {!newest && <VerticalAlignTopIcon />}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {shownData?.map((item) => {
              return (
                <TableRow
                  key={item.ItemNumber}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#ddd" },
                  }}
                >
                  {selectedColumns.includes("typ") && (
                    <TableCell sx={tableStyle.tr.cell} align="left" scope="row">
                      {item?.ItemType === "Order" && "Auftrag"}
                      {item?.itemType === "Meter" && "Zähler"}
                      {item?.itemType === "Car" && "KFZ"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("artikelnummer") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.ItemNumber}
                    </TableCell>
                  )}

                  {selectedColumns.includes("straße") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Street}
                    </TableCell>
                  )}
                  {selectedColumns.includes("hausnummer") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Streetnumber}
                    </TableCell>
                  )}
                  {selectedColumns.includes("plz") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Zip}
                    </TableCell>
                  )}
                  {selectedColumns.includes("stadt") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.City}
                    </TableCell>
                  )}
                  {selectedColumns.includes("land") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Country}
                    </TableCell>
                  )}

                  {selectedColumns.includes("daten 1") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data1 ? item?.data1 : ""}
                    </TableCell>
                  )}

                  {selectedColumns.includes("daten 2") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data2 ? item?.data2 : ""}
                    </TableCell>
                  )}

                  {selectedColumns.includes("daten 3") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data3 ? item?.data3 : ""}
                    </TableCell>
                  )}

                  {selectedColumns.includes("daten 4") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data4 ? item?.data4 : ""}
                    </TableCell>
                  )}
                  {selectedColumns.includes("daten 5") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data5 ? item?.data5 : ""}
                    </TableCell>
                  )}
                  {selectedColumns.includes("daten 6") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data6 ? item?.data6 : ""}
                    </TableCell>
                  )}
                  {selectedColumns.includes("daten 7") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data7 ? item?.data7 : ""}
                    </TableCell>
                  )}
                  {selectedColumns.includes("daten 8") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data8 ? item?.data8 : ""}
                    </TableCell>
                  )}
                  {selectedColumns.includes("daten 9") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data9 ? item?.data9 : ""}
                    </TableCell>
                  )}
                  {selectedColumns.includes("daten 10") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.Data10 ? item?.data10 : ""}
                    </TableCell>
                  )}
                  {selectedColumns.includes("erstellt am") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {JSON.stringify(item?.CreatedDate)}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ItemsTable;
