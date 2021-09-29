import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import Divider from "@material-ui/core/Divider";
import PeopleIcon from "@material-ui/icons/People";

import { Link } from "react-router-dom";
const Style={
 marginTop:"630px",
 backgroundColor:"#c5bfbf",
};
const SettingStyle={
  marginTop:"2px",
 backgroundColor:"#c5bfbf",
};

function Sidebar() {
  return (
    <div>
        <ListItem button component={Link} to="/" title="Home">
       <ListItemIcon>
          <HomeIcon style={{ fill: "purple" }} fontSize="large" />
        </ListItemIcon> 
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem button component={Link} to="/Task" title="TasksScreenUser">
       <ListItemIcon>
          <GroupWorkIcon style={{ fill: "purple" }} fontSize="large" />
        </ListItemIcon> 
        <ListItemText primary="Tasks" />
      </ListItem>

      <ListItem button component={Link} to="/Dashboard" title="Dashboard">
       <ListItemIcon>
          <DashboardIcon style={{ fill: "purple" }} fontSize="large" />
        </ListItemIcon> 
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/users" title="Users">
       <ListItemIcon>
          <PeopleIcon style={{ fill: "purple" }} fontSize="large" />
        </ListItemIcon> 
        <ListItemText primary="Users List" />
      </ListItem>
      
      <ListItem style={Style} button component={Link} to="/Help" title="Help">
      <ListItemIcon>
          <HelpIcon  fontSize="large" />
        </ListItemIcon> 
        <ListItemText primary="Help" />
      </ListItem>

      <ListItem style={SettingStyle} button component={Link} to="/Settings" title="Settings">
       <ListItemIcon>
          <SettingsIcon fontSize="large" />
        </ListItemIcon> 
        <ListItemText primary="Settings" />
      </ListItem>
    </div>
  );
}

export default Sidebar;
