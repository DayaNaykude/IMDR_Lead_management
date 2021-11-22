import React from "react";
import { useEffect } from "react";

import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";

// Backend Imports

import { listUsers, deleteUser, updateUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";

const backStyle = {
  width: "10vh",
  padding: "10px",
  margin: "10px",
  marginRight: "",
  backgroundColor: "#4ab5da",
};
const boxStyle = {
  marginTop: "50px",
  marginLeft: "20px",
  marginRight: "20px",
};

export const UserListScreen = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      top: "auto",
      bottom: 0,
      textAlign: "center",
    },

    title: {
      flexGrow: 1,
      letterSpacing: "0.175em",
      fontSize: "140%",
    },
    tableStyle: {
      marginTop: 400,
      width: "200px",
      height: "100px",
    },
  }));

  const classes = useStyles();

  let history = useHistory();

  const columns = [
    {
      title: "User Name",
      field: "name",
      defaultSort: "asc",
      editable: "never",
    },
    // {
    //   title: "User ID",
    //   field: "id",
    //   editable: "never",
    // },
    {
      title: "Email",
      field: "email",
      editable: "never",
    },
    {
      title: "Contact",
      field: "contact",
      editable: "never",
    },
    {
      title: "Admin",
      field: "admin",
      lookup: {
        1: "Yes",
        2: "No",
      },
    },
  ];

  // ***************** Backend stuff

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successUpdate]);

  const updateHandler = async (email, isAdmin) => {
    dispatch(updateUser({ email, isAdmin }));
  };

  const deleteHandler = async (email) => {
    dispatch(deleteUser(email));
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={backStyle}
            onClick={() => {
              history.push("/");
            }}
          >
            Back
          </Button>
          <Typography variant="h6" className={classes.title}>
            Users List
          </Typography>
        </Toolbar>
      </AppBar>

      <div>
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <Alert severity="info">Loading...</Alert>}
        <Box style={boxStyle}>
          <MaterialTable
            className={classes.tableStyle}
            data={
              users &&
              users.map((user) => ({
                name: user.username,
                // id: user._id,
                email: user.email,
                contact: user.contact ? `+91 ${user.contact}` : "NA",
                admin: user.isAdmin ? "1" : "2",
              }))
            }
            columns={columns}
            isLoading={loading}
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
              isDeletable: (rowData) => rowData.admin === "2",
              isEditable: (rowData) => rowData.email !== userInfo.email,
              onRowUpdate: (newRow, oldRow) =>
                new Promise((resolve, reject) => {
                  // setUpdateSuccess(false);
                  updateHandler(
                    oldRow.email,
                    oldRow.admin === "2" ? true : false
                  );

                  setTimeout(() => resolve(), 4000);
                }),
              onRowDelete: (selectedRow) =>
                new Promise((resolve, reject) => {
                  deleteHandler(selectedRow.email.toString());

                  setTimeout(() => resolve(), 4000);
                }),
            }}
            options={{
              paging: false,
              sorting: true,
              search: false,
              showTitle: false,
              toolbar: false,
              actionsColumnIndex: -1,
              rowStyle: (data, index) =>
                index % 2 === 0 ? { background: "#f5f5f5" } : null,
              headerStyle: { background: "#9c66e2", fontStyle: "bold" },
            }}
          />
        </Box>
      </div>
    </>
  );
};

export default UserListScreen;
