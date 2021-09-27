import React from "react";
import { useState, useEffect } from "react";
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
import Button from "@material-ui/core/Button";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Sidebar from "./SidebarScreen";

// backend imports
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Navbar = () => {
  const btnStyle = { marginLeft: "" };

  let history = useHistory();
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

  // **************** Backend Stuff

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const logoutHandler = () => {
    if (window.confirm("Are you sure ?")) {
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <div className={classes.root}>
      {error && <span className="error-message">{error}</span>}
      {loading && <h3>Loading...</h3>}
      <AppBar position="static">
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
          {/* <Typography variant="h6" className={classes.title}>
            IMDR
          </Typography> */}
          <Typography variant="h6" className={classes.title}>
            {userInfo ? userInfo.username : "IMDR"}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Button
            color="inherit"
            variant=""
            fontSize="large"
            startIcon={<PowerSettingsNewIcon fontSize="large" />}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={open} onClose={toggleSidebar()}>
        {list}
      </Drawer>
    </div>
  );
};
export default Navbar;
