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

const backStyle = {
  width: "10vh",
  padding: "10px",
  margin: "10px",
  marginRight: "",
  backgroundColor: "#4ab5da",
};

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
const btnstyle = {
  backgroundColor: "rgb(30 183 30)",
  color: "white",
  marginLeft: "80%",
 marginTop:"-3%",
};

export const ReportScreen: React.FC= ({list}) =>{
  const [downloadLink , setDownloadLink] = useState('')
  const makeTextFile = () =>{
    //const data = new Blob([list.join('\n')], {type:'text/plain'})
    const data = new Blob([reportData], {type:'text/plain'})
    if (downloadLink !=='') window.URL.revokeObjectURL(downloadLink)
    setDownloadLink(window.URL.createObjectURL(data))
  }
  useEffect(() => {
    makeTextFile()
  },[list])

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  

  const dispatch = useDispatch();
  let history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reportGenerate = useSelector((state) => state.reportGenerate);
  const { loading: loadingReport, error: errorReport, report } = reportGenerate;

  const reportGetData = useSelector((state) => state.reportGetData);
  const { loadingReportData, errorReportData, reportData } = reportGetData;

  // const [data, setData] = useState([]);

  const [tableLoading, setTableLoading] = useState(true);

  //  const downloadExcel = () => {
  //    const newData = reportData.map((row) => {
  //      delete row.tableData;
  //      return row;
  //    });
  //     const workSheet = XLSX.utils.json_to_sheet(newData);
  //    const workBook = XLSX.utils.book_new();
  //    XLSX.utils.book_append_sheet(workBook, workSheet, "Trash Data");
  //    //Buffer
  //    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  //    //Binary
  //    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  //    //Download
  //    XLSX.writeFile(workBook, "TrashData.xlsx");
  //  };

  // const exportAllSelectedRows = () => {
  //   new CsvBuilder("report.csv")
  //     .setColumns(column.map((col) => col.title))
  //     .addRows(
  //       selectedRows.map((rowData) => column.map((col) => rowData[col.field]))
  //     )
  //     .exportFile();
  // };
 
  const downloadReport = () => {
    dispatch(
      generateReport(
        moment(startDate).format("DD.MM.YYYY"),
        moment(endDate).format("DD.MM.YYYY")
      )

    );

    // console.log(report);
    // setReportclick(true);
    // Prajakta implement the logic of downloadling report here
    // You have to download report.reportData
    console.log(report && report.reportData);

    // dispatch(getReportData(report && report.datefilterleads));
    // setTableLoading(false);
  };
  const [selectedRows, setSelectedRows] = useState([]);
  // const [reportclick, setReportclick] = useState(false);

  const column = [
    { title: "Name", field: "applicantName", filtering: false },
    { title: "Email ID", field: "email", align: "center", filtering: false },
    {
      title: "Contact Number",
      field: "mobile",
      align: "center",
      filtering: false,
    },
    {
      title: "Created ON",
      field: "createdAt",
      render: (rowData) => moment(rowData.createdAt).format("DD-MM-YYYY"),
    },
    { title: "City", field: "city" },
    { title: "Source", field: "source", align: "left" },
    { title: "Entrance", field: "entrance" },
    { title: "Percentile", field: "percentileGK" },
    { title: "Lead Status", field: "status" },
    { title: "User", field: "user.username" },
  ];

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
    Style : {
      backgroundColor: "#26d6ca",
      color: "white",
      fontSize: "15px",
      padding: "5px",
      
      marginTop: "1%",
      width: "fit-content",
      marginLeft:"95%",
    },
  }));
  /*  handleButtonClick = () => {
    this.form.reset() // resets "username" field to "admin"
  } */
const resetInputField = () => {
    setStartDate("");
    setEndDate("");
  };
  const classes = useStyles();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      setTableLoading(false);
      // dispatch(
      //   generateReport(
      //     moment(startDate).format("DD.MM.YYYY"),
      //     moment(endDate).format("DD.MM.YYYY")
      //   )
      // );

      // dispatch(getDateFilteredLeadsForAdmin(report[1]))
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
      <Tooltip title="Reset Dates">
           <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.Style}
              onClick={resetInputField}
            >
              Reset
            </Button>
          </Tooltip>
      <div>
        {errorReport && <Alert severity="error">{errorReport}</Alert>}
        {loadingReport && <Alert severity="info">Generating Report...</Alert>}
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
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            value={endDate}
          />
          <a
          download='report.txt'
          href={downloadLink}
            >
              Report Download
            </a>
         {/*  <Tooltip title="Report Download">
            <IconButton style={btnstyle} onClick={downloadLink}>
              <FileDownloadIcon />
              Report
            </IconButton>
          </Tooltip> */}
        </Grid>
      </div>
     
    </>
  );
};

export default ReportScreen;