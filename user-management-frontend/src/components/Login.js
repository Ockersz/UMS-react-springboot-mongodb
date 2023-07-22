import React from "react";
import Employee from "./Employee";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";

export const Login = ({ setAuthenticated }) => {
  const paperStyle = {
    padding: "50px 50px",
    width: 400,
    margin: "80px auto",
    borderRadius: "10px",
  };
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginStatus, setLoginStatus] = React.useState("");
  const navigate = useNavigate("/register");

  const login = () => {
    if (validate()) {
      try {
        axios
          .get(
            `http://localhost:8080/getUser?username=${username}&password=${password}`
          )
          .then((res) => {
            setLoginStatus(res.data);
            if (loginStatus) {
              setAuthenticated(true);
              navigate("/employee");
            } else {
              toast.error("Username or Password Incorrect");
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
        toast.error("Error logging in please try again");
      }
    }
  };

  const validate = () => {
    let result = true;
    if (!username || !password) {
      result = false;
      toast.warning("Please enter Username and Password");
    }
    return result;
  };

  React.useEffect(() => {
    if (loginStatus) {
      navigate("/employee");
    }
  }, [loginStatus, navigate]);

  return (
    <Grid container>
      <Grid item xs={7} className="bg"></Grid>

      <Grid item xs={5}>
        <h1>User Management System</h1>
        <Paper elevation={3} style={paperStyle}>
          <h2>Log In</h2>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <br />
            <Button
              variant="contained"
              onClick={(e) => {
                login(e);
              }}
            >
              Log In
            </Button>
            <br />
            <Link to={"/register"} component={<Employee />}>
              New User? <u>Register</u>
            </Link>
          </Box>
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};
