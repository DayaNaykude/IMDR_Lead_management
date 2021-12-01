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

import { getReport } from "../actions/userActions";
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

export const ReportScreen = () => {
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

    {
      title: "Level 0",
      field: "level0",
      editable: "never",
    },
    {
      title: "Level 1",
      field: "level1",
      editable: "never",
    },
    {
      title: "Level 2",
      field: "level2",
      editable: "never",
    },
    {
      title: "Level 3",
      field: "level3",
      editable: "never",
    },
    {
      title: "Level 4",
      field: "level4",
      editable: "never",
    },
    {
      title: "Total Assigned",
      field: "totalAssigned",
      editable: "never",
    },
  ];

  // ***************** Backend stuff

  const dispatch = useDispatch();

  const userReport = useSelector((state) => state.userReport);
  const { loading, error, report } = userReport;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getReport());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

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
            Report Generation
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
              report &&
              report.map((user) => ({
                name: user.username,
                level0: user["level 0"] ? user["level 0"] : 0,
                level1: user["level 1"] ? user["level 1"] : 0,
                level2: user["level 2"] ? user["level 2"] : 0,
                level3: user["level 3"] ? user["level 3"] : 0,
                level4: user["level 4"] ? user["level 4"] : 0,
                totalAssigned: user.totalAssigned,
              }))
            }
            columns={columns}
            isLoading={loading}
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

export default ReportScreen;
