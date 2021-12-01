import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen";
import Container from "@material-ui/core/Container";
import { Grid } from "@mui/material";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./index.css";


const SignInOutContainer = ({ history }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    value === 1 ? history.push("/login") : history.push("/register");
  };

  const paperStyle = {
    width: 340,
    marginLeft: "300px",
    marginTop: "50px",
  };
  const copyrightStyle ={
    marginLeft:"80%",
    marginTop:"90vh",
    
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div
      className="imageStyle"
      style={{
        backgroundImage: 'url("images/IMDRPicture.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    > 
      <div
     className="imagelogo"
    style={{

      backgroundImage: 'url("images/Logo.png")',
      
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: "white",
      
    }}
        >
      </div>
   
      <Grid>
        <Paper style={paperStyle}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            {/* */}
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <LoginScreen handleChange={handleChange} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegisterScreen handleChange={handleChange} />
          </TabPanel>
        </Paper>
      </Grid>
      <Grid >
         <AppBar style={copyrightStyle} position="static" color="primary" >
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                Copyright © imdr 2021 
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

      </Grid>
      
    </div>
  );
};

export default SignInOutContainer;
