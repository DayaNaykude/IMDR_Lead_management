import React from "react";

import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { useHistory } from "react-router-dom";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
const backStyle = {
  width: "10vh",
  padding: "10px",
  margin: "10px",
  marginRight: "",
  backgroundColor: "#4ab5da",
};

const paperStyle = {
  padding: 20,
  height: "90%",
  width: "40%",
  margin: "10px auto",

  backgroundColor: "",
};
const avatarstyle = { backgroundColor: "#26d6ca" };
const headerStyle = { margin: 0 };
const textstyle = { margin: "10px 0", textSize: "20px" };
const appBar={
  top: "auto",
  bottom: 0,
  textAlign: "center",
};

const title= {
  flexGrow: 1,
  letterSpacing: "0.175em",
  fontSize: "140%",
};
const editStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  fontSize: "20px",
  padding: "10px 10px 10px 10px",
  marginLeft: "5%",
  marginTop: "0%",
  width: "15%",
};

const saveStyle = {
  backgroundColor: "#26d6ca",
  color: "white",
  width: "15%",
  fontSize: "20px",
  padding: "10px 10px 10px 10px",
  marginLeft: "60%",
  marginRight: "0%",
  marginTop: "0%",
};


const AddContact = () => {
  let history = useHistory();

  return (
    <>
    <AppBar position="static" style={appBar}>
        <Toolbar>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={backStyle}
            onClick={() => {
              history.push("/");
            }}
          >
            Back
          </Button>
          <Typography variant="h6" style={title}>
          Add Contact
          </Typography>
        </Toolbar>
      </AppBar>
    <Grid>
      <Paper elevation={20} style={paperStyle}>
      {/*  <Grid align="center">
        <Avatar style={avatarstyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h1 style={headerStyle}>Add Details</h1>
        </Grid> */}

        <form>
          <TextField
            label="Bio"
            style={textstyle}
            variant="outlined"
            placeholder="Enter Your Bio"
            fullWidth
          />
          <TextField
            label="Your Full Name"
            variant="outlined"
            style={textstyle}
            placeholder="Enter Your Name"
            fullWidth
          />

          <TextField
            label="Email"
            variant="outlined"
            placeholder="Enter Email"
            type="email"
            style={textstyle}
            fullWidth
            required
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            style={textstyle}
            type="number"
            placeholder="Enter Your Phone number"
            fullWidth
          />

          <TextField
            id="date"
            variant="outlined"
            label="Birthday date"
            type="date"
            style={textstyle}
            // style={birthStyle}
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            placeholder="Enter Password"
            type="password"
            style={textstyle}
            fullWidth
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            placeholder="Confirm Password"
            type="password"
            style={textstyle}
            fullWidth
            required
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={editStyle}
          >
            EDIT
          </Button>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={saveStyle}
          >
            SAVE
          </Button>
        </form>
      </Paper>
    </Grid>
    </>
  );
};

export default AddContact;
