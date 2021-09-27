import React from "react";
import { TextField, Grid, Paper, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ResetPasswordScreen = ({ match }) => {
  const paperStyle = {
    padding: 50,
    height: "40vh",
    width: 400,
    margin: "40px auto",
 };
  const textstyle = { margin: "5px 0" };
  const headerStyle = { margin: "10px 0", color: "Green" };
  const btnstyle = { marginTop: "50px" };
  // let history = useHistory();
  const { resetToken } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
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
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${resetToken}`,
        { password },
        config
      );

      setSuccess(data.data);
      // history.push("/login");
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
          <h2 style={headerStyle}>Reset Password</h2>
          <Typography variant="caption">Please Set New Password !!</Typography>
        </Grid>
        {error && <span className="error-message">{error}</span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
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
