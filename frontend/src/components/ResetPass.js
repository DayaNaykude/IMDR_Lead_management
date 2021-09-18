import React from "react";
import { TextField, Grid, Paper, Typography ,Button } from '@material-ui/core';

const ResetPassword = () => {
    const paperStyle = { padding: 40, height: "30vh", width: 300, margin: "40px auto" }
    const textstyle = { margin: "5px 0" };
    const headerStyle = { margin: "10px 0", color: "Green" };
    const btnstyle = { margin: "5px 0" };
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <h2 style={headerStyle}>Reset Password</h2>
                    <Typography variant="caption">
                        Please Set New Password !!
                    </Typography>
                </Grid>
                <form>
                    <TextField
                        label="New Password"
                        placeholder="Enter Password"
                        type="password"
                        style={textstyle}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Confirm New Password"
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
                    style={btnstyle}
                    fullWidth
                    >Reset Password</Button>
                </form>
            </Paper>
        </Grid>
    )
}
export default ResetPassword;