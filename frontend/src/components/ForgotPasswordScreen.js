import React from "react";
import { TextField, Grid, Paper, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";

const ForgotPasswordScreen = () => {
  const paperstyle = {
    padding: 40,
    height: "30vh",
    width: 300,
    margin: "40px auto",
  };
  const textstyle = { margin: "5px 0" };
  const headerStyle = { margin: "10px 0", color: "red" };
  const btnstyle = { margin: "5px 0" };

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperstyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Forgot Password</h2>
          <Typography variant="caption">
            Please Enter the email address you register your account.We will
            send you reset password confirmation to this email !
          </Typography>
        </Grid>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="error-message">{success}</span>}
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
