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
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import XLSX from "xlsx";

// backend Imports
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";

//api calls
import { getAllLeadsForAdmin } from "../helper/leadApiCalls";

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

  //loading all existing leads
  const preload = () => {
    getAllLeadsForAdmin(userInfo._id, userInfo.token)
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
    if (userInfo && userInfo.isAdmin) {
      preload();
    } else {
      history.push("/login");
    }
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
    { title: "User", field: "user.username" },
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
      </div>
      )
    </>
  );
};
export default DataScreen;
