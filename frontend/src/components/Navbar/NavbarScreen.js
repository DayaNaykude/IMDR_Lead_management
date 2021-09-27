import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import CloseIcon from "@material-ui/icons/Close";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Sidebar from "./SidebarScreen";

const Navbar = () => {
  const btnStyle = { marginLeft: "" };
  let history = useHistory();

  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/auth/home", config);
        setUser(data);
        console.log(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      letterSpacing: "0.175em",
      fontSize: "140%",
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    closeButton: {
      display: "block",
      textAlign: "end",
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggleSidebar = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    isOpen === undefined ? setOpen(!open) : setOpen(isOpen);
  };
  const list = (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <ListItem button className={classes.closeButton} title="Close">
        <CloseIcon align="right" style={{ fill: "red", fontSize: "180%" }} />
      </ListItem>
      <Divider />
      <List>
        <Sidebar />
      </List>
    </div>
  );
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            IMDR
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Hello, {user.username}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <IconButton
            aria-label="logout"
            color="inherit"
            variant="contained"
            onClick={logoutHandler}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={open} onClose={toggleSidebar()}>
        {list}
      </Drawer>
    </div>
  );
};
export default Navbar;
