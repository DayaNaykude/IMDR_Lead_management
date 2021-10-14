import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import { Grid, TablePagination, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllLeads } from "../../helper/leadApiCalls";
import { isAuthenticated } from "../../helper/index";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';


const boxStyle = {
  marginTop: "60px",
  marginLeft: "20px",
  marginRight: "20px",
};
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const sendStyle = {
  marginLeft:"45%",
  marginTop:"0%",
};
const textareaStyle = {
  width:"100%",
 height:"90%",
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

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const [data, setData] = useState([]);
  const { _id, token } = isAuthenticated();

  const preload = () => {
    getAllLeads(_id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setData(data);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    preload();
  }, []);

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
                  onClick: () => history.push("/add"),
                  isFreeAction: true,
                },
                {
                  icon: () => <button style={btnstyle}>Data</button>,
                  tooltip: "Data",
                  isFreeAction: true,
                },
                {
                  icon: () => <Button style={btnstyle}  onClick={handleOpen}>Send Email</Button>,
                  tooltip: "Send Email",
                 
                  isFreeAction: false,
                },
               
           
  
              ]}
              components={{
                Pagination: (props) => (
                  <div>
                    {/* {console.log(props)} */}
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
             <Modal
                  open={open}
                  onClose={handleClose}
                >
                  
                  <Box sx={style}>
                  <TextareaAutosize
                  // maxRows={20}
                 
                    defaultValue="Heyy,Sahil
                          mail from imdr."
                    style={textareaStyle} />
                    <Button 
                     type="submit"
                     color="primary"
                     variant="contained"
                     style={sendStyle}>
                      SEND</Button>
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
