import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmployeeList from "./components/EmployeeList";
import Employee from "./components/Employee";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3D5EDF",
    },
    secondary: {
      main: "#4ac2d7",
    },
  },
});

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/employee"
            element={
              authenticated ? (
                <EmployeeList />
              ) : (
                <Navigate to="/" replace state={{ from: "/employee" }} />
              )
            }
          />
          <Route
            path="/register"
            element={
              authenticated ? (
                <Employee />
              ) : (
                <Navigate to="/" replace state={{ from: "/register" }} />
              )
            }
          />
          {/* Add other routes here */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
