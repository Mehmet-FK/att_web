import TablePagination from "@mui/material/TablePagination";

const Pagination = ({ data, page, setPage, rowsPerPage, setRowsPerPage }) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      showFirstButton={true}
      showLastButton={true}
      component="div"
      count={data.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage={"Anzahl Zeilen"}
      // getItemAriaLabel
    />
  );
};

export default Pagination;
