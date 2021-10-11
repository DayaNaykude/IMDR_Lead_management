import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import { Grid, TablePagination, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllLeads } from "../../helper/leadApiCalls";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

// backend Imports
import { sendBulkEmails } from "../../actions/userActions";
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
const sendStyle = {
  marginLeft: "45%",
  marginTop: "5%",
};
const textareaStyle = {
  width: "95%",
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
const TasksScreenUser = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [data, setData] = useState([]);
  const mailContent = `
      <h4>Are you interested in MBA ? </h4>
      <a href="https://www.imdr.edu/" target="__blank" clicktracking="off">
        Click Here To Visit IMDR
      </a>
    `;
  const dispatch = useDispatch();

  const userSendBulkEmails = useSelector((state) => state.userSendBulkEmails);
  const { loading, success, error, status } = userSendBulkEmails;

  const [selectedEmails, setSelectedEmails] = useState(null);
  const [tableLoading, setTableLoading] = useState(true);

  const sendEmailHandler = async (e) => {
    e.preventDefault();
    const content = document.getElementById("editablemail").innerHTML;
    dispatch(sendBulkEmails(selectedEmails, JSON.stringify(content)));
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
  }, [history, userInfo, success]);

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
                  onClick: () => history.push("/view"),
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
                  {error && <Alert severity="error">{error}</Alert>}
                  {status && <Alert severity="success">{status.data}</Alert>}
                  <h3 align="center">Edit mail content </h3>

                  <div
                    id="editablemail"
                    // maxRows={20}
                    dangerouslySetInnerHTML={{ __html: mailContent }}
                    contentEditable="true"
                    style={textareaStyle}
                    autoFocus
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
