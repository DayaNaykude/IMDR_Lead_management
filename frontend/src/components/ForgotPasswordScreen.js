import React from "react";
import { TextField, Grid, Paper, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";

const ForgotPasswordScreen = () => {
  const paperstyle = {
    padding: 40,
    height: "40vh",
    width: 350,
    margin: "40px auto",
  };
  const backStyle={
    padding:"0px",
    margin:"0px",
    backgroundColor:"#4ab5da",

  };
  let history = useHistory();
  const textstyle = { margin: "5px 0" };
  const headerStyle = { margin: "20px 0", color: "red" };
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
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperstyle}>
      <Button
              type="submit"
              color="primary"
              variant="contained"
             style={backStyle}
             onClick={() => {
              history.push("/login");}}
          >
             Back
            </Button>

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
            onClick={() => {
              alert("✔️ successfully send email!");
            }}
          >
            Send Email
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default ForgotPasswordScreen;
