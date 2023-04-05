import TextField from "@mui/material/TextField";

import styled from "@emotion/styled";

const DatePicker = (props) => {
  const { label } = props;
  const Legend = styled("legend")({
    backgroundColor: "#fff",
    fontSize: "0.7rem",
    marginLeft: "5px",
    padding: " 0 2px ",
    position: "absolute",
    top: "-8px",
    left: "5px",
  });
  const Fieldset = styled("fieldset")({
    border: "none",
    padding: "0",
    position: "relative",
  });

  return (
    <>
      <Fieldset>
        <TextField
          size="small"
          type={"datetime-local"}
          sx={{ width: "100%" }}
        />
        <Legend>{label}</Legend>
      </Fieldset>
    </>
  );
};

export default DatePicker;
