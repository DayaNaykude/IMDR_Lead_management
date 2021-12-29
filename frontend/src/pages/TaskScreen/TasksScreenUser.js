import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import {
  Grid,
  TablePagination,
  Typography,
  TextField,
} from "@material-ui/core";


import {toast} from 'react-toastify';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputLabel from "@mui/material/InputLabel";
import { CsvBuilder } from "filefy";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import XLSX from "xlsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { DataGrid } from '@material-ui/data-grid';
import 'react-toastify/dist/ReactToastify.css';
// backend Imports
import {
  sendBulkEmails,
  sendBulkSms,
  addReview,
} from "../../actions/userActions";
// import leadAddReview from "../../actions/userActions";
// import { readMailContent, updateMailContent } from "../../actions/mailActions";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { isAuthenticated } from "../../helper";

//api calls
import { getAllLeads, moveIntoTrash } from "../../helper/leadApiCalls";

//date formator
var moment = require("moment");

const boxStyle = {
  marginTop: "60px",
  marginLeft: "20px",
  marginRight: "20px",
};
const textAreaStyle = {
  marginLeft: "1.5%",
  marginTop: "0%",
  width: "80%",
  height: "100px",
};
const submitStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  fontSize: "20px",
  padding: "5px 5px 5px 5px",
  marginLeft: "2%",
  marginTop: "0%",
  width: "15%",
};
const btnStyle ={
  backgroundColor:"blue",
  color: "white",
  height: "36px",
  fontSize: "20px",
}
const headerStyle = { marginTop: "2px" };
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
const sendStyle = {
  marginLeft: "45%",
  marginTop: "5%",
};
const btnstyle = {
  backgroundColor: "rgb(30 183 30)",
  color: "white",
  height: "36px",
  fontSize: "20px",
};
const textStyle = {
  marginTop: "50px",
  marginLeft: "42%",
  color: "red",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  closeButton: {
    display: "inline",
    marginLeft: "85%",
  },
}));


const TasksScreenUser = () => {
  const classes = useStyles();

  const [openMail, setOpenMail] = useState(false);
  const handleOpenMail = () => setOpenMail(true);
  const handleCloseMail = () => {
    setOpenMail(false);
    window.location.reload(false);
  };
  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = () => {
    setOpenReview(true);
  };
  const handleCloseReview = () => {
    setOpenReview(false);
    window.location.reload(false);
  };
  
  /* 
  const [openSms, setOpenSms] = useState(false);
  const handleOpenSms = () => setOpenSms(true);
  const handleCloseSms = () => setOpenSms(false); */
  //Status
  const [leadname, setLeadname] = useState("");
  const [status, setStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [comment, setComment] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [lastReview, setLastReview] = useState("");
  const [reviewLeadEmail, setReviewLeadEmail] = useState("");

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

  //move leads into trash
  const moveLeadsIntoTrash = () => {
    setValues({ ...values, dError: "", dLoading: true });
    if (dleads.length <= 1000) {
      const jsonString = JSON.stringify(Object.assign({}, dleads));
      moveIntoTrash(_id, token, jsonString)
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
        .catch(console.log("Error in moving lead into trash"));
    } else {
      setValues({
        ...values,
        dError: "Select Upto 1000 Leads To Move Into Trash",
        dLoading: false,
      });
    }
  };

  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [data, setData] = useState([]);
  const [percente,setPercente] = useState(0);
  const dispatch = useDispatch();

  const userSendBulkEmails = useSelector((state) => state.userSendBulkEmails);
  const {
    loading: loadingSendBulkEmails,
    success: successSendBulkEmails,
    error: errorSendBulkEmails,
    status: statusSendBulkEmails,
  } = userSendBulkEmails;

  const userSendBulkSms = useSelector((state) => state.userSendBulkSms);
  const {
    loading: loadingSms,
    success: successSendBulkSms,
    error: errorSms,
    status: statusSendBulkSms,
  } = userSendBulkSms;

  // const mailReadContent = useSelector((state) => state.mailReadContent);
  // const {
  //   loading: loadingMailRead,
  //   error: errorMailRead,
  //   mailContent,
  // } = mailReadContent;

  // const mailUpdateContent = useSelector((state) => state.mailUpdateContent);
  // const {
  //   loading: loadingMailUpdate,
  //   success: successMailUpdate,
  //   error: errorMailUpdate,
  //   status: statusMailUpdate,
  // } = mailUpdateContent;

  const leadAddReview = useSelector((state) => state.leadAddReview);
  const {
    loading: loadingLeadAddReview,
    success: successLeadAddReview,
    error: errorLeadAddReview,
    status: statusLeadAddReview,
  } = leadAddReview;

  const [selectedEmails, setSelectedEmails] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState(null);
  const [subject, setSubject] = useState(
    "Craft Your Career with the First B-School of Pune"
  );

  const [message, setMessage] = useState(
    `Craft Your Career with the First B-School of Pune.\nPGDM with embedded 6 month Industry Internship.\nApply Now https://forms.eduqfix.com/deccanes/add
    `
  );
  const [tableLoading, setTableLoading] = useState(true);

  const sendEmailHandler = async (e) => {
    e.preventDefault();
    // const content = document.getElementById("editablemail").innerHTML;
    dispatch(sendBulkEmails(userInfo.sendgridemail, selectedEmails, subject));
  };

  const sendSmsHandler = async (e) => {
    e.preventDefault();
    dispatch(sendBulkSms(selectedEmails, selectedNumbers, message));
  };

  // const updateMailContentHandler = async (e) => {
  //   e.preventDefault();
  //   const content = document.getElementById("editablemail").innerHTML;
  //   console.log(content.toString());
  //   dispatch(updateMailContent(content));
  // };

  // backend call for update status
  const addReviewHandler = async (e) => {
    e.preventDefault();
    await dispatch(addReview(reviewLeadEmail, status, comment));
    setCreatedAt(new Date());
    setCurrentStatus(status);

    // console.log(reviewLeadEmail, status, comment);
  };

  const downloadExcel = () => {
    const newData = data.map((row) => {
      delete row.tableData;
      delete row.applicationSeqNo;
      delete row.nationality;
      delete row.physcialDisablity;
      delete row.addressLine1;
      delete row.addressLine2;
      delete row.addressLine3;
      delete row.communicationAddressCountry;
      delete row.user;
      delete row.__v;
      delete row._id;
      delete row.flag;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Leads Data");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "LeadsData.xlsx");
  };

  //loading leads
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
  }, [
    history,
    dispatch,
    userInfo,
    successSendBulkEmails,
    statusSendBulkEmails,
    successSendBulkSms,
    successLeadAddReview,
    statusLeadAddReview,
  ]);

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
      searchable: false,
      render: (rowData) => moment(rowData.createdAt).format("DD-MM-YYYY"),
    },
    { title: "City", field: "city" },
    { title: "Source", field: "source", align: "left", searchable: false },
    { title: "Entrance", field: "entrance", searchable: false },
    { title: "Percentile", field: "percentileGK", searchable: false },
    { title: "Lead Status", field: "status", searchable: false },
    { title: "Reviews", field: "reviews", hidden: true },
  ];
  const filterFunction = (percentage) => {
  
  console.log("data",data);
  console.log("percentage",percentage);
    setData(data.filter(per => per.percentileGK>=percentage))
 
  }
