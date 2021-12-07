import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import DeleteIcon from '@material-ui/icons/Delete';
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import AssessmentIcon from '@material-ui/icons/Assessment';

function Sidebar() {
  // *************** Backend Stuff
  const useStyles = makeStyles((theme) => ({
    sidenav: {
      position: "fixed",

      overflowY: "none",
    },
    MuiBackdropRoot: {
      overflowY: "none",
    },
    MuiDrawerPaper: {
      overflowY: "none",
    },

    SettingStyle: {
      marginTop: "2px",
      background: "#c5bfbf",
      width: "auto",
    },

    style: {
      marginTop: "-30%",
      background: "#c5bfbf",
    },
  }));

  const classes = useStyles();

  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <div className={classes.sidenav}>
      <Divider />
      <ListItem
        button
        style={{ minWidth: 300 }}
        component={Link}
        to="/"
        title="TasksScreenUser"
      >
        <ListItemIcon>
          <GroupWorkIcon style={{ fill: "purple" }} fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>

      {userInfo && userInfo.isAdmin && (
        <>
          <ListItem
            button
            style={{ minWidth: 300 }}
            component={Link}
            to="/Dashboard"
            title="Dashboard"
          >
            <ListItemIcon>
              <DashboardIcon style={{ fill: "purple" }} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            style={{ minWidth: 300 }}
            component={Link}
            to="/users"
            title="Users"
          >
            <ListItemIcon>
              <PeopleIcon style={{ fill: "purple" }} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Users List" />
          </ListItem>
          <ListItem
            button
            style={{ minWidth: 300 }}
            component={Link}
            to="/report"
            title="Report"
          >
            <ListItemIcon>
              <AssessmentIcon style={{ fill: "purple" }} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItem>
        </>
      )}
      {userInfo && userInfo.isAdmin && (
        <ListItem
          button
          style={{ minWidth: 300 }}
          component={Link}
          to="/trash"
          title="Trash"
        >
          <ListItemIcon>
            <DeleteIcon style={{ fill: "purple" }} fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
      )}

      <Divider style={{ marginTop: "30%" }} />

      <ListItem
        className={classes.style}
        style={{ minWidth: 300 }}
        button
        component={Link}
        to="/Help"
        title="Help"
      >
        <ListItemIcon>
          <HelpIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Help" />
      </ListItem>

      <ListItem
        className={classes.SettingStyle}
        button
        style={{ minWidth: 300 }}
        component={Link}
        to="/Settings"
        title="Settings"
      >
        <ListItemIcon>
          <SettingsIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </div>
  );
}

export default Sidebar;
