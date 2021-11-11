import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import {
  Grid,
  TablePagination,
  Typography,
  TextField,
} from "@material-ui/core";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllLeads, deleteLeads } from "../../helper/leadApiCalls";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// backend Imports
import { sendBulkEmails } from "../../actions/userActions";
import { readMailContent, updateMailContent } from "../../actions/mailActions";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { isAuthenticated } from "../../helper";

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

const inputStyle = {
  marginLeft: "30px",
  marginTop: "5%",
  display: "inline-block",
};

const textstyle = { margin: "8px 0" };
const TasksScreenUser = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const userSendBulkEmails = useSelector((state) => state.userSendBulkEmails);
  const {
    loading,
    success: successSendBulkEmails,
    error,
    status: statusSendBulkEmails,
  } = userSendBulkEmails;

  const mailReadContent = useSelector((state) => state.mailReadContent);
  const {
    loading: loadingMailRead,
    error: errorMailRead,
    mailContent,
  } = mailReadContent;

  const mailUpdateContent = useSelector((state) => state.mailUpdateContent);
  const {
    loading: loadingMailUpdate,
    success: successMailUpdate,
    error: errorMailUpdate,
    status: statusMailUpdate,
  } = mailUpdateContent;

  const [selectedEmails, setSelectedEmails] = useState(null);
  const [subject, setSubject] = useState(
    "Craft Your Career with the First B-School of Pune"
  );
  const [tableLoading, setTableLoading] = useState(true);

  const sendEmailHandler = async (e) => {
    e.preventDefault();
    // const content = document.getElementById("editablemail").innerHTML;
    dispatch(sendBulkEmails(selectedEmails, subject));
  };

  const updateMailContentHandler = async (e) => {
    e.preventDefault();
    const content = document.getElementById("editablemail").innerHTML;
    console.log(content.toString());
    dispatch(updateMailContent(content));
  };

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
  const [selectedRows, setSelectedRows] = useState([]);
  
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    preload();
  }, [history, userInfo, successSendBulkEmails]);

  const column = [
    { title: "Name", field: "applicantName", filtering: false },
    { title: "Email ID", field: "email", align: "center", filtering: false },
    {
      title: "Contact Number",
      field: "mobile",
      align: "center",
      filtering: false,
    },
    { title: "Created ON", field: "createdAt", searchable: false },
    { title: "City", field: "city" },
    { title: "Source", field: "source", align: "left", searchable: false },
    { title: "Entrance", field: "entrance", searchable: false },
    { title: "Percentile", field: "percentileGK", searchable: false },
    { title: "Lead Status", field: "status", searchable: false },
  ];
  return (
    <>
      {userInfo && userInfo.isAdmin ? (
        <>
          <h1 style={textStyle}>Admin Task Screen</h1>
        </>
      ) : (
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
                  icon: "edit",
                  tooltip: "view details",
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
                  icon: () => <button style={btnstyle}>Data</button>,
                  tooltip: "Data",
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
                    dispatch(readMailContent());
                    setSelectedEmails(leads);

                    handleOpen();
                  },
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
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  {loading && (
                    <Alert severity="info">
                      Sending Emails.. It make few minutes..
                    </Alert>
                  )}
                  {loadingMailUpdate && (
                    <Alert severity="info">Updating mail content...</Alert>
                  )}
                  {loadingMailRead && (
                    <Alert severity="info">Loading mail content...</Alert>
                  )}
                  {error && <Alert severity="error">{error}</Alert>}
                  {errorMailRead && (
                    <Alert severity="error">{errorMailRead}</Alert>
                  )}
                  {errorMailUpdate && (
                    <Alert severity="error">{errorMailUpdate}</Alert>
                  )}
                  {statusSendBulkEmails && (
                    <Alert severity="success">
                      {statusSendBulkEmails.data}
                    </Alert>
                  )}
                  {statusMailUpdate && (
                    <Alert severity="success">{statusMailUpdate.status}</Alert>
                  )}

                  <form>
                    <div fullwidth="true">
                      <h3
                        style={{
                          display: "inline-block",
                          textAlign: "center",
                          float: "left",
                        }}
                      >
                        Mail Content{" "}
                      </h3>
                      <Button
                        type="submit"
                        align="right"
                        color="primary"
                        variant="contained"
                        style={saveStyle}
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </div>

                    <TextField
                      label="Subject"
                      style={textstyle}
                      required
                      variant="outlined"
                      placeholder="Enter Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      fullWidth
                    />
                    {/* <div
                      id="editablemail"
                      // maxRows={20}
                      dangerouslySetInnerHTML={{
                        __html: mailContent && mailContent,
                      }}
                      contentEditable="true"
                      style={textareaStyle}
                      fullwidth="true"
                    /> */}

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
      )}
    </>
  );
};
export default TasksScreenUser;