toast.configure();
  return (
    <>
      <div>
        <h1 style={textStyle}>Lead Management</h1>
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
                icon: () => (
                  <IconButton Color="Dark" onClick={handleOpenReview}>
                    <AddCommentIcon />
                  </IconButton>
                ),
                tooltip: "Add review",
                position: "row",
                onClick: (event, rowData) => {
                  setReviewLeadEmail(rowData.email);
                  setLastReview(rowData.reviews[rowData.reviews.length - 1]);
                  setCurrentStatus(rowData.status);
                  setLeadname(rowData.applicantName);

                  if (lastReview) {
                    setStatus(lastReview.status);
                    setComment(lastReview.comment);
                    setCreatedAt(
                      moment(lastReview.createdAt).format(
                        "DD-MM-YYYY,h:mm:ss a"
                      )
                    );
                  }
                },
              },
              {
                icon: "edit",
                tooltip: "edit details",
                position: "row",

                onClick: (event, rowData) => {
                  return (
                    <>
                      {history.push({
                        pathname: "/view", // re-route to this path
                        state: {
                          email: rowData.email,
                        },
                      })}
                      {history.go(0)}
                    </>
                  );
                },
              },
              
              {

               icon: () => 
               
               <TextField
                  placeholder="Enter Percentile"
                 

                  onChange={(e) => setPercente(e.target.value)}
                />,

              isFreeAction: true,
              },
              {
                icon: () => 
               <button style={btnStyle} onClick={(e) => filterFunction(percente)}>Filter For Percentile</button>,
              tooltip : "Press button for apply filter ",
              isFreeAction: true,
              },
              
              {
                icon: () => <button style={btnstyle}>Add Contact</button>,
                tooltip: "Add Contact",
                onClick: () => {
                  return (
                    <>
                      {history.push("/add")}
                      {history.go(0)}
                    </>
                  );
                },
                isFreeAction: true,
              },

              {
                icon: "download",
                tooltip: "Export to excel",
                onClick: () => downloadExcel(),
                isFreeAction: true,
              },
              {
                icon: () => <Button style={btnstyle}>Send Email</Button>,
                tooltip: "Send Email",
                onClick: (evt, data) => {
                  const leads = [];
                  data.forEach((element) => {
                    leads.push(element.email);
                  });
                  // dispatch(readMailContent());
                  setSelectedEmails(leads);

                  handleOpenMail();
                },
                isFreeAction: false,
              },
              {
                icon: "delete",
                tooltip: "Move To Trash",
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
            <Modal open={openMail} onClose={handleCloseMail}>
              <Box sx={style}>
                {loadingSendBulkEmails && (
                  <Alert severity="info">
                    Sending Emails.. It may take few minutes..
                  </Alert>
                )}

                {errorSendBulkEmails && (
                  <Alert severity="error">{errorSendBulkEmails}</Alert>
                )}

                {statusSendBulkEmails && (
                  <Alert severity="success">{statusSendBulkEmails.data}</Alert>
                )}

                <form>
                  <div fullwidth="true">
                    <ListItem
                      button
                      className={classes.closeButton}
                      title="Close"
                      onClick={handleCloseMail}
                    >
                      <CloseIcon
                        align="right"
                        style={{ fill: "red", fontSize: "180%" }}
                      />
                    </ListItem>
                  </div>
                  <h3>
                    Mail will be sent to selected leads.<br></br>Click the below
                    SEND button to proceed.
                  </h3>

                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={sendStyle}
                    onClick={sendEmailHandler}
                  >
                    SEND
                  </Button>
                </form>
              </Box>
            </Modal>
          </div>
          <div>
            <Modal open={openReview} onClose={handleCloseReview}>
              <Box sx={style}>
                <ListItem
                  button
                  className={classes.closeButton}
                  title="Close"
                  onClick={handleCloseReview}
                >
                  <CloseIcon
                    align="right"
                    style={{ fill: "red", fontSize: "180%" }}
                  />
                </ListItem>
                <h3 style={headerStyle}>
                  Write a Review for: <h5>{leadname}</h5>
                </h3>
                <hr />
                {loadingLeadAddReview && (
                  <Alert severity="info">Loading lead details...</Alert>
                )}

                {errorLeadAddReview && (
                  <Alert severity="error" >{errorLeadAddReview}</Alert>
                )}
                
             
                {statusLeadAddReview && (
                  toast.success({successLeadAddReview}, { autoClose:2000})

               )}
             

                <FormControl style={{ margin: "8px", width: "50%" }}>
                  <InputLabel>Select Status</InputLabel>
                  <Select
                    labelId=""
                    id=""
                    label="Select Status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={"Level 1"}>Level 1</MenuItem>
                    <MenuItem value={"Level 2"}>Level 2</MenuItem>
                    <MenuItem value={"Level 3"}>Level 3</MenuItem>
                    <MenuItem value={"Level 4"}>Level 4</MenuItem>
                  </Select>
                </FormControl>

                <Typography style={{ margin: "8px", color: "green" }}>
                  Comment
                </Typography>
                <TextareaAutosize
                  placeholder="Write comment here"
                  style={textAreaStyle}
                  onChange={(e) => setComment(e.target.value)}
                />

                <br />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={sendStyle}
                  onClick={addReviewHandler}
                >
                  ADD
                </Button>
                <hr />
                <h5>Current Status: {currentStatus}</h5>
                <h3 style={headerStyle}> Recent Review</h3>

                {/* {lastReview ? (
                  <p className="alert alert-primary">
                    <b> Status:-</b>
                    {lastReview.status} <b>Comment:-</b>
                    {lastReview.comment} <b>Date:-</b>
                    {lastReview.createdAt
                      ? moment(lastReview.createdAt).format(
                          "DD-MM-YYYY,h:mm:ss a"
                        )
                      : }
                  </p>
                ) : (
                  <p>No Any Reviews</p>
                )} */}

                {successLeadAddReview ? (
                  <p className="alert alert-primary">
                    <b> Status:-</b>
                    {status} <b>Comment:-</b>
                    {comment} <b>Date:-</b>
                    {moment(createdAt).format("DD-MM-YYYY,h:mm:ss a")}
                  </p>
                ) : lastReview ? (
                  <p className="alert alert-primary">
                    <b> Status:-</b>
                    {lastReview.status} <b>Comment:-</b>
                    {lastReview.comment} <b>Date:-</b>
                    {lastReview.createdAt
                      ? moment(lastReview.createdAt).format(
                          "DD-MM-YYYY,h:mm:ss a"
                        )
                      : ""}
                  </p>
                ) : (
                  <p>No Any Reviews</p>
                )}
              </Box>
            </Modal>
          </div>

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
                  tooltip="Back"
                  variant="contained"
                  onClick={() => {
                    history.go(0);
                  }}
                >
                  <KeyboardBackspaceSharpIcon />
                </IconButton>{" "}
              </div>
              {dSuccess && (
                <Alert severity="success">
                  Leads Moved Into Trash Successfully
                </Alert>
              )}
              {dError && <Alert severity="error">{dError}</Alert>}
              {dLoading && <Alert severity="info">Moving...</Alert>}
              <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Selected Leads Will Be Moved Into Trash.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={moveLeadsIntoTrash}>Yes</Button>
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
    </>
  );
};
export default TasksScreenUser;
