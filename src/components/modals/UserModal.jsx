import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, InputAdornment, TextField, Tooltip } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import placeholder from "../../assets/placeholder.jpg";
import { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAtinaCalls from "../../hooks/useAtinaCalls";

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

const UserModal = ({ setOpenUserModal, openUserModal, user }) => {
  const handleClose = () => setOpenUserModal(false);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputVal, setInputVal] = useState({
    ...user,
  });
  const { putUserData } = useAtinaCalls();
  const inputRef = useRef();

  const handleImageInputChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;

      const base64String = fileContent.split(",")[1];
      // console.log(base64String);
      setSelectedImage(fileContent);
      setInputVal({ ...inputVal, image: base64String });
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = () => {
    putUserData(inputVal);
  };

  return (
    <div>
      <Modal
        open={openUserModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style.cardStyle}>
          <label htmlFor="imgInput">
            <Box
              sx={{
                ...style.imgStyle,

                backgroundImage: selectedImage
                  ? `url(${selectedImage})`
                  : style.imgStyle.backgroundImage,
              }}
              onDrop={() => console.log("dragged")}
            >
              <PhotoCameraIcon
                sx={{ cursor: "pointer" }}
                fontSize="inherit"
                color="inherit"
              />
              <input
                ref={inputRef}
                style={style.input}
                id="imgInput"
                type="file"
                accept="image/*"
                onChange={handleImageInputChange}
              />
            </Box>
          </label>
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
                label="Benutzername"
                size="small"
                name="username"
                sx={{ width: "100%" }}
                value={inputVal.username || ""}
                onChange={(e) =>
                  setInputVal({
                    ...inputVal,
                    username: e.target.value,
                  })
                }
              />{" "}
              <TextField
                variant="outlined"
                label="Kennwort"
                size="small"
                type={visible ? "text" : "password"}
                name="password"
                sx={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!visible && (
                        <VisibilityOffIcon
                          onClick={() => setVisible(!visible)}
                          sx={{ cursor: "pointer" }}
                        />
                      )}
                      {visible && (
                        <VisibilityIcon
                          onClick={() => setVisible(!visible)}
                          sx={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                value={inputVal.password || ""}
                onChange={(e) =>
                  setInputVal({
                    ...inputVal,
                    password: e.target.value,
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
                  label="Vorname"
                  size="small"
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                  value={user?.firstname}
                  InputProps={{ readOnly: true }}
                />
              </Tooltip>
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Nachname"
                  size="small"
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                  value={user?.lastname}
                  InputProps={{ readOnly: true }}
                />
              </Tooltip>
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Personalnummer"
                  size="small"
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                  value={user?.personnelnumber}
                  InputProps={{ readOnly: true }}
                />
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                onClick={handleSubmit}
                sx={style.button}
                variant="contained"
              >
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

export default UserModal;
