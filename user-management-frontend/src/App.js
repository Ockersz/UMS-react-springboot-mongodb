import "./App.css";
import Employee from "./components/Employee";
import { Routes, Route /*Outlet*/ } from "react-router-dom";
import { Login } from "./components/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmployeeList from "./components/EmployeeList";
// import Menu from "./components/Menu";

const theme = createTheme({
  palette: {
    primary: {
      main: "#006064",
    },
    secondary: {
      main: "#4ac2d7",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Employee />} />
          <Route path="/employee" element={<EmployeeList />} />
          <Route index element={<Login />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
