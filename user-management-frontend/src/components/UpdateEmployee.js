import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DialogBox from "./DialogBox";

export default function UpdateLaptop(props) {
  const paperStyle = {
    padding: "50px 50px",
    width: 400,
    margin: "50px auto",
    borderRadius: "10px",
  };

  const { userId } = props;
  const [name, setName] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setName("");
    setTelephone("");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  React.useEffect(() => {
    const fetData = async () => {
      axios
        .get(`http://localhost:8080/getUser?userId=${userId}`)
        .then((res) => {
          console.log(res);
          setName(res.data.name);
          setTelephone(res.data.telephone);
          setEmail(res.data.email);
          setUsername(res.data.username);
          setPassword(res.data.password);
        })
        .catch((err) => console.log(err));
    };
    fetData();
  }, [userId]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { userId, name, telephone, email, username, password };
    console.log(user);
    fetch("http://localhost:8080/updateUser", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log("User changed");
        setDialogOpen(true);
        navigate("/employee");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Paper elevation={3} style={paperStyle}>
        <h2>Update User</h2>
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
            label="User Id"
            variant="outlined"
            fullWidth
            value={userId}
            InputProps={{ readOnly: true }}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Telephone"
            variant="outlined"
            fullWidth
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <Button
            variant="contained"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            UPDATE
          </Button>
        </Box>
      </Paper>
      <DialogBox
        open={dialogOpen}
        handleClose={handleDialogClose}
        message="User Updated Successfully"
      />
    </div>
  );
}
