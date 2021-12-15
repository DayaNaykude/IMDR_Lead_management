import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CSVLink } from "react-csv";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Backend Imports

import { getReport, listUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const textStyle = {
    marginTop: "50px",
    marginLeft: "45%",
    color: "red",
  };

  const [user, setUser] = useState("{}");

  const chartstyle = (w, h) => {
    return {
      background: " #FFFFFF",
      border: "none",
      borderRadius: "2px",
      boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
      width: `${w}vw`,
      height: `${h}vh`,
      margin: "1%",
    };
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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();
  let history = useHistory();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userReport = useSelector((state) => state.userReport);
  const { loadingReport, errorReport, report } = userReport;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      // dispatch(listUsers());
      dispatch(getReport(startDate, endDate));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, startDate, endDate]);

  const autoRefresh = 3000;

  const src_leads_count = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=5f79da52-0be2-4fe3-93a1-ed6226d2c72b&autoRefresh=${autoRefresh}&theme=light&attribution=false`;
  const src_leadsByUsers = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=41ca7f72-81f9-449a-a35a-51068b600677&autoRefresh=${autoRefresh}&theme=light&attribution=false`;
  const src_leadsByStatus = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=f6194110-3880-47ee-baf4-4bb52bd4491f&autoRefresh=${autoRefresh}&theme=light&attribution=false`;
  // const src_leadsByUsersStatus = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=2acec488-b46e-4332-a0e5-301ba20a113c&autoRefresh=${autoRefresh}&theme=light&attribution=false`;
  // const src_leadsByUsersStatus = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=2acec488-b46e-4332-a0e5-301ba20a113c&filter={"status":"level 0"}&autoRefresh=${autoRefresh}&theme=light&attribution=false`;
  const src_leadsByUsersStatus = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=2acec488-b46e-4332-a0e5-301ba20a113c&filter=${user}&autoRefresh=${autoRefresh}&theme=light&attribution=false`;
  const src_leadsByEntrance = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=f3868207-dde1-4db1-bb1e-b2b55ca965aa&autoRefresh=${autoRefresh}&theme=light&attribution=false`;
  const src_leadsBySource = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=699b26f7-d0c5-4a0f-a158-474f676ef9fa&autoRefresh=${autoRefresh}&theme=light&attribution=false`;
  const src_leadsByCity = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=74d9ff32-61ed-491c-939d-f78fea3a713a&autoRefresh=${autoRefresh}&theme=light&attribution=false`;

  const data = [
    {
      firstName: "Gujju",
      lastName: "Bhujbal",
      email: "gujjubhujbal@gmail.com",
      age: "24",
    },
    {
      firstName: "sanika",
      lastName: "more",
      email: "sanikamore@gmail.com",
      age: "24",
    },
  ];
  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Age", key: "age" },
  ];
  const csvReport = {
    filename: "Report.csv",
    headers: headers,
    data: data,
  };
  return (
    <>
      <h1 style={textStyle}>Dashboard</h1>
      <div>
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
          <CSVLink {...csvReport}>
            <Tooltip title="Report Download">
              <IconButton style={btnstyle}>
                <FileDownloadIcon />
                Report
              </IconButton>
            </Tooltip>
          </CSVLink>
        </Grid>
      </div>

      <iframe
        style={chartstyle(46, 60)}
        src={src_leads_count}
        title="src_leads_count"
      ></iframe>
      <iframe
        style={chartstyle(46, 60)}
        src={src_leadsByUsers}
        title="src_leadsByUsers"
      ></iframe>
      <iframe
        style={chartstyle(94, 70)}
        src={src_leadsByStatus}
        title="src_leadsByStatus"
      ></iframe>

      <iframe
        style={chartstyle(94, 70)}
        src={src_leadsByUsersStatus}
        title="src_leadsByUsersStatus"
      ></iframe>
      <iframe
        style={chartstyle(94, 80)}
        src={src_leadsByEntrance}
        title="src_leadsByEntrance"
      ></iframe>
      <iframe
        style={chartstyle(94, 80)}
        src={src_leadsBySource}
        title="src_leadsBySource"
      ></iframe>
      <iframe
        style={chartstyle(94, 80)}
        src={src_leadsByCity}
        title="src_leadsByCity"
      ></iframe>
    </>
  );
};
export default Dashboard;
