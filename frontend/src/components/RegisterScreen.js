import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import { useHistory, Link } from "react-router-dom";

const RegisterScreen = ({ handleChange }) => {
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 340,
    margin: "",

    backgroundColor: "",
  };
  const avatarstyle = { backgroundColor: "#26d6ca" };
  const headerStyle = { margin: 0 };
  const textstyle = { margin: "5px 0" };
  const btnstyle = { margin: "5px 0" };
  const linkStyle = { margin: "8px 0" };
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarstyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption">
            Please fill this form to create an account!
          </Typography>
        </Grid>
        {error && <span className="error-message">{error}</span>}
        <form onSubmit={registerHandler}>
          <TextField
            label="Your Name"
            style={textstyle}
            placeholder="Enter Your Name"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <TextField label="Last Name" style={textstyle} placeholder="Enter Last Name" fullWidth/> */}
          <TextField
            label="Email"
            placeholder="Enter Email"
            type="email"
            style={textstyle}
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            type="password"
            style={textstyle}
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            style={textstyle}
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={registerHandler}
          >
            Sign Up
          </Button>

          <Typography style={linkStyle}>
            Already have an account ?
            <Link to="/login" onClick={() => handleChange("event", 0)}>
              Sign In
            </Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default RegisterScreen;
