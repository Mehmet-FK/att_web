import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const { loading } = useSelector((state) => state.atina);

  useEffect(() => {
    loading && handleOpen();
    !loading && handleClose();
  }, [loading]);

  return (
    <div>
      <Backdrop
        sx={{
          backgroundColor: "#000000dd",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 3,
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loading;
