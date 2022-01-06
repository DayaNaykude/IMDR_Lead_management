import React from "react";
import { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TextField from "@mui/material/TextField";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import { Grid, TablePagination } from "@material-ui/core";
import { CsvBuilder } from "filefy";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import XLSX from "xlsx";
import { Alert } from "@mui/material";

// Backend Imports

import { generateReport, getReportData } from "../actions/reportActions";
import { useDispatch, useSelector } from "react-redux";

//api calls

const dateStyle = {
  marginLeft: "1%",
  marginTop: "1%",
};
const nameStyle = {
  marginLeft: "30%",
  color: "Green",
};
const NameStyle = {
  marginLeft: "2%",
  color: "Green",
};

export const ReportScreen: React.FC = () => {
  const [downloadLink, setDownloadLink] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableLoading, setTableLoading] = useState(true);

  const dispatch = useDispatch();
  let history = useHistory();
  const columns = [
    {
      title: "User Name",
      field: "name",
      defaultSort: "asc",
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
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reportGenerate = useSelector((state) => state.reportGenerate);
  const { loading: loadingReport, error: errorReport, report } = reportGenerate;

  const textStyle = {
    marginTop: "50px",
    marginLeft: "45%",
    color: "red",
  };
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
    resetBtnStyle: {
      backgroundColor: "rgb(30 183 30)",
      color: "white",
      marginLeft: "80%",
      marginTop: "-3%",
    },
    applyBtnStyle: {
      backgroundColor: "rgb(30 183 30)",
      color: "white",
      marginLeft: "73%",
      marginTop: "-3%",
    },
  }));
  const boxStyle = {
    marginTop: "50px",
    marginBottom: "100px",
    marginLeft: "20px",
    marginRight: "20px",
  };
  const downloadExcel = () => {
    console.log(report);
    const workSheet = XLSX.utils.json_to_sheet(report);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Report");
    report.forEach((table) => {
      XLSX.utils.book_append_sheet(
        workBook,
        XLSX.utils.json_to_sheet(table),
        "Report"
      );
    });
    // const workSheet = XLSX.utils.json_to_sheet(report);
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "Report.xlsx");
  };
  const resetInputField = () => {
    setStartDate("");
    setEndDate("");
    dispatch(
      generateReport(
        moment("").format("DD-MM-YYYY"),
        moment("").format("DD-MM-YYYY")
      )
    );
  };
  const applyReportHandler = () => {
    dispatch(
      generateReport(
        moment(startDate).format("DD-MM-YYYY"),
        moment(endDate).format("DD-MM-YYYY")
      )
    );
  };

  const classes = useStyles();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(
        generateReport(
          moment(startDate).format("DD-MM-YYYY"),
          moment(endDate).format("DD-MM-YYYY")
        )
      );
    } else {
      history.push("/login");
    }
  }, [history, dispatch, userInfo]);

  return (
    <>
      <h1 style={textStyle}>Report Generation</h1>

      <div>
        {errorReport && <Alert severity="error">{errorReport}</Alert>}
        {loadingReport && <Alert severity="info">Loading Report...</Alert>}
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ marginTop: "5%" }}
        >
          <h4 style={nameStyle}>From</h4>
          <TextField
            id="date"
            label="Select Date"
            type="date"
            style={dateStyle}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            value={startDate}
          />
          <h4 style={NameStyle}>To</h4>
          <TextField
            id="date"
            label="Select Date"
            type="date"
            style={dateStyle}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
          <Tooltip title="Generate Report">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.applyBtnStyle}
              onClick={applyReportHandler}
            >
              Generate
            </Button>
          </Tooltip>
          <Tooltip title="Reset Dates">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.resetBtnStyle}
              onClick={resetInputField}
            >
              Reset
            </Button>
          </Tooltip>
        </Grid>
        <Box style={boxStyle}>
          <MaterialTable
            className={classes.tableStyle}
            data={
              report &&
              report.reportData[0].map((user) => ({
                name: user.User_Name,
                level1: user["Level_1"] ? user["Level_1"] : 0,
                level2: user["Level_2"] ? user["Level_2"] : 0,
                level3: user["Level_3"] ? user["Level_3"] : 0,
                level4: user["Level_4"] ? user["Level_4"] : 0,
                totalAssigned: user.Total_Leads_Assigned,
              }))
            }
            // data={tableData}
            columns={columns}
            isLoading={loadingReport}
            options={{
              paging: false,
              sorting: true,
              search: false,
              showTitle: false,
              toolbar: true,
              actionsColumnIndex: -1,
              rowStyle: (data, index) =>
                index % 2 === 0 ? { background: "#f5f5f5" } : null,
              headerStyle: { background: "#9c66e2", fontStyle: "bold" },
            }}
            actions={[
              {
                icon: "download",
                tooltip: "Export to excel",
                onClick: () => downloadExcel(),
                isFreeAction: true,
              },
            ]}
          />
        </Box>
      </div>
    </>
  );
};

export default ReportScreen;
