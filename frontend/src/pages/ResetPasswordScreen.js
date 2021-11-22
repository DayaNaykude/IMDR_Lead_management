import React from "react";
import { TextField, Grid, Paper, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert } from "@mui/material";

// backend Imports
import { resetPassword } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const ResetPasswordScreen = ({ match }) => {
  const paperStyle = {
    padding: 50,
    height: "60%",
    width: "20%",
    margin: "40px auto",
  };
  const textstyle = { margin: "5px 0" };
  const headerStyle = { margin: "10px 0", color: "Green" };
  const btnstyle = { marginTop: "50px" };
  // let history = useHistory();
  const { resetToken } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, status } = userResetPassword;

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setMessage("Passwords do not match");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      dispatch(resetPassword(password, resetToken));
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Reset Password</h2>
          <Typography variant="caption">Please Set New Password !!</Typography>
        </Grid>
        {loading && <Alert severity="info">Loading...</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="error">{message}</Alert>}
        {status && (
          <>
            <Alert severity="success">{status.data}</Alert>
            <p>
              <Link to="/login">Click here to Login</Link>
            </p>
          </>
        )}

        <form onSubmit={resetPasswordHandler}>
          <TextField
            label="New Password"
            placeholder="Enter New Password"
            type="password"
            style={textstyle}
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
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
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default ResetPasswordScreen;
