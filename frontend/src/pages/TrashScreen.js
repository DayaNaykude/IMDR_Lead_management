import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import {
  Grid,
  TablePagination,
  Typography,
  TextField,
} from "@material-ui/core";
import { CsvBuilder } from 'filefy';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllLeads, deleteLeads } from "../helper/leadApiCalls";
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
  marginLeft: "42%",
  color: "red",
};



const textstyle = { margin: "8px 0", height: "fit-content" };

const TrashScreen = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  
  const [flag, setFlag] = React.useState(false);
  const showDeleteWindow = () => setFlag(true);
  const hideDeleteWindow = () => setFlag(false);

  const [dleads, setDleads] = React.useState([]);
  const [values, setValues] = React.useState({
    dError: "",
    dSuccess: false,
    dLoading: false,
  });

  const { dError, dSuccess, dLoading } = values;
  const { _id, token } = isAuthenticated();

  const handelBulkDelete = () => {
    console.log("please implement");
  };

  const deleteALlLeads = () => {
    setValues({ ...values, dError: "", dLoading: true });
    const jsonString = JSON.stringify(Object.assign({}, dleads));
    console.log(jsonString);
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
      .catch(console.log("Error in lead deletion"));
  };

  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const [tableLoading, setTableLoading] = useState(true);

  const downloadExcel = () => {
    const newData=data.map(row=>{
    delete row.tableData
    return row
    })
    const workSheet=XLSX.utils.json_to_sheet(newData)
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,"Leads Data")
    //Buffer
    let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
    //Binary
    XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
    //Download
    XLSX.writeFile(workBook,"LeadsData.xlsx")
  }
  const preload = () => {
    if (userInfo) {
      getAllLeads(userInfo._id, userInfo.token)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setData(data);
            setTableLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const exportAllSelectedRows=()=>{


    new CsvBuilder("tableData.csv")
     .setColumns(column.map(col=>col.title))
     .addRows(selectedRows.map(rowData=>column.map(col=>rowData[col.field])))
     .exportFile();

    };
  const [selectedRows, setSelectedRows] = useState([]);
 
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    preload();
  }, [
    history,
    userInfo,
  ]);

  const column = [
    { title: "Name", field: "applicantName", filtering: false },
    { title: "Email ID", field: "email", align: "center", filtering: false },
    {title: "Contact Number",field: "mobile",align: "center",filtering: false},
    { title: "Created ON", field: "createdAt" },
    { title: "City", field: "city" },
    { title: "Source", field: "source", align: "left" },
    { title: "Entrance", field: "entrance" },
    { title: "Percentile", field: "percentileGK"},
    { title: "Lead Status", field: "status" },
  ];
  return (
    <>
      
        <div>
          <h1 style={textStyle}>Trash Bin</h1>
          <Box style={boxStyle}>
            <MaterialTable
              title=""
              data={data}
              onSelectionChange={(rows) => setSelectedRows(rows)}
              columns={column}
              isLoading={tableLoading}
              editable={{}}
              options={{

                toolbar: true,
                search:false,
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
                  tooltip:"Export to excel",
                  onClick:()=>downloadExcel(),
                  isFreeAction:true,
                },
                {
                  icon: () => <Button style={btnstyle}  onClick={handleOpen}>Assign Leads</Button>,
                  tooltip: "Assign Leads",
                  isFreeAction: false,
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
                    console.log(leads);
                    showDeleteWindow();
                  },
                  isFreeAction: false,
                  tooltip: "Delete all selected rows",
                  onClick: () => handelBulkDelete(),
                },
                {
                  icon: ()=><SaveAltIcon/>,
                  tooltip: "Export all selected rows",
                  onClick: () => exportAllSelectedRows()
                }
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
                    Selected leads will be deleted permanently from the
                    database.
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
          </Box>
        </div>
      )
    </>
  );
};
export default TrashScreen;
