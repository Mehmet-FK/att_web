import "./App.css";
import AppRouter from "./router/AppRouter";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material";
import blueGrey from "@mui/material/colors/blueGrey";
import { useSelector } from "react-redux";

function App() {
  const { darkMode } = useSelector((state) => state.settings);

  const theme = createTheme({
    palette: {
      mode: `${darkMode}`,
      primary: {
        main: blueGrey[600],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
