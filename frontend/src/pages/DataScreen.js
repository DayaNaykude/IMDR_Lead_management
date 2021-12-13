import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import {
  Grid,
  TablePagination,
  Typography,
  TextField,
} from "@material-ui/core";
import { CsvBuilder } from "filefy";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import XLSX from "xlsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// backend Imports
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { isAuthenticated } from "../helper";

//api calls
import {
  getAllLeadsFromTrash,
  deleteLeads,
  reAssignLeads,
} from "../helper/leadApiCalls";

//date format package
var moment = require("moment");

const boxStyle = {
  marginTop: "60px",
  marginLeft: "20px",
  marginRight: "20px",
};
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "max-content",
  marginTop: "60px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const saveStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  display: "inline-block",
  fontSize: "15px",
  padding: "5px",
  float: "right",
  marginTop: "0%",
  width: "fit-content",
};

const sendStyle = {
  marginLeft: "45%",
  marginTop: "5%",
};
const textareaStyle = {
  // width: "95%",
  height: "70%",
  padding: "2%",
  border: "2px solid orange",
};
const btnstyle = {
  backgroundColor: "rgb(30 183 30)",
  color: "white",
  height: "30px",
  fontSize: "20px",
};
const textStyle = {
  marginTop: "50px",
  marginLeft: "45%",
  color: "red",
};

const textstyle = { margin: "8px 0", height: "fit-content" };

const DataScreen = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [flag, setFlag] = useState(false);
  const showDeleteWindow = () => setFlag(true);
  const hideDeleteWindow = () => setFlag(false);

  const [dleads, setDleads] = useState([]);
  const [values, setValues] = useState({
    dError: "",
    dSuccess: false,
    dLoading: false,
  });

  const { dError, dSuccess, dLoading } = values;
  const { _id, token } = isAuthenticated();

  const [rLeads, setRLeads] = useState([]);
  const [rValues, setRValues] = useState({
    rError: "",
    rSuccess: false,
    rLoading: false,
  });

  const { rError, rSuccess, rLoading } = rValues;

  //permanent deletion
  const deleteALlLeads = () => {
    setValues({ ...values, dError: "", dLoading: true });
    if (dleads.length <= 1000) {
      const jsonString = JSON.stringify(Object.assign({}, dleads));
      deleteLeads(_id, token, jsonString)
        .then((data) => {
          if (data.error) {
            setValues({
              ...values,
              dError: data.error,
              dLoading: false,
            });
          } else {
            setValues({
              ...values,
              dError: "",
              dSuccess: true,
              dLoading: false,
            });
          }
        })
        .catch(console.log("Error In Deleting Leads."));
    } else {
      setValues({
        ...values,
        dError: "Select Upto 1000 Leads To Delete",
        dLoading: false,
      });
    }
  };

  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const [tableLoading, setTableLoading] = useState(true);

  const downloadExcel = () => {
    const newData = data.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Trash Data");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "TrashData.xlsx");
  };

  //loading leads
  const preload = () => {
    if (userInfo) {
      getAllLeadsFromTrash(userInfo._id, userInfo.token)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data)
            setData(data);
            setTableLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //re-assigning
  const reAssignAllLeads = () => {
    setRValues({ ...rValues, rError: "", rLoading: true });
    if (rLeads.length <= 1000) {
      const jsonString = JSON.stringify(Object.assign({}, rLeads));
      reAssignLeads(_id, token, jsonString)
        .then((data) => {
          if (data.error) {
            setRValues({
              ...rValues,
              rError: data.error,
              rLoading: false,
            });
          } else {
            setRValues({
              ...rValues,
              rError: "",
              rSuccess: true,
              rLoading: false,
            });
          }
        })
        .catch(console.log("Error in Re-assigning leads"));
    } else {
      setRValues({
        ...rValues,
        rError: "Select Upto 1000 Leads To Re-assign",
        rLoading: false,
      });
    }
  };

  const exportAllSelectedRows = () => {
    new CsvBuilder("tableData.csv")
      .setColumns(column.map((col) => col.title))
      .addRows(
        selectedRows.map((rowData) => column.map((col) => rowData[col.field]))
      )
      .exportFile();
  };
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    preload();
  }, [history, userInfo]);

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
    { title: "Users", field: "user" },
    
  ];
  return (
    <>
      <div>
        <h1 style={textStyle}>Master Data</h1>
        <Box style={boxStyle}>
          <MaterialTable
            title=""
            data={data}
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
                icon: "delete",
                tooltip: "Delete all selected leads",
                onClick: (evt, data) => {
                  const leads = [];
                  data.forEach((element) => {
                    leads.push(element.email);
                  });
                  setDleads(leads);
                  showDeleteWindow();
                },
                isFreeAction: false,
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

          <div>
            <Dialog
              open={flag}
              onClose={hideDeleteWindow}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div>
                <IconButton
                  aria-label="Back to home page"
                  tooltip="Back"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    history.go(0);
                  }}
                >
                  <KeyboardBackspaceSharpIcon />
                </IconButton>{" "}
              </div>
              {dSuccess && (
                <Alert severity="success">leads deleted successfully</Alert>
              )}
              {dError && <Alert severity="error">{dError}</Alert>}
              {dLoading && <Alert severity="info">Deleting...</Alert>}
              <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Selected leads will be deleted permanently from the database.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={deleteALlLeads}>Yes</Button>
                <Button
                  onClick={() => {
                    history.go(0);
                  }}
                  autoFocus
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div>
                <IconButton
                  aria-label="Back to home page"
                  color="primary"
                  tooltip="Back"
                  variant="contained"
                  onClick={() => {
                    history.go(0);
                  }}
                >
                  <KeyboardBackspaceSharpIcon />
                </IconButton>{" "}
              </div>
              {rSuccess && (
                <Alert severity="success">Leads Re-assigned Successfully</Alert>
              )}
              {rError && <Alert severity="error">{rError}</Alert>}
              {rLoading && <Alert severity="info">Re-assigning...</Alert>}
              <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Selected Leads will be Re-assigned To their previous User.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={reAssignAllLeads}>Yes</Button>
                <Button
                  onClick={() => {
                    history.go(0);
                  }}
                  autoFocus
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </div>
      )
    </>
  );
};
export default DataScreen;
