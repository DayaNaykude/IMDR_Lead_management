import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import resolve from "resolve";

const backStyle={
  padding:"10px",
  margin:"10px",
  backgroundColor:"#4ab5da",

};
export const UserListScreen = () => {
  let history = useHistory();

  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [tableData, setTableData] = useState([users]);
  const [isLoading, setIsLoading] = useState("true");

  const deleteHandler = async (email) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios.delete(`/api/users/${email}`, config);
      setDeleteSuccess(true);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/users", config);
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        console.log(error);
      }
    };

    fetchData();
  }, [history, deleteSuccess]);

  const columns = [
    {
      title: "User Name",
      field: "name",
      defaultSort: "asc",
      editable: "never",
    },
    {
      title: "Email",
      field: "email",
      align: "",
      editable: "never",
    },
    {
      title: "Contact",
      field: "contact",
      align: "",
      editable: "never",
    },
    {
      title: "Admin",
      field: "admin",
      align: "",
      lookup: {
        1: "Yes",
        2: "No",
      },
    },
  ];


  return (
    <div>
       <Button
              type="submit"
              color="primary"
              variant="contained"
             style={backStyle}
             onClick={() => {
              history.push("/");}}
          >
             Back
            </Button>
      <h1 align="center">Users List</h1>
      <MaterialTable
        title=""
        data={users.map((user) => ({
          name: user.username,
          email: user.email,
          contact: user.contact ? `+91 ${user.contact}` : "NA",
          admin: user.isAdmin ? 1 : 2,
        }))}
        columns={columns}
        isLoading={isLoading}
        localization={{
          body: {
            editRow: {
              deleteText: "Are you sure you want to delete this user ?",
            },
            deleteTooltip: "Delete User",
            editTooltip: "Edit User",
          },
        }}
        editable={{
          isDeletable: (rowData) => rowData.admin === 2,
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData[oldRow.tableData.id] = newRow;
              setTableData(updatedData);
              console.log(newRow, oldRow);
              setTimeout(() => resolve(), 5000);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              deleteHandler(selectedRow.email.toString());
              setTableData(
                users.map((user) => ({
                  name: user.username,
                  email: user.email,
                  contact: user.contact ? `+91 ${user.contact}` : "NA",
                  admin: user.isAdmin ? "Yes" : "No",
                }))
              );
              setTimeout(() => resolve(), 5000);
            }),
        }}
        options={{
          paging: false,
          sorting: true,
          search: false,
          actionsColumnIndex: -1,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#9c66e2", fontStyle: "bold" },
        }}
      />
    </div>
  );
};

export default UserListScreen;
