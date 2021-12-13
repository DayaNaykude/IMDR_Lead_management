import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { listUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
//import { Redirect } from "react-router-dom";
const Dashboard = () => {
  const textStyle = {
    marginTop: "50px",
    marginLeft: "42%",
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
  const Style = {
    margin: "8px 0",
    marginLeft: "35%",
    textSize: "20px",
    width: "35%",
  };

  const dispatch = useDispatch();
  let history = useHistory();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

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

  return (
    <>
      <h1 style={textStyle}>Dashboard</h1>
      <div>
        <FormControl style={Style}>
          <InputLabel>User</InputLabel>
          <Select
            labelId=""
            id=""
            label="Users"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          >
            <MenuItem value="{}">All</MenuItem>
            {users &&
              users.map(
                (user) =>
                  user.isAdmin == false && (
                    <MenuItem value={`{"user":{"$oid":"${user._id}"}}`}>
                      {user.username}
                    </MenuItem>
                  )
              )}
          </Select>
        </FormControl>
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
