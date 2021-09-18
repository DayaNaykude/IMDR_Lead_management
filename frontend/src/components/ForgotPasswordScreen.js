import React from "react";
import { TextField, Grid, Paper, Typography, Button } from "@material-ui/core";

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

        <form>
          <TextField
            label="Email"
            placeholder="Enter Email"
            type="email"
            style={textstyle}
            fullWidth
            required
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
