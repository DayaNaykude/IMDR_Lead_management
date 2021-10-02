import React from "react";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import { Grid, TablePagination, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const boxStyle = {
  marginTop: "60px",
  marginLeft: "20px",
  marginRight: "20px",
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
  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const data = [
    {
      name: "Sanika more",
      email: "sanikamore@gmail.com",
      contact: "8888888888",
      created_ON: "12/09/2022",
      city: "Pune",
      source: "Instagram",
      entrance: "CAT",
      percentile: "99.99",
      lead: "lead 2",
    },
    {
      name: "Sahil Kavitake",
      email: "sahie.kavitake202@gmail.com",
      contact: "1234567890",
      created_ON: "12/09/2022",
      city: "Ratnagiri",
      source: "fb",
      entrance: "CAT",
      percentile: "99.99",
      lead: "lead 2",
    },
    {
      name: "Gujju",
      email: "arushimore@gmail.com",
      contact: "8888988967",
      created_ON: "22/09/2022",
      city: "Akole",
      source: "Instagram",
      entrance: "CAT",
      percentile: "99",
      lead: "lead 2",
    },
    {
      name: "Prajakta maruti more",
      email: "prajumore@gmail.com",
      contact: "8767610063",
      created_ON: "13/09/2022",
      city: "Sangmner",
      source: "Instagram",
      entrance: "CAT",
      percentile: "98",
      lead: "completed",
    },
  ];
  const column = [
    { title: "Name", field: "name", filtering: false },
    { title: "Email ID", field: "email", align: "center", filtering: false },
    {
      title: "Contact Number",
      field: "contact",
      align: "center",
      filtering: false,
    },
    { title: "Created ON", field: "created_ON", searchable: false },
    { title: "City", field: "city" },
    { title: "Source", field: "source", align: "left", searchable: false },
    { title: "Entrance", field: "entrance", searchable: false },
    { title: "Percentile", field: "percentile", searchable: false },
    { title: "Lead Status", field: "lead", searchable: false },
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
                  icon: () => <button style={btnstyle}>Send Email</button>,
                  tooltip: "Send Email",
                  onClick: () => window.open("/profile"),
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
          </Box>
        </div>
      )}
    </>
  );
};
export default TasksScreenUser;
