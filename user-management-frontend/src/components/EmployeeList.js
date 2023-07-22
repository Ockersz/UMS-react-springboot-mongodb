import { Button, Container, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateEpmloyee from "./UpdateEmployee";
import { useNavigate } from "react-router-dom";
// import FormControl from "@mui/material/FormControl";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";

export default function EmployeeList() {
  const paperStyle = {
    padding: "50px 50px",
    width: 1000,
    margin: "20px auto",
    display: "inline-block",
    borderRadius: "10px",
  };
  const [userId, setUserId] = React.useState("");
  const [showUpdateComponent, setShowUpdateComponent] = useState(false);
  const [records, setRecords] = useState([]);

  const column = [
    {
      name: "Employee Name",
      selector: (row) => row.name,
    },
    {
      name: "Employee Email",
      selector: (row) => row.email,
    },
    {
      name: "Employee Address",
      selector: (row) => row.address,
    },
    {
      name: "Employee Telephone",
      selector: (row) => row.telephone,
    },
    {
      name: "Employee Username",
      selector: (row) => row.username,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <IconButton onClick={() => deleteUser(row.userId, row.username)}>
            <DeleteIcon color="error" />
          </IconButton>

          <IconButton onClick={() => updateUser(row.userId)}>
            <EditIcon color="primary" />
          </IconButton>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  useEffect(() => {
    const fetData = async () => {
      axios
        .get("http://localhost:8080/getAllUser")
        .then((res) => setRecords(res.data))
        .catch((err) => console.log(err));
    };
    fetData();
  }, []);

  const deleteUser = (userId, username) => {
    //e.preventDefault()
    if (
      window.confirm(`Are you sure you want to delete ${username}`) === true
    ) {
      fetch(`http://localhost:8080/deleteUser/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          console.log("User Deleted");
          alert("User Deleted Successfully");
          setRecords(records.filter((record) => record.userId !== userId));
        })
        .catch((err) => console.log(err));
    }
  };

  const updateUser = (userId) => {
    setUserId(userId);
    setShowUpdateComponent((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const addUser = () => {
    navigate("/register");
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <Container>
      <h1>Registered Employees</h1>

      <span>
        <Button
          variant="contained"
          className="button1"
          onClick={(e) => {
            addUser();
          }}
        >
          Add User
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="outlined"
          className="button1"
          onClick={(e) => {
            logout();
          }}
        >
          Log out
        </Button>
      </span>

      <Paper elevation={3} style={paperStyle}>
        <DataTable columns={column} data={records} pagination></DataTable>
      </Paper>
      {showUpdateComponent && <UpdateEpmloyee userId={userId} />}
    </Container>
  );
}
