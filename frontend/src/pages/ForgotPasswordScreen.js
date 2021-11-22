import React from "react";
import { TextField, Grid, Paper, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Alert } from "@mui/material";

// backend Imports
import { forgotPassword } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const ForgotPasswordScreen = () => {
  let history = useHistory();
  const paperstyle = {
    padding: 50,
    height: "60%",
    width: "20%",
    margin: "40px auto",
  };

  const textstyle = { marginTop: "20px" };
  const headerStyle = { margin: "20px 0", color: "red" };
  const btnstyle = { marginTop: "40px" };

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading, error, status } = userForgotPassword;

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperstyle}>
        <IconButton
          aria-label="Back to login"
          color="primary"
          variant="contained"
          onClick={() => {
            history.push("/login");
          }}
        >
          <KeyboardBackspaceSharpIcon />
        </IconButton>

        <Grid align="center">
          <h2 style={headerStyle}>Forgot Password</h2>
          <Typography variant="caption">
            Please Enter the email address you register your account.We will
            send you reset password confirmation to this email !
          </Typography>
        </Grid>
        {loading && <Alert severity="info">Loading...</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        {status && <Alert severity="success">{status.data}</Alert>}
        <form onSubmit={forgotPasswordHandler}>
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

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Send Email
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default ForgotPasswordScreen;
