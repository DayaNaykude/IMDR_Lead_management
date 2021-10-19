import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import {
  Grid,
  TablePagination,
  Typography,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllLeads } from "../../helper/leadApiCalls";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

// backend Imports
import { sendBulkEmails } from "../../actions/userActions";
import { readMailContent, updateMailContent } from "../../actions/mailActions";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";

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
  marginLeft: "5%",
  display: "inline-block",
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

  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [data, setData] = useState([]);
  // const mailContent = `
  //     <h4>Are you interested in MBA ? </h4>
  //     <a href="https://www.imdr.edu/" target="__blank" clicktracking="off">
  //       Click Here To Visit IMDR
  //     </a>
  //   `;

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
  const [subject, setSubject] = useState("Visit IMDR");
  const [tableLoading, setTableLoading] = useState(true);

  const sendEmailHandler = async (e) => {
    e.preventDefault();
    const content = document.getElementById("editablemail").innerHTML;
    dispatch(sendBulkEmails(selectedEmails, content, subject));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files;
    const formData = new FormData();

    console.log(file);
    // console.log(file[0].name.toString().split(".")[0]);
    // for (let index = 0; index < e.target.files.length; index++) {
    //   formData.append("images", file[index]);
    // }

    // setUploading(true);
    // console.log(formData);

    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   };

    //   const { data } = await axios.post("/api/upload", formData, config);
    //   const paths = [];
    //   data.forEach((element) => {
    //     paths.push("/" + element.path.toString().replace('\\"', "/"));
    //   });
    //   setImages(paths);
    //   console.log(paths);
    //   setUploading(false);
    // } catch (error) {
    //   console.error(error);
    //   setUploading(false);
    // }
  };

  const updateMailContentHandler = async (e) => {
    e.preventDefault();
    const content = document.getElementById("editablemail").innerHTML;
    console.log(content.toString());
    dispatch(updateMailContent(content));
  };

  const preload = () => {
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
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    preload();
  }, [history,userInfo, successSendBulkEmails]); 

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
                            applicantName: rowData.applicantName,
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
                        onClick={updateMailContentHandler}
                      >
                        Save Content
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
                    <div
                      id="editablemail"
                      // maxRows={20}
                      dangerouslySetInnerHTML={{
                        __html: mailContent && mailContent,
                      }}
                      contentEditable="true"
                      style={textareaStyle}
                      fullwidth="true"
                    />
                    <div fullwidth="true">
                      <input
                        style={inputStyle}
                        type="file"
                        custom
                        multiple
                        onChange={uploadFileHandler}
                        id="contained-button-file"
                      />
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={sendStyle}
                        onClick={sendEmailHandler}
                      >
                        SEND
                      </Button>
                    </div>
                  </form>
                </Box>
              </Modal>
            </div>
          </Box>
        </div>
      )}
    </>
  );
};
export default TasksScreenUser;
