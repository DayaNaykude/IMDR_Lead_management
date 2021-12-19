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
const boxStyle = {
  marginTop: "50px",
  marginLeft: "20px",
  marginRight: "20px",
};

const dateStyle = {
  marginLeft: "1%",
  marginTop: "5px",
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
};

export const ReportScreen = () => {
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

  // const downloadExcel = () => {
  //   const newData = reportData.map((row) => {
  //     delete row.tableData;
  //     return row;
  //   });
  //   const workSheet = XLSX.utils.json_to_sheet(newData);
  //   const workBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workBook, workSheet, "Trash Data");
  //   //Buffer
  //   let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  //   //Binary
  //   XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  //   //Download
  //   XLSX.writeFile(workBook, "TrashData.xlsx");
  // };

  const exportAllSelectedRows = () => {
    new CsvBuilder("report.csv")
      .setColumns(column.map((col) => col.title))
      .addRows(
        selectedRows.map((rowData) => column.map((col) => rowData[col.field]))
      )
      .exportFile();
  };

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
  }));

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

          <Tooltip title="Report Download">
            <IconButton style={btnstyle} onClick={downloadReport}>
              <FileDownloadIcon />
              Report
            </IconButton>
          </Tooltip>
        </Grid>
      </div>
      {/* 
      <div>
        <Box style={boxStyle}>
          <MaterialTable
            title=""
            data={reportData && reportData.datefilterleads}
            onSelectionChange={(rows) => setSelectedRows(rows)}
            columns={column}
            isLoading={tableLoading}
            editable={{}}
            options={{
              filtering: true,
              search: true,
              toolbar: true,
              searchFieldVariant: "outlined",
              searchFieldAlignment: "left",
              pageSizeOptions: [5, 15, 20, 25, 30, 50, 100],
              paginationType: "stepped",
              actionsColumnIndex: -1,
              rowStyle: (data, index) =>
                index % 2 === 0 ? { background: "#f5f5f5" } : null,
              headerStyle: { background: "#9c66e2", fontStyle: "bold" },
              selection: true,
            }}
            actions={[
              {
                icon: "download",
                tooltip: "Export to excel",
                onClick: () => downloadExcel(),
                isFreeAction: true,
              },

              {
                icon: () => <SaveAltIcon />,
                tooltip: "Export all selected rows",
                onClick: () => exportAllSelectedRows(),
              },
            ]}
            components={{
              Pagination: (props) => (
                <div>
                  <Grid
                    container
                    style={{ padding: 15, background: "rgb(232 226 226)" }}
                  >
                    <Grid sm={1} item>
                      <Typography variant="subtitle2">Total</Typography>
                    </Grid>
                    <Grid sm={1} item align="center">
                      <Typography variant="subtitle2">
                        Number of rows:{props.count}
                      </Typography>
                    </Grid>
                  </Grid>
                  <TablePagination {...props} />
                </div>
              ),
            }}
          />
        </Box>
      </div> */}
    </>
  );
};

export default ReportScreen;
